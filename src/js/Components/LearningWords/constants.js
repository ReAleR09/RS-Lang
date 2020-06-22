const githubAccount = 'yafimchik';

export const DATA_URL = `https://raw.githubusercontent.com/${githubAccount}/rslang-data/master/`;

export const wordStartTag = '<b>';
export const wordEndTag = '</b>';

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
