import React, { useState, useEffect } from "react";

// Assets
import keyboardTemplate from "./assets/keyboardTemplate";

// Utils
import { getRandomSecretWord, createGuessWord } from "./utils/wordUtils";
import { getScores, addScores } from "./utils/scoreboardLocalStorage";

// Components
import Keyboard from "./components/Keyboard/Keyboard";
import StartNewGameModal from "./components/Modal/Modal";
import GuessWord from "./components/GuessWord/GuessWord";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Moon from "./components/Moon/Moon";
import NumGuessMessage from "./components/NumGuessMessages/NumGuessMessage";

function App() {
  const [secretWord, setSecretWord] = useState("");
  const [guessWord, setGuessWord] = useState("");
  const [numOfGuesses, setNumOfGuesses] = useState(6);
  const [keyboardLetters, setKeyboardLetters] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [userWon, setUserWon] = useState(false);
  const [cpuScore, setCpuScore] = useState(0);
  const [userScore, setUserScore] = useState(0);

  // On Component Did Mount
  useEffect(() => {
    // Create a deep copy of keyboard object
    const copiedKeyboardTemplate = JSON.parse(JSON.stringify(keyboardTemplate));

    // Set secretWord and guessWord
    getSecretWordAndGuessWord();
    // Set keyboard letters
    setKeyboardLetters(copiedKeyboardTemplate);

    // Set scores
    const { userScore, cpuScore } = getScores();
    setUserScore(userScore);
    setCpuScore(cpuScore);
  }, []);

  // Save user/cpu scores to Local Storage
  useEffect(() => {
    if (cpuScore > 0 || userScore > 0) {
      addScores(userScore, cpuScore);
    }
  }, [cpuScore, userScore]);

  // Set state values for the secret word and guess word
  const getSecretWordAndGuessWord = async () => {
    const randomWord = await getRandomSecretWord();

    const newGuessWord = createGuessWord(randomWord);

    setSecretWord(randomWord);
    setGuessWord(newGuessWord);
  };

  // When user clicks on a letter
  const letterInputClick = e => {
    // Grab the inner text from the button clicked
    const letter = e.target.innerText.toLowerCase();

    // Update keyboard to have guessed letter
    updateKeyboardWithGuessedLetter(letter);

    // Check to see if user will win
    willUserWin(letter);
  };

  // Set state to the keyboard object when a letter is guessed
  const updateKeyboardWithGuessedLetter = letter => {
    // Create a copy of the keyboard letter object
    const copiedKeyboard = { ...keyboardLetters };

    // Update the guessed key value
    copiedKeyboard[letter].guessed = true;

    // Also check if guessed letter is incorrect
    if (!checkLetterInWord(letter, secretWord)) {
      // Update the incorrect key value
      copiedKeyboard[letter].incorrect = true;
    }

    // Update keyboard letters
    setKeyboardLetters(copiedKeyboard);
  };

  // Check if the user will win
  const willUserWin = letter => {
    // Conditional to check if secret word has the user's guessed letter
    if (checkLetterInWord(letter, secretWord)) {
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

  // Determine if a letter is found inside of the word
  const checkLetterInWord = (letter, word) =>
    word.toLowerCase().includes(letter.toLowerCase());

  // Update the guess word with the guessed letter occurance
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

  // Functionality for when user wins game
  const userWonGame = guessWordWithoutSpace => {
    // Conditional to check if user won the game
    if (guessWordWithoutSpace.toLowerCase() === secretWord.toLowerCase()) {
      // Update user/cpu points
      updateScores(true);

      // Start new game ~ show modal
      setModalShow(true);
      setUserWon(true);
    }
  };

  // Functionality for when user loses game
  const userLostGame = numGuesses => {
    // Conditional to check if the user lost the game
    if (numGuesses === 0) {
      // Update user/cpu points
      updateScores(false);

      // Start new game - show modal
      setModalShow(true);
      setUserWon(false);
      setNumOfGuesses(numGuesses);
    } else {
      // Update number of guesses
      setNumOfGuesses(numGuesses);
    }
  };

  // Functionality to update the scoreboard for the user/cpu
  const updateScores = status => {
    // Conditional render to check if user won or lost
    // Status returns true -> user won
    // Status returns false -> user lost

    if (status) {
      // Set user score
      setUserScore(userScore + 1);
    } else {
      // Set cpu scores
      setCpuScore(cpuScore + 1);
    }
  };

  // Functionality to start new game
  const resetGame = () => {
    // Create a deep copy of keyboard object
    const copiedKeyboardTemplate = JSON.parse(JSON.stringify(keyboardTemplate));

    // Hide Modal
    setModalShow(false);

    // Reset state values for new game
    setUserWon(false);
    setNumOfGuesses(6);
    setKeyboardLetters(copiedKeyboardTemplate);
    getSecretWordAndGuessWord();
  };

  return (
    <main className={"min-vh-100 p-3 background-" + numOfGuesses}>
      {/* <-- If user wins/lose this modal will pop up --> */}
      <StartNewGameModal
        show={modalShow}
        secretWord={secretWord}
        userWon={userWon}
        onHide={resetGame}
        cpuScore={cpuScore}
        userScore={userScore}
      />
      <div className="container-fluid">
        {/* <-- First Row: Scoreboard, Number of Guesses, and Guess Level Message --> */}
        <div className="headerGrid mb-3">
          {/* <-- Scoreboard --> */}
          <div className="scoreboard-header">
            <Scoreboard cpuScore={cpuScore} userScore={userScore} />
          </div>

          {/* <-- Number of Guesses --> */}
          <div className="num-guesses-header">
            <p className="whiteColor game-text">
              {numOfGuesses} {numOfGuesses === 1 ? "Guess" : "Guesses"}
            </p>
          </div>

          {/* <-- Guess Level Message --> */}
          <div className="num-guesses-message-header">
            <NumGuessMessage numOfGuesses={numOfGuesses} />
          </div>
        </div>

        {/* <-- Second Row: Game Image --> */}
        <div className="row mb-5">
          <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center">
            <Moon numOfGuesses={numOfGuesses} />
          </div>
        </div>

        {/* <-- Third Row: Guess word --> */}
        <div className="row">
          {/* <-- Guess word --> */}
          <div className="col-12 d-flex justify-content-center align-items-center">
            <GuessWord guessWord={guessWord} />
          </div>
        </div>

        {/* <-- Fourth Row: Keyboard --> */}
        <div className="row align-items-center mb-5">
          <div className="col" />

          {/* <-- Keyboard --> */}
          <div className="col-12 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-wrap">
            <Keyboard
              keyboardLetters={keyboardLetters}
              letterInputClick={letterInputClick}
              keyboardLettersKeys={Object.keys(keyboardLetters)}
            />
          </div>

          <div className="col" />
        </div>
      </div>
    </main>
  );
}

export default App;
