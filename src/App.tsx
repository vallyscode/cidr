import "@fontsource/philosopher"
import Cidr from "./cidr";
import styled from "@emotion/styled";

const AppContainer = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
function App() {
  return (
    <AppContainer>
      <Cidr addr={[192, 168, 0, 0]} size={24} />
    </AppContainer>
  );
}

export default App;
