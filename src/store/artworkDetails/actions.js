import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectArtworkDetails } from "./selectors";
import { fetchArtworks } from "../../store/artworks/actions";

export const ARTWORK_DETAILS_FETCHED = "ARTWORK_DETAILS_FETCHED";
export const HEARTS_UPDATED = "HEARTS_UPDATED";

const artworkDetailsFetched = (artwork) => ({
  type: ARTWORK_DETAILS_FETCHED,
  payload: artwork,
});

export const heartsUpdated = (artwork) => ({
  type: HEARTS_UPDATED,
  payload: artwork,
});

export const fetchArtworkById = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/artworks/${id}`);
    console.log(response.data.artwork);
    dispatch(artworkDetailsFetched(response.data.artwork));
  };
};

export const updateHearts = () => {
  return async (dispatch, getState) => {
    const { id, hearts } = selectArtworkDetails(getState());

    console.log(id, hearts);

    const response = await axios.patch(`${apiUrl}/artworks/${id}`, {
      hearts: hearts + 1,
    });

    dispatch(heartsUpdated(response.data.artwork));
    dispatch(fetchArtworks());
    console.log(response.data.artwork);
  };
};
