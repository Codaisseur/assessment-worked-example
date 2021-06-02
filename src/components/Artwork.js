import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Artwork({ id, title, imageUrl, hearts, bidsNumb }) {
  return (
    <Jumbotron
      style={{
        border: "solid",
      }}
    >
      <img className="d-block w-100" src={imageUrl} alt={title} />
      <h4>{title}</h4>

      <p> Hearts: {hearts}</p>
      <p> Bids: {bidsNumb}</p>
      <Link to={`/artworks/${id}`}>
        <Button>Visit space</Button>
      </Link>
    </Jumbotron>
  );
}
