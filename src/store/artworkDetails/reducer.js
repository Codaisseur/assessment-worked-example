import {
  ARTWORK_DETAILS_FETCHED,
  HEARTS_UPDATED,
  BID_POST_SUCCESS,
  ARTWORK_POST_SUCCESS,
} from "./actions";

const initialState = {
  bids: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ARTWORK_DETAILS_FETCHED:
      return { ...state, ...payload };
    case HEARTS_UPDATED:
      return { ...state, ...payload };
    case BID_POST_SUCCESS:
      return { ...state, bids: [...state.bids, payload] };

    case ARTWORK_POST_SUCCESS:
      return { ...state, ...payload };
    default:
      return state;
  }
};
