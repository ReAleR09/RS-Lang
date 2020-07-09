import View from '../../lib/View';
import Form from '../../Classes/Form';
import Api from '../../Classes/Api/Api';
import AppNavigator from '../../lib/AppNavigator';
import Toaster from '../../Classes/Toaster';

const errors = {
  server: 'Server error',
};

const validMail = (email) => {
  const re = new RegExp('[^@]+@[^@]+\\.[^@]+');

  const valid = re.test(email);
  if (!valid) {
    const output = 'Email is wrong!';
    document.querySelector('.email').value = '';
    document.querySelector('.email').placeholder = output;
  }
  return valid;
};

const validPassword = (password) => {
  const withoutSpecialChars = new RegExp('[!@#$%^&*()_+={};:<>|./?,-]');
  const containsUpperLetters = /^.*[A-Z]+.*$/;
  const containsLowerLetters = /^.*[a-z]+.*$/;
  const containsDigits = /^.*\d+.*$/;
  const minimum8Chars = /^.{8,}$/;
  let valid;
  if (
    withoutSpecialChars.test(password)
  && containsUpperLetters.test(password)
  && containsLowerLetters.test(password)
  && containsDigits.test(password)
  && minimum8Chars.test(password)) {
    valid = true;
  } else {
    valid = false;
    const output = 'Password is wrong!';
    document.querySelector('.password').value = '';
    document.querySelector('.password').placeholder = output;
  }
  return valid;
};

const register = async (e) => {
  e.preventDefault();
  const user = {
    email: document.querySelector('.email').value,
    password: document.querySelector('.password').value,
  };
  const emailIsValid = validMail(user.email);
  const passwordIsValid = validPassword(user.password);

  if (emailIsValid && passwordIsValid) {
    const api = new Api();
    const userData = await api.register(user);
    if (userData.error) {
      if (userData.error >= 500) {
        Toaster.showToast(errors.server);
      }
    } else {
      AppNavigator.go('authorization');
    }
  }
};

const logIn = () => {
  AppNavigator.go('authorization');
};

export default class RegistrationView extends View {
  onMount() {
    this.button = document.querySelector('button');
    this.button.addEventListener('click', register);
    this.link = document.querySelector('#form-link');
    this.link.addEventListener('click', logIn);
  }
  // onUnmount() {

  // }

  render() {
    this.registration = new Form('SIGN UP');
    const html = this.registration.render();
    return html;
  }
}
