import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectArtworkDetails } from "./selectors";
import { selectUser } from "../user/selectors";
import { fetchArtworks } from "../../store/artworks/actions";

import { showMessageWithTimeout } from "../appState/actions";

export const ARTWORK_DETAILS_FETCHED = "ARTWORK_DETAILS_FETCHED";
export const HEARTS_UPDATED = "HEARTS_UPDATED";
export const BID_POST_SUCCESS = "BID_POST_SUCCESS";
export const ARTWORK_POST_SUCCESS = "ARTWORK_POST_SUCCESS";

const artworkDetailsFetched = (artwork) => ({
  type: ARTWORK_DETAILS_FETCHED,
  payload: artwork,
});

export const heartsUpdated = (artwork) => ({
  type: HEARTS_UPDATED,
  payload: artwork,
});

export const bidPostSuccess = (bid) => ({
  type: BID_POST_SUCCESS,
  payload: bid,
});

export const artworkPostSuccess = (artwork) => ({
  type: ARTWORK_POST_SUCCESS,
  payload: artwork,
});

export const fetchArtworkById = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/artworks/${id}`);
    // console.log(response.data.artwork);
    dispatch(artworkDetailsFetched(response.data.artwork));
  };
};

export const updateHearts = () => {
  return async (dispatch, getState) => {
    const { id } = selectArtworkDetails(getState());
    // We DON'T need to send the number of hearts to the backend
    // the BE holds the data! so he knows what the current number of hearts is

    const response = await axios.patch(`${apiUrl}/artworks/${id}`);

    dispatch(heartsUpdated(response.data.artwork));
    dispatch(fetchArtworks());
  };
};

export const postBid = (amount) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    const { id } = selectArtworkDetails(getState());

    const response = await axios.post(
      `${apiUrl}/artworks/${id}/bids`,
      {
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(
      showMessageWithTimeout("success", false, response.data.message, 3000)
    );
    dispatch(bidPostSuccess(response.data.bid));
  };
};

export const postArtwork = (title, imageUrl, minimumBid) => {
  return async (dispatch, getState) => {
    try {
      const { token } = selectUser(getState());
  
      const response = await axios.post(
        `${apiUrl}/artworks/`,
        {
          title,
          imageUrl,
          minimumBid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      dispatch(
        showMessageWithTimeout(
          "success",
          false,
          "Artwork posted successfully",
          3000
        )
      );
      dispatch(artworkPostSuccess(response.data.bid));
    } catch(e) {
      console.log(e.message)
    }
  };
};
