import { EVENT_NAVIGATION, FIELD_TOKEN } from '../Utils/Constants';
import { CONF_ROOT_PATH } from '../../config';
import PubSub from '../Classes/PublisherSubscriber';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';

// here, url is already changed, just publishing EVENT_NAVIGATION for others
window.addEventListener('popstate', (e) => {
  // main page
  if (!e.state) {
    // initial page state
    PubSub.publish(EVENT_NAVIGATION, { controller: null, action: null, params: null });
    return;
  }
  const { controller, action, params } = e.state;
  PubSub.publish(EVENT_NAVIGATION, { controller, action, params });
});

const go = (controller = null, action = null, params = {}, replace = false) => {
  // blocking navigation when not authorized
  if (
    !LocalStorageAdapter.get(FIELD_TOKEN)
    && controller !== 'authorization'
    && controller !== 'registration'
    && controller !== 'promo'
  ) {
    return;
  }
  const state = {
    controller,
    action,
    params,
  };
  // synthetic postate event, instantiating it with our state, because it will not
  // take state from the pushed history record
  // On the other hand, when user clicks 'back', browser will get this state from history record,
  // and also will trigger popstate automatically
  const popStateEvent = new PopStateEvent(
    'popstate',
    {
      state,
    },
  );

  let path = '/';
  if (CONF_ROOT_PATH) {
    path = CONF_ROOT_PATH;
  }
  if (!controller) {
    if (replace) {
      window.history.replaceState(state, null, path);
    } else {
      window.history.pushState(state, null, path);
    }

    // manual pushState does NOT trigger popstate event, so we are doing it manually
    dispatchEvent(popStateEvent);
    return;
  }
  if (controller !== '/') {
    path += controller;
  }
  if (action) {
    path += `/${action}`;
  }
  const paramsNames = Object.getOwnPropertyNames(params);
  if (paramsNames.length > 0) {
    const pairs = [];
    paramsNames.forEach((name) => {
      const value = params[name];
      pairs.push(`${name}=${value}`);
    });
    const query = pairs.join('&');
    path += `?${query}`;
  }

  if (replace) {
    window.history.replaceState(state, null, path);
  } else {
    window.history.pushState(state, null, path);
  }
  // manual pushState does NOT trigger popstate event, so we are doing it manually
  dispatchEvent(popStateEvent);
};

const replace = (controller = null, action = null, params = {}) => {
  go(controller, action, params, true);
};

const getRequestParams = () => {
  const params = new Map();
  if (window.location.search.length > 0) {
    const queryParts = window
      .location.search.slice(window.location.search.indexOf('?') + 1).split('&');
    queryParts.forEach((pair) => {
      const [key, val] = pair.split('=');
      params.set(key, val);
    });
  }
  return params;
};

const AppNavigator = {
  go,
  replace,
  getRequestParams,
};

export default AppNavigator;
