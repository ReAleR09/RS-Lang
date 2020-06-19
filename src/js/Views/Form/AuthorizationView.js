import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import Form from '../../Classes/Form';
import Api from '../../Classes/Api';

// const TIMER_ID = 'current-time';
// const EXAMPLE_FUNCTIONAL_CLASS = 'example-class';

// const numberClickExample = (element) => {
//   const { id } = element.target.dataset;
//   AppNavigator.go('example', null, { id });
// };
const logIn = async (e) => {
  e.preventDefault();
  console.log(e);
  const user = {
    email: document.querySelector('.email').value,
    password: document.querySelector('.password').value,
  };
  const api = new Api();
  const userData = await api.authorize(user);
  if (userData.error) {
    if (userData.error >= 500) {
      console.log(userData, 'Server error');
    } else {
      console.log(userData, 'Incorrect e-mail or password');
    }
  } else {
    console.log(userData);
    localStorage.userId = userData.userId;
    localStorage.token = userData.token;

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
    this.link = document.querySelector('a');
    this.link.addEventListener('click', register);
  }
  // onUnmount() {

  // }

  /**
   * this method is automatically called when navigation to page occured
   * Must return html markup.
   * Note that there should only one root element!
   */
  render() {
    this.authorization = new Form('SIGN IN');
    const html = this.authorization.render();
    return html;
  }
}
