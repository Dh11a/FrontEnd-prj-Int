import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from "../assets/Rezervi.png"

function AppBarComponent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    localStorage.removeItem("clientId"); 
    navigate("/login-client"); 
  };

  const handleMyReservationsClick = () => {
    const clientId = localStorage.getItem("clientId"); 
    if (clientId) {
      navigate(`/mes-reservations/${clientId}`); 
      handleMenuClose();
    } else {
      console.error('Client ID not found in localStorage.');
    }
  };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 1000 }} className="bg-gray-800">
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <img
            src={image}
            alt="Logo"
            className="h-8 w-auto mr-2"
          />
        

        </div>

        {/* Avatar with Menu */}
        <IconButton onClick={handleMenuOpen} className="focus:outline-none">
          <Avatar alt="User Avatar" src="path_to_avatar.jpg" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          className="mt-2"
        >
          <MenuItem onClick={handleMyReservationsClick}>
            <Button variant="text">My Reservations</Button>
          </MenuItem>
          <MenuItem onClick={()=>{
            navigate("/user_profile")
            handleMenuClos()

          }}>
            <Button variant="text">Profile</Button>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Button variant="text" color="warning">Logout</Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </nav>
  );
}

export default AppBarComponent;
