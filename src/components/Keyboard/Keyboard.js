import React from "react";
import "./Keyboard.css";

const Keyboard = ({
  keyboardLetters,
  keyboardLettersKeys,
  letterInputClick
}) => {
  return keyboardLettersKeys.map((letter, index) => {
    // Grab the incorrectLetter value from keyboard letters object
    const { guessed, incorrect } = keyboardLetters[letter];
    const strikedStyle = incorrect ? " strikethrough " : "";
    const guessedStyle = guessed ? " keyboard-disabled-text " : "";

    return (
      <button
        key={index}
        disabled={guessed}
        onClick={letterInputClick}
        className={"keyboard-buttons whiteColor m-2" + strikedStyle + guessedStyle}
      >
        <p className="game-text">{letter.toLowerCase()}</p>
      </button>
    );
  });
};

export default Keyboard;
