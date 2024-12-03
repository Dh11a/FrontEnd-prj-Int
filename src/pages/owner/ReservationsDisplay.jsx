import {
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DialogComp from "../../components/DialogComp";

const ReservationsDisplay = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false); // Added loading state
  const ownerId = localStorage.getItem("ownerId");

  // Function to close the dialog
  function handleClose() {
    setItem({});
    setOpen(false);
  }

  // Function to accept a reservation
  const acceptReservation = (idReservation) => {
    if (idReservation === undefined) {
      console.error("Reservation id is undefined");
      return;
    }
    setLoading(true); // Show loading indicator
    axios
      .put(`http://localhost:5000/reservations/${idReservation}/accept`)
      .then((response) => {
        console.log("Reservation accepted:", response);
        // Refresh reservations after accepting
        setData((prevData) =>
          prevData.filter((reservation) => reservation.idReservation !== idReservation)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error accepting reservation:", error);
        setLoading(false);
      });
  };

  // Function to reject a reservation
  const rejectReservation = (idReservation) => {
    if (idReservation === undefined) {
      console.error("Reservation id is undefined");
      return;
    }
    setLoading(true); // Show loading indicator
    axios
      .put(`http://localhost:5000/reservations/${idReservation}/reject`)
      .then((response) => {
        console.log("Reservation rejected:", response);
        // Refresh reservations after rejecting
        setData((prevData) =>
          prevData.filter((reservation) => reservation.idReservation !== idReservation)
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error rejecting reservation:", error);
        setLoading(false);
      });
  };

  // Open dialog function
  function handleOpen(item) {
    setItem(item);
    setOpen(true);
  }

  // Fetch reservations when the component mounts
  useEffect(() => {
    if (!ownerId) {
      console.error("Owner ID is missing in localStorage");
      return;
    }
    axios
      .get(`http://localhost:5000/reservations/${ownerId}`)
      .then((res) => {
        setData(res.data); // Update the state with reservations data
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
      });
  }, [ownerId]);

  return (
    <Container>
      <h2 className="text-3xl text-center m-4 capitalize">Reservation Demands</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Destination Name</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Client ID</TableCell>
              <TableCell align="center">Destination ID</TableCell>
              <TableCell align="center">Number of Persons</TableCell>
              <TableCell align="center">Reservation Date</TableCell>
              <TableCell align="center">Actions</TableCell>
              <TableCell align="center">More Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.idReservation}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.adresse}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.idClient}</TableCell>
                  <TableCell align="center">{row.idRestaurant}</TableCell>
                  <TableCell align="center">{row.numberOfPersons}</TableCell>
                  <TableCell align="center">{row.reservationDate}</TableCell>
                  <TableCell align="center">
                    <div className="flex">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => acceptReservation(row.idReservation)}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Accept"}
                      </Button>
                      <Divider orientation="vertical" flexItem />
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => rejectReservation(row.idReservation)}
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Reject"}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="info" onClick={() => handleOpen(row)}>
                      See More
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No Reservations Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogComp open={open} handleClose={handleClose} item={item} />
    </Container>
  );
};

export default ReservationsDisplay;
