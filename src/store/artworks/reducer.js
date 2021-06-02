import { FETCH_ARTWORKS_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTWORKS_SUCCESS:
      return [...state, ...action.payload];
    // case SPACE_UPDATED: {
    //   return state.map(space => {
    //     if (space.id !== action.payload.id) {
    //       return space;
    //     }

    //     return { ...action.payload, stories: [...space.stories] };
    //   });
    // }
    default:
      return state;
  }
};
