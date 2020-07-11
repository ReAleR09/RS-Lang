import Controller from '../lib/Controller';
import IndexView from '../Views/Dictionary/IndexView';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import Dictionary from '../Classes/Dictionary';
import { showPreloader, hidePreloader } from '../Classes/Preloader';

export default class SavannahController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
    };
    super(viewClasses);
  }

  // eslint-disable-next-line class-methods-use-this
  async indexAction() {
    showPreloader();
    const dictionary = new Dictionary();

    const learningWords = await dictionary.getWordsList('main');
    LocalStorageAdapter.set('learningWords', learningWords);

    const difficultWords = await dictionary.getWordsList('complicated');
    LocalStorageAdapter.set('difficultWords', difficultWords);

    const deletedWords = await dictionary.getWordsList('delete');
    LocalStorageAdapter.set('deletedWords', deletedWords);
    hidePreloader();
  }
}
