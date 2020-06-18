import Controller from '../lib/Controller';
import IndexView from '../Views/Speakit/IndexView';
import SpeakitGameManager from '../Components/Games/Speakit/SpeakitGameManager';
import PlayView from '../Views/Speakit/PlayView';

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
    const gameManager = new SpeakitGameManager();
    this.props.gameManager = gameManager;
  }
}
