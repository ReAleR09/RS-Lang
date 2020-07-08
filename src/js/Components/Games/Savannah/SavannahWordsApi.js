// import MockWordsApi from './mockWords';
import Utils from '../../../Utils/Utils';
import { roundSize } from './const';
import WordsApi from '../../../Classes/Api/WordsApi';

const wordsApi = new WordsApi();

const getRandomWords = (words) => {
  const randomWords = Utils.arrayShuffle(words);
  return randomWords;
};

const getWordsForDifficultyAndRound = async (difficulty, round) => {
  const words = await wordsApi.getWordsForGame(difficulty, roundSize, round);
  return getRandomWords(words);
};

const getUserWords = async () => {
  const words = await wordsApi.getRepeatedWords(roundSize);
  return getRandomWords(words);
};

const SavannahWordsApi = {
  // getRandomWordsForDifficulty,
  getWordsForDifficultyAndRound,
  getUserWords,
};

export default SavannahWordsApi;
