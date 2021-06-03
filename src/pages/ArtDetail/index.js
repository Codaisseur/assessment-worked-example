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
} from "../../store/artworkDetails/actions";
import { selectArtworkDetails } from "../../store/artworkDetails/selectors";
import { selectUser } from "../../store/user/selectors";
import { fetchArtworks } from "../../store/artworks/actions";
import { postBid } from "../../store/artworkDetails/actions";

export default function ArtDetail() {
  const { id } = useParams();
  const artwork = useSelector(selectArtworkDetails);
  const bids = artwork.bids;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //console.log(bids);

  const [amount, setAmount] = useState("");

  function giveHeart() {
    dispatch(updateHearts());
  }
  useEffect(() => {
    dispatch(fetchArtworks());
    dispatch(fetchArtworkById(id));
  }, [dispatch, id]);
  if (artwork.id === null) {
    return <Loading />;
  }

  /**This is not clean, i know. I just don't want to spend more time on it*/

  const minBid =
    bids.length === 0 ? artwork.minimumBid : bids[bids.length - 1].amount + 1;

  // console.log(minBid);
  /**** */

  function submitForm(event) {
    event.preventDefault();

    if (amount < minBid) {
      console.log("bid to low");
      dispatch(
        showMessageWithTimeout("danger", false, "Your bid is too low", 3000)
      );
      return null;
    }
    // console.log(amount, content, imageUrl);
    dispatch(postBid(amount));
  }

  /** */

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
        <Button onClick={giveHeart}>Give heart</Button>
      </div>

      <div>
        {" "}
        <h5>Bids</h5>
        {bids.map((bid) => (
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
      {user.token && artwork.id ? (
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
      ) : null}
    </Jumbotron>
  );
}
