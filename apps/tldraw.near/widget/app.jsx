const style = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
};

return (
  <>
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      <Widget
        src="tldraw.near/widget/Tldraw"
        props={{
          style, // object
          isReadonly: false,
          forceMobile: false,
          persistanceKey: "tldraw", // string toggle persistance key
          inferDarkMode: false,
          components: {
            ContextMenu: null, // these can all be widgets that let you swap and edit the code of what they are
            ActionsMenu: null, // But first, I basically want them all to render and I can add and remove from list
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
              props: {} // object
            },
            MenuPanel: null,
            TopPanel: null,
            Background: null,
            // what other ones are there?
            // Canvas: null,
          },
        }}
      />
    </div>
  </>
);
