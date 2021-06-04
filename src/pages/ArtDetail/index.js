import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import Loading from "../../components/Loading";

import { showMessageWithTimeout } from "../../store/appState/actions";
import {
  fetchArtworkById,
  updateHearts,
  postBid,
} from "../../store/artworkDetails/actions";
import { selectArtworkDetails } from "../../store/artworkDetails/selectors";
import { selectUser } from "../../store/user/selectors";

export default function ArtDetail() {
  const { id } = useParams();
  const artwork = useSelector(selectArtworkDetails);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    dispatch(fetchArtworkById(id));
  }, [dispatch, id]);

  // get the actual values of the bids into an array.
  const bidValues = artwork.bids.map(bid => bid.amount);

  // check what should be the minimum bid
  const minBid =
    bidValues.length ? Math.max(...bidValues) : artwork.minimumBid;

  // update the value of the state with the minBid.
  useEffect(() => {
    setAmount(minBid || 0);
  }, [minBid])


  if (artwork.id === null) {
    return <Loading />;
  }

  function submitForm(event) {
    event.preventDefault();
    if (amount < minBid) {
      console.log("bid to low");
      dispatch(
        showMessageWithTimeout("danger", false, "Your bid is too low", 3000)
      );
      return null;
    }
    dispatch(postBid(amount));
  }

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <p
          style={{
            margin: "10px",
          }}
        >
          {" "}
          Hearts: {artwork.hearts}{" "}
        </p>
        <Button onClick={() => dispatch(updateHearts())}>Give heart</Button>
      </div>

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
      {user.token && artwork.id && (
        <Form as={Col} md={{ span: 6, offset: 3 }}>
          <Form.Group>
            <Form.Label>Amount $</Form.Label>
            <Form.Control
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              type="number"
              placeholder={minBid}
              min={minBid}
              required
            />
          </Form.Group>

          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Bid
            </Button>
          </Form.Group>
        </Form>
      )}
    </Jumbotron>
  );
}
