import React, { useState, useEffect } from "react";

// Utils
import { getRandomSecretWord, createGuessWord } from "./utils/wordUtils";

// Components
import Keyboard from "./components/Keyboard";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [guessWord, setGuessWord] = useState("_ _ _ _ _");
  const [numOfGuesses, setNumOfGuesses] = useState(6);
  const [keyboardLetters, setKeyboardLetters] = useState({
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

  const letterInputClick = e => {
    // Grab the inner text from the button clicked
    const letter = e.target.innerText.toLowerCase();

    // Conditional to check if secret word has the user's guessed letter
    if (secretWord.toLowerCase().includes(letter)) {
      // Replace the guess word with all the occurances of the guessed letter
      const newGuessWord = guessWord
        .split(" ")
        .map((guessWordLetter, index) => {
          const secretWordLetter = secretWord[index].toLowerCase();

          if (secretWordLetter === letter)
            return secretWord.length - 1 === index
              ? secretWordLetter
              : secretWordLetter + " ";
          else
            return secretWord.length - 1 === index
              ? guessWordLetter
              : guessWordLetter + " ";
        })
        .join("");

      // Update the guess word
      setGuessWord(newGuessWord);

      // Created guess word without the spaces
      const newGuessWordWithoutSpace = newGuessWord.split(" ").join("");

      // Conditional to check if user won the game
      if (newGuessWordWithoutSpace.toLowerCase() === secretWord.toLowerCase()) {
        console.log("Ya Win! Start New Game?");
        // Start new game
        // Reset state values ~ numOfGuesses, secretWord, keyboardLetters
      }
    } else {
      // Detract one guess from the number of guesses
      const detractNumOfGuesses = numOfGuesses - 1;

      // Conditional to check if the user lost the game
      if (detractNumOfGuesses === 0) {
        // Update number of guesses
        setNumOfGuesses(detractNumOfGuesses);

        console.log("Ya Lose! Start New Game?");

        // Start new game
        // Reset state values ~ numOfGuesses, secretWord, keyboardLetters
      } else {
        // Create a copy of the keyboard letter object
        const copiedKeyboard = { ...keyboardLetters };

        // Update copied keyboard to have incorrect letter
        copiedKeyboard[letter].incorrectLetter = true;

        // Update keyboard letters
        setKeyboardLetters(copiedKeyboard);

        // Update number of guesses
        setNumOfGuesses(detractNumOfGuesses);
      }
    }
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
        style={{ border: "1px solid rebeccapurple", margin: "100px 25% 0 25%" }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ padding: "30px" }}>{guessWord}</p>
          <div
            style={{
              border: "1px solid blue",
              margin: "0 10% 40px 10%",
              padding: "10px"
            }}
          >
            <p>keyboard</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              <Keyboard
                keyboardLetters={keyboardLetters}
                letterInputClick={letterInputClick}
                keyboardLettersKeys={Object.keys(keyboardLetters)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
