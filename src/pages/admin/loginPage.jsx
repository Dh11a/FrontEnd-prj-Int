import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Logged in successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });
      navigate('/dashboard');
    } else {
      toast.error('Incorrect username or password', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <Container maxWidth="xs" className="flex flex-col justify-center h-screen">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={handleLogin}
        >
          Log In
        </Button>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
