import Controller from '../lib/Controller';
import IndexView from '../Views/Speakit/IndexView';
import SpeakitGameManager from '../Components/Games/Speakit/SpeakitGameManager';
import PlayView from '../Views/Speakit/PlayView';
import AppNavigator from '../lib/AppNavigator';

export default class SpeakitController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
      play: PlayView,
    };
    super(viewClasses);
  }

  // eslint-disable-next-line class-methods-use-this
  indexAction() {

  }

  playAction() {
    const params = AppNavigator.getRequestParams();
    let difficulty = params.get('difficulty');
    if (difficulty) {
      difficulty = Number.parseInt(difficulty, 10);
    } else {
      difficulty = 0;
    }
    const gameManager = new SpeakitGameManager(difficulty);
    this.props.gameManager = gameManager;
  }
}
