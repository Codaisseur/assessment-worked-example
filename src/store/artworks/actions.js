import { apiUrl } from "../../config/constants";
import axios from "axios";

export const FETCH_ARTWORKS_SUCCESS = "FETCH_ARTWORKS_SUCCESS";

export const fetchArtworkSuccess = (artworks) => ({
  type: FETCH_ARTWORKS_SUCCESS,
  payload: artworks,
});

export const fetchArtworks = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/artworks`);

    // console.log(response.data);

    console.log("RESPONSE FROM SERVER", response.data.artworks[1].hearts);
    dispatch(fetchArtworkSuccess(response.data.artworks));
  };
};
