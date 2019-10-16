import React, { useState, useEffect } from "react";

// Assets
import keyboardTemplate from "./assets/keyboardTemplate";

// Utils
import { getRandomSecretWord, createGuessWord } from "./utils/wordUtils";

// Components
import Keyboard from "./components/Keyboard";
import StartNewGameModal from "./components/Modal";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [guessWord, setGuessWord] = useState("_ _ _ _ _");
  const [numOfGuesses, setNumOfGuesses] = useState(6);
  const [keyboardLetters, setKeyboardLetters] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [userWon, setUserWon] = useState(false);
  // Extra feature ~ track cpu and user scores
  // const [cpuScore] = useState();
  // const [userScore] = useState();

  // On Component Did Mount
  useEffect(() => {
    // Set secretWord and guessWord
    getSecretWordAndGuessWord();
    // Set keyboard letters
    setKeyboardLetters(keyboardTemplate);
  }, []);

  const replaceLetterOccurances = (secretWord, guessWord, letter) => {
    // Split string
    const guessWordArray = guessWord.split(" ");

    // New guess word array with occurances of letter
    const convertedGuessWordArray = guessWordArray.map(
      (guessWordLetter, index) => {
        // Get each letter from the secret word
        const secretWordLetter = secretWord[index].toLowerCase();

        // Conditional to replace underscore with matching letter
        if (secretWordLetter === letter)
          return secretWord.length - 1 === index
            ? secretWordLetter
            : secretWordLetter + " ";
        else
          return secretWord.length - 1 === index
            ? guessWordLetter
            : guessWordLetter + " ";
      }
    );

    // Guess word string with occurances
    const newGuessWord = convertedGuessWordArray.join("");

    return newGuessWord;
  };

  const userWonGame = guessWordWithoutSpace => {
    // Conditional to check if user won the game
    if (guessWordWithoutSpace.toLowerCase() === secretWord.toLowerCase()) {
      // Start new game ~ show modal
      setModalShow(true);
      setUserWon(true);
    }
  };

  const userLostGame = (numGuesses, letter) => {
    // Conditional to check if the user lost the game
      if (numGuesses === 0) {
        // Start new game - show modal
        setModalShow(true);
        setUserWon(false);
        setNumOfGuesses(numGuesses);
      } else {
        // Create a copy of the keyboard letter object
        const copiedKeyboard = { ...keyboardLetters };

        // Update copied keyboard to have incorrect letter
        copiedKeyboard[letter].incorrectLetter = true;

        // Update keyboard letters
        setKeyboardLetters(copiedKeyboard);

        // Update number of guesses
        setNumOfGuesses(numGuesses);
      }
  };

  const letterInputClick = e => {
    // Grab the inner text from the button clicked
    const letter = e.target.innerText.toLowerCase();

    // Conditional to check if secret word has the user's guessed letter
    if (secretWord.toLowerCase().includes(letter)) {
      // Replace the guess word with all the occurances of the guessed letter
      const newGuessWord = replaceLetterOccurances(
        secretWord,
        guessWord,
        letter
      );

      // Update the guess word
      setGuessWord(newGuessWord);

      // Create guess word without the spaces
      const newGuessWordWithoutSpace = newGuessWord.split(" ").join("");

      // Check if user won the game
      userWonGame(newGuessWordWithoutSpace);
      
    } else {
      // Detract one guess from the number of guesses
      const detractNumOfGuesses = numOfGuesses - 1;

      // Check if user lost game
      userLostGame(detractNumOfGuesses, letter);
    }
  };

  const getSecretWordAndGuessWord = async () => {
    const randomWord = await getRandomSecretWord();

    const newGuessWord = await createGuessWord(randomWord);

    setSecretWord(randomWord);
    setGuessWord(newGuessWord);
  };

  const resetGame = () => {
    // Hide Modal
    setModalShow(false);
    console.log(keyboardTemplate)
    // Reset state values for new game
    setUserWon(false);
    setNumOfGuesses(6);
    setKeyboardLetters(keyboardTemplate);
    getSecretWordAndGuessWord();
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
      <StartNewGameModal
        show={modalShow}
        secretWord={secretWord}
        userWon={userWon}
        onHide={resetGame}
      />

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
