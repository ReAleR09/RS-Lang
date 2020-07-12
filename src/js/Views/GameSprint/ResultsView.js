import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';
import SpeakitSoundPlayer from '../../Components/Games/Speakit/SpeakitSoundPlayer';

const ID_BUTTON_PLAYAGAIN = 'speakit__play-again-button';
const ID_BUTTON_NEXT = 'speakit__next-round-button';

const CLASS_RESULTS_WORDCARD = 'speakit__word-card-result';

export default class ResultsView extends View {
  generateWordsCards(guessed = true) {
    const words = guessed ? this.props.stats.guessed : this.props.stats.notGuessed;
    const wordsHtml = words.reduce((html, wordInfo) => {
      const wordHTML = `<div class="${CLASS_RESULTS_WORDCARD} col s4 card">
        <i class="${CLASS_RESULTS_WORDCARD}_sound-icon material-icons prefix" data-wordid="${wordInfo.id}" data-wordsound="1">micro</i>
        <div class="">${wordInfo.word}</div>
        <div class="">${wordInfo.transcription}</div>
        <div class="">${wordInfo.wordTranslate}</div>
      </div>`;

      return html + wordHTML;
    }, '');

    // return empty html if no words for (not)guessed
    if (!wordsHtml) {
      return '';
    }

    const html = `
      <div class='row'>
        <h4 class="col s12">${guessed ? 'Gueesed' : 'Not guessed'} words:</h4>
        ${wordsHtml}
      <div/>
    `;

    return html;
  }

  onMount() {
    const playAgainButton = this.element.querySelector(`#${ID_BUTTON_PLAYAGAIN}`);
    playAgainButton.addEventListener('click', () => {
      AppNavigator.replace('speakit');
    });

    const soundPlayer = new SpeakitSoundPlayer();

    const sounds = this.props.stats.guessed
      .concat(this.props.stats.notGuessed);
    soundPlayer.initWordsSounds(sounds);

    this.element.addEventListener('click', (e) => {
      if (!e.target.dataset.wordsound) {
        return;
      }

      const wordId = e.target.dataset.wordid;
      soundPlayer.playWordSound(wordId);
    });

    if (this.props.nextRound) {
      const nextButton = this.element.querySelector(`#${ID_BUTTON_NEXT}`);
      const difficulty = this.props.nextDifficulty;
      const round = this.props.nextRound;
      nextButton.addEventListener('click', () => {
        AppNavigator.go('speakit', 'play', { difficulty, round });
      });
    }
  }

  render() {
    let nextRoundButton = '';
    if (this.props.nextRound) {
      nextRoundButton = `
        <div class='row'><div class="waves-effect waves-light btn col s12" id="${ID_BUTTON_NEXT}">Next round</div></div>
      `;
    }

    const html = `
      <div>
        <div class='row'>
          <h3>
            Guessed words:
            ${this.props.stats.guessed.length}
            out of
            ${this.props.stats.guessed.length + this.props.stats.notGuessed.length}
            on difficulty
            ${this.props.stats.difficulty}
          </h3>
        </div>
        ${this.generateWordsCards()}
        ${this.generateWordsCards(false)}
        <div class='row'><div class="waves-effect waves-light btn col s12" id="${ID_BUTTON_PLAYAGAIN}">Play again</div></div>
        ${nextRoundButton}
      </div>
    `;
    return html;
  }
}
