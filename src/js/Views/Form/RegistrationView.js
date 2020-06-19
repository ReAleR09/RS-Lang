import View from '../../lib/View';
import Form from '../../Classes/Form';
import Api from '../../Classes/Api';
import AppNavigator from '../../lib/AppNavigator';

// const TIMER_ID = 'current-time';
// const EXAMPLE_FUNCTIONAL_CLASS = 'example-class';

// const numberClickExample = (element) => {
//   const { id } = element.target.dataset;
//   AppNavigator.go('example', null, { id });
// };
const register = async (e) => {
  e.preventDefault();
  console.log(e);
  const user = {
    email: document.querySelector('.email').value,
    password: document.querySelector('.password').value,
  };
  const api = new Api();
  const userData = await api.register(user);
  if (userData.error) {
    if (userData.error >= 500) {
      console.log(userData, 'Server error');
    } else {
      console.log(userData, 'Incorrect e-mail or password');
    }
  } else {
    AppNavigator.go('authorization');
  }
};

const logIn = () => {
  AppNavigator.go('authorization');
};

export default class RegistrationView extends View {
  onMount() {
    this.button = document.querySelector('button');
    this.button.addEventListener('click', register);
    this.link = document.querySelector('a');
    this.link.addEventListener('click', logIn);
  }
  // onUnmount() {

  // }

  /**
   * this method is automatically called when navigation to page occured
   * Must return html markup.
   * Note that there should only one root element!
   */
  render() {
    this.registration = new Form('SIGN UP');
    const html = this.registration.render();
    return html;
  }
}
