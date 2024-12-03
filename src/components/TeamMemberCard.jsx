import { Typography } from "@mui/material";

export default function TeamMemberCard  ({ image, name, role }) {

return (
    <div className="bg-white shadow-md rounded-md overflow-hidden w-1/2 sm:w-1/3 lg:w-1/5 transition-transform hover:scale-105">
      <img src={image} alt="Team Member" className="w-full h-40 object-cover" />
      <div className="p-4 text-center">
        <Typography variant="h6" className="font-semibold">{name}</Typography>
        <Typography variant="body2" color="text.secondary" className="text-gray-600">{role}</Typography>
      </div>
    </div>
  );}