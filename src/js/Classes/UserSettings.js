import SettingsApi from './Api/SettingsApi';
import { GAMES } from '../../config';

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
      const gamesArray = Object.values(GAMES);
      gamesArray.forEach((game) => {
        if (Object.prototype.hasOwnProperty.call(this.settingsObject.games, game)) {
          this.settingsObject.games[game] = {};
        }
      });
    }
  }

  async setDifficultyLevel(difficulty) {
    this.settingsObject.difficulty = difficulty;
    await this.saveSettings();
  }

  async saveGame(game, save = { difficulty: 0, round: 0 }) {
    this.settingsObject.games[game].lastSave = save;
    await this.saveSettings();
  }

  async loadGame(game) {
    const difficulty = 0;
    const round = 0;
    let save = { difficulty, round };

    if (this.settingsObject.games[game].lastSave) {
      save = this.settingsObject.games[game].lastSave;
    }

    return save;
  }
}

const SettingsModel = new UserSettings();

export default SettingsModel;
