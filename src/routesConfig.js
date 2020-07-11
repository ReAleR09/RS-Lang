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
};

export const routeColorsConfig = {
  '/': ['#ff5722', '#ffffff'],
  registration: '#43a0ff',
  authorization: [],
  savannah: [],
  settings: [],
  learningWords: [],
  fieldOfDreams: [],
  'game-sprint': [],
  speakit: [],
  dictionary: [],
  'game-audio-call': [],
  englishpuzzle: [],
  'about-team': [],
  statistics: [],
  error: [],
};
