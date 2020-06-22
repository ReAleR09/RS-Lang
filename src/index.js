import Router from './js/Router';
// import Sidebar from './js/Classes/Sidebar';
import PublisherSubscriber from './js/Classes/PublisherSubscriber';
import { EVENT_NAVIGATION } from './js/Utils/Constants';
import ExampleController from './js/Controllers/ExampleController';

import SpeakitController from './js/Controllers/SpeakitController';

import RegistrationController from './js/Controllers/RegistrationController';
import AuthorizationController from './js/Controllers/AuthorizationController';
import AppNavigator from './js/lib/AppNavigator';

import './js/plugins';

function appInit() {
  /**
   * On root '/', we will automatically serve indexAction of ExampleController
   * Also, we will serve on /example/* with ExampleController actions
   * THIS TO BE REPLACED IN THE PROCESS OF CREATING NEW CONTROLLERS
   */
  const routes = {
    '/': ExampleController,
    registration: RegistrationController,
    authorization: AuthorizationController,
    example: ExampleController,
    speakit: SpeakitController,
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

  // styles are broken, so currently it's not a sidebar
  // const sideBar = new Sidebar();
  // sideBar.attach('sidebar', 'toggleSidebar');

  router.route();
  PublisherSubscriber.publish(EVENT_NAVIGATION, { controller: null, action: null, params: null });

  if (localStorage.timeStamp < Date.now()) {
    localStorage.removeItem('token');
  }
  if (!localStorage.token) {
    AppNavigator.go('registration');
  }
}

window.onload = appInit;
