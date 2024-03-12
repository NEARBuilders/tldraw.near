const [components, setComponents] = useState({
  ContextMenu: null,
  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: null,
  StylePanel: null,
  PageMenu: null,
  NavigationPanel: null,
  Toolbar: null,
  KeyboardShortcutsDialog: null,
  QuickActions: null,
  HelperButtons: null,
  DebugMenu: null,
  SharePanel: {
    src: "efiz.near/widget/print",
    props: {},
  },
  MenuPanel: null,
  TopPanel: null,
  Background: null,
});

const [expandedKey, setExpandedKey] = useState(null);
const [srcValue, setSrcValue] = useState("");
const [propsValue, setPropsValue] = useState("");

const handleExpand = (key) => {
  setExpandedKey(expandedKey === key ? null : key);
};

const handleSave = () => {
  const updatedComponents = { ...components };
  updatedComponents[expandedKey] = {
    src: srcValue,
    props: JSON.parse(propsValue),
  };
  setComponents(updatedComponents);
  setExpandedKey(null);
  setSrcValue("");
  setPropsValue("");
};

return (
  <div>
    <table className="table table-bordered">
      <thead className="thead-dark">
        <tr>
          <th>Component</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(components).map((key) => (
          <>
            <tr key={key}>
              <td>{key}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleExpand(key)}
                >
                  {expandedKey === key ? "Collapse" : "Expand"}
                </button>
              </td>
            </tr>
            {expandedKey === key && (
              <tr>
                <td colSpan="2">
                  <div className="form-group">
                    <label htmlFor={`${key}Src`}>Src:</label>
                    <input
                      type="text"
                      className="form-control"
                      id={`${key}Src`}
                      value={srcValue}
                      onChange={(e) => setSrcValue(e.target.value)}
                      placeholder="Enter src"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`${key}Props`}>Props:</label>
                    <textarea
                      className="form-control"
                      id={`${key}Props`}
                      value={propsValue}
                      onChange={(e) => setPropsValue(e.target.value)}
                      placeholder="Enter props JSON"
                    ></textarea>
                  </div>
                  <button className="btn btn-success" onClick={handleSave}>
                    Save
                  </button>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  </div>
);
