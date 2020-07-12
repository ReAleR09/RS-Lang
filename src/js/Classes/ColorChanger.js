import PubSub from './PublisherSubscriber';
import { EVENT_NAVIGATION } from '../Utils/Constants';
import Router from '../Router';
import { routeColorsConfig } from '../../routesConfig';

const defaultHeaderColor = '#ff5722';
const defaultBodyColor = '#ffffff';

export default class ColorChanger {
  constructor(headerEl, bodyEl) {
    this.headerEl = headerEl;
    this.bodyEl = bodyEl;
  }

  init() {
    this.subscription = PubSub.subscribe(EVENT_NAVIGATION, () => {
      const [headerColor, bodyColor] = ColorChanger.determineColors();
      this.changeColor(headerColor, bodyColor);
    });
  }

  static determineColors() {
    const { controllerAlias } = Router.getUrlParts();
    if (!routeColorsConfig[controllerAlias]) {
      return [defaultHeaderColor, defaultBodyColor];
    }
    const colorConfig = routeColorsConfig[controllerAlias];
    if (Array.isArray(colorConfig)) {
      return colorConfig;
    }
    return [colorConfig, colorConfig];
  }

  changeColor(headerColor = defaultHeaderColor, bodyColor = defaultBodyColor) {
    this.headerEl.style.setProperty('background-color', `${headerColor}`, 'important');
    this.bodyEl.style.setProperty('background-color', `${bodyColor}`, 'important');
  }
}
