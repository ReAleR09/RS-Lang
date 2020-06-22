import PubSub from './PublisherSubscriber';
import { EVENT_NAVIGATION } from '../Utils/Constants';
import AppNavigator from '../lib/AppNavigator';

// const CLASS_SHOW = 'show';
const CLASS_LINK_ACTIVE = 'sidebar__item_active';

/* const CATEGORIES = [
  {
    id: 4,
    title: 'Click me 4',
  },
  {
    id: 2,
    title: 'Click me 2',
  },
  {
    id: 0,
    title: 'Click me 0',
  },
]; */

export default class Sidebar {
  constructor() {
    this.show = false;
  }

  /*   toggle(show) {
    if (!this.sideBarElement) return;
    this.show = show;

    if (show) {
      this.sideBarElement.classList.add(CLASS_SHOW);
    } else {
      this.sideBarElement.classList.remove(CLASS_SHOW);
    }
  } */

  attach(elementId/* , togglerId */) {
    const target = document.getElementById(elementId);
    const sideBarElement = target;
    // target.parentNode.replaceChild(sideBarElement, target);

    this.sideBarElement = sideBarElement;

    // const togglerElement = document.getElementById(togglerId);
    // togglerElement.addEventListener('click', () => {
    //   this.toggle(!this.show);
    // });
    // On navigation, check links, activate one if inside category
    // and close the sidebar
    PubSub.subscribe(EVENT_NAVIGATION, (navParams) => {
    // this.toggle(false);
      const categoriesElements = this.sideBarElement.querySelectorAll('li');
      const keys = Object.getOwnPropertyNames(categoriesElements);
      for (let i = 0; i < keys.length; i += 1) {
        const catEl = categoriesElements[i];
        if (navParams.controller === 'cards' && navParams.action === 'view' && navParams.params.id) {
          const { id } = catEl.dataset;
          if (id === navParams.params.id) {
            catEl.classList.add(CLASS_LINK_ACTIVE);
          } else {
            catEl.classList.remove(CLASS_LINK_ACTIVE);
          }
        } else if (navParams.controller === null && navParams.action === null) {
          if (catEl.dataset.page && catEl.dataset.page === 'main') {
            catEl.classList.add(CLASS_LINK_ACTIVE);
          } else {
            catEl.classList.remove(CLASS_LINK_ACTIVE);
          }
        } else {
          catEl.classList.remove(CLASS_LINK_ACTIVE);
        }
      }
    });

    this.sideBarItemClickHandler();
  }

  sideBarItemClickHandler() {
    this.sideBarElement.addEventListener('click', (e) => {
      if (e.target.parentNode.dataset.id) {
        AppNavigator.go('example', null, { id: e.target.parentNode.dataset.id });
      } else if (e.target.parentNode.dataset.page === 'main') {
        AppNavigator.go();
      }
      // this.toggle(false);
    });
  }

  /* generateSidebarDOM() {
    const sidebarElement = document.createElement('div');
    sidebarElement.id = 'sidebar';

    const ulElement = document.createElement('ul');

    ulElement.innerHTML += '<li data-page="main">Main Page?</li>';

    // TODO replace
    CATEGORIES.forEach((category) => {
      ulElement.innerHTML += `<li data-id="${category.id}">${category.title}</li>`;
    });

    ulElement.addEventListener('click', (e) => {
      if (e.target.dataset.id) {
        AppNavigator.go('example', null, { id: e.target.dataset.id });
      } else if (e.target.dataset.page === 'main') {
        AppNavigator.go();
      } else {
        return;
      }
      this.toggle(false);
    });

    sidebarElement.appendChild(ulElement);

    return sidebarElement;
  } */
}
