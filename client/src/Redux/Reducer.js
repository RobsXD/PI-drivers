import {
  GET_DRIVERS,
  GET_TEAMS,
  GET_BY_ID,
  GET_ASC,
  GET_DESC,
} from "./Actions";

let initialState = {
  getDriver: [],
  getById: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DRIVERS:
      return {
        ...state,
        getDriver: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        getById: action.payload,
      };
    case GET_TEAMS:
      return {
        ...state,
        getTeams: action.payload,
      };

    default:
      return state;
  }
}
export default rootReducer;
