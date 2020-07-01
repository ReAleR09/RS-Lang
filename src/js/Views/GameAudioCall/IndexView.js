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
    this.subscribe('update-data', ({
      status,
      countCorrectTranslationWords,
      wordsToSend,
    }) => {
      if (status === 'init-game') {
        console.log(countCorrectTranslationWords, wordsToSend);
        this.wordsToSend = wordsToSend;
        this.generateHtml(wordsToSend);
      } else if (status === 'guessed-word') {
        this.guessWord();
      } else if (status === 'not-guess') {
        this.notGuessWord();
      } else {
        this.endGame();
      }
    });
  }

  generateHtml(wordsToSend) {
    // console.log(wordsToSend);
    let sliderHtml = '';
    wordsToSend.forEach((el, i) => {
      let translateWords = '';
      el.randomTranslateWords.forEach((element, item) => {
        translateWords += `
        <div class="white-text audio-call__wrapper-shuffle-word">
          <span class="audio-call__number-word">${item + 1}.</span>
          <div class="white-text audio-call__shuffle-word">${element}</div>
        </div>`;
      });
      sliderHtml += `
        <div class="carousel-item blue white-text" href="${numberSlide[i]}">
          <img class="audio-call__img-word" src="https://raw.githubusercontent.com/irinainina/rslang-data/master/${el.image}">
          <a id="repeat-word-btn" class="btn-floating btn-large waves-effect waves-light red">
            <i class="material-icons">volume_up</i>
          </a>
          <h5 id="origin-word" class="audio__call-origin-word-hidden">${el.word}</h5>
          <div class="audio-call__wrapper-shuffle-words">
            ${translateWords}
          </div>
        </div>
      `;
    });
    this.element.insertAdjacentHTML('beforeend', sliderHtml);
    this.componentDidUpdate(); // init slider.
    this.createEventSubscribe();
  }

  guessWord() {
    this.visibilitySendBtn();
    this.visibilityOriginWord();
    this.element.querySelector('.audio-call__mark-word').previousElementSibling.innerHTML = '&#10004;';
    this.element.querySelector('.audio-call__mark-word').previousElementSibling.classList.add('audio-call__guess-color');
    this.element.querySelectorAll('.audio-call__shuffle-word').forEach((el) => {
      el.classList.remove('audio-call__mark-word');
    });

    this.element.querySelector('#answer-word-btn').addEventListener('click', () => {
      this.instance.next();
      this.hideSendBtn();
      this.hideOriginWord();
      this.props.sayWord(); // Двоится звук! Постоянно создает аудио. Потом фиксануть.
    });
  }

  notGuessWord() {
    this.element.querySelector('.audio-call__mark-word').previousElementSibling.innerHTML = '&#10006;';
    this.element.querySelector('.audio-call__mark-word').previousElementSibling.classList.add('audio-call__not-guess-color');
    this.element.querySelectorAll('.audio-call__shuffle-word').forEach((el) => {
      el.classList.remove('audio-call__mark-word');
    });
    this.nextSlide();
  }

  nextSlide() {
    setTimeout(() => {
      this.instance.next();
    }, 1200);
  }

  createEventSubscribe() {
    this.element.querySelector('#check-answer-btn').addEventListener('click', () => {
      this.props.checkAnswerWord();
    });

    this.element.querySelectorAll('.audio-call__shuffle-word').forEach((el) => {
      el.addEventListener('click', (event) => {
        event.target.classList.add('audio-call__mark-word');
        this.props.answerWord(event);
      });
    });

    this.element.querySelectorAll('#repeat-word-btn').forEach((el) => {
      el.addEventListener('click', () => {
        this.props.sayWord();
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
          <a id="answer-word-btn" class="btn waves-effect white grey-text darken-text-2 audio-call__hidden-btn">Ответить
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

  endGame() {
    this.element.innerHTML = 'The End';
  }

  visibilitySendBtn() {
    this.element.querySelector('#check-answer-btn').classList.add('audio-call__hidden-btn');
    this.element.querySelector('#answer-word-btn').classList.remove('audio-call__hidden-btn');
  }

  hideSendBtn() {
    this.element.querySelector('#answer-word-btn').classList.add('audio-call__hidden-btn');
    this.element.querySelector('#check-answer-btn').classList.remove('audio-call__hidden-btn');
  }

  visibilityOriginWord() {
    this.element.querySelectorAll('#origin-word').forEach((el) => {
      el.classList.remove('audio__call-origin-word-hidden');
    });
  }

  hideOriginWord() {
    this.element.querySelectorAll('#origin-word').forEach((el) => {
      el.classList.add('audio__call-origin-word-hidden');
    });
  }
}
