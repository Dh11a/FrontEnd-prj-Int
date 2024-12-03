import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Button} from "@mui/material";
const MesRes = () => {
  const { clientId } = useParams(); // Get clientId from the URL
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reservations for the client when the component mounts
  useEffect(() => {
    if (clientId) {
      axios.get(`http://localhost:5000/reservations/clientRes/${clientId}`)
        .then(response => {
          console.log(response.data);
          setReservations(response.data); // Set the fetched reservations in the state
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch(error => {
          console.error('Error retrieving reservations:', error);
          setLoading(false);
        });
    }
  }, [clientId]);

  // Handle reservation cancellation
  const handleRefuse = (reservationId) => {
    axios.delete(`http://localhost:5000/reservations/mesReservations/${reservationId}`)
      .then(response => {
        console.log("Reservation cancelled successfully", response.data);
        // Filter out the cancelled reservation from the state
        setReservations(reservations.filter(reservation => reservation.id !== reservationId));
      })
      .catch(error => {
        console.error('Error cancelling reservation:', error);
      });
  };

  if (loading) {
    return <p>Loading reservations...</p>; // Show loading message while fetching data
  }

  return (
    <div>
      <h2 className='text-2xl text-center font-bold m-2'>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p> // Message when no reservations exist
      ) : (
        <ul>
          {reservations.map((reservation) => (

            <li className='sh-2 border border-2 m-2 p-2 rounded-md'
             key={reservation.id}>
              <p className='text-xl font-bold'>Restaurant: {reservation.restaurantName}</p>
              <p>Date: {reservation.reservationDate}</p>
              <p>Guests: {reservation.numberOfPersons}</p>
              <p className='text-green text-xl'>Status: {reservation.status}</p>
              {reservation.status === 'attente' && (
                <div className='flex justify-end'>
                  <Button variant='contained' onClick={() => handleRefuse(reservation.idReservation)}>Cancel</Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MesRes;
