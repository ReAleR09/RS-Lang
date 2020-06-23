export default class UserSettings {
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

  set settings(newSettingsObject) {
    this.settingsObject = { ...newSettingsObject };
  }

  get settings() {
    return { ...this.settingsObject };
  }

  // working with API there or in another class and this is only settings container?
}
