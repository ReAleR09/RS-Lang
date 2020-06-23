/* eslint-disable class-methods-use-this */
import View from '../../lib/View';
// import AppNavigator from '../../lib/AppNavigator';

export default class RegistrationView extends View {
  // eslint-disable-next-line class-methods-use-this
  onMount() {
    console.log('hello from english-puzzle');
  }
  // onUnmount() {

  // }

  render() {
    // this.registration = new Form('SIGN UP');
    const html = '<h1>English motherfucker do you speak it ?!</h1>';
    return html;
  }
}
