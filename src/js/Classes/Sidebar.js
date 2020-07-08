import Materilize from 'materialize-css';
import PubSub from './PublisherSubscriber';
import { EVENT_NAVIGATION } from '../Utils/Constants';
import AppNavigator from '../lib/AppNavigator';

const CLASS_LINK_ACTIVE = 'active';
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
    setTimeout(() => {
      this.initCollapsibles();
      this.initClickHandler();
    }, 0);
  }

  initNavItems() {
    if (!this.navItems) return;
    const placeholderEl = this.sideBarElement.querySelector(`#${ID_ITEMS_CONTAINER}`);
    const itemElList = Sidebar.getMenuListElement(this.navItems);
    itemElList.forEach((itemEl) => {
      this.sideBarElement.insertBefore(itemEl, placeholderEl);
    });
    placeholderEl.remove();
  }

  static getMenuListElement(list) {
    const elementsList = [];
    list.forEach((item) => {
      let itemEl;
      if (item.nested) {
        itemEl = Sidebar.getNestedMenuEl(item);
      } else {
        itemEl = Sidebar.getMenuItemEl(item);
      }
      elementsList.push(itemEl);
    });
    return elementsList;
  }

  static getMenuItemEl(item) {
    const itemEl = document.createElement('li');
    [itemEl.dataset.controller] = item.path;
    if (item.path[1]) {
      [, itemEl.dataset.action] = item.path;
    }
    itemEl.innerHTML = `<a class="waves-effect waves-green"><i class="material-icons">${item.icon}</i>${item.title}</a>`;
    return itemEl;
  }

  static getNestedMenuEl(item) {
    const itemEl = document.createElement('li');
    const html = `
      <ul class="collapsible">
        <li>
          <div class="collapsible-header"><i class="material-icons">${item.icon}</i>${item.title}</div>
          <div class="collapsible-body"><ul class="nested_list"></ul></div>
        </li>
      </ul>
    `;
    itemEl.innerHTML = html;
    const itemElList = Sidebar.getMenuListElement(item.nested);
    const ulListEl = itemEl.querySelector('.nested_list');
    itemElList.forEach((liElement) => {
      ulListEl.append(liElement);
    });
    return itemEl;
  }

  initClickHandler() {
    const liElements = this.sideBarElement.querySelectorAll('li');
    liElements.forEach((el) => {
      el.addEventListener('click', (e) => {
        const { controller } = e.currentTarget.dataset;
        if (!controller) return; // if no data-controller -> do nothing
        // close the sidebar
        const sidebar = Materilize.Sidenav.getInstance(this.sideBarElement);
        if (sidebar) {
          sidebar.close();
        }
        // close all collapsible items
        if (this.collapsibles.length > 0) {
          this.collapsibles.forEach((collapsible) => {
            collapsible.close();
          });
        }

        const action = e.currentTarget.dataset.action ? e.currentTarget.dataset.action : null;
        e.stopPropagation();
        AppNavigator.go(controller, action);
      });
    });
  }

  initCollapsibles() {
    const elems = this.sideBarElement.querySelectorAll('.collapsible');
    this.collapsibles = Materilize.Collapsible.init(elems);
  }
}
