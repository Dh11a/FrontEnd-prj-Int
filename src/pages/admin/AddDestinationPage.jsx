import { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useParams } from "react-router-dom";

function AddDestination() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [tables, setTables] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [menu, setMenu] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);

  function handleImage(e) {
    setImage(e.target.files[0]);
  }
  function handleMenuImage(e) {
    setMenu(e.target.files[0]);
  }

  function handleApi() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("tables", tables);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("adresse", address);
    formData.append("phone", phone);
    formData.append("type", type);
    formData.append("id_owner", id);
    
    axios
      .post("http://localhost:5000/destinations/add", formData)
      .then((res) => {
        if (res.status === 200) {
          setAddress("");
          setDescription("");
          setImage("");
          setMenu("");
          setName("");
          setTables("");
          setPhoneNumber("");
          setType("");
          setOpen(true);
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <Container maxWidth="sm" className="bg-white">
      <Paper elevation={3} style={{ padding: "20px", margin: "20px 0" }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Add Destination
        </Typography>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Destination was Added successfully
          </Alert>
        </Snackbar>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          label="Number of Tables"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => setTables(e.target.value)}
          value={tables}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phone}
        />

        {/* Change from TextField to Select input */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Type of the Destination</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type of the Destination"
          >
            <MenuItem value="restaurant">Restaurant</MenuItem>
            <MenuItem value="cafe_shop">Cafe Shop</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <p>Image :</p>
        <input
          type="file"
          name="Image"
          onChange={handleImage}
          style={{ margin: "20px 0" }}
        />
       
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleApi}
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </Paper>
    </Container>
  );
}

export default AddDestination;
