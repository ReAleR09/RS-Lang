import Toaster from './Toaster';
import AppNavigator from '../lib/AppNavigator';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import { ERROR_DATA_KEY } from '../../config';

const toastStyleError = 'red darken-1';
const toastNonCriticalError = 'red darken-1';

const errorPageController = 'error';

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

function handle404(info) {
  LocalStorageAdapter.set(ERROR_DATA_KEY, { code: 404, info });
  AppNavigator.go(errorPageController);
}

const ErrorHandling = {
  handleError,
  handleUnhandledError,
  handleNonCriticalError,
  handle404,
};

export default ErrorHandling;
