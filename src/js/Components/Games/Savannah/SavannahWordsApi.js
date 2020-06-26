import MockWordsApi from './mockWords';
import Utils from '../../../Utils/Utils';

const getRandomWordsForDifficulty = (difficulty) => {
  let words = MockWordsApi.getWordsForDifficulty(difficulty);
  words = Utils.arrayShuffle(words);
  return words;
};

const SavannahWordsApi = {
  getRandomWordsForDifficulty,
};

export default SavannahWordsApi;
