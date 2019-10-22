import React from "react";

const NumGuessMessage = ({ numOfGuesses }) => {
  const guessMessages = {
    6: "You have six guesses before losing.🤞",
    5: "Ya goochi 💁",
    4: "No stress boo u got this💅💅",
    3: "NO CAP 🚫🧢",
    2: "oh noes 😬",
    1: "The world's on fire but everything is fine! 💩💩🤡🤡"
  };

  return <p className="whiteColor game-text">{guessMessages[numOfGuesses]}</p>;
};

export default NumGuessMessage;
