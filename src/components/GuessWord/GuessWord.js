import React from "react";
import Spinner from "react-bootstrap/Spinner";

const GuessWord = ({ guessWord }) => {
  return guessWord.length === 0 ? (
    <Spinner animation="border" role="status" variant="light">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <p className="whiteColor game-text text-center">{guessWord}</p>
  );
};

export default GuessWord;
