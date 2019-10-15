import React, { useState, useEffect } from "react";
import "./App.css";

// Utils
import { getRandomSecretWord, createGuessWord } from "./utils/wordUtils";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [guessWord, setGuessWord] = useState("_ _ _ _ _");
  const [numOfGuesses] = useState(6);
  const [keyboardLetters] = useState({
    a: { incorrectLetter: false },
    b: { incorrectLetter: false },
    c: { incorrectLetter: false },
    d: { incorrectLetter: false },
    e: { incorrectLetter: false },
    f: { incorrectLetter: false },
    g: { incorrectLetter: false },
    h: { incorrectLetter: false },
    i: { incorrectLetter: false },
    j: { incorrectLetter: false },
    k: { incorrectLetter: false },
    l: { incorrectLetter: false },
    m: { incorrectLetter: false },
    n: { incorrectLetter: false },
    o: { incorrectLetter: false },
    p: { incorrectLetter: false },
    q: { incorrectLetter: false },
    r: { incorrectLetter: false },
    s: { incorrectLetter: false },
    t: { incorrectLetter: false },
    u: { incorrectLetter: false },
    v: { incorrectLetter: false },
    w: { incorrectLetter: false },
    x: { incorrectLetter: false },
    y: { incorrectLetter: false },
    z: { incorrectLetter: false }
  });
  // Extra feature ~ track cpu and user scores
  // const [cpuScore] = useState();
  // const [userScore] = useState();

  // On Component Did Mount
  useEffect(() => {
    // Set secretWord and guessWord
    const getRandomWordAndGuessWord = async () => {
      const randomWord = await getRandomSecretWord();
      
      const newGuessWord = await createGuessWord(randomWord);

      setSecretWord(randomWord);
      setGuessWord(newGuessWord);
    };

    getRandomWordAndGuessWord();
  }, []);

  const keyboardLetterRender = () => {
    const keyboardLettersKeys = Object.keys(keyboardLetters);

    return keyboardLettersKeys.map((el, index) => (
      <p key={index}>{el.toUpperCase()}</p>
    ));
  };

  return (
    <div
      style={{
        height: "90vh",
        border: "1px solid black",
        marginTop: "10px",
        marginLeft: "25%",
        marginRight: "25%"
      }}
    >
      <h1 style={{ margin: "20px 25% 0 25%" }}>Apocalypse</h1>
      <div style={{ margin: "20px 25% 0 25%" }}>
        <p>Scoreboard</p>
        <p>{numOfGuesses} Guesses</p>
      </div>
      <div style={{ border: "1px solid red", margin: "20px 25% 0 25%" }}>
        <p>game image rendering goes here</p>
      </div>
      <div
        style={{ border: "1px solid rebeccapurple", margin: "25% 25% 25% 25%" }}
      >
        <div>
          <p style={{ padding: "20px" }}>{guessWord}</p>
          <div
            style={{
              border: "1px solid blue",
              margin: "20px",
              padding: "20px"
            }}
          >
            <p>keyboard</p>
            <div style={{ display: "flex" }}>{keyboardLetterRender()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
