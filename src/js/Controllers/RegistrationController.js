import Controller from '../lib/Controller';
import RegistrationView from '../Views/Form/RegistrationView';
import SettingsModel from '../Classes/UserSettings';
import AppNavigator from '../lib/AppNavigator';

export default class RegistrationController extends Controller {
  constructor() {
    const viewClasses = {
      index: RegistrationView,
    };
    super(viewClasses);
  }

  indexAction() {
    // redirect to main page if already auth'ed
    if (SettingsModel.isAuth) {
      AppNavigator.go();
      this.cancelAction();
    }
  }
}
