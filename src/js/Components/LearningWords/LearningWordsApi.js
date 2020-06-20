import MockWordsApi from './mockWords';
import Utils from '../../Utils/Utils';

const getRandomWordsForDifficulty = (difficulty) => {
  let words = MockWordsApi(difficulty);
  words = Utils.arrayShuffle(words);
  return words;
};

const SpeakitWordsApi = {
  getRandomWordsForDifficulty,
};

export default SpeakitWordsApi;
