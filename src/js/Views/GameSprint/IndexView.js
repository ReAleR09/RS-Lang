import View from '../../lib/View';

export default class IndexView extends View {
  /**
   * This method will be automatically called oncewhen navigation to the page occured,
   * but before html is added to browser's DOM.
   * We can use it to add some subscriptions, timers, calculations etc
   * Plus, we init any logic objects here.
   *
   * Also, if you need to update DOM from here, this.element is available,
   * it references actual DOM root element of this view
   */
  onMount() {
    this.multiplier = {
      1: 'Один попугай', 2: 'Два попугая', 3: 'Три попугая', 4: 'Четыре попугая',
    };

    this.subscribe('status', ({
      status,
      score,
      multiplier,
      checkbox,
      currentWord,
      translateWord,
      timer,
    }) => {
      if (status === 'in-progress') {
        this.element.querySelector('.game-sprint__score').innerHTML = score;
        this.element.querySelector('.game-sprint__timer').innerHTML = timer;
        this.element.querySelector('.game-sprint__number-of-animals').innerHTML = this.multiplier[multiplier];
        if (checkbox === 1) {
          this.element.querySelector('#first-checkbox').classList.add('game-sprint__checkbox-true');
        } else if (checkbox === 2) {
          this.element.querySelector('#second-checkbox').classList.add('game-sprint__checkbox-true');
        } else if (checkbox === 3) {
          this.element.querySelector('#third-checkbox').classList.add('game-sprint__checkbox-true');
        } else {
          this.element.querySelectorAll('.game-sprint__checkbox').forEach((el) => {
            el.classList.remove('game-sprint__checkbox-true');
          });
        }
        this.element.querySelector('.game-sprint__word-in-english').innerHTML = currentWord;
        this.element.querySelector('.game-sprint__translation-world').innerHTML = translateWord;
      } else {
        this.element.innerHTML = `Игра окончена! Набрано очков: ${score}`;
      }
    });

    this.element.querySelector('#true-btn').addEventListener('click', () => {
      this.props.onRightClick();
    });
    this.element.querySelector('#false-btn').addEventListener('click', () => {
      this.props.onFalseClick();
    });
  }

  /**
   * This method will be automatically called oncewhen user leaving the page
   * This is used to release resources: cancel timers, subscriptions, cancel some async actions etc
   */
  onUnmount() {
    clearInterval(this.timer);
  }

  /**
   * this method is automatically called when navigation to page occured
   * Must return html markup.
   * Note that there should only one root element!
   */
  render() {
    this.eslint = true;
    const html = `
      <div id="game-sprint" class="game-sprint">
        <div class="game-sprint__score">0</div>
        <div class="game-sprint__timer">0</div>
        <div class="game-sprint__main-game-container">
          <div class="game-sprint__true-answer">
            <div id="first-checkbox" class="game-sprint__checkbox game-sprint__checkbox-false"></div>
            <div id="second-checkbox" class="game-sprint__checkbox game-sprint__checkbox-false"></div>
            <div id="third-checkbox" class="game-sprint__checkbox game-sprint__checkbox-false"></div>
          </div>
          <div class="game-sprint__number-of-animals"></div>
          <hr>
          <div class="game-sprint__word-in-english"></div>
          <div class="game-sprint__translation-world"></div>
          <div class="game-sprint__btn-wrapper">
            <a id="false-btn" class="waves-effect waves-light btn-small red">Неверно</a>
            <a id="true-btn" class="waves-effect waves-light btn-small green">Верно</a>
          </div>
        </div>
      </div>`;
    return html;
  }
}
