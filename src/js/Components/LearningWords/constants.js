const githubAccount = 'yafimchik';

export const RESULTS_ACTION = 'results';
export const LEARNING_WORDS_CONTROLLER = 'learningWords';

export const DATA_URL = `https://raw.githubusercontent.com/${githubAccount}/rslang-data/master/`;

export const ONE_LETTER_WIDTH = 1; // TODO clever placeholder: input width = placeholder.width
export const WIDTH_ADDITION = 1;

export const wordStartTag = '<b>';
export const wordEndTag = '</b>';
export const lockAttribute = 'readonly';
export const styleAttribute = 'style';

export const WORD_STATUSES = {
  NEW: 'newWord',
  OLD: 'oldWord',
  COMPICATED: 'complicated',
  COMPLITED: 'complited',
};

export const DIFFICULTY_MODIFIERS = {
  HARD: 1,
  NORMAL: 2,
  EASY: 3,
};

export const AUDIO_KEYS = {
  word: 'audio',
  meaning: 'audioMeaning',
  example: 'audioExample',
};
