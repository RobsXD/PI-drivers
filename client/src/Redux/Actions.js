import axios from "axios";

export const GET_DRIVERS = "GET_DRIVERS";
export const GET_TEAMS = "GET_TEAMS";
export const GET_BY_ID = "GET_BY_ID";
export const GET_ASC = "GET_ASC";
export const GET_DESC = "GET_DESC";

export function getDriver() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/drivers`);

      return dispatch({
        type: "GET_DRIVERS",
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export function getById(id) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/drivers/${id}`);

      return dispatch({
        type: "GET_BY_ID",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getTeams() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/teams`);

      return dispatch({
        type: "GET_TEAMS",
        payload: response.data,
      })
    } catch (error) {
      console.error(error);
    }
  }
}
