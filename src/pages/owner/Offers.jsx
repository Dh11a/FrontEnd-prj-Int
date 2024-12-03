import styled from "styled-components";
import * as React from "react";
import dayjs from "dayjs";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Offers = () => {
  const [name, setName] = React.useState("");
  const [date_debut, setDateDebut] = React.useState(dayjs()); // Initialize as dayjs object
  const [date_fin, setDateFin] = React.useState(dayjs()); // Initialize as dayjs object
  const [description, setDescription] = React.useState("");

  function handleApi(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const data = {
      name,
      date_debut: date_debut.format("YYYY-MM-DD"), // Format dates
      date_fin: date_fin.format("YYYY-MM-DD"), // Format dates
      description,
    };

    axios
      .post("http://localhost:5000/offers/addOffer", data)
      .then((res) => {
        if (res.status === 200) {
          // Reset the form fields after successful submission
          setDescription("");
          setName("");
          setDateDebut(dayjs()); // Reset to current date
          setDateFin(dayjs()); // Reset to current date
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <StyledWrapper>
      <h1>Add offer</h1>
      <form className="form" onSubmit={handleApi}>
        <div className="flex-column">
          <label>Name</label>
        </div>
        <div className="inputForm">
          <input
            id="name"
            placeholder="Enter the name of the offer"
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state when input changes
          />
        </div>
        <div className="flex-column">
          <label>Date début & Date fin </label>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="Date_début"
            label="Date début"
            value={date_debut}
            onChange={(newDate) => setDateDebut(newDate)} // Update state when date changes
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="Date_fin"
            label="Date fin"
            value={date_fin}
            onChange={(newDate) => setDateFin(newDate)} // Update state when date changes
          />
        </LocalizationProvider>
        <div className="flex-column">
          <label>Description</label>
        </div>

        <textarea
          required
          cols={50}
          rows={10}
          id="textarea"
          name="textarea"
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update state when description changes
        />

        <button className="button-submit" type="submit">
          Add offer
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 100%;
    max-width: 500px; /* Limit the form width to help center-align */
    margin: 0 auto; /* Center the form horizontally */
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  ::placeholder {
    font-family: inherit;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    flex: 1; /* Ensures the input takes available space */
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    max-width: 200px; /* Center button */
    cursor: pointer;
    align-self: center; /* Center button */
  }

  .textarea {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    padding: 10px;
    font-family: inherit;
    font-size: 16px;
    resize: none;
  }
`;

export default Offers;
