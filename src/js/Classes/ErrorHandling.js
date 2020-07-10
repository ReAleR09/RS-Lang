import showToast from './Toaster';
import AppNavigator from '../lib/AppNavigator';

const toastStyleError = 'red darken-1';
const toastNonCriticalError = 'red darken-1';

const errorPageController = 'errorHandling';
const errorPageACtion = 'index';

function handleError(error, type) {
  showToast(type, toastStyleError);
  AppNavigator.replace(errorPageController, errorPageACtion);
}

function handleUnhandledError() {
  // event.promise [object Promise] - промис, который сгенерировал ошибку
  // event.reason   Error: Ошибка!  - объект ошибки, которая не была обработана
}

function handleNonCriticalError(error, type) {
  showToast(type, toastNonCriticalError);
}

const ErrorHandling = {
  handleError,
  handleUnhandledError,
  handleNonCriticalError,
};

// TODO Перехват неотловленных
// window.addEventListener('unhandledrejection', ErrorHandling.handleUnhandledError);

export default ErrorHandling;
