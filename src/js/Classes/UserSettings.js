import SettingsApi from './Api/SettingsApi';

class UserSettings {
  constructor() {
    this.settingsObject = {};
    this.settingsApi = new SettingsApi();
  }

  set settings(newSettingsObject) {
    const keys = Object.keys(newSettingsObject);
    keys.forEach((key) => {
      this.settingsObject[key] = newSettingsObject[key];
    });
  }

  get settings() {
    return { ...this.settingsObject };
  }

  async saveSettings() {
    await this.settingsApi.update(this.settingsObject);
  }

  async loadSettings() {
    const newSettings = await this.settingsApi.get();

    if (!newSettings.error) {
      this.settingsObject = newSettings;
    }
  }

  async setDifficultyLevel(difficulty) {
    this.settingsObject.difficulty = difficulty;
    await this.saveSettings();
  }

  async saveGame(game, save = { difficulty: 0, round: 0 }) {
    this.settingsObject.saves[game] = save;
    await this.saveSettings();
  }

  async loadGame(game) {
    const difficulty = 0;
    const round = 0;
    let save = { difficulty, round };

    if (this.settingsObject.saves[game]) {
      save = this.settingsObject.saves[game];
    }

    return save;
  }

  get wordLimitsPerDay() {
    let limits;
    if (this.settings) {
      limits = {
        maxCount: this.settings.wordsPerDay,
        maxCountNewCards: this.settings.newWordsPerDay,
      };
    } else {
      limits = {
        maxCount: 50,
        maxCountNewCards: 15,
      };
    }
    return limits;
  }
}

const SettingsModel = new UserSettings();

// async function settingsInit() {
//   const validity = await SettingsModel.settingsApi.checkValidity();
//   if (!validity) {
//     await SettingsModel.settingsApi.update();
//   }
//   await SettingsModel.loadSettings();
// }

// settingsInit();

export default SettingsModel;
