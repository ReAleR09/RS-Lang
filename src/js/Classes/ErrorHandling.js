import showToast from './Toaster';
import AppNavigator from '../lib/AppNavigator';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import { ERROR_DATA_KEY } from '../../config';

const toastStyleError = 'red darken-1';
const toastNonCriticalError = 'red darken-1';

const errorPageController = 'error';

function handleError(code, info) {
  showToast(info, toastStyleError);
  LocalStorageAdapter.set(ERROR_DATA_KEY, { code, info });
  AppNavigator.go(errorPageController);
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

export default ErrorHandling;
