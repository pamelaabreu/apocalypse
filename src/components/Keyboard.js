import React from "react";

const Keyboard = ({
  keyboardLetters,
  keyboardLettersKeys,
  letterInputClick
}) => {
  return keyboardLettersKeys.map((letter, index) => {
    // Grab the incorrectLetter value from keyboard letters object
    const { guessed } = keyboardLetters[letter];

    return (
      <button
        key={index}
        disabled={guessed}
        onClick={letterInputClick}
        className="whiteColor m-2"
        style={{
          border: "none",
          height: "30px",
          width:"30px",
          textAlign: "center",
          background: "none",
        }}
      >
        <p className="h4">{letter.toLowerCase()}</p>
      </button>
    );
  });
};

export default Keyboard;