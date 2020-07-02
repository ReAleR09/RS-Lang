import DOMUtils from './Utils/DOMUtils';
import PublisherSubscriber from './Classes/PublisherSubscriber';
import { CONF_ROOT_PATH } from '../config';
import ControllerCancelException from './lib/ControllerCancelException';
import { EVENT_NAVIGATION } from './Utils/Constants';

export default class Router {
  constructor(appContainer, routes) {
    this.routes = routes;
    this.appContainer = appContainer;
    this.currentView = null;

    this.initOnPopstate();
  }

  initOnPopstate() {
    window.addEventListener('popstate', () => {
      this.route();
    });
  }

  static getUrlParts() {
    let controllerAlias = '/';
    let actionAlias = 'index';

    let path = window.location.pathname.slice(1);
    path += CONF_ROOT_PATH;
    if (CONF_ROOT_PATH) {
      path = path.replace(CONF_ROOT_PATH, '');
    }

    if (path.length > 1) {
      const pathParts = path.split('/');
      const [part1, part2] = pathParts;
      controllerAlias = part1;
      if (part2) {
        actionAlias = part2;
      }
    }

    return { controllerAlias, actionAlias };
  }

  route(initial = false) {
    const { controllerAlias, actionAlias } = Router.getUrlParts();

    if (!Object.prototype.hasOwnProperty.bind(this.routes, controllerAlias)) {
      throw new Error(`No controller assigned to '${controllerAlias}' path`);
    }

    const ControllerClass = this.routes[controllerAlias];
    const controllerInstance = new ControllerClass();

    let viewInstance;
    // run cotroller's method
    try {
      viewInstance = controllerInstance.performAction(actionAlias);
    } catch (e) {
      // cancel navigation if no view instance received
      if (e instanceof ControllerCancelException) {
        return;
      }

      throw e;
    }

    const viewHtml = viewInstance.render(actionAlias);
    const viewElement = DOMUtils.createElementFromHTML(viewHtml);

    viewInstance.element = viewElement;

    if (this.appContainer.lastChild) {
      // removing view's dom element from the DOM
      while (this.appContainer.firstChild) {
        this.appContainer.removeChild(this.appContainer.firstChild);
      }
      if (this.currentView) {
        // onUnmount view callback
        this.currentView.viewUnmounted();
        // removing reference to it
        this.currentView = null;
      }
    }

    this.appContainer.appendChild(viewElement);
    this.currentView = viewInstance;

    setTimeout(() => {
      this.currentView.viewMounted();
    }, 0);

    if (initial) {
      PublisherSubscriber.publish(
        EVENT_NAVIGATION,
        { controller: controllerAlias, action: actionAlias, params: null },
      );
    }
  }
}
