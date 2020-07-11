import Toaster from './Toaster';
import AppNavigator from '../lib/AppNavigator';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';

const toastStyleError = 'red darken-1';
const toastNonCriticalError = 'red darken-1';

const errorPageController = 'error';
const ERROR_DATA_KEY = 'RS7--error';

function handleError(code, info) {
  Toaster.showToast(info, toastStyleError);
  LocalStorageAdapter.set(ERROR_DATA_KEY, { code, info });
  AppNavigator.go(errorPageController);
}

function handleUnhandledError() {
  // event.promise [object Promise] - промис, который сгенерировал ошибку
  // event.reason   Error: Ошибка!  - объект ошибки, которая не была обработана
}

function handleNonCriticalError(error, type) {
  Toaster.showToast(type, toastNonCriticalError);
}

const ErrorHandling = {
  handleError,
  handleUnhandledError,
  handleNonCriticalError,
};

// TODO Перехват неотловленных
// window.addEventListener('unhandledrejection', ErrorHandling.handleUnhandledError);

export default ErrorHandling;
