import Controller from '../lib/Controller';
// import AppNavigator from '../lib/AppNavigator';
import AuthorizationView from '../Views/Form/AuthorizationView';

/**
 * Controller is a sctructure that describes a set of "actions",
 * which can be triggered by navigation through app.
 * Every action name must end with "Action" postfix.
 * Note that you need to wire up a controller to 1st level route in order for it to work
 * (currently it's set in index.js)
 *
 * e.g. we navigate to rslang.com/example/someaction, then
 * controller's "someactionAction" metod will be called
 */
export default class AuthorizationController extends Controller {
  constructor() {
    const viewClasses = {
      index: AuthorizationView,
    };
    super(viewClasses);
  }

  /**
   * You can put any data into this.props, and it will be available
   * through this.props in the correcponding view as well.
   * Try to do all data aggregation here then pass it to view
   */
  indexAction() {
    // this.props.exampleArray = ['4', '2', '0']; // just passing some data to view

    // const params = AppNavigator.getRequestParams(); // get GET parameters etc /example/index?id=3
    // this.props.exampleId = params.get('id'); // pass the GET param to View to utilize it later
    this.props.userData = {};
  }
}
