import Controller from '../lib/Controller';
import IndexView from '../Views/englishPuzzle/indexView';

export default class ErrorsController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
    };
    super(viewClasses);
  }

  indexAction() {
    this.props.errorData = {};
  }
}
