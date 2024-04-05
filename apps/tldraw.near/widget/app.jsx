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
            ContextMenu: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "ContextMenu",
                color: "#D5A848",
              },
            }, // these can all be widgets that let you swap and edit the code of what they are
            ActionsMenu: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "ActionsMenu",
                color: "#6F933A",
              },
            }, // But first, I basically want them all to render and I can add and remove from list
            HelpMenu: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "HelpMenu",
                color: "#44A8CD",
              },
            },
            ZoomMenu: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "ZoomMenu",
                color: "#7E33C1",
              },
            },
            MainMenu: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "MainMenu",
                color: "#38244A",
              },
            },
            Minimap: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "Minimap",
                color: "#727C9F",
              },
            },
            StylePanel: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "StylePanel",
                color: "#F18EBC",
              },
            },
            PageMenu: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "PageMenu",
                color: "#4C10EF",
              },
            },
            NavigationPanel: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "NavigationPanel",
                color: "#7881EC",
              },
            },
            Toolbar: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "Toolbar",
                color: "#5AA16F",
              },
            },
            KeyboardShortcutsDialog: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "KeyboardShortcutsDialog",
                color: "#16E6EE",
              },
            },
            QuickActions: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "QuickActions",
                color: "#E3FDFE",
              },
            },
            HelperButtons: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "HelperButtons",
                color: "#49DB11",
              },
            },
            DebugMenu: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "DebugMenu",
                color: "#62C747",
              },
            },
            SharePanel: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "SharePanel",
                color: "#817B36",
              }, // objec  t
            },
            MenuPanel: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "MenuPanel",
                color: "#16ECC5",
              },
            },
            TopPanel: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "TopPanel",
                color: "#F5B8D2",
              },
            },
            Background: {
              src: "tldraw.near/widget/fill",
              props: {
                name: "Background",
                color: "#67F912",
              },
            },
            // what other ones are there?
            // Canvas: null,
          },
        }}
      />
    </div>
  </>
);
