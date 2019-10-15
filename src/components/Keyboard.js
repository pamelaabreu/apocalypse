import React from "react";

const Keyboard = ({
  keyboardLetters,
  keyboardLettersKeys,
  letterInputClick
}) => {
  return keyboardLettersKeys.map((letter, index) => {
    // Grab the incorrectLetter value from keyboard letters object
    const { incorrectLetter } = keyboardLetters[letter];

    return (
      <button
        key={index}
        disabled={incorrectLetter}
        onClick={letterInputClick}
        style={{
          margin: "5px",
          padding: "5px",
          border: "1px solid black",
          borderRadius: "100%",
          height: "30px",
          width: "30px",
          textAlign: "center"
        }}
      >
        <p>{letter.toLowerCase()}</p>
      </button>
    );
  });
};

export default Keyboard;
