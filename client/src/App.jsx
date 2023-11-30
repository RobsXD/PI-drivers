import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Detail, Home, Landing, Form } from "./views/index";
import { useEffect } from "react";
import {
  getDriver,
  getTeams,
  getAsc,
  getDesc,
  getBirthDate,
  getAPI,
  getBDD,
} from "./Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDriver());
    dispatch(getTeams());
    dispatch(getAsc());
    dispatch(getDesc());
    dispatch(getBirthDate());
    dispatch(getAPI());
    dispatch(getBDD());
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/home/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
