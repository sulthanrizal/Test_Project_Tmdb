import { Route, Routes } from "react-router";
import ContainerDashboard from "./@component/container-dashboard";
import router from "./@router/router";

function App() {
  return (
    <>
      <ContainerDashboard>
        <Routes>
          {router.map(({ path, element }, index) => {
            return <Route path={path} key={index} element={element} />;
          })}
        </Routes>
      </ContainerDashboard>
    </>
  );
}

export default App;
