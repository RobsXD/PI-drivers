import React from "react";
import Style from "./Card.module.css";
import Casco_Not_found from "../../Img/Casco_Not_Found.jpeg";
import { BtnMasInfo } from "../../Buttons/index";
const Card = ({ id, name, description, image, nationality, teams }) => {


  return (
    <div className={Style.card}>
      <img
        className={Style.img}
        src={image}
        alt={name}
        onError={(e) => (e.currentTarget.src = Casco_Not_found)}
      />
      <span className={Style.name}>{name}</span>
    <span>teams: {teams} </span>
      <BtnMasInfo id={id} />
    </div>
  );
};

export default Card;
