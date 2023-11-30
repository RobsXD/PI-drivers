import React, { useEffect } from "react";
import Select from "react-select";
import { useState } from "react";
import { getTeams } from "../../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Style from "./Form.module.css";
import { BtnHome } from "../../Buttons/index";
import {
  ValidateName,
  ValidateLastName,
  ValidateImage,
  ValidateDescription,
  validateNationality,
  validateBirthdate,
  ValidateTeams,
} from "./Validation";

const Form = () => {
  const dispatch = useDispatch();

  const succes = () => {
    window.alert("Driver created successfully");
  };

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const Teams = useSelector((state) => state.getTeams);
  const Post = useSelector((state) => state.postDrivers)

  const [error, setError] = useState({
    name: "",
    lastName: "",
    image: "",
    description: "",
    nationality: "",
    birthdate: "",
    teams: "",
  });

  const [driver, setDriver] = useState({
    name: "",
    lastName: "",
    image: "",
    description: "",
    nationality: "",
    birthdate: "",
    teams: [],
  });

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let validationError = {};

    if (name === "name") {
      validationError = ValidateName({ name: value });
    }
    if (name === "lastName") {
      validationError = ValidateLastName({ lastName: value });
    }
    if (name === "image") {
      validationError = ValidateImage({ image: value });
    }
    if (name === "description") {
      validationError = ValidateDescription({ description: value });
    }
    if (name === "nationality") {
      validationError = validateNationality({ nationality: value });
    }
    if (name === "birthdate") {
      validationError = validateBirthdate({ birthdate: value });
    }
    if (name === "teams") {
      validationError = ValidateTeams({ teams: value });
    }

    setError({ ...error, [name]: validationError });

    setDriver({ ...driver, [name]: value });
  };

  const handlerMultiSelect = (selectedOptions, { name }) => {
    const options = selectedOptions.map((option) => option.value);

    setError({ ...error, [name]: ValidateTeams({ teams: options }) });
    setDriver({ ...driver, [name]: options });
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3001/create`, driver);
      if (response.status === 201) {
        succes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!Teams) {
    return <>Cargando...</>;
  }

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <h1>Crea a tu corredor:</h1>

        <label> Nombre: </label>
        <input
          id="name"
          name="name"
          value={driver.name}
          onChange={handlerChange}
        />
        {error.name ? (
          <p style={{ color: "red", fontSize: "10px" }}>{error.name}</p>
        ) : null}
        <hr />

        <label>Apellido: </label>
        <input
          id="lastName"
          name="lastName"
          value={driver.lastName}
          onChange={handlerChange}
        />
        {error.lastName ? (
          <p style={{ color: "red", fontSize: "10px" }}>{error.lastName}</p>
        ) : null}
        <hr />

        <label> Imagen de referencia: </label>
        <input
          id="image"
          name="image"
          value={driver.image}
          onChange={handlerChange}
        />
        {error.image ? (
          <p style={{ color: "red", fontSize: "10px" }}>{error.image}</p>
        ) : null}
        <hr />

        <label> Descripcion: </label>
        <textarea
          id="description"
          name="description"
          value={driver.description}
          onChange={handlerChange}
        />
        {error.description ? (
          <p style={{ color: "red", fontSize: "10px" }}>{error.description}</p>
        ) : null}
        <hr />

        <label> Nacionalidad: </label>
        <input
          id="nationality"
          name="nationality"
          value={driver.nationality}
          onChange={handlerChange}
        />
        {error.nationality ? (
          <p style={{ color: "red", fontSize: "10px" }}>{error.nationality}</p>
        ) : null}
        <hr />

        <label> Fecha de nacimiento: </label>
        <input
          id="birthdate"
          name="birthdate"
          value={driver.birthdate}
          type="date"
          onChange={handlerChange}
        />
        {error.birthdate ? (
          <p style={{ color: "red", fontSize: "10px" }}>{error.birthdate}</p>
        ) : null}
        <hr />

        <label> Equipos: </label>
        <Select
          isMulti
          id="teams"
          name="teams"
          placeholder="Selecciona los equipos para tu corredor"
          className={Style.options}
          onChange={handlerMultiSelect}
          options={Teams.map((team) => ({
            value: team,
            label: team,
          }))}
        />
        {error.teams ? (
          <p style={{ color: "red", fontSize: "10px" }}>{error.teams}</p>
        ) : null}

        <button
          type="submit"
          onClick={handlerSubmit}
          disabled={
            error.name ||
            error.lastName ||
            error.image ||
            error.description ||
            error.nationality ||
            error.birthdate ||
            error.teams ||
            !driver.name ||
            !driver.lastName ||
            !driver.image ||
            !driver.description ||
            !driver.nationality ||
            !driver.birthdate ||
            !driver.teams
          }
        >
          Crear
        </button>
      </form>
      <BtnHome />
    </div>
  );
};

export default Form;
