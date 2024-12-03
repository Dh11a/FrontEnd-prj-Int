import styled from "styled-components";

const Card = ({ name, description, adresse, image,handleClick }) => {
  return (
    <StyledWrapper >
      <div className="card" onClick={handleClick}>
        <div className="card-image">
          <img src={image} />
        </div>
        <div className="category"> {name} </div>
        <div className="heading">
          {description}
          <div className="author">{adresse}</div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Grid container to display multiple cards */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;

  .card {
    display: flex;
    background: white;
    padding: 0.4em;
    border-radius: 6px;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow to the card */
    transition: transform 0.2s ease-in-out;
    max-height: 150px; /* Control the max height for landscape shape */
  }

  .card:hover {
    transform: scale(1.02); /* Slight zoom on hover */
  }

  .card-content {
    flex: 1;
    padding-right: 15px; /* Spacing between the text and image */
  }

  .category {
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 600;
    color: rgb(63, 121, 230);
    padding-bottom: 5px;
  }

  .heading {
    font-weight: 600;
    color: rgb(88, 87, 87);
    margin-bottom: 10px;
  }

  .author {
    color: gray;
    font-weight: 400;
    font-size: 11px;
  }

  .card-image {
    background-color: rgb(236, 236, 236);
    width: 150px; /* Define the width for the image area */
    height: 100px; /* Define the height for a landscape image */
    border-radius: 6px;
    overflow: hidden; /* To ensure the image doesn't overflow */
  }

  /* Ensure the image fits the container */
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Makes the image cover the entire div without distortion */
  }
`;
export default Card;
