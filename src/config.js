export const TEAM_KEY = 'team';
export const TEAM_VALUE = 'team7';

export const ERROR_DATA_KEY = 'RS7--error';

export const GAMES = {
  // LEARNING: 'learningWords',
  SPEAKIT: 'speakIt',
  SAVANNAH: 'savannah',
  AUDIOCALL: 'audioCall',
  SPRINT: 'sprint',
  PUZZLE: 'puzzle',
  FIELDOFDREAMS: 'fieldOfDreams',
};

export const GAMES_TITLES = {
  [GAMES.SPEAKIT]: 'SpeakIt',
  [GAMES.SAVANNAH]: 'Саванна',
  [GAMES.AUDIOCALL]: 'Аудиовызов',
  [GAMES.SPRINT]: 'Спринт',
  [GAMES.PUZZLE]: 'Паззл',
  [GAMES.FIELDOFDREAMS]: 'Поле чудес',
};

export const MODES = {
  GAME: 'game',
  REPITITION: 'repitition',
  COMPLICATED: 'complicated',
};

export const CONF_ROOT_PATH = '';

export const CONF_MEDIA_BASE_PATH = 'https://raw.github.com/ReAleR09/rslang-data/master/';

export const BACKEND_URL = 'https://afternoon-falls-25894.herokuapp.com/';

export const SIDENAV = [
  {
    title: 'Изучаем слова',
    path: ['/'],
    icon: 'network_check',
  },
  {
    title: 'Игры',
    icon: 'sports_esports',
    nested: [
      {
        title: 'Спринт',
        path: ['game-sprint'],
        icon: 'speed',
      },
      {
        title: 'SpeakIt',
        path: ['speakit'],
        icon: 'support_agent',
      },
      {
        title: 'Аудиовызов',
        path: ['game-audio-call'],
        icon: 'phone_callback',
      },
      {
        title: 'Английский Паззл',
        path: ['englishpuzzle'],
        icon: 'extension',
      },
      {
        title: 'Саванна',
        path: ['savannah'],
        icon: 'pets',
      },
      {
        title: 'Поле чудес',
        path: ['fieldOfDreams'],
        icon: 'slow_motion_video',
      },
    ],
  },
];
