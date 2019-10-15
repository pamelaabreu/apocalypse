import React, { useState } from "react";
import "./App.css";

function App() {
  // const [secretWord] = useState();
  const [guessWord] = useState("_ _ _ _ _");
  const [numOfGuesses] = useState(6);
  const [keyboardLetters] = useState();
  // Extra feature ~ track cpu and user scores
  // const [cpuScore] = useState();
  // const [userScore] = useState();

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
            <p>keyboard {keyboardLetters}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
