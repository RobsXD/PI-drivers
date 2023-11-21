import React, { useEffect } from "react";
import { BtnHome } from "../../Buttons/index";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getById } from "../../Redux/Actions";
import Style from "./Detail.module.css";
import NOT_FOUND from "../../Img/Casco_Not_Found.jpeg";

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getById(id));
  }, []);

  let driverId = useSelector((state) => state.getById);

  function isUUID(value) {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regex.test(value);
  }

  return (
    <div className={Style.card}>
      <h1>{driverId.name}</h1>
      <img
        className={Style.img}
        src={driverId.image}
        alt={driverId.name}
        onError={(e) => (e.currentTarget.src = NOT_FOUND)}
      />
      <p>
        Descripcion: 
        {driverId.description ? driverId.description : "Desconocido"}
      </p>

      <hr />

      <p>
        {driverId.nationality
          ? `Nationality: ${driverId.nationality}`
          : "Nationality: Desconocida"}
      </p>
      <hr />
      <p>
        
        date of birth: {driverId.birthdate ? driverId.birthdate : "Desconocido"}
      </p>
      <hr />
      <p>
        Teams: 
        {Array.isArray(driverId.Teams)
          ? driverId.Teams.map((t, index) => (<li key={index}>{t.name}</li>))
          : driverId.teams}
      </p>

      <hr />
      <BtnHome />
    </div>
  );
};

export default Detail;
