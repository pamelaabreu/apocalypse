// Utils
import { getWordList } from "./wordDictAPI";

// Create Word List
const createWordList = async () => {
  const wordList = await getWordList();

  return wordList.split("\n");
};

// Randomly choose number
const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));

// Randomly choose word
const getRandomSecretWord = async () => {
  // Get Converted Word List
  const wordList = await createWordList();

  // Choose random index
  return await wordList[getRandomNum(wordList.length - 1)];
};

// Create inital guessWord
const createGuessWord = secretWord =>
  secretWord
    .split("")
    .map((element, index) => (secretWord.length - 1 === index ? "_" : "_ "))
    .join("");

export { createWordList, getRandomSecretWord, getRandomNum, createGuessWord };
