import { ARTWORK_DETAILS_FETCHED, HEARTS_UPDATED } from "./actions";

const initialState = {
  bids: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTWORK_DETAILS_FETCHED:
      return { ...state, ...payload };
    case HEARTS_UPDATED:
      return { ...state, ...payload };
    default:
      return state;
  }
};
