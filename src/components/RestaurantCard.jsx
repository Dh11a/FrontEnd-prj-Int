import { Button, Typography } from "@mui/material";

export default function RestaurantCard ({ image, name, description }) {
    return (
    <div className="bg-gray-100 shadow-lg rounded-md overflow-hidden w-full sm:w-1/2 lg:w-1/4 transition-transform hover:scale-105">
      <img src={image} alt="Restaurant" className="w-full h-40 object-cover" />
      <div className="p-4">
        <Typography variant="h6" className="font-bold">{name}</Typography>
        <Typography variant="body2" color="text.secondary" className="text-gray-600 my-2">
          {description}
        </Typography>
        <Button variant="contained" color="secondary" className="bg-purple-600 text-white mt-2 w-full">
          Reserve Now
        </Button>
      </div>
    </div>
  );
}