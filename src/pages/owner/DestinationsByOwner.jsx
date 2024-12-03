import axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DestinationsByOwner = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const ownerId = localStorage.getItem("ownerId");

  // Fetch destinations by owner
  useEffect(() => {
    axios
      .get(`http://localhost:5000/destinations/owner/${ownerId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [ownerId]);

  // Open confirmation dialog
  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  // Close confirmation dialog
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  // Handle deletion of the destination
  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await axios.delete(`http://localhost:5000/destinations/delete/${selectedItem.id}`);
      
      // Show success toast
      toast.success(`${selectedItem.name} has been deleted successfully!`);
      
      // Remove the deleted item from the table
      setData(data.filter((item) => item.id !== selectedItem.id));
    } catch (error) {
      console.error(error);
      // Show error toast
      toast.error("Failed to delete the destination.");
    }
    handleCloseDialog();
  };

  return (
    <Container className="mt-8">
      <Typography variant="h4" className="text-center m-6">
      My approved destination
      </Typography>
      <ToastContainer />
      {data.length > 0 ? (
        <TableContainer component={Paper} className="mt-3">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold text-blue-800" align="center">Image</TableCell>
                <TableCell className="font-bold text-blue-800" align="center">Name</TableCell>
                <TableCell className="font-bold text-blue-800" align="center">Address</TableCell>
                <TableCell className="font-bold text-blue-800" align="center">Number of Tables</TableCell>
                <TableCell className="font-bold text-blue-800" align="center">Type</TableCell>
                <TableCell className="font-bold text-blue-800" align="center">Phone Number</TableCell>
                <TableCell className="font-bold text-blue-800" align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell align="center">
                    <Avatar
                      src={`http://localhost:5000/${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 rounded-full"
                      variant="rounded"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography className="capitalize font-semibold text-blue-600">
                      {item.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{item.adresse}</TableCell>
                  <TableCell align="center">{item.tables}</TableCell>
                  <TableCell align="center">{item.type}</TableCell>
                  <TableCell align="center">{item.phone}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleOpenDialog(item)}
                      className="bg-red-600 text-white"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No destinations found.
        </Typography>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{selectedItem?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" className="bg-red-600 text-white">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DestinationsByOwner;
