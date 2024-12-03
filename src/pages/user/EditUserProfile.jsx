import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from '../../components/AppBarComponent';

function EditUserProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const navigate = useNavigate();

  const userId = localStorage.getItem('clientId');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/client/${userId}`)
        .then(response => {
          console.log(response.data);
          const { firstName, lastName, email, phone } = response.data[0];  // Access first element
          setUser({
            firstName,
            lastName,
            email,
            phone,
            password: '',
          });
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          toast.error('Failed to load profile data');
        });
    } else {
      toast.error('User ID not found');
      navigate('/login'); // Navigate to login page if no userId
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      axios.put(`http://localhost:5000/client/updateClient/${userId}`, {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
      })
        .then(response => {
          if (response.status === 200) {
            toast.success('Profile updated successfully!');
          }
        })
        .catch(error => {
          console.error('Error updating profile:', error);
          toast.error('Failed to update profile');
        });
    } else {
      toast.error('User ID not found');
      navigate('/login'); // Navigate to login page if no userId
    }
  };

  return (
    <div>
      <AppBarComponent />
      <Typography variant="h4" className="text-center mb-6">
        Edit Profile
      </Typography>
      <Container>
        <form onSubmit={handleSubmit}>
          <Box className="space-y-4">
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              variant="outlined"
              className="bg-white rounded"
              required
            />

            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={user.lastName}
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
              name="phone"
              type="tel"
              value={user.phone}
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
      </Container>

      <ToastContainer />
    </div>
  );
}

export default EditUserProfile;
