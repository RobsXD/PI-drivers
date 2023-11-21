import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cards } from "../components/index";
import { BtnForm } from "../Buttons/index";

const Home = () => {

 const drivers = useSelector((state) => state.getDriver);

  return(
    <div>
      <BtnForm />
     <Cards drivers={drivers}/>
    </div>
  );
};

export default Home;
