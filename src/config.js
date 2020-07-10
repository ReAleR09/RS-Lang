export const TEAM_KEY = 'team';
export const TEAM_VALUE = 'team7';

export const GAMES = {
  LEARNING: 'learningWords',
  SPEAKIT: 'speakIt',
  SAVANNAH: 'savannah',
  AUDIOCALL: 'audioCall',
  SPRINT: 'sprint',
  PUZZLE: 'puzzle',
  FIELDOFDREAMS: 'fieldOfDreams',
};

export const MODES = {
  GAME: 'game',
  REPITITION: 'repitition',
};

export const CONF_ROOT_PATH = '';

export const CONF_MEDIA_BASE_PATH = 'https://raw.github.com/ReAleR09/rslang-data/master/';

export const BACKEND_URL = 'https://afternoon-falls-25894.herokuapp.com/';

export const SIDENAV = [
  {
    title: 'Изучаем слова',
    path: ['/'],
    icon: 'accessibility',
  },
  {
    title: 'Игры',
    icon: 'accessibility',
    nested: [
      {
        title: 'Спринт',
        path: ['game-sprint'],
        icon: 'accessibility',
      },
      {
        title: 'SpeakIt',
        path: ['speakit'],
        icon: 'accessibility',
      },
      {
        title: 'Аудиовызов',
        path: ['game-audio-call'],
        icon: 'accessibility',
      },
      {
        title: 'Английский Паззл',
        path: ['englishpuzzle'],
        icon: 'extension',
      },
      {
        title: 'Саванна',
        path: ['savannah'],
        icon: 'extension',
      },
      {
        title: 'Field of Dreams [mini-game]',
        path: ['fieldOfDreams'],
        icon: 'slow_motion_video',
      },
    ],
  },
];
