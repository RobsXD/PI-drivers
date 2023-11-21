import {
  GET_DRIVERS,
  GET_TEAMS,
  GET_BY_ID,
  GET_ASC,
  GET_DESC,
  GET_BIRTHDATE,
} from "./Actions";

let initialState = {
  getDriver: [],
  getById: [],
  getAsc: [],
  getDesc: [],
  getBirthDate: [],
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

      case GET_ASC:
        return {
          ...state,
          getAsc: action.payload,
        }

      case GET_DESC: {
        return {
          ...state,
          getDesc: action.payload,
        };
      }

      case GET_BIRTHDATE: {
        return {
          ...state,
          getBirthDate: action.payload,
        };
      }
    default:
      return state;
  }
}
export default rootReducer;
