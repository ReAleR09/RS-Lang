import Settings from '../lib/UserSettings';

export default class User {
  constructor() {
    this.settingsHtml = '';
  }

  render() {
    this.settingsHtml = `
    <section class="container">
        <h2>Настройки приложения</h2>
        <form action="#">
            <p>
            <label>                        
                <input class="new_cards" type="number" value="20" style="width: 40px">  
                <span>Новых карточек в день</span>                        
            </label>
            </p> 
            <p>
            <label>                        
                <input class="cards_per_day" type="number" value="50" style="width: 40px">  
                <span>Количество карточек в день</span>                        
            </label>
            </p> 
            <div class="divider"></div>                    
            <p>
            <label>                        
                <input class="translation" type="checkbox">  
                <span>Перевод слова</span>                        
            </label>
            </p>                
            <p>
            <label>                        
                <input class="translation_meaning" type="checkbox">  
                <span>Предложение с объяснением значения слова</span>                        
            </label>
            </p>                
            <p>
            <label>                        
                <input class="word_use" type="checkbox">  
                <span>Предложение с примером использования изучаемого слова</span>                        
            </label>
            </p>
            <div class="divider"></div>                    
            <p>
            <label>                        
                <input class="word_transcription" type="checkbox">  
                <span>Показывать транскрипцию слова</span>                        
            </label>
            </p>                
            <p>
            <label>                        
                <input class="word_picture" type="checkbox">  
                <span>Показывать картинку-ассоциацию</span>                        
            </label>
            </p>                
            <p>
            <label>                        
                <input class="show_answer" type="checkbox">  
                <span>Наличие кнопки "Показать ответ"</span>                        
            </label>
            </p>                
            <p>
            <label>                        
                <input class="show_delete_button" type="checkbox">  
                <span>Наличие кнопки "Удалить"</span>                        
            </label>
            </p>                
            <p>
            <label>                        
                <input class="show_hard_button" type="checkbox">  
                <span>Наличие кнопки "Сложные"</span>                        
            </label>
            </p>                
            <p>
            <label>                        
                <input class="show_buttons" type="checkbox">  
                <span>Наличие кнопок "Снова", "Трудно", "Хорошо", "Легко" </span>                        
            </label>
            </p>
            <button class="waves-effect waves-light btn settings_btn">Сохранить</button>
        </form>
    </section>`;
    this.container = document.querySelector('body > .container');
    this.container.innerHTML = this.settingsHtml;

    this.newCards = document.querySelector('.new_cards');
    this.cardsPerDay = document.querySelector('.cards_per_day');
    this.translation = document.querySelector('.translation');
    this.translationMeaning = document.querySelector('.translation_meaning');
    this.wordUse = document.querySelector('.word_use');
    this.wordTranscription = document.querySelector('.word_transcription');
    this.wordPicture = document.querySelector('.word_picture');
    this.showAnswer = document.querySelector('.show_answer');
    this.showDeleteButton = document.querySelector('.show_delete_button');
    this.showHardButton = document.querySelector('.show_hard_button');
    this.showButtons = document.querySelector('.show_buttons');
    this.settingsBtn = document.querySelector('.settings_btn');

    this.newCards.value = Settings.settings.newCards;
    this.cardsPerDay.value = Settings.settings.cardsPerDay;
    this.translation.checked = Settings.settings.translation;
    this.translationMeaning.checked = Settings.settings.translationMeaning;
    this.wordUse.checked = Settings.settings.wordUse;
    this.wordTranscription.checked = Settings.settings.wordTranscription;
    this.wordPicture.checked = Settings.settings.wordPicture;
    this.showAnswer.checked = Settings.settings.showAnswer;
    this.showDeleteButton.checked = Settings.settings.showDeleteButton;
    this.showHardButton.checked = Settings.settings.showHardButton;
    this.showButtons.checked = Settings.settings.showButtons;

    this.settingsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const newSettings = {
        newCards: +this.newCards.value,
        cardsPerDay: +this.cardsPerDay.value,
        translation: this.translation.checked,
        translationMeaning: this.translationMeaning.checked,
        wordUse: this.wordUse.checked,
        wordTranscription: this.wordTranscription.checked,
        wordPicture: this.wordPicture.checked,
        showAnswer: this.showAnswer.checked,
        showDeleteButton: this.showDeleteButton.checked,
        showHardButton: this.showHardButton.checked,
        showButtons: this.showButtons.checked,
      };
      Settings.settings(newSettings);
      console.log(newSettings);
    });
  }
}
