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

const Owner = () => {
  const [owners, setOwners] = useState([]);
  const [selectedIdOwner, setSelectedIdOwner] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleClickOpen = (id) => {
    setSelectedIdOwner(id);
    setOpen(true);
    setIsEditMode(false);
  };

  const handleOpenUpdate = (owner) => {
    setSelectedIdOwner(owner.id);
    setFormData({
      name: owner.name,
      email: owner.email,
      phone: owner.phone,
    });
    setIsEditMode(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/owner/deleteOwner/${selectedIdOwner}`)
      .then(() => {
        toast.success("Propriétaire supprimé avec succès");
        setOwners(owners.filter((owner) => owner.id !== selectedIdOwner));
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
        `http://localhost:5000/owner/updateOwner/${selectedIdOwner}`,
        formData
      )
      .then(() => {
        toast.success("Propriétaire mis à jour avec succès");
        setOwners(
          owners.map((owner) =>
            owner.id === selectedIdOwner ? { ...owner, ...formData } : owner
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
      .get("http://localhost:5000/owner/allOwners")
      .then((res) => {
        if (res.data && Array.isArray(res.data)) {
          setOwners(res.data);
        } else if (res.data && Array.isArray(res.data.owners)) {
          setOwners(res.data.owners);
        } else {
          setOwners([]);
        }
      })
      .catch((err) => {
        console.error(
          "Erreur lors de la récupération des propriétaires :",
          err
        );
        setOwners([]);
      });
  }, []);

  return (
    <Container>
      <h2 className="text-3xl text-center m-4">Table des Propriétaires</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="owner table">
          <TableHead>
            <TableRow>
              <TableCell>Nom du propriétaire</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Téléphone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(owners) && owners.length > 0 ? (
              owners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell align="center">{owner.name}</TableCell>
                  <TableCell align="center">{owner.email}</TableCell>
                  <TableCell align="center">{owner.phone}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleClickOpen(owner.id)}
                      >
                        Supprimer
                      </Button>
                      <Divider orientation="vertical" />
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleOpenUpdate(owner)}
                      >
                        Modifier
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Aucun propriétaire trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle id="dialog-title">
          {isEditMode
            ? "Modifier le propriétaire"
            : "Supprimer le propriétaire"}
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
                label="Nom"
                name="name"
                value={formData.name}
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
              Voulez-vous vraiment supprimer ce propriétaire ?
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

export default Owner;
