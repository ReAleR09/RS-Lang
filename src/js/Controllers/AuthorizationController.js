import Controller from '../lib/Controller';
import AuthorizationView from '../Views/Form/AuthorizationView';
import SettingsModel from '../Classes/UserSettings';
import AppNavigator from '../lib/AppNavigator';

export default class AuthorizationController extends Controller {
  constructor() {
    const viewClasses = {
      index: AuthorizationView,
      logout: AuthorizationView,
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

  logoutAction() {
    SettingsModel.logout();
    AppNavigator.go('authorization');
    this.cancelAction();
  }
}
