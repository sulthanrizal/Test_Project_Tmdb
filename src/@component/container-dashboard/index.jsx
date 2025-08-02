import Header from "../header";
import "./index.scss";

const ContainerDashboard = ({ children }) => {
  return (
    <div className="container-dashboard">
      <div className="dashboard-header">
        <Header />
      </div>
      <div className="dashboard-body">{children}</div>
    </div>
  );
};
export default ContainerDashboard;
