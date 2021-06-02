import { FETCH_ARTWORKS_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTWORKS_SUCCESS:
      console.log(state);
      return [...action.payload];

    default:
      return state;
  }
};
