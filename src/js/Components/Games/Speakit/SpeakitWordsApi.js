import Utils from '../../../Utils/Utils';
import { CONF_MEDIA_BASE_PATH } from '../../../../config';
import { roundSize } from './const';
import WordsApi from '../../../Classes/WordsApi';

const wordsApi = new WordsApi();

const getWordsForDifficultyAndRound = async (difficulty, round) => {
  let words = await wordsApi.getWordsForGame(difficulty, roundSize, round);
  words = words.map((word) => {
    const wordMapped = {
      ...word,
      audio: `${CONF_MEDIA_BASE_PATH}${word.audio}`,
      image: `${CONF_MEDIA_BASE_PATH}${word.image}`,
      audioMeaning: `${CONF_MEDIA_BASE_PATH}${word.audioMeaning}`,
      audioExample: `${CONF_MEDIA_BASE_PATH}${word.audioExample}`,
    };

    return wordMapped;
  });
  words = Utils.arrayShuffle(words);
  return words;
};

const SpeakitWordsApi = {
  getWordsForDifficultyAndRound,
};

export default SpeakitWordsApi;
