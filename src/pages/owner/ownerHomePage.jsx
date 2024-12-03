import { Container, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Card from "./Card.jsx";
import { FaHome, FaPlus, FaUtensils, FaUser, FaTags, FaSignOutAlt } from "react-icons/fa";

function AdminHomePage() {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("ownerId")){
      setId(localStorage.getItem("ownerId"));
    }
    else{
      navigate("/login-owner")
    }
  }, [id]);

  function handleLogout () {
    localStorage.clear();
    navigate(`/login-owner`);
  };

  return (
    <div className="flex">
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#f4f4f4",
          },
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold">Owner Dashboard</h2>
          <Divider />
          <List>
            <ListItem button component={Link} to="destination_owner">
              <FaHome className="mr-2" />
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to={`add_DestinationsByOwner/${id}`}>
              <FaPlus className="mr-2" />
              <ListItemText primary="Add Destination" />
            </ListItem>
            <ListItem button component={Link} to={`reservations`}>
              <FaUtensils className="mr-2" />
              <ListItemText primary="Reservation" />
            </ListItem>
            <ListItem button component={Link} to={`menus/${id}`}>
              <FaUtensils className="mr-2" />
              <ListItemText primary="Menu" />
            </ListItem>
            <ListItem button component={Link} to={`owner_profile/${id}`}>
              <FaUser className="mr-2" />
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button component={Link} to={`offers`}>
              <FaTags className="mr-2" />
              <ListItemText primary="Offers" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <FaSignOutAlt className="mr-2 text-red-500" />
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </Drawer>

      <div className="flex-1 p-4 ml-[250px]">
        <Container>
          <Outlet /> 
        </Container>
      </div>
    </div>
  );
}

export default AdminHomePage;
