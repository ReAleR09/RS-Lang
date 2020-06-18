import Controller from '../lib/Controller';
import IndexView from '../Views/Speakit/IndexView';
// import AppNavigator from '../lib/AppNavigator';

export default class SpeakitController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
    };
    super(viewClasses);
  }

  indexAction() {
    // passing some param to the IndexView
    this.props.someParamPassToView = 'hello';
  }
}
