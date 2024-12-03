import { Container, Grid, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeReviewCard from "../../components/Card"; 
import AppBarComponent from "../../components/AppBarComponent"; 

function ClientPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/destinations")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data);
        fetchAverageRatings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching destinations:", err);
        setError("Failed to load destinations.");
        setLoading(false);
      });
  }, []);

  const fetchAverageRatings = async (destinations) => {
    for (const destination of destinations) {
      try {
        const response = await axios.get(`http://localhost:5000/ratings/average/${destination.id}`);
        setRatings((prevRatings) => ({
          ...prevRatings,
          [destination.id]: response.data.averageRating,
        }));
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AppBarComponent /> 
      <h2 className="text-3xl text-center m-4 capitalize">Client Page</h2>
      <Container>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Container>

      <Container style={{ marginTop: "20px" }}>
        <Grid
          container
          spacing={3}
          direction="row" 
          justifyContent="flex-start" 
          wrap="wrap"
        >
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Grid item key={item.id}>
                <RecipeReviewCard
                  item={item}
                  averageRating={ratings[item.id] || 0}
                  style={{ maxWidth: 600, width: "300px" }} 

                />
              </Grid>
            ))
          ) : (
            <div>No results found.</div>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default ClientPage;
