import React from "react";
import Spinner from 'react-bootstrap/Spinner';

const GuessWord = ({guessWord}) => {
    return <p style={{ padding: "30px" }}>{guessWord}</p>
};

export default GuessWord;