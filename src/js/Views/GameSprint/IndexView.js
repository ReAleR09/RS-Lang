import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

const TIMER_ID = 'current-time';
const EXAMPLE_FUNCTIONAL_CLASS = 'example-class';

const numberClickExample = (element) => {
  const { id } = element.target.dataset;
  AppNavigator.go('example', null, { id });
};

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
    // we will render current datetime every sec
    this.timer = setInterval(() => {
      const date = new Date();
      const timerEl = this.element.querySelector(`#${TIMER_ID}`);
      timerEl.innerHTML = date.toLocaleTimeString();
    }, 1000);

    const numberElements = this.element.querySelectorAll(`.${EXAMPLE_FUNCTIONAL_CLASS}`);
    numberElements.forEach((element) => {
      element.addEventListener('click', numberClickExample);
    });

    this.subscribe('status', ({
      score,
      multiplier,
      checkbox,
      currentWord,
      translateWord,
    }) => {
      this.element.querySelector('.score').innerHTML = score;
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
    let numbersHtml = '';
    // this.props.exampleArray is passed from the ExampleController
    this.props.exampleArray.forEach((number) => {
      let classString = `${EXAMPLE_FUNCTIONAL_CLASS}`;
      if (number === this.props.exampleId) {
        classString += ' example-scss-class-2'; // is decribed in /sass/Components/Example.scss
      }

      numbersHtml
      += `<div class="${classString}" data-id="${number}">Number is: ${number}</div>`;
    });

    // example-scss-class is decribed in /sass/Components/Example.scss
    const html = `<div class="example-scss-class">
      <div>${numbersHtml}</div>
      <div id="${TIMER_ID}"></div>
      <div>${this.props.firstName}</div>
      <div class="game-sprint">
        <div class="score">0</div>
        <div class="main-game-container">
          <div class="true-answer">
            <div id="first-checkbox" class="checkbox checkbox-false"></div>
            <div id="second-checkbox" class="checkbox checkbox-false"></div>
            <div id="third-checkbox" class="checkbox checkbox-false"></div>
          </div>
          <div class="number-of-animals">Один попугай</div>
          <hr>
          <div class="word-in-english">man</div>
          <div class="translation-world">человек</div>
          <div class="btn-wrapper">
            <a id="false-btn" class="waves-effect waves-light btn-small red">Неверно</a>
            <a id="true-btn" class="waves-effect waves-light btn-small green">Верно</a>
          </div>
        </div>
      </div>
    </div>`;

    return html;
  }
}
