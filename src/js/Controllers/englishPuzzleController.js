import Controller from '../lib/Controller';
import englishPuzzleView from '../Views/englishPuzzle/englishPuzzleView';

export default class englishPuzzleController extends Controller {
  constructor() {
    const viewClasses = {
      index: englishPuzzleView,
    };
    super(viewClasses);
  }

  indexAction() {
    this.props.userData = {};
  }
}
