import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaUtensils, FaPhone, FaCalendarAlt } from "react-icons/fa";
import { MdTableBar } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Alert, Snackbar, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import MenuDisplayPage from "../owner/MenuDisplayPage";
import { FaStar } from "react-icons/fa"; // For the yellow stars

function CoffeeShopPage() {
  const [data, setData] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [nbPersons, setNbPersons] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false); // For opening the reservation dialog

  useEffect(() => {
    GetOneDestination();
    fetchAverageRating();
  }, [id]);

  const GetOneDestination = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/destinations/" + id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fetchAverageRating = () => {
    axios
      .get(`http://localhost:5000/ratings/average/${id}`)
      .then((res) => setAverageRating(res.data.averageRating))
      .catch((err) => console.log(err));
  };

  const handleRatingChange = (newValue) => {
    setUserRating(newValue);
  
    const clientId = localStorage.getItem("clientId");
  
    axios
      .post(`http://localhost:5000/ratings/add`, {
        restaurant_id: id,
        client_id: clientId,
        rating: newValue,
      })
      .then((res) => {
        if (res.status === 200) {
          fetchAverageRating(); // Fetch new average rating after submitting the rating
        }
      })
      .catch((err) => {
        console.error(err);
        alert("There was an error adding your rating.");
      });
  };

  const handleReserve = () => {
    const clientId = localStorage.getItem("clientId");

    if (!clientId) {
      alert("You must be logged in to make a reservation.");
      return;
    }

    if (!selectedDate || !nbPersons) {
      alert("Please select a date and number of persons.");
      return;
    }

    axios
      .post(`http://localhost:5000/reservations/add/${id}`, {
        idClient: clientId,
        numberOfPersons: nbPersons,
        reservationDate: selectedDate.toISOString(),
      })
      .then((res) => {
        if (res.status === 200) {
          setOpenSnackbar(true);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("There was an issue with the reservation. Please try again.");
      });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={24}
          color={i <= userRating ? "#FFD700" : "#D3D3D3"} // Yellow for filled, light gray for empty
          onClick={() => handleRatingChange(i)}
          style={{ cursor: "pointer" }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-4">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Reservation Added successfully
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="reservation-dialog"
        aria-describedby="dialog-for-reservation-form"
      >
        <DialogTitle>Reserve a Table</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <p className="text-lg">Select Date</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)} // Keep it as a Date object
                className="w-full p-3 border border-gray-300 rounded-lg"
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a Date"
              />
            </div>
            <div>
              <TextField
                fullWidth
                label="Number of Persons"
                type="number"
                variant="outlined"
                onChange={(e) => setNbPersons(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleReserve();
              handleCloseDialog();
            }}
            color="primary"
            variant="contained"
          >
            Confirm Reservation
          </Button>
        </DialogActions>
      </Dialog>

      {data[0] && (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 lg:w-2/5">
            <img
              src={"http://localhost:5000" + data[0].image}
              alt={data[0].name}
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="flex-1 lg:w-3/5 bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-4">{data[0].name}</h1>
            <p className="text-lg mb-4">{data[0].description}</p>
            <p className="text-lg mb-4">
              <FaMapMarkerAlt className="inline mr-2" />
              {data[0].adresse}
            </p>
            <p className="text-lg mb-4">
              <FaUtensils className="inline mr-2" />
              Type: {data[0].type}
            </p>
            <p className="text-lg mb-4">
              <MdTableBar className="inline mr-2" />
              Number of Tables: {data[0].tables}
            </p>
            <p className="text-lg mb-4">
              <FaPhone className="inline mr-2" />
              Phone Number: {data[0].phone}
            </p>

            {/* Menu Section - MenuDisplayPage */}
            <MenuDisplayPage restaurantId={id} /> {/* Pass the restaurant id for menu fetching */}

            <div className="mt-8">
              <button
                onClick={handleOpenDialog} // Open the dialog when clicked
                className="flex items-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
              >
                <FaCalendarAlt /> Reserve Now
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Rate this Restaurant</h2>
              <div className="flex gap-2">{renderStars()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoffeeShopPage;
