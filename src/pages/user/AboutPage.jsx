import React from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import TeamMemberCard from '../../components/TeamMemberCard';
import VisionMissionCard from '../../components/VisionMissionCard';

const AboutPage = () => {
  return (
    <div>
      <NavBar />

      {/* About Section */}
      <Container className="my-12 p-8 bg-gray-100 rounded-lg shadow-lg text-center" maxWidth={false}>
        <h4 className="text-3xl font-semibold mb-6">
          About Reservi
        </h4>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Reservi is dedicated to connecting you with the best dining experiences around. Whether you're looking for fine dining,
          casual eats, or local cafes, our platform makes it easy to find and book tables at top-rated spots.
        </p>
      </Container>

      {/* Divider */}
      <Divider className="my-8" />

      {/* Vision and Mission */}
      <Container className="my-12" maxWidth={false}>
        <Typography variant="h4" className="text-2xl font-semibold mb-6 text-center">
          Our Vision and Mission
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
          <VisionMissionCard title="Vision" content="To be the leading dining reservation platform, known for exceptional user experience and a wide selection of venues." />
          <VisionMissionCard title="Mission" content="To simplify the dining reservation process, making it accessible and enjoyable for everyone." />
        </Box>
      </Container>

      {/* Divider */}
      <Divider className="my-8" />

      {/* Meet Our Team */}
      <Container className="my-12" maxWidth={false}>
        <Typography variant="h4" className="text-2xl font-semibold mb-6 text-center">
          Meet Our Team
        </Typography>
        <Typography variant="body1" color="text.secondary" className="text-center max-w-2xl mx-auto text-gray-600 mb-6">
          Our team is passionate about helping you discover new dining experiences. Get to know the people behind Reservi.
        </Typography>
        <div className="flex flex-wrap justify-center gap-6">
          {[1, 2, 3, 4, 5].map((member) => (
            <TeamMemberCard
              key={member}
              image="https://th.bing.com/th/id/R.87fe81902f20b432305cbc16df7cd64d?rik=bBA05VZsvriT2w&pid=ImgRaw&r=0"
              name={`Team Member ${member}`}
              role="Role and a short bio of the team member."
            />
          ))}
        </div>
      </Container>

      {/* Divider */}
      <Divider className="my-8" />

      <Footer />
    </div>
  );
};

export default AboutPage;
