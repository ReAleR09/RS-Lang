import Router from './js/Router';
import Sidebar from './js/Classes/Sidebar';
import AppNavigator from './js/lib/AppNavigator';
import SettingsModel from './js/Classes/UserSettings';
import ROUTES_CONFIG from './routesConfig';

import './js/plugins';
import { SIDENAV } from './config';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/brands';

// function appInit() {
import { showPreloader, hidePreloader } from './js/Classes/Preloader';
import initProgressBar from './js/Utils/ProgressBarUtils';
import ErrorHandling from './js/Classes/ErrorHandling';
import ColorChanger from './js/Classes/ColorChanger';

async function appInit() {
  showPreloader();
  window.addEventListener('unhandledrejection', ErrorHandling.handleUnhandledError);

  /**
   * this is a root element, where we render to.
   * In other words, it's the "dynamic" part of the app,
   * which is changed on navigation
   */
  const appContainter = document.getElementById('app');
  /**
   * This is the router, which acts upon navigations
   */
  const router = new Router(appContainter, ROUTES_CONFIG);
  /**
   * This bad boy will change colors of the header bar and recatangles in the <body> bg
   */
  const colorChanger = new ColorChanger(
    document.querySelector('#headerBar'),
    document.body,
  );
  colorChanger.init();

  const sideBarLeft = new Sidebar(SIDENAV);
  sideBarLeft.attach('sidenav-left');

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
