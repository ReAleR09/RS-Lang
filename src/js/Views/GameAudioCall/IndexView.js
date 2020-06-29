import M from 'materialize-css';
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
    // this.element.querySelector('#repeat-word-btn').addEventListener('click', () => {
    //   this.props.repeatWord();
    // });
    this.element.querySelector('#answer-word-btn').addEventListener('click', () => {
      this.props.answerWord();
    });
    this.element.querySelector('#check-answer-btn').addEventListener('click', () => {
      this.props.checkAnswer();
      this.instance.next();
    });
    // this.componentDidUpdate();
    this.subscribe('update-data', ({
      status,
      countCorrectTranslationWords,
      wordsToSend,
    }) => {
      console.log('status: ', status, 'countCorrWords: ', countCorrectTranslationWords, 'wordsToSend: ', wordsToSend);
    });
  }

  componentDidUpdate() {
    // M.AutoInit();
    this.carousel = document.querySelector('.carousel');
    M.Carousel.init(this.carousel, {
      fullWidth: true,
    });
    this.instance = M.Carousel.getInstance(this.carousel);
  }

  generateHtml() {
    this.sendHtml = `
    <div class="carousel-item blue white-text" href="#one!">
      <h2>First Panel</h2>
      <a id="repeat-word-btn" class="btn-floating btn-large waves-effect waves-light red">
        <i class="material-icons">volume_up</i>
      </a>
      <p class="white-text">This is your first panel</p>
    </div>
    <div class="carousel-item blue white-text" href="#two!">
      <h2>Second Panel</h2>
      <a id="repeat-word-btn" class="btn-floating btn-large waves-effect waves-light red">
        <i class="material-icons">volume_up</i>
      </a>
      <p class="white-text">This is your second panel</p>
    </div>
    <div class="carousel-item blue white-text" href="#three!">
      <h2>Third Panel</h2>
      <a id="repeat-word-btn" class="btn-floating btn-large waves-effect waves-light red">
        <i class="material-icons">volume_up</i>
      </a>
      <p class="white-text">This is your third panel</p>
    </div>`;
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
      <div class="carousel carousel-slider center">
        <div class="carousel-fixed-item center">
          <a id="answer-word-btn" class="btn waves-effect white grey-text darken-text-2">Ответить
            <i class="material-icons right">send</i>
          </a>
          <a id="check-answer-btn" class="btn waves-effect white grey-text darken-text-2">Не знаю</a>
        </div>
      </div>`;
    return html;
  }
}
