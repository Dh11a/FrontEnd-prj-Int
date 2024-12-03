import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Container, Divider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminTable = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    tables: "",
    adresse: "",
    description: "",
    phone: "",
    type: ""
  });
  const navigate = useNavigate();

  const handleClickOpen = (rowId) => {
    setSelectedId(rowId);
    setOpen(true);
    setIsEditMode(false); 
  };

  const handleOpenUpdate = (destination) => {
    setSelectedId(destination.id);
    setFormData({
      name: destination.name,
      tables: destination.tables,
      adresse: destination.adresse,
      description: destination.description,
      phone: destination.phone,
      type: destination.type
    });
    setIsEditMode(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/destinations/delete/${selectedId}`)
      .then(() => {
        toast.success("Destination deleted successfully");
        setData(data.filter((item) => item.id !== selectedId));
        setOpen(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Error during deletion:", err);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/destinations/update/${selectedId}`, formData)
      .then(() => {
        toast.success("Destination updated successfully");
        setData(
          data.map((item) =>
            item.id === selectedId ? { ...item, ...formData } : item
          )
        );
        setOpen(false);
      })
      .catch((err) => {
        console.error("Error during update:", err);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/destinations")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <h2 className="text-3xl text-center m-4 capitalize">Table des destinations</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom du destination</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Nombre des tables</TableCell>
              <TableCell align="center">Num. de téléphone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.tables}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Button variant="outlined" color="error" onClick={() => handleClickOpen(row.id)}>
                      Delete
                    </Button>
                    <Divider orientation="vertical" />
                    <Button variant="outlined" color="success" onClick={() => handleOpenUpdate(row)}>
                      Update
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="dialog-title">
          {isEditMode ? "Update Destination" : `Delete Destination: ${formData.name}`}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {isEditMode ? (
            <>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Tables"
                name="tables"
                type="number"
                value={formData.tables}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
            </>
          ) : (
            <Typography gutterBottom>
              Are you sure you want to delete this destination?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="outlined"
            color={isEditMode ? "primary" : "error"}
            onClick={isEditMode ? handleUpdate : handleDelete}
          >
            {isEditMode ? "Update" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default AdminTable;
