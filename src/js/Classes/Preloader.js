// import PubSub from './PublisherSubscriber';
// import { EVENT_NAVIGATION } from '../Utils/Constants';

const HIDDEN_CLASS = 'preloader__hidden';

// init spinner animation
const spinnerDiv = document.createElement('div');
spinnerDiv.id = 'preloader__spinner';
spinnerDiv.classList.add('preloader__spinner');
spinnerDiv.classList.add(HIDDEN_CLASS);

const spinnerImg = document.createElement('img');
spinnerImg.src = '/assets/preloader.svg';
spinnerImg.classList.add('preloader__spinner_img');
spinnerDiv.append(spinnerImg);

document.body.append(spinnerDiv);

// init backdrop
const backdropDiv = document.createElement('div');
backdropDiv.id = 'preloader__backdrop';
backdropDiv.classList.add('preloader__backdrop');
backdropDiv.classList.add(HIDDEN_CLASS);
document.body.append(backdropDiv);

export const showPreloader = () => {
  spinnerDiv.classList.remove(HIDDEN_CLASS);
  backdropDiv.classList.remove(HIDDEN_CLASS);
};

export const hidePreloader = () => {
  spinnerDiv.classList.add(HIDDEN_CLASS);
  backdropDiv.classList.add(HIDDEN_CLASS);
};

// remove backdrop on navigation (just in case)
// PubSub.subscribe(EVENT_NAVIGATION, () => {
//   hidePreloader();
// });
