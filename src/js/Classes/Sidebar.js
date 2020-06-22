import PubSub from './PublisherSubscriber';
import { EVENT_NAVIGATION } from '../Utils/Constants';
import AppNavigator from '../lib/AppNavigator';

const CLASS_SHOW = 'show';
const CLASS_LINK_ACTIVE = 'sidebar__item_active';

const NAV_LIST = [
  {
    controller: 'speakit',
    title: 'Speak It',
  },
];

export default class Sidebar {
  constructor() {
    this.show = false;
  }

  toggle(show) {
    if (!this.sideBarElement) return;
    this.show = show;

    if (show) {
      this.sideBarElement.classList.add(CLASS_SHOW);
    } else {
      this.sideBarElement.classList.remove(CLASS_SHOW);
    }
  }

  attach(elementId/* , togglerId */) {
    const target = document.getElementById(elementId);
    const sideBarElement = this.generateSidebarDOM();
    target.parentNode.replaceChild(sideBarElement, target);

    this.sideBarElement = sideBarElement;

    // const togglerElement = document.getElementById(togglerId);
    // togglerElement.addEventListener('click', () => {
    //   this.toggle(!this.show);
    // });
    // On navigation, check links, activate one if inside category
    // and close the sidebar
    PubSub.subscribe(EVENT_NAVIGATION, (navParams) => {
      this.toggle(false);
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
  }

  generateSidebarDOM() {
    const sidebarElement = document.createElement('div');
    sidebarElement.id = 'sidebar';

    const ulElement = document.createElement('ul');

    ulElement.innerHTML += '<li data-page="main">Main Page</li>';

    // TODO replace
    NAV_LIST.forEach((link) => {
      ulElement.innerHTML += `<li data-controller="${link.controller}">${link.title}</li>`;
    });

    ulElement.addEventListener('click', (e) => {
      if (e.target.dataset.page === 'main') {
        AppNavigator.go();
      } else if (e.target.dataset.controller) {
        const { controller } = e.target.dataset;
        const action = e.target.dataset.action ? e.target.dataset.action : null;
        AppNavigator.go(controller, action);
      } else {
        return;
      }
      this.toggle(false);
    });

    sidebarElement.appendChild(ulElement);

    return sidebarElement;
  }
}
