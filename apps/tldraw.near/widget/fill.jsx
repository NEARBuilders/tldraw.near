const Container = styled.div`
  width: 100%;
  height: 100%;
  color: #fff; // Assuming a light background color for good contrast. Adjust as needed.
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px; // Adds some spacing for the name
`;

const { name, backgroundColor } = props;

return (
  <Container style={{ backgroundColor: backgroundColor }}>{name}</Container>
);
