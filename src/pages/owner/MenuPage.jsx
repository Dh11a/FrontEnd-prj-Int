import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField, Button, Box, Container, TableContainer, Table, TableHead, TableRow,
  TableCell, TableBody, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Divider, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MenuPage = () => {
  const { id } = useParams();
  const [menus, setMenus] = useState([]);
  const [menu, setMenu] = useState({ name: "", category: "", price: "", id_destination: "" });
  const [editMenuId, setEditMenuId] = useState(null);
  const [open, setOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate()

  // Fetch all menus
  useEffect(() => {
    if(localStorage.getItem("ownerId")){
    axios.get(`http://localhost:5000/menus/owner_menu/${id}`)
      .then(response => {
        setMenus(response.data);
      })
      .catch((err) => {
        console.error("Error fetching Menus:", err);
        toast.error("Failed to load menus.");
      });}
      else{
        navigate('/login')
      }
  }, [id]);

  // Fetch destinations and filter them based on owner id
  useEffect(() => {
    axios.get("http://localhost:5000/destinations")
      .then(response => {
        const filteredDestinations = response.data.filter(destination => destination.id_owner === parseInt(id, 10));
        setDestinations(filteredDestinations);
      })
      .catch((err) => {
        console.error("Error fetching Destinations:", err);
        toast.error("Failed to load destinations.");
      });
  }, [id]);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value
    }));
  };

  // Save the new menu or update existing menu
  const saveMenu = async () => {

    try {
      if (editMenuId) {
        // Update existing menu
        await axios.put(`http://localhost:5000/menus/${editMenuId}`, menu);
        toast.success("Menu updated successfully");
        setMenus((prevMenus) =>
          prevMenus.map((m) => (m.id === editMenuId ? { ...m, ...menu } : m))
        );
      } else {
        // Save new menu
        const response = await axios.post("http://localhost:5000/menus", {
          name: menu.name,
          category: menu.category,
          price: parseFloat(menu.price),
          id_destination: parseInt(menu.id_destination, 10)
        });
        toast.success("Menu saved successfully");
        setMenus((prevMenus) => [...prevMenus, { ...menu, id: response.data.id }]);
      }
      setMenu({ name: "", category: "", price: "", id_destination: "" });
      setEditMenuId(null);
      handleClose();
    } catch (error) {
      console.error("Error saving menu:", error);
      toast.error("Failed to save menu");
    }
  };

  // Delete menu item
  const deleteMenu = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/menus/${id}`);
      setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
      toast.success("Menu deleted successfully");
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error("Failed to delete menu");
    }
  };

  // Open the dialog for editing a menu
  const handleEdit = (menu) => {
    setMenu(menu);
    setEditMenuId(menu.id);
    setOpen(true);
  };

  // Dialog handlers
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMenu({ name: "", category: "", price: "", id_destination: "" });
    setEditMenuId(null);
  };

  return (
    <Container className="mt-8 p-4 bg-gray-100 rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} />

      <Box className="mb-4">
        <h2 className="text-xl font-semibold">Menu Management</h2>
      </Box>

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Menu
      </Button>

      {/* Dialog for adding/editing a menu */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMenuId ? "Edit Menu" : "Add Menu"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={menu.name}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Category"
            name="category"
            value={menu.category}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            name="price"
            value={menu.price}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            type="number"
          />

          {/* Dropdown for selecting destination */}
          <FormControl fullWidth margin="dense">
            <InputLabel>Destination</InputLabel>
            <Select
              label="Destination"
              name="id_destination"
              value={menu.id_destination}
              onChange={handleInputChange}
            >
              {destinations.map((destination) => (
                <MenuItem key={destination.id} value={destination.id}>
                  {destination.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveMenu} color="primary">
            {editMenuId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menu Table */}
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menus.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.price} Dt</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleEdit(row)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteMenu(row.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MenuPage;
