import { Button, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <div className="bg-gray-800  text-white py-12 text-center">
        <Typography variant="body2" className="mb-4">
          &copy; {new Date().getFullYear()} Reservi. All rights reserved.
        </Typography>
        <div className="flex justify-center space-x-4">
          <Button color="inherit" className="text-white">Privacy Policy</Button>
          <Button color="inherit" className="text-white">Terms of Service</Button>
          <Button color="inherit" className="text-white">Help</Button>
          <Button color="inherit" className="text-white">Careers</Button>
        </div>
      </div>
  )
}

export default Footer