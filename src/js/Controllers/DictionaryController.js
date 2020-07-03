import Controller from '../lib/Controller';
import IndexView from '../Views/Dictionary/IndexView';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import Dictionary from '../Classes/Dictionary';

export default class SavannahController extends Controller {
  constructor() {
    const viewClasses = {
      index: IndexView,
    };
    super(viewClasses);
  }

  // eslint-disable-next-line class-methods-use-this
  async indexAction() {
    const dictionary = new Dictionary();

    // const learningWords = MockWordsApi.getWordsForDifficulty(0);
    const learningWords = await dictionary.getWordsList('mine');
    // console.log(learningWords);
    LocalStorageAdapter.set('learningWords', learningWords);

    // const difficultWords = MockWordsApi.getWordsForDifficulty(0);
    const difficultWords = await dictionary.getWordsList('complicated');
    LocalStorageAdapter.set('difficultWords', difficultWords);

    // const deletedWords = MockWordsApi.getWordsForDifficulty(0);
    const deletedWords = await dictionary.getWordsList('delete');
    LocalStorageAdapter.set('deletedWords', deletedWords);
  }
}
