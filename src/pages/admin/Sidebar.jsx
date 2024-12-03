import { useState } from "react";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [selected, setSelected] = useState("dashboard");

  return (
    <div className="h-screen w-20 bg-gray-900 text-white flex flex-col items-center py-4 fixed left-0 top-0">
      <div className="mb-8">
        <img
          src="../../Rezervi.png"
          alt="Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      <nav className="flex flex-col items-center space-y-6 mt-4 relative">
        <Link
          to={"tables"}
          onClick={() => setSelected("destinations")}
          className={`flex flex-col items-center text-gray-400 hover:text-white transition duration-300 relative ${selected === "destinations" ? "text-white" : ""} w-full`}
        >
          <div
            className={`w-full h-16 flex flex-col items-center justify-center bg-gray-900 ${selected === "destinations" ? "text-white" : "text-gray-400"}`}
          >
            <AddLocationAltOutlinedIcon sx={{ fontSize: 40 }} />
            <span className="text-xs mt-1">Destinations</span>
          </div>
        </Link>

        <Link
          to={"owners"}
          onClick={() => setSelected("owners")}
          className={`flex flex-col items-center text-gray-400 hover:text-white transition duration-300 relative ${selected === "owners" ? "text-white" : ""} w-full`}
        >
          <div
            className={`w-full h-16 flex flex-col items-center justify-center bg-gray-900 ${selected === "owners" ? "text-white" : "text-gray-400"}`}
          >
            <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
            <span className="text-xs mt-1">Owners</span>
          </div>
        </Link>

        <Link
          to={"clients"}
          onClick={() => setSelected("clients")}
          className={`flex flex-col items-center text-gray-400 hover:text-white transition duration-300 relative ${selected === "clients" ? "text-white" : ""} w-full`}
        >
          <div
            className={`w-full h-16 flex flex-col items-center justify-center bg-gray-900 ${selected === "clients" ? "text-white" : "text-gray-400"}`}
          >
            <BadgeOutlinedIcon sx={{ fontSize: 40 }} />
            <span className="text-xs mt-1">Clients</span>
          </div>
        </Link>
        <Link
          to={"demands"}
          onClick={() => setSelected("demands")}
          className={`flex flex-col items-center text-gray-400 hover:text-white transition duration-300 relative ${selected === "demands" ? "text-white" : ""} w-full`}
        >
          <div
            className={`w-full h-16 flex flex-col items-center justify-center bg-gray-900 ${selected === "demands" ? "text-white" : "text-gray-400"}`}
          >
            <LibraryAddOutlinedIcon sx={{ fontSize: 40 }} />
            <span className="text-xs mt-1">Demands</span>
          </div>
        </Link>

        <Link
          to={"profile"}
          onClick={() => setSelected("profile")}
          className={`flex flex-col items-center text-gray-400 hover:text-white transition duration-300 relative ${selected === "profile" ? "text-white" : ""} w-full`}
        >
          <div
            className={`w-full h-16 flex flex-col items-center justify-center bg-gray-900 ${selected === "profile" ? "text-white" : "text-gray-400"}`}
          >
            <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 40 }} />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
