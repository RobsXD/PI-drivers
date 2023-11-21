import React from "react";
import { Link } from "react-router-dom";

const BtnForm = () => {
  return (
    <div>
      <Link to="/create">
        {" "}
        <button>
          Crear nuevo corredor
        </button>
      </Link>
    </div>
  );
};

export default BtnForm;
