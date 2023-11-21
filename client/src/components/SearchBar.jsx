import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "./index";

const SearchBar = ({ itemToDisplay }) => {
  /* -------------------------- Estados y constantes -------------------------- */
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [foundDrivers, setFoundDrivers] = useState([]);

  const handlerChange = (event) => {
    const value = event.target.value;
    setSearchName(value);

    const filteredrivers = getDriverByFilter(value);
    setFoundDrivers(filteredrivers);
  };

  /* -------------------------------------------------------------------------- */

  const allDrivers = useSelector((state) => state.getDriver);

  /* -------------------------------------------------------------------------- */

  const getDriverByFilter = (filter) => {
    filter = filter.trim().toLowerCase();
    if (!filter) {
      return foundDrivers;
    }
    return foundDrivers.filter((Drivers) => Drivers.name.toLowerCase().includes(filter));
  };
  const filteredDrivers = allDrivers.filter((driver) => {
    if (driver) {
      return driver.name.toLowerCase().includes(searchName.trim().toLowerCase());
    } else {
      return false;
    }
  });


  /* --------------------------------- Return --------------------------------- */
  return (
    <div>
      <input
        type="text"
        name="searchBar"
        placeholder="Buscar tu corredor"
        onChange={handlerChange}
        value={searchName}
      />
      <div>
      {searchName.length > 0 && (
        <h1>corredores encontrados: </h1>
      )}

        {searchName.length > 0 && filteredDrivers.map((drivers, index) => (
          <Card
            key={index}
            id={drivers.id}
            name={drivers.name}
            description={drivers.description}
            image={drivers.image}
            nationality={drivers.nationality}
            teams={
              Array.isArray(drivers.Teams)
                ? drivers.Teams.map((t, index) => <li key={index}>{t.name}</li>)
                : drivers.teams
            }
          />
        ))}
  
      </div>


      {searchName.length > 0 && (
        <h1>Puedes seguir Mirando: </h1>
      )}
     </div>
  );
};

export default SearchBar;