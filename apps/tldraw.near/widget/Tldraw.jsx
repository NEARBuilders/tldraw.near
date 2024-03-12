const { style } = props;

return (
  <Canvas
    style={
      style ?? {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }
    }
    context={context}
    {...props}
  />
);
