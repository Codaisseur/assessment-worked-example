import { apiUrl } from "../../config/constants";
import axios from "axios";

export const FETCH_ARTWORKS_SUCCESS = "FETCH_SPACES_SUCCESS";

export const fetchArtworkSuccess = (artworks) => ({
  type: FETCH_ARTWORKS_SUCCESS,
  payload: artworks,
});

export const fetchArtworks = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/`);

    // console.log(response.data);

    console.log("RESPONSE FROM SERVER", response.data.artworks);
    dispatch(fetchArtworkSuccess(response.data.artworks));
  };
};
