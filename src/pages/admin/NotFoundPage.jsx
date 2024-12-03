import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-12 text-center">
      <Typography variant="h4" className="mb-4">404 - Page Not Found</Typography>
      <Typography variant="body1" className="mb-6">
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
