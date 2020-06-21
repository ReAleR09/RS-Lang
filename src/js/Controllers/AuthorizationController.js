import Controller from '../lib/Controller';
import AuthorizationView from '../Views/Form/AuthorizationView';

export default class AuthorizationController extends Controller {
  constructor() {
    const viewClasses = {
      index: AuthorizationView,
    };
    super(viewClasses);
  }

  indexAction() {
    this.props.userData = {};
  }
}
