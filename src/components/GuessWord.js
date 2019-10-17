import React from "react";
import Spinner from "react-bootstrap/Spinner";

const GuessWord = ({ guessWord }) => {
  return guessWord.length === 0 ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <p style={{ padding: "30px" }}>{guessWord}</p>
  );
};

export default GuessWord;
