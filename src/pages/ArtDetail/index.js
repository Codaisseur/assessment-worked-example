import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

import { fetchArtworkById } from "../../store/artworkDetails/actions";
import { selectArtworkDetails } from "../../store/artworkDetails/selectors";

export default function ArtDetail() {
  const { id } = useParams();
  const artwork = useSelector(selectArtworkDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArtworkById(id));
  }, [dispatch, id]);

  return (
    <Jumbotron
      style={{
        border: "solid",
      }}
    >
      <img
        className="d-block w-100"
        src={artwork.imageUrl}
        alt={artwork.title}
      />
      <h4>{artwork.title}</h4>

      <p> Hearts: {artwork.hearts}</p>
      <div>
        {" "}
        <h5>Bids</h5>
        {artwork.bids.map((bid) => (
          <p
            key={bid.id}
            style={{
              border: "solid",
            }}
          >
            {bid.email}: {bid.amount}$
          </p>
        ))}
      </div>
    </Jumbotron>
  );
}
