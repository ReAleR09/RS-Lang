import Controller from '../lib/Controller';
import RegistrationView from '../Views/Form/RegistrationView';

export default class RegistrationController extends Controller {
  constructor() {
    const viewClasses = {
      index: RegistrationView,
    };
    super(viewClasses);
  }

  indexAction() {
    this.props.userData = {};
  }
}
