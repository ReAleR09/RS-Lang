import View from '../../lib/View';
import LocalStorageAdapter from '../../Utils/LocalStorageAdapter';
import {
  CLASS_DICTIONARY_WORD_SOUND,
  CLASS_WORD_DELETE_BUTTON,
  CLASS_WORD_RECOVER_BUTTON,
  DictionaryWordCard,
} from '../../Classes/DictionaryWordCard';
import initDictionaryTabs from '../../plugins/initMaterial';
import Dictionary from '../../Classes/Dictionary';

const dictionary = new Dictionary();

export default class LearningWordsView extends View {
  onMount() {
    this.instance = initDictionaryTabs();

    const recoverButtons = this.element.querySelectorAll(`.${CLASS_WORD_RECOVER_BUTTON}`);
    recoverButtons.forEach((item) => {
      item.addEventListener('click', () => {
        dictionary.putOnCategory(item.getAttribute('idWord'));

      });
    });

    const wordSounds = this.element.querySelectorAll(`.${CLASS_DICTIONARY_WORD_SOUND}`);
    wordSounds.forEach((item) => {
      item.addEventListener('click', () => {
        const audio = new Audio(`https://raw.githubusercontent.com/yafimchik/rslang-data/master/${item.getAttribute('sound')}`);
        audio.play();
      });
    });

    const deleteButtons = this.element.querySelectorAll(`.${CLASS_WORD_DELETE_BUTTON}`);
    deleteButtons.forEach((item) => {
      item.addEventListener('click', () => {
        dictionary.putOnCategory(item.getAttribute('idWord'), 'delete');

      });
    });
  }

  onUnmount() {
    this.instance.destroy();
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    const learningWords = LocalStorageAdapter.get('learningWords');
    const difficultWords = LocalStorageAdapter.get('difficultWords');
    const deletedWords = LocalStorageAdapter.get('deletedWords');

    let html = `
    <div class="dictionary">
      <div class="row">
        <div class="col s12">
          <ul class="tabs">
            <li class="tab col s3"><a class="active" href="#learning-words">Learning</a></li>
            <li class="tab col s3"><a href="#difficult-words">Difficult</a></li>
            <li class="tab col s3"><a href="#deleted-words">Deleted</a></li>
          </ul>
        </div>
        <div id="learning-words" class="col s12 blue">
    `;

    learningWords.forEach((item) => {
      const card = new DictionaryWordCard(item, 'mine').render();
      html += card;
    });

    html += `</div>
    <div id="difficult-words" class="col s12 red">`;

    difficultWords.forEach((item) => {
      const card = new DictionaryWordCard(item).render();
      html += card;
    });

    html += `</div>
    <div id="deleted-words" class="col s12 green">`;

    deletedWords.forEach((item) => {
      const card = new DictionaryWordCard(item).render();
      html += card;
    });

    html += `</div>
    </div>
    </div>`;
    return html;
  }
}
