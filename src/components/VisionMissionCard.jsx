import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const VisionMissionCard = ({ title, content }) => {
  return (
    <Card className="bg-white shadow-md rounded-lg p-4 w-full">
      <CardContent>
        <Typography variant="h5" component="div" className="font-bold text-xl mb-2 text-gray-800">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VisionMissionCard;
