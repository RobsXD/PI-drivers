import axios from "axios";

export const GET_DRIVERS = "GET_DRIVERS";
export const GET_TEAMS = "GET_TEAMS";
export const GET_BY_ID = "GET_BY_ID";
export const GET_ASC = "GET_ASC";
export const GET_DESC = "GET_DESC";
export const GET_BIRTHDATE = "GET_BIRTHDATE";
export const GET_BDD = "GET_BDD";
export const GET_API = "GET_API";
export const POST_DRIVER = "POST_DRIVER"

export function getDriver() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/drivers`);

      return dispatch({
        type: "GET_DRIVERS",
        payload: response.data,
      });
    } catch (error) {
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
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export function getAsc() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/drivers`);
      const data = response.data;

      const sortedData = data.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        // Utilizar localeCompare para comparar las cadenas
        return nameA.localeCompare(nameB, "es", { sensitivity: "base" });
      });

      return dispatch({
        type: "GET_ASC",
        payload: sortedData,
      });
    } catch (error) {
    }
  };
}

export function getDesc() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/drivers`);
      const data = response.data;

      const sortedData = data.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        // Utilizar localeCompare para comparar las cadenas
        return nameB.localeCompare(nameA, "es", { sensitivity: "base" });
      });

      return dispatch({
        type: "GET_DESC",
        payload: sortedData,
      });
    } catch (error) {
    }
  };
}

export function getBirthDate() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/drivers`);
      const data = response.data;

      const sortedData = data.sort((a, b) => {
        const dateA = a.birthdate;
        const dateB = b.birthdate;

        return dateA.localeCompare(dateB, undefined, { numeric: true });
      });

      return dispatch({
        type: "GET_BIRTHDATE",
        payload: sortedData,
      });
    } catch (error) {}
  };
}

export function getBDD() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/drivers`);
      const data = response.data;

      function isUUID(value) {
        const uuidPattern =
          /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        return uuidPattern.test(value);
      }
      const BDDData = data.filter((BDD) => isUUID(BDD.id));

      return dispatch({
        type: "GET_BDD",
        payload: BDDData,
      });
    } catch (error) {
      alert(
        "lo sentimos, tuvimos un problema al cargar los datos, en breves momentos los arreglaremos, lamentamos los inconvenientes"
      );
      
    }
  };
}

export function getAPI() {
  return async function (dispatch) {
    try {
      function isNumber(value) {
        return !isNaN(value);
      }

      const response = await axios(`http://localhost:3001/drivers`);
      const data = response.data;

      const APIData = data.filter((api) => isNumber(api.id));
      return dispatch({
        type: "GET_API",
        payload: APIData,
      });
    } catch (error) {
    }
  };
}


    export function postDriver(body) {
      return async function (dispatch){

        try {

          const post = axios.post(`http://localhost:3001/create`)

          if (response.status === 201) {

            return dispatch ({
              type: "POST_DRIVER",
              payload: post,
            })
            alert("el corredor fue creado con exito")

          }

         
        } catch (error) {
           alert("Hubo un error, estamos tratando de solucionarlo")
        }
      }
    }