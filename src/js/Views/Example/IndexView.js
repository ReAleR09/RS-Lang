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
    // we will render current datetime every sec
    if (!localStorage.userId) {
      AppNavigator.go('registration');
    }

    this.timer = setInterval(() => {
      const date = new Date();
      const timerEl = this.element.querySelector(`#${TIMER_ID}`);
      timerEl.innerHTML = date.toLocaleTimeString();
    }, 1000);

    const numberElements = this.element.querySelectorAll(`.${EXAMPLE_FUNCTIONAL_CLASS}`);
    numberElements.forEach((element) => {
      element.addEventListener('click', numberClickExample);
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
    </div>`;

    return html;
  }
}
