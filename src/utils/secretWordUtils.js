// Utils
import { getWordList } from "./wordDictAPI";

// Create Word List
const createWordList = async () =>
  await getWordList().then(data => {
    // Split word string into array of words
    return data.split("\n");
  });

// Randomly choose number
const getRandomNum = max => Math.floor(Math.random() * Math.floor(max));

// Randomly choose word
const getRandomSecretWord = async () => {
  // Get Converted Word List
  const wordList = await createWordList();

  // Choose random index
  return await wordList[getRandomNum(wordList.length - 1)];
};

export { createWordList, getRandomSecretWord, getRandomNum };
