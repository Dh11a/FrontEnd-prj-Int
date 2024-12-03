import { Button, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from "../assets/Rezervi.png"

function NavBar() {
  const [isOwner, setIsOwner] = useState(false); // Default to 'client' on page load

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

        <div className="space-x-4 text-white">
          <Link to="/home">
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/about">
            <Button color="inherit">About</Button>
          </Link>
          
          {/* Conditional render based on user type */}
          {isOwner ? (
            <>
              <Link to="/login-owner">
                <Button color="inherit">Login (Owner)</Button>
              </Link>
              <Link to="/signup-owner">
                <Button color="success" variant="contained">Sign Up (Owner)</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login-client">
                <Button color="inherit">Login (Client)</Button>
              </Link>
              <Link to="/signup-client">
                <Button color="success" variant="contained">Sign Up (Client)</Button>
              </Link>
            </>
          )}
          
          {/* Toggle between Owner and Client */}
          <Button 
            color="inherit" 
            onClick={() => setIsOwner(!isOwner)}
          >
            Switch to {isOwner ? 'Client' : 'Owner'}
          </Button>
        </div>
      </Toolbar>
    </nav>
  );
}

export default NavBar;
