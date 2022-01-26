const githubAccount = 'yafimchik';

export const WORD_REPLACEMENT = '<span>...</span>';

export const PARAM_STATS_LEARNING = 'statsLearningWords';

export const chunkCount = 10;
export const difficultyMax = 5;

export const gameRoundsCount = 10;
export const minBestResult = 4;
export const maxWorstResult = 3;
export const gameLevelCount = 7;

export const RESULTS_ACTION = 'results';

export const TEST_RESULT_ACTION = 'testResult';
export const LEARNING_WORDS_CONTROLLER = 'learningWords';

export const DATA_URL = `https://raw.githubusercontent.com/${githubAccount}/rslang-data/master/`;

export const ONE_LETTER_WIDTH = 1; // TODO clever placeholder: input width = placeholder.width
export const WIDTH_ADDITION = 1;

export const wordStartTag = '<b>';
export const wordEndTag = '</b>';

export const MeaningWordStartTag = '<i>';
export const MeaningWordEndTag = '</i>';

export const lockAttribute = 'readonly';
export const styleAttribute = 'style';

export const WORD_STATUSES = {
  NEW: 'newWord',
  OLD: 'oldWord',
  COMPICATED: 'complicated',
  COMPLITED: 'complited',
};

export const AUDIO_KEYS = {
  word: 'audio',
  meaning: 'audioMeaning',
  example: 'audioExample',
};
