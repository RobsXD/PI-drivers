import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Cards, SearchBar } from "../components/index";
import { BtnForm } from "../Buttons/index";
import Select from "react-select";
import Styles from "./Form/Form.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  /* ------------------------------ UseSelectors ------------------------------ */
  const allDrivers = useSelector((state) => state.getDriver);
  const ascDrivers = useSelector((state) => state.getAsc);
  const descDrivers = useSelector((state) => state.getDesc);
  const getBirthDate = useSelector((state) => state.getBirthDate);
  const getAPI = useSelector((state) => state.getAPI);
  const getBDD = useSelector((state) => state.getBDD);
  const teams = useSelector((state) => state.getTeams);

  /* -------------------------------------------------------------------------- */
  /* --------------------------------- Estados -------------------------------- */
  const [orderasc, setOrderasc] = useState(false);
  const [orderdesc, setOrderdesc] = useState(false);
  const [buttonAPI, setButtonAPI] = useState(false);
  const [buttonBDD, setButtonBDD] = useState(false);
  const [Birth, setBirth] = useState(false);
  const [multiDriver, setMultiDriver] = useState({
    teams: [],
  });

  /* -------------------------------------------------------------------------- */
  /* ------------ Se encarga de pasarle la info al componente Cards ----------- */
  let drivers = allDrivers;

  if (orderasc) {
    drivers = ascDrivers;
  }
  if (orderdesc) {
    drivers = descDrivers;
  }
  if (Birth) {
    drivers = getBirthDate;
  }
  if (buttonAPI) {
    if (buttonBDD === true) {
      setButtonBDD(false);
      drivers = getAPI;
    }
    drivers = getAPI;
  }
  if (buttonBDD) {
    if (buttonAPI === true) {
      setButtonAPI(false);
      drivers = getBDD;
    }

    drivers = getBDD;
  }
  if (multiDriver.teams.length > 0) {
    
    drivers = allDrivers.filter((driver) => {
      if (driver.teams) {
        if (Array.isArray(driver.teams)) {
          return multiDriver.teams.some((selectedTeams) =>
            driver.teams.includes(selectedTeams)
          );
        } else {
          const convertToArray = driver.teams
            .split(",")
            .map((team) => team.trim());

          return multiDriver.teams.some((selectedTeams) =>
            convertToArray.includes(selectedTeams)
          );
        }
      }
      return false;
    });
  }

  /* -------------------------------------------------------------------------- */
  /* -------------------------------- Handlers -------------------------------- */

  const handlerClick = (e) => {
    const name = e.target.name;

    switch (name) {
      case "orderasc":
        setOrderasc(!orderasc);
        break;
      case "orderdesc":
        setOrderdesc(!orderdesc);
        break;
      case "birthdate":
        setBirth(!Birth);
        break;
      case "api":
        setButtonAPI(!buttonAPI);
        break;
      case "bdd":
        setButtonBDD(!buttonBDD);
        break;

      default:
        break;
    }
  };

  const handlerMultiSelect = (selectedOptions, { name }) => {
    const options = selectedOptions.map((option) => option.value);

    setMultiDriver({ ...multiDriver, [name]: options });
  };
  /* -------------------------------------------------------------------------- */
  /* --------------------------------- return --------------------------------- */

  if (!teams) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <nav>
        <Link to="/">
          <button>Salir</button>
        </Link>
        <BtnForm />
        <SearchBar />
        <button name="orderdesc" onClick={handlerClick}>
          Ordenar de la z a la a
        </button>
        <button name="orderasc" onClick={handlerClick}>
          Ordenar de la a a la z
        </button>
        <button name="birthdate" onClick={handlerClick}>
          Filtrar por fecha de nacimiento
        </button>
        <button name="api" onClick={handlerClick}>
          Filtrar por API
        </button>
        <button name="bdd" onClick={handlerClick}>
          Filtrar por BDD
        </button>
        <hr />
        <Select
          isMulti
          name="teams"
          className={Styles.options}
          options={teams.map((team) => ({
            value: team,
            label: team,
          }))}
          onChange={handlerMultiSelect}
          placeholder="Filtrar por equipo"
        />
      </nav>
      <Cards drivers={drivers} />
    </div>
  );
};

export default Home;
