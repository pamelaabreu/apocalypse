import React from "react";

const Keyboard = ({
  keyboardLetters,
  keyboardLettersKeys,
  letterInputClick
}) => {
  return keyboardLettersKeys.map((letter, index) => {
    // Grab the incorrectLetter value from keyboard letters object
    const { guessed } = keyboardLetters[letter];
    const strikedStyle = guessed ? " strikethrough " : "";

    return (
      <button
        key={index}
        disabled={guessed}
        onClick={letterInputClick}
        className={"whiteColor m-2" + strikedStyle}
        style={{
          border: "none",
          height: "30px",
          width: "30px",
          textAlign: "center",
          background: "none"
        }}
      >
        <p className="game-text">{letter.toLowerCase()}</p>
      </button>
    );
  });
};

export default Keyboard;
