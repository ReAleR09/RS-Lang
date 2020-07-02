import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import Form from '../../Classes/Form';
import SettingsModel from '../../Classes/UserSettings';

const errors = {
  server: 'Server error',
  signIn: 'Incorrect e-mail or password',
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
      document.querySelector('.error').innerHTML = errors.server;
      setTimeout(() => {
        document.querySelector('.error').innerHTML = '';
      }, 2000);
    } else {
      document.querySelector('.error').innerHTML = errors.signIn;
      setTimeout(() => {
        document.querySelector('.error').innerHTML = '';
      }, 2000);
    }
  } else {
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
