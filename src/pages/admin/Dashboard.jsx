import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    /*<div>
      <h1>Dashboard</h1>
      <Link to={"tables"}>All Destinations</Link>
      <p></p>
      <Link to={"demands"}>All Demands</Link>
      <Outlet/>
    </div>*/
    <div>
      <Sidebar/>
      <Outlet />
    </div>
  );
}

export default Dashboard;
