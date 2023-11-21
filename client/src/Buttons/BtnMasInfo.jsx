import React from "react";
import { Link } from "react-router-dom";

const BtnMasInfo = ({id}) => {
  return (
    <div>
        <Link to={`/home/${id}`} >
      <button>ver más</button>
      </Link>
    </div>
  );
};

export default BtnMasInfo;
