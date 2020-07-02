import M from 'materialize-css';
import View from '../../lib/View';
import AppNavigator from '../../lib/AppNavigator';

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
    this.element.querySelector('#start-btn').addEventListener('click', () => {
      this.props.startGame();
    });

    this.subscribe('update-data', ({
      status,
      countCorrectTranslationWords,
      wordsToSend,
    }) => {
      if (status === 'init-game') {
        // console.log(wordsToSend);
        this.wordsToSend = wordsToSend;
        this.generateHtml(wordsToSend);
      } else if (status === 'guessed-word') {
        this.guessWord();
      } else if (status === 'not-guess') {
        this.notGuessWord();
      } else {
        this.endGame(countCorrectTranslationWords);
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
    const btnForGame = `
      <div class="carousel-fixed-item center">
        <a id="answer-word-btn" class="btn waves-effect white grey-text darken-text-2 audio-call__hidden-btn">Ответить
          <i class="material-icons right">send</i>
        </a>
        <a id="check-answer-btn" class="btn waves-effect white grey-text darken-text-2">Не знаю</a>
      </div>`;
    this.element.querySelector('#start-node').remove();
    this.element.insertAdjacentHTML('beforeend', sliderHtml);
    this.element.insertAdjacentHTML('beforeend', btnForGame);
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
  }

  notGuessWord() {
    this.visibilityOriginWord();
    this.element.querySelector('.audio-call__mark-word').previousElementSibling.innerHTML = '&#10006;';
    this.element.querySelector('.audio-call__mark-word').previousElementSibling.classList.add('audio-call__not-guess-color');
    this.element.querySelectorAll('.audio-call__shuffle-word').forEach((el) => {
      el.classList.remove('audio-call__mark-word');
    });
    this.nextSlide();
  }

  nextSlide() {
    setTimeout(() => {
      this.hideOriginWord();
      this.instance.next();
      this.props.sayWord();
    }, 1800);
  }

  createEventSubscribe() {
    this.element.querySelector('#check-answer-btn').addEventListener('click', () => {
      M.toast({ html: 'Лошара!!! =)', classes: 'audio-call__toast-dont-know', displayLength: 300 });
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

    this.element.querySelector('#answer-word-btn').addEventListener('click', () => {
      this.instance.next();
      this.hideSendBtn();
      this.hideOriginWord();
      this.props.sayWord();
    });

    this.element.querySelectorAll('.carousel-item').forEach((el) => {
      el.addEventListener('mousedown', (event) => {
        event.stopPropagation();
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
        <div id="start-node" class="audio-call__start-container">
          <h3 class="audio-call__heading-start-message">Готов? Жми <b>"старт"</b> для начала игры!</h3>
          <a id="start-btn" class="waves-effect waves-light btn-large audio-call__btn-start">Старт!</a>
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

  endGame(countRightWord) {
    this.element.innerHTML = `
      <div class="audio-call__wrapper-end-game">
        <h2 class="audio-call__heading-the-end">The End.</h2>
        <h4>Угаданно <b>${countRightWord}</b> из <b>10</b> слов</h4>
        <a id="btn-reload-game" class="btn-floating btn-large waves-effect waves-light green audio-call__btn-reload"><i class="material-icons">refresh</i></a>
      </div>`;
    this.props.audioEndGame();
    this.element.querySelector('#btn-reload-game').addEventListener('click', () => {
      AppNavigator.go('game-audio-call');
    });
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
