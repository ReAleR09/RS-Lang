import View from '../../lib/View';
import LocalStorageAdapter from '../../Utils/LocalStorageAdapter';
import {
  CLASS_DICTIONARY_WORD_SOUND,
  CLASS_WORD_DELETE_BUTTON,
  CLASS_WORD_RECOVER_BUTTON,
  CLASS_BUTTON_TRAN_COMPLICATED,
  CLASS_WORD_STAT_PROGRESS,
  DictionaryWordCard,
} from '../../Classes/DictionaryWordCard';
import initDictionaryTabs from '../../plugins/initMaterial';
import Dictionary from '../../Classes/Dictionary';
import AppNavigator from '../../lib/AppNavigator';
import { MODES } from '../../../config';
import WordStatuses from '../../Components/LearningWords/WordStatuses';

const dictionary = new Dictionary();

export default class IndexView extends View {
  onMount() {
    this.wordStatuses = new WordStatuses(this.element);
    this.wordStatuses.createModalElement();
    this.wordStatuses.attach();

    const statusWrappers = Array.from(this.element.querySelectorAll(`.${CLASS_WORD_STAT_PROGRESS}`));
    statusWrappers.forEach((wrapper) => {
      const status = Number(wrapper.innerText.trim());
      const parent = wrapper;
      parent.innerText = '';
      this.wordStatuses.createStatusElement(parent, '', status);
    });

    this.wordStatuses.initButtons();

    this.instance = initDictionaryTabs();

    const recoverButtons = this.element.querySelectorAll(`.${CLASS_WORD_RECOVER_BUTTON}`);
    recoverButtons.forEach((item) => {
      item.addEventListener('click', async () => {
        await dictionary.putOnCategory(item.getAttribute('idWord'));
        AppNavigator.go('dictionary');
      });
    });

    const wordSounds = this.element.querySelectorAll(`.${CLASS_DICTIONARY_WORD_SOUND}`);
    wordSounds.forEach((item) => {
      item.addEventListener('click', () => {
        const audio = new Audio(`https://raw.githubusercontent.com/yafimchik/rslang-data/master/${item.getAttribute('sound')}`);
        audio.play();
      });
    });

    const buttonTrainComplicated = this.element.querySelector(`.${CLASS_BUTTON_TRAN_COMPLICATED}`);
    buttonTrainComplicated.addEventListener('click', () => {
      AppNavigator.go('learningWords', null, { mode: MODES.COMPLICATED });
    });

    const deleteButtons = this.element.querySelectorAll(`.${CLASS_WORD_DELETE_BUTTON}`);
    deleteButtons.forEach((item) => {
      item.addEventListener('click', async () => {
        await dictionary.putOnCategory(item.getAttribute('idWord'), 'delete');
        AppNavigator.go('dictionary');
      });
    });
  }

  onUnmount() {
    this.wordStatuses.detach();
    // this.instance.destroy();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const learningWords = LocalStorageAdapter.get('learningWords');
    const difficultWords = LocalStorageAdapter.get('difficultWords');
    const deletedWords = LocalStorageAdapter.get('deletedWords');

    let html = `
    <div class="dictionary">
    <a class="button-train-complicated waves-effect waves-light btn">! Тренировка со сложными словами из словаря !</a>
      <div class="row">
        <div class="col s12">
          <ul class="tabs">
            <li class="tab col s3"><a class="active" href="#learning-words">Learning</a></li>
            <li class="tab col s3"><a href="#difficult-words">Difficult</a></li>
            <li class="tab col s3"><a href="#deleted-words">Deleted</a></li>
          </ul>
        </div>
        <div id="learning-words" class="col s12">
    `;

    if (learningWords) {
      learningWords.forEach((item) => {
        const card = new DictionaryWordCard(item, 'mine').render();
        html += card;
      });
    }

    html += `</div>
    <div id="difficult-words" class="col s12">`;

    if (difficultWords) {
      difficultWords.forEach((item) => {
        const card = new DictionaryWordCard(item).render();
        html += card;
      });
    }

    html += `</div>
    <div id="deleted-words" class="col s12">`;

    if (deletedWords) {
      deletedWords.forEach((item) => {
        const card = new DictionaryWordCard(item).render();
        html += card;
      });
    }

    html += `</div>
    </div>
    </div>`;
    return html;
  }
}
