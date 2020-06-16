import DOMUtils from './Utils/DOMUtils';
import { CONF_ROOT_PATH } from '../config';

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

  route() {
    const { controllerAlias, actionAlias } = Router.getUrlParts();

    if (!Object.prototype.hasOwnProperty.bind(this.routes, controllerAlias)) {
      throw new Error(`No controller assigned to '${controllerAlias}' path`);
    }

    const ControllerClass = this.routes[controllerAlias];
    const controllerInstance = new ControllerClass();

    // run cotroller's method
    const viewInstance = controllerInstance.performAction(actionAlias);
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
  }
}
