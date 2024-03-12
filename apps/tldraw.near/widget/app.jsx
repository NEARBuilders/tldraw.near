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
    <div style={{ position: "relative", width: "400px", height: "400px" }}>
      <Widget src="tldraw.near/widget/Tldraw" props={{ style }} />
    </div>
  </>
);
