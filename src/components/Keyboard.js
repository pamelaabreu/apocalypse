import React from "react";

const Keyboard = ({
  keyboardLetters,
  keyboardLettersKeys,
  letterInputClick
}) => {
  return keyboardLettersKeys.map((letter, index) => {
    // Grab the incorrectLetter value from keyboard letters object
    const { guessed, incorrect } = keyboardLetters[letter];
    const incorrectStyle = incorrect ? "red" : "black";

    return (
      <button
        key={index}
        disabled={guessed}
        onClick={letterInputClick}
        style={{
          margin: "5px",
          padding: "5px",
          border: "1px solid black",
          borderRadius: "100%",
          height: "30px",
          width: "30px",
          textAlign: "center",
          color: incorrectStyle
        }}
      >
        <p>{letter.toLowerCase()}</p>
      </button>
    );
  });
};

export default Keyboard;
