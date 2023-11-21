import React from 'react'
import { useState } from 'react';
import { Card } from './index';
const SearchBar = ({drivers}) => {

  /* -------------------------- Estados y constantes -------------------------- */
  const [driversFiltrados, setDriversFiltrados] = useState();

  const handlerFiltrarDrivers = () => {
    const driversFiltrados = getdriversByFilter();

    setDriversFiltrados(driversFiltrados);
  };
/* -------------------------------------------------------------------------- */



const getdriversByFilter = (filter) => {
  filter = filter.trim().toLowerCase();
  if (!filter) {
    return foundDriver;
  }
  return foundDriver.filter((drivers) => drivers.name.toLowerCase().includes(filter));
};

const filteredDrivers = driversToDisplay.filter((driver) => {
  if (driver) {
    return driver.name.toLowerCase().includes(searchName.trim().toLowerCase());
  } else {
    return false;
  }
});
/* -------------------------------------------------------------------------- */

return (
  <div>
    <input
      type="text"
      name="searchBar"
      placeholder="Buscar tu perro"
      onChange={handlerChange}
      value={searchName}
    />
    <div>
      {searchName.length > 0 && driversToDisplay.map((driver, index) => (
        <Card
          key={index}
          id={driver.id}
          name={driver.name}
          image={driver.image}
          temperament={driver.temperament}
          weight={driver.weight}
        />
      ))}
    </div>
   </div>
);
};

export default SearchBar