class UserSettings {
  constructor() {
    this.settingsObject = {
      newCards: 15,
      cardsPerDay: 40,
      translation: true,
      translationMeaning: true,
      wordUse: true,
      wordTranscription: true,
      wordPicture: true,
      showAnswer: true,
      showDeleteButton: true,
      showHardButton: true,
      showButtons: true,
    };
  }

  set settings(settingsObject) {
    this.settingsObject = settingsObject;
  }

  get settings() {
    return this.settingsObject;
  }
}

const Settings = new UserSettings();

export default Settings;
