import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

const CLASS_BORDER = 'speakit__border';
const ID_BUTTON_PLAYAGAIN = 'speakit__play-again-button';

export default class ResultsView extends View {
  onMount() {
    const playAgainButton = this.element.querySelector(`#${ID_BUTTON_PLAYAGAIN}`);
    playAgainButton.addEventListener('click', () => {
      AppNavigator.replace('speakit');
    });
  }

  render() {
    const html = `
      <div class="${CLASS_BORDER}">
        <div class="${CLASS_BORDER}">Difficulty: ${this.props.stats.difficulty}</div>
        <div id="${ID_BUTTON_PLAYAGAIN}" class="${CLASS_BORDER}">Play again</div>
      </div>
    `;
    return html;
  }
}
