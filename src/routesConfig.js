import SavannahController from './js/Controllers/SavannahController';
import LearningWordsController from './js/Controllers/LearningWordsController';
import GameSprintController from './js/Controllers/GameSprintController';
import SpeakitController from './js/Controllers/SpeakitController';
import RegistrationController from './js/Controllers/RegistrationController';
import AuthorizationController from './js/Controllers/AuthorizationController';
import EnglishPuzzleController from './js/Controllers/englishPuzzleController';
import SettingsController from './js/Controllers/SettingsController';
import DictionaryController from './js/Controllers/DictionaryController';
import FieldOfDreamsController from './js/Controllers/FieldOfDreamsController';
import PageAboutTeamController from './js/Controllers/PageAboutTeamController';
import GameAudioCallController from './js/Controllers/GameAudioCallController';
import StatisticsController from './js/Controllers/StatisticsController';
import ErrorsController from './js/Controllers/ErrorsController';
import PromoController from './js/Controllers/PromoController';

export default {
  '/': LearningWordsController,
  registration: RegistrationController,
  authorization: AuthorizationController,
  savannah: SavannahController,
  settings: SettingsController,
  learningWords: LearningWordsController,
  fieldOfDreams: FieldOfDreamsController,
  'game-sprint': GameSprintController,
  speakit: SpeakitController,
  dictionary: DictionaryController,
  'game-audio-call': GameAudioCallController,
  englishpuzzle: EnglishPuzzleController,
  'about-team': PageAboutTeamController,
  statistics: StatisticsController,
  error: ErrorsController,
  promo: PromoController,
};

export const routeColorsConfig = {
  '/': '#ff5722',
  learningWords: '#ff5722',
  registration: '#43a0ff',
  authorization: '#6043ff',
  savannah: '#e2a83e',
  settings: '#757069',
  fieldOfDreams: '#241a75',
  'game-sprint': '#5deef5',
  speakit: '#26d053',
  dictionary: '#c73485',
  'game-audio-call': '#d60707',
  englishpuzzle: '#328653',
  'about-team': '#91da1d',
  statistics: '#49a3df',
  error: '#000',
};
