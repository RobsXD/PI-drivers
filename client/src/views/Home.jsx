import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cards, SearchBar } from "../components/index";
import { BtnForm } from "../Buttons/index";

const Home = () => {
  /* ------------------------------ UseSelectors ------------------------------ */
  const allDrivers = useSelector((state) => state.getDriver);
  const ascDrivers = useSelector((state) => state.getAsc);
  const descDrivers = useSelector((state) => state.getDesc);
  const getBirthDate = useSelector((state) => state.getBirthDate);

  let drivers = { allDrivers };
  console.log(drivers.allDrivers);
  /* -------------------------------------------------------------------------- */
  /* --------------------------------- Estados -------------------------------- */
  const [order, setOrder] = useState(true);
  const [buttonAPI, setButtonAPI] = useState(false);
  const [buttonBDD, setButtonBDD] = useState(false);
  const [Birth, setBirth] = useState(false);

  const [filterTeams, setFilterTeams] = useState({
    temperament: [],
  });
  /* -------------------------------------------------------------------------- */
  /* ------------ Se encarga de pasarle la info al componente Cards ----------- */
  let textoCambiante = "ordenar z-a";

  if (order) {
    drivers = ascDrivers;
    textoCambiante = "ordenar a-z";
  } else {
    drivers = descDrivers;
    textoCambiante = "ordenar z-a";
  }

  /* -------------------------------------------------------------------------- */
  /* -------------------------------- Handlers -------------------------------- */

  const handlerClick = () => {
    setOrder((order) => !order);
  };

  const handlerBirthClick = () => {
    setBirth((Birth) => !Birth);
  };

  const handlerAPIButtonClick = () => {
    setButtonAPI((buttonAPI) => !buttonAPI);
  };

  const handlerBDDButtonClick = () => {
    setButtonBDD((buttonBDD) => !buttonBDD);
  };

  const handlerMultiSelect = (selectedOptions, { name }) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFilterTemperament({ ...filterTemperament, [name]: selectedValues });
  };
  /* -------------------------------------------------------------------------- */
  /* --------------------------------- return --------------------------------- */
  return (
    <div>
      <BtnForm />
      <SearchBar />
      <button onClick={handlerClick}>{textoCambiante}</button>
      <button onClick={handlerBirthClick}>
        Filtrar por fecha de nacimiento
      </button>
      <Cards drivers={drivers} />
    </div>
  );
};

export default Home;
