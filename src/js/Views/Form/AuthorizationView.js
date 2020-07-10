import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import Form from '../../Classes/Form';
import SettingsModel from '../../Classes/UserSettings';
import initProgressBar from '../../Utils/ProgressBarUtils';
import Toaster from '../../Classes/Toaster';

const errors = {
  server: 'Server error',
  signIn: 'Incorrect e-mail or password',
  styles: 'red darken-1',
};

const logIn = async (e) => {
  e.preventDefault();
  const user = {
    email: document.querySelector('.email').value,
    password: document.querySelector('.password').value,
  };
  const userData = await SettingsModel.auth(user);
  if (userData.error) {
    if (userData.error >= 500) {
      Toaster.showToast(errors.server, errors.styles);
    } else {
      Toaster.showToast(errors.signIn, errors.styles);
    }
  } else {
    await initProgressBar();
    AppNavigator.go();
  }
};

const register = () => {
  AppNavigator.go('registration');
};

export default class AuthorizationView extends View {
  onMount() {
    this.button = document.querySelector('button');
    this.button.addEventListener('click', logIn);
    this.link = document.querySelector('#form-link');
    this.link.addEventListener('click', register);
  }

  render() {
    this.authorization = new Form('SIGN IN');
    const html = this.authorization.render();
    return html;
  }
}
