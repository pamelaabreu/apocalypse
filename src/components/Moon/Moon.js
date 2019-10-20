import React from "react";
import "./Moon.css";

const Moon = ({ numOfGuesses }) => {
  return <div className={"moon moon-" + numOfGuesses}></div>;
};

export default Moon;
