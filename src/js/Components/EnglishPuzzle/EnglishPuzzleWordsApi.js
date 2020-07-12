import Utils from '../../Utils/Utils';
import { CONF_MEDIA_BASE_PATH } from '../../../config';
import { roundSize } from './constants';
import WordsApi from '../../Classes/Api/WordsApi';

const wordsApi = new WordsApi();

const mapAndShuffleApiWords = (words) => {
  const mappedWords = words.map((word) => {
    const wordMapped = {
      ...word,
      audio: `${CONF_MEDIA_BASE_PATH}${word.audio}`,
      image: `${CONF_MEDIA_BASE_PATH}${word.image}`,
      audioMeaning: `${CONF_MEDIA_BASE_PATH}${word.audioMeaning}`,
      audioExample: `${CONF_MEDIA_BASE_PATH}${word.audioExample}`,
    };

    return wordMapped;
  });
  const shuffledWords = Utils.arrayShuffle(mappedWords);
  return shuffledWords;
};

const getWordsForDifficultyAndRound = async (difficulty, round) => {
  const words = await wordsApi.getWordsForGame(difficulty, roundSize, round, true);
  return mapAndShuffleApiWords(words);
};

/**
 * берёт слова, которые уже находятся у юзера на изучении
 */
const getUserWords = async () => {
  const words = await wordsApi.getRepeatedWords(roundSize, true);
  return mapAndShuffleApiWords(words);
};

const EnglishPuzzleWordsApi = {
  getWordsForDifficultyAndRound,
  getUserWords,
};

export default EnglishPuzzleWordsApi;
