import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function EditOwnerProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const navigate = useNavigate()

  const ownerId = localStorage.getItem('ownerId');

  useEffect(() => {

    const fetchOwnerDetails = async () => {
      if(localStorage.getItem("ownerId")){
      if (ownerId) {
        try {
          const response = await axios.get(`http://localhost:5000/owner/${ownerId}`);
          if (response.data.length > 0) {
            const { name, email, phone } = response.data[0];
            setUser({
              name,
              email,
              phoneNumber: phone,
              password: '',
            });
          }
        } catch (error) {
          console.error('Error fetching owner details:', error);
          toast.error('Failed to load profile data');
        }
      } else {
        toast.error('Owner ID not found');
      }}
      else{
        navigate('login-owner')
      }
    };

    fetchOwnerDetails();
  }, [ownerId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission for updating owner details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ownerId) {
      try {
        await axios.put(`http://localhost:5000/owner/${ownerId}`, {
          name: user.name,
          email: user.email,
          phone: user.phoneNumber,
          password: user.password,
        });

        toast.success('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      }
    } else {
      toast.error('Owner ID not found');
    }
  };

  return (
    <Container maxWidth="sm" className="mt-10 p-8 rounded-lg shadow-lg">
      <Typography variant="h4" className="text-center mb-6">
        Edit Profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box className="space-y-4">
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            variant="outlined"
            className="bg-white rounded"
            required
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            variant="outlined"
            className="bg-white rounded"
            required
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={user.phoneNumber}
            onChange={handleChange}
            variant="outlined"
            className="bg-white rounded"
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
            variant="outlined"
            className="bg-white rounded"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2"
          >
            Save Changes
          </Button>
        </Box>
      </form>

      <ToastContainer />
    </Container>
  );
}

export default EditOwnerProfile;
