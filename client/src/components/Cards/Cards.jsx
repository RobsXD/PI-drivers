import React from "react";
import { Card } from "../index";
import Style from "./Cards.module.css";
import { useState } from "react";
import { SearchBar } from "../Handlers";

const Cards = ({ drivers }) => {
  /* -------------------------------------------------------------------------- */

  const driversPerPage = 9;

  const [paginaActual, setPaginaActual] = useState(1);
  const totalPages = Math.ceil(drivers.length / driversPerPage);

  const startIndex = (paginaActual - 1) * driversPerPage;
  const endIndex = startIndex + driversPerPage;

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPaginaActual(pageNumber);
    }
  };

  const prevPage = () => {
    goToPage(paginaActual - 1);
  };

  const nextPage = () => {
    goToPage(paginaActual + 1);
  };
  const driversToDisplay = Array.from(drivers).slice(startIndex, endIndex);

  return (
    <>
      <div className={Style.cardList}>
        {driversToDisplay.map((drivers) => (
          <Card
            key={drivers.id}
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
      <button onClick={prevPage} disabled={paginaActual === 1}>
        Página Anterior
      </button>
      Página {paginaActual} de {totalPages}
      <button onClick={nextPage} disabled={paginaActual === totalPages}>
        Página Siguiente
      </button>
    </>
  );
};

export default Cards;
