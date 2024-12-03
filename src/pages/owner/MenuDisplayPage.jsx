import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Box, List, ListItem, ListItemText } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const MenuDisplayPage = () => {
  const {  id } = useParams();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/menus/${id}`);
        setMenus(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, [id]);

  return (
    <Container maxWidth="md" className="mt-8">
      <Typography variant="h4" className="text-center mb-6 font-semibold">
        Menus
      </Typography>

      <Accordion className="shadow">
        <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-blue-100">
          <Typography className="font-medium text-blue-800">View Menus</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List className="w-full">
            {menus.map((menu) => (
              <ListItem key={menu.id} className="border-b">
                <ListItemText className=" capitalize"
                  primary={`${menu.name} - ${menu.price} dt`}
                  secondary={`Category: ${menu.category}`}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default MenuDisplayPage;
