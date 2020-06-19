import MockWordsApi from './mockWords';
import Utils from '../../../Utils/Utils';
import { CONF_MEDIA_BASE_PATH } from '../../../../config';

const getRandomWordsForDifficulty = (difficulty) => {
  let words = MockWordsApi.getWordsForDifficulty(difficulty)
    .map((word) => {
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
  getRandomWordsForDifficulty,
};

export default SpeakitWordsApi;
