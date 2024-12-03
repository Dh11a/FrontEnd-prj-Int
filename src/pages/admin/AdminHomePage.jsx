import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Card from "./Card";

function AdminHomePage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/destinations")
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClick = (id)=>{
    navigate(`/destination_details/${id}`)
  }
  return (
    <div>
      <div className="text-red-400">AdminHomePage</div>
      <Link to={"/add_destination"}>Add a Destination</Link>

      <Container>
        {data.map((ele) => (
          <Card
            key={ele.id}
            name={ele.name}
            description={ele.description}
            adresse={ele.adresse}
            image={"http://localhost:5000/" + ele.image}
            handleClick={()=>handleClick(ele.id)}
          />
        ))}
      </Container>
    </div>
  );
}

export default AdminHomePage;
