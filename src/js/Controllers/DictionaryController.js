import Controller from '../lib/Controller';
import IndexView from '../Views/Dictionary/IndexView';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import Dictionary from '../Classes/Dictionary';
import { showPreloader, hidePreloader } from '../Classes/Preloader';
import SpacedRepititions from '../Classes/SpacedRepititions';

export default class DictionaryController extends Controller {
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
    const intervals = new SpacedRepititions();

    let learningWords = await dictionary.getWordsList('main');
    learningWords = learningWords.map((aggregatedWord) => {
      const newWord = { ...aggregatedWord };
      newWord.wordStatus = intervals.getTrainingStatusByUserWord(aggregatedWord.userWord.optional);
      return newWord;
    });
    LocalStorageAdapter.set('learningWords', learningWords);

    let difficultWords = await dictionary.getWordsList('complicated');
    difficultWords = difficultWords.map((aggregatedWord) => {
      const newWord = { ...aggregatedWord };
      newWord.wordStatus = intervals.getTrainingStatusByUserWord(aggregatedWord.userWord.optional);
      return newWord;
    });
    LocalStorageAdapter.set('difficultWords', difficultWords);

    let deletedWords = await dictionary.getWordsList('delete');
    deletedWords = deletedWords.map((aggregatedWord) => {
      const newWord = { ...aggregatedWord };
      newWord.wordStatus = intervals.getTrainingStatusByUserWord(aggregatedWord.userWord.optional);
      return newWord;
    });
    LocalStorageAdapter.set('deletedWords', deletedWords);
    hidePreloader();
  }
}
