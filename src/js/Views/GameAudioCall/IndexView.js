import M from 'materialize-css';
import View from '../../lib/View';

const numberSlide = ['#one!', '#two!', '#three!', '#four!', '#five!', '#six!', '#seven!', '#eight!', '#nine!', '#ten!'];

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
    this.element.querySelector('#check-answer-btn').addEventListener('click', () => {
      this.props.checkAnswerWord();
      this.instance.next();
    });

    // this.componentDidUpdate();

    this.subscribe('update-data', ({
      status,
      countCorrectTranslationWords,
      wordsToSend,
    }) => {
      this.wordsToSend = wordsToSend;
      console.log(status, countCorrectTranslationWords, wordsToSend);
      this.generateHtml(wordsToSend);
    });
  }

  generateHtml(wordsToSend) {
    console.log(wordsToSend);
    let answerHtml = '';
    wordsToSend.forEach((el, i) => {
      let translateWords = '';
      el.randomTranslateWords.forEach((element, item) => {
        translateWords += `
        <span class="audio-call__number-word">${item + 1}.</span>
        <div class="white-text audio-call__shuffle-word">${element}</div>`;
      });
      answerHtml += `
        <div class="carousel-item blue white-text" href="${numberSlide[i]}">
          <img class="audio-call__img-word" src="https://raw.githubusercontent.com/irinainina/rslang-data/master/${el.image}">
          <a id="repeat-word-btn" class="btn-floating btn-large waves-effect waves-light red">
            <i class="material-icons">volume_up</i>
          </a>
          <h5>${el.word}</h5>
          <div class="audio-call__wrapper-shuffle-words">
            ${translateWords}
          </div>
        </div>
      `;
    });
    this.element.insertAdjacentHTML('beforeend', answerHtml);
    this.componentDidUpdate();
    this.element.querySelectorAll('.audio-call__shuffle-word').forEach((el) => {
      el.addEventListener('click', (event) => {
        this.props.answerWord(event);
      });
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

  componentDidUpdate() {
    // M.AutoInit();
    this.carousel = document.querySelector('.carousel');
    M.Carousel.init(this.carousel, {
      fullWidth: true,
    });
    this.instance = M.Carousel.getInstance(this.carousel);
  }
}
