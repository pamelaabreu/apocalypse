import React, { useState, useEffect } from "react";

// Assets
import keyboardTemplate from "./assets/keyboardTemplate";

// Utils
import { getRandomSecretWord, createGuessWord } from "./utils/wordUtils";
import { getScores, addScores } from "./utils/scoreboardLocalStorage";

// Components
import Keyboard from "./components/Keyboard";
import StartNewGameModal from "./components/Modal";
import GuessWord from "./components/GuessWord";
import Scoreboard from "./components/Scoreboard";

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

  useEffect(() => {
    if (cpuScore > 0 || userScore > 0) {
      addScores(userScore, cpuScore);
    }
  }, [cpuScore, userScore]);

  const getSecretWordAndGuessWord = async () => {
    const randomWord = await getRandomSecretWord();

    const newGuessWord = await createGuessWord(randomWord);

    setSecretWord(randomWord);
    setGuessWord(newGuessWord);
  };

  const letterInputClick = e => {
    // Grab the inner text from the button clicked
    const letter = e.target.innerText.toLowerCase();

    // Update keyboard to have guessed letter
    updateKeyboardWithGuessedLetter(letter);

    // Check to see if user will win
    willUserWin(letter);
  };

  const updateKeyboardWithGuessedLetter = letter => {
    // Create a copy of the keyboard letter object
    const copiedKeyboard = { ...keyboardLetters };

    // Update the guessed key value
    copiedKeyboard[letter].guessed = true;

    // Also check if guessed letter is incorrect
    if(!checkLetterInWord(letter, secretWord)){
      // Update the incorrect key value
      copiedKeyboard[letter].incorrect = true;
    }

    // Update keyboard letters
    setKeyboardLetters(copiedKeyboard);
  };

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

  const checkLetterInWord = (letter, word) => word.toLowerCase().includes(letter.toLowerCase());

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
      // Update user/cpu points
      updateScores(true);

      // Start new game ~ show modal
      setModalShow(true);
      setUserWon(true);
    }
  };

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
    <main className={"vh-100 background-" + numOfGuesses}>
      {/* <-- If user wins/lose this modal will pop up --> */}
      <StartNewGameModal
        show={modalShow}
        secretWord={secretWord}
        userWon={userWon}
        onHide={resetGame}
        cpuScore={cpuScore}
        userScore={userScore}
      />

      {/* <-- App Game --> */}
      <div className="container-fluid border border-warning">
        {/* <-- First Row: Number of Guesses, Game Image, Scoreboard --> */}
        <div className="row">
          {/* <-- Number of Guesses --> */}
          <div className="col border border-light">
            <p className="whiteColor game-text">{numOfGuesses} Guesses</p>
          </div>

          {/* <-- Game Image --> */}
          <div className="col-6 col-xs-2 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center align-items-center border border-light">
            <div className="moon"></div>
          </div>

          {/* <-- Scoreboard --> */}
          <div className="col border border-light">
            <Scoreboard cpuScore={cpuScore} userScore={userScore} />
          </div>
        </div>

        {/* <-- Second Row: Guess word --> */}
        <div className="row align-items-center border border-light">
          <div className="col" />

          {/* <-- Guess word --> */}
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center align-items-center border border-light">
            <GuessWord guessWord={guessWord} />
          </div>

          <div className="col" />
        </div>

        {/* <-- Third Row: Keyboard --> */}
        <div className="row border border-light align-items-center">
          <div className="col" />

          {/* <-- Keyboard --> */}
          <div className="col-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center align-items-center flex-wrap">
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
