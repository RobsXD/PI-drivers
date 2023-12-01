import React from "react";
import { Card } from "../index";
import Style from "./Cards.module.css";
import { usePagination } from "../../handlers/Index";

const Cards = ({ drivers }) => {
  /* -------------------------------------------------------------------------- */

  const pagination = usePagination(drivers);

  return (
    <>
    
      <button
        onClick={pagination?.prevPage}
        disabled={pagination?.paginaActual === 1}
      >
        Pagina Anterior
      </button>
      Página {pagination?.paginaActual} de {pagination?.totalPages}
      <button
        onClick={pagination?.nextPage}
        disabled={pagination?.paginaActual === pagination?.totalPages}
      >
        Página Siguiente
      </button>
      <div>
        {pagination?.driversToDisplay.map((drivers) => (
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
      <button
        onClick={pagination?.prevPage}
        disabled={pagination?.paginaActual === 1}
      >
        Página Anterior
      </button>
      Página {pagination?.paginaActual} de {pagination?.totalPages}
      <button
        onClick={pagination?.nextPage}
        disabled={pagination?.paginaActual === pagination?.totalPages}
      >
        Página Siguiente
      </button>
    </>
  );
};

export default Cards;
