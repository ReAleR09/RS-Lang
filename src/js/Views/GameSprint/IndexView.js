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
      score,
      multiplier,
      checkbox,
      currentWord,
      translateWord,
      timer,
    }) => {
      this.element.querySelector('.score').innerHTML = score;
      this.element.querySelector('.timer').innerHTML = timer;
      this.element.querySelector('.number-of-animals').innerHTML = this.multiplier[multiplier];
      if (checkbox === 1) {
        this.element.querySelector('#first-checkbox').classList.add('checkbox-true');
      } else if (checkbox === 2) {
        this.element.querySelector('#second-checkbox').classList.add('checkbox-true');
      } else if (checkbox === 3) {
        this.element.querySelector('#third-checkbox').classList.add('checkbox-true');
      } else {
        this.element.querySelectorAll('.checkbox').forEach((el) => {
          el.classList.remove('checkbox-true');
        });
      }
      this.element.querySelector('.word-in-english').innerHTML = currentWord;
      this.element.querySelector('.translation-world').innerHTML = translateWord;
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
      <div class="game-sprint">
        <div class="score">0</div>
        <div class="timer">0</div>
        <div class="main-game-container">
          <div class="true-answer">
            <div id="first-checkbox" class="checkbox checkbox-false"></div>
            <div id="second-checkbox" class="checkbox checkbox-false"></div>
            <div id="third-checkbox" class="checkbox checkbox-false"></div>
          </div>
          <div class="number-of-animals"></div>
          <hr>
          <div class="word-in-english"></div>
          <div class="translation-world"></div>
          <div class="btn-wrapper">
            <a id="false-btn" class="waves-effect waves-light btn-small red">Неверно</a>
            <a id="true-btn" class="waves-effect waves-light btn-small green">Верно</a>
          </div>
        </div>
      </div>`;
    return html;
  }
}
