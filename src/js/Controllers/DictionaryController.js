import Controller from '../lib/Controller';
import IndexView from '../Views/Dictionary/IndexView';
import MockWordsApi from '../Components/Games/Savannah/mockWords';
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
    // const learningWords = await dictionary.getWordsList();
    // console.log(learningWords);
    // this.props.words2 = 'sdfghj';

    // const learningWords = MockWordsApi.getWordsForDifficulty(0);
    const learningWords = await dictionary.getWordsList('mine');
    console.log(learningWords);
    LocalStorageAdapter.set('learningWords', learningWords);

    const difficultWords = MockWordsApi.getWordsForDifficulty(1);
    LocalStorageAdapter.set('difficultWords', difficultWords);

    const deletedWords = MockWordsApi.getWordsForDifficulty(2);
    LocalStorageAdapter.set('deletedWords', deletedWords);
  }
}
