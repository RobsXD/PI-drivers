import React, { useEffect, useState } from "react";

export const SearchBar = (drivers) => {
  const [searchName, setSearchName] = useState("");
  const [foundDriver, setFoundDriver] = useState(drivers);

  const getdriversByFilter = (filter) => {
    filter = filter.trim().toLowerCase();
    if (!filter) {
      return foundDriver;
    }
    const driverFounded = foundDriver.filter((drivers) =>
      drivers.name.toLowerCase().includes(filter)
    );
  };

  return searchName;
};
