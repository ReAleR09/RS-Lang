import AppNavigator from '../lib/AppNavigator';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';

const ERROR_DATA_KEY = 'RS7--error';

export default class Errors {
  constructor(errorData) {
    this.handleError(errorData);
  }

  // eslint-disable-next-line class-methods-use-this
  async handleError(errorData) {
    await LocalStorageAdapter.set(ERROR_DATA_KEY, errorData);
    AppNavigator.go('error');
  }
}

// new Errors(`PUT ERROR HERE`) - simple way to redirect browser to /error page & display the error
