import Router from './js/Router';
import Sidebar from './js/Classes/Sidebar';
import AppNavigator from './js/lib/AppNavigator';
import SettingsModel from './js/Classes/UserSettings';

import SavannahController from './js/Controllers/SavannahController';
import LearningWordsController from './js/Controllers/LearningWordsController';
import GameSprintController from './js/Controllers/GameSprintController';
import SpeakitController from './js/Controllers/SpeakitController';
import RegistrationController from './js/Controllers/RegistrationController';
import AuthorizationController from './js/Controllers/AuthorizationController';
import EnglishPuzzleController from './js/Controllers/englishPuzzleController';
import SettingsController from './js/Controllers/SettingsController';
import FieldOfDreamsController from './js/Controllers/FieldOfDreamsController';
import PageAboutTeamController from './js/Controllers/PageAboutTeamController';
import GameAudioCallController from './js/Controllers/GameAudioCallController';

import './js/plugins';
import { SIDENAV } from './config';

import { showPreloader, hidePreloader } from './js/Classes/Preloader';
import initProgressBar from './js/Utils/ProgressBarUtils';

async function appInit() {
  showPreloader();
  /**
   * On root '/', we will automatically serve indexAction of ExampleController
   * Also, we will serve on /example/* with ExampleController actions
   * THIS TO BE REPLACED IN THE PROCESS OF CREATING NEW CONTROLLERS
   */
  const routes = {
    '/': LearningWordsController,
    registration: RegistrationController,
    authorization: AuthorizationController,
    savannah: SavannahController,
    settings: SettingsController,
    learningWords: LearningWordsController,
    fieldOfDreams: FieldOfDreamsController,
    'game-sprint': GameSprintController,
    speakit: SpeakitController,
    'game-audio-call': GameAudioCallController,
    englishpuzzle: EnglishPuzzleController,
    'about-team': PageAboutTeamController,
  };

  /**
   * this is a root element, where we render to.
   * In other words, it's the "dynamic" part of the app,
   * which is changed on navigation
   */
  const appContainter = document.getElementById('app');
  /**
   * This is the router, which acts upon navigations
   */
  const router = new Router(appContainter, routes);

  const sideBarLeft = new Sidebar(SIDENAV);
  const sideBarFloating = new Sidebar();
  sideBarLeft.attach('sidenav-left');
  sideBarFloating.attach('sidenav-floatng');

  const authRevived = await SettingsModel.reviveAuth();

  if (!authRevived) {
    SettingsModel.logout();
    AppNavigator.go('authorization');
  } else {
    await initProgressBar();
    await router.route(true);
  }
  hidePreloader();
}

window.onload = appInit;
