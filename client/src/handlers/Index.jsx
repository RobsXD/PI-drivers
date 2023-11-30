import { useState } from "react";

export const usePagination = (drivers) => {
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

  return {
    driversToDisplay,
    driversPerPage,
    prevPage,
    nextPage,
    paginaActual,
    totalPages,
  };
};

