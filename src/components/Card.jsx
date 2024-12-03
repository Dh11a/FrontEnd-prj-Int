import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function RecipeReviewCard({ item,averageRating}) {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/destination_details/${item.id}`);
  };

  return (
    <Card className="flex w-full rounded-lg p-4 border border-gray-400">
      {/* Image Section */}
      <div className="relative w-1/3 rounded-lg overflow-hidden mr-4">
        <img
          className="w-full h-full object-cover"
          src={`http://localhost:5000/${item.image}`}
          alt={name}
        />
      </div>

      {/* Content Section */}
      <CardContent className="flex flex-col w-2/3">
        {/* Title and Rating */}
        <Box className="flex justify-between items-center mb-2">
          <Typography variant="h6" className="font-bold text-blue-700 capitalize">
            {item.name}
          </Typography>
          <Box className="flex items-center">
            <Box className="bg-blue-800 text-white w-8 h-8 flex justify-center items-center rounded-md text-sm font-bold">
              {averageRating}
            </Box>
          </Box>
        </Box>

        {/* Location and Description */}
        <Typography variant="body2" className="text-blue-500 mb-1">
          {item.adresse}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mb-4">
          {item.description}
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSeeMore}
          className="self-start bg-blue-600 text-white mt-auto"
        >
          see More
        </Button>
      </CardContent>
    </Card>
  );
}
