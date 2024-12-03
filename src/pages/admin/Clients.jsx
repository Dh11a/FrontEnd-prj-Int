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

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [selectedIdClient, setSelectedIdClient] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleClickOpen = (idClient) => {
    setSelectedIdClient(idClient);
    setOpen(true);
    setIsEditMode(false);
  };

  const handleOpenUpdate = (client) => {
    setSelectedIdClient(client.idClient);
    setFormData({
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      phone: client.phone,
    });
    setIsEditMode(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/client/deleteClient/${selectedIdClient}`)
      .then(() => {
        toast.success("Client supprimé avec succès");
        setClients(
          clients.filter((client) => client.idClient !== selectedIdClient)
        );
        setOpen(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression :", err);
      });
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5000/client/updateClient/${selectedIdClient}`,
        formData
      )
      .then(() => {
        toast.success("Client mis à jour avec succès");
        setClients(
          clients.map((client) =>
            client.idClient === selectedIdClient
              ? { ...client, ...formData }
              : client
          )
        );
        setOpen(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour :", err);
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
      .get("http://localhost:5000/client/allClients")
      .then((res) => {
        setClients(res.data.clients);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <h2 className="text-3xl text-center m-4">Table des Clients</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="client table">
          <TableHead>
            <TableRow>
              <TableCell>Prénom</TableCell>
              <TableCell align="center">Nom de famille</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Téléphone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.idClient}>
                <TableCell align="center">{client.firstName}</TableCell>
                <TableCell align="center">{client.lastName}</TableCell>
                <TableCell align="center">{client.email}</TableCell>
                <TableCell align="center">{client.phone}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleClickOpen(client.idClient)}
                    >
                      Supprimer
                    </Button>
                    <Divider orientation="vertical" />
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleOpenUpdate(client)}
                    >
                      Modifier
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
          {isEditMode ? "Modifier le client" : "Supprimer le client"}
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
                label="Prénom"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Nom de famille"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Téléphone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="dense"
              />
            </>
          ) : (
            <Typography gutterBottom>
              Voulez-vous vraiment supprimer ce client ?
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            variant="outlined"
            color={isEditMode ? "primary" : "error"}
            onClick={isEditMode ? handleUpdate : handleDelete}
          >
            {isEditMode ? "Mettre à jour" : "Supprimer"}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Clients;
