import Materilize from 'materialize-css';
import PubSub from './PublisherSubscriber';
import { EVENT_NAVIGATION } from '../Utils/Constants';
import AppNavigator from '../lib/AppNavigator';

const CLASS_LINK_ACTIVE = 'sidebar__item_active';
const ID_ITEMS_CONTAINER = 'sidebar__items_container';

export default class Sidebar {
  constructor(navItems) {
    this.navItems = navItems;
  }

  attach(elementId) {
    const target = document.getElementById(elementId);
    const sideBarElement = target;

    this.sideBarElement = sideBarElement;

    this.initNavItems();

    PubSub.subscribe(EVENT_NAVIGATION, (navParams) => {
      const categoriesElements = this.sideBarElement.querySelectorAll('li');
      const keys = Object.getOwnPropertyNames(categoriesElements);
      for (let i = 0; i < keys.length; i += 1) {
        const catEl = categoriesElements[i];
        if (catEl.dataset.controller === navParams.controller) {
          catEl.classList.add(CLASS_LINK_ACTIVE);
        } else {
          catEl.classList.remove(CLASS_LINK_ACTIVE);
        }
      }
    });

    // since we just added some elements to the sidebar, let's wait till rowser init them in DOM
    setTimeout(() => this.initClickHandler(), 0);
  }

  initNavItems() {
    if (!this.navItems) return;
    const placeholderEl = this.sideBarElement.querySelector(`#${ID_ITEMS_CONTAINER}`);
    this.navItems.forEach((item) => {
      const itemEl = document.createElement('li');
      [itemEl.dataset.controller] = item.path;
      if (item.path[1]) {
        [, itemEl.dataset.action] = item.path;
      }
      itemEl.innerHTML = `<a class="waves-effect waves-green"><i class="material-icons">${item.icon}</i>${item.title}</a>`;
      this.sideBarElement.insertBefore(itemEl, placeholderEl);
    });
    placeholderEl.remove();
  }

  initClickHandler() {
    const liElements = this.sideBarElement.querySelectorAll('li');
    liElements.forEach((el) => {
      el.addEventListener('click', (e) => {
        // close the sidebar
        const sidebar = Materilize.Sidenav.getInstance(this.sideBarElement);
        if (sidebar) {
          sidebar.close();
        }

        const { controller } = e.currentTarget.dataset;
        const action = e.currentTarget.dataset.action ? e.currentTarget.dataset.action : null;
        e.stopPropagation();
        AppNavigator.go(controller, action);
      });
    });
  }
}
