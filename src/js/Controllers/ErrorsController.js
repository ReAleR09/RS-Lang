import Controller from '../lib/Controller';
import IndexView from '../Views/ErrorComponent/IndexView';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import AppNavigator from '../lib/AppNavigator';
import { ERROR_DATA_KEY } from '../../config';

export default class ErrorsController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
    };
    super(viewClasses);
  }

  indexAction() {
    const errorData = LocalStorageAdapter.get(ERROR_DATA_KEY);

    if (!errorData) {
      AppNavigator.replace('/');
      this.cancelAction();
    }

    LocalStorageAdapter.remove(ERROR_DATA_KEY);

    this.props.errors = errorData;
  }
}
