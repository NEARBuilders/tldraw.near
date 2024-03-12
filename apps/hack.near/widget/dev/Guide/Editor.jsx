const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const guide = Social.get(`${daoId}/settings/dev/guide`);

if (guide === null) {
  return "Loading...";
}

State.init({
  guide,
});

const defaultWidgets = [
  {
    src: "hack.near/widget/dev.Summary",
  },
  {
    src: "mob.near/widget/Applications",
  },
  {
    src: "mob.near/widget/People",
  },
];

const settingWidgets = guide && JSON.parse(guide);

if (state.widgets === undefined) {
  const widgets = settingWidgets ?? defaultWidgets;
  State.update({ widgets });
}

const move = (fromIndex, toIndex) => {
  const widget = state.widgets.splice(fromIndex, 1)[0];
  if (toIndex !== undefined) {
    state.widgets.splice(toIndex, 0, widget);
  }
  State.update();
};

const guide_args = JSON.stringify({
  data: {
    [daoId]: {
      settings: {
        dao: {
          guide: state.guide,
        },
      },
    },
  },
});

const proposal_args = Buffer.from(guide_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update featured guide",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: "100000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

const renderMenu = (src, requireLogin, index) => {
  return (
    <div className="mb-3" key="menu">
      <div className="font-monospace mb-2">{src}</div>
      <button
        className="btn btn-primary"
        title="Move Up"
        disabled={index === 0}
        onClick={() => move(index, index - 1)}
      >
        <i className="bi bi-chevron-up" />
      </button>
      <button
        className="btn btn-primary"
        title="Move Down"
        disabled={index + 1 === state.widgets.length}
        onClick={() => move(index, index + 1)}
      >
        <i className="bi bi-chevron-down" />
      </button>
      <button
        className="btn btn-primary"
        title="Move to the Tottom"
        disabled={index === 0}
        onClick={() => move(index, 0)}
      >
        <i className="bi bi-chevron-double-up" />
      </button>
      <button
        className="btn btn-primary"
        title="Move to the Bottom"
        disabled={index + 1 === state.widgets.length}
        onClick={() => move(index, state.widgets.length - 1)}
      >
        <i className="bi bi-chevron-double-down" />
      </button>
      <button
        className="btn btn-danger ms-4"
        title="Remove"
        onClick={() => move(index, undefined)}
      >
        <i className="bi bi-trash3" /> Remove
      </button>
    </div>
  );
};

const addWidget = ({ widgetPath: guide, onHide }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        State.update({
          guide,
        });
        onHide();
      }}
    >
      <i className="bi bi-plus-lg" /> Add
    </button>
  );
};

return (
  <>
    <h2>Guidebook Editor</h2>
    <h3>FEATURED TUTORIAL</h3>
    <h5>Update Widget Source Path:</h5>
    <input
      type="text"
      value={state.guide}
      placeholder="account.near/widget/Example"
    />
    <div className="mt-2">
      <CommitButton
        disabled={state.guide === guide}
        data={{
          settings: {
            dev: { guide: JSON.stringify(state.widgets) },
          },
        }}
      >
        Save
      </CommitButton>
      <button
        disabled={state.guide === guide}
        className="btn btn-outline-success"
        onClick={handleProposal}
      >
        Propose
      </button>
      {settingWidgets &&
        JSON.stringify(state.widgets) !== JSON.stringify(settingWidgets) && (
          <button
            className="btn btn-outline-primary"
            onClick={() => State.update({ widgets: settingWidgets })}
          >
            Revert
          </button>
        )}
      {JSON.stringify(state.widgets) !== JSON.stringify(defaultWidgets) && (
        <button
          className="btn btn-outline-danger float-end"
          onClick={() => State.update({ widgets: defaultWidgets })}
        >
          Reset
        </button>
      )}
    </div>
    <div className="mb-2 mt-3">
      <Widget
        src="hack.near/widget/dev.Widget.Search"
        props={{ extraButtons: addWidget }}
      />
    </div>
    <hr />
    <h4>ADDITIONAL RESOURCES</h4>

    {state.widgets.map(({ src, requiresLogin }, i) => (
      <div key={src} className="border rounded-4 p-3 mb-3">
        {renderMenu(src, requireLogin, i)}
        <div className="text-bg-light rounded-4 p-3">
          <Widget src={src} />
        </div>
      </div>
    ))}
  </>
);
