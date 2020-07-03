import Controller from '../lib/Controller';
import IndexView from '../Views/Savannah/IndexView';
import PlayView from '../Views/Savannah/PlayView';
import ResultsView from '../Views/Savannah/ResultsView';
import SavannahGameManager from '../Components/Games/Savannah/SavannahGameManager';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';

export default class SavannahController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
      play: PlayView,
      results: ResultsView,
    };
    super(viewClasses);
  }

  indexAction() {
    this.props.data = 'Savannah';
  }

  playAction() {
    const gameManager = new SavannahGameManager();
    this.props.gameManager = gameManager;
  }

  resultsAction() {
    const stats = LocalStorageAdapter.get('savannah-current-words-state') || {};
    this.props.stats = stats;
  }
}