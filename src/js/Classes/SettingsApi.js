import Api from './Api';
import { TEAM_KEY, TEAM_VALUE } from '../../config';

export default class SettingsApi {
  constructor() {
    this.api = new Api();
  }

  updateUserData(userData) {
    this.api.updateUserData(userData);
  }

  async initSettings() {
    const result = await this.changeSettings();
    return result;
  }

  async changeSettings(settings = {
    wordsPerDay: 50,
    newWordsPerDay: 20,
    showWordTranslate: true,
    showExample: true,
    showTranscription: true,
    showMeaning: true,
    showButtonSkip: true,
    showButtonDelete: true,
    showButtonComplicated: true,
    showImage: true,
    showWordRate: true,
  }) {
    const settingStructure = {
      wordsPerDay: 50,
      optional: settings,
    };
    settingStructure.optional[TEAM_KEY] = TEAM_VALUE;
    const result = await this.api.putUserSettings(settingStructure);
    return result;
  }

  async checkSettingsValidity() {
    const settings = await this.getSettings();
    let result = Object.prototype.hasOwnProperty.call(settings, TEAM_KEY);
    result = result && (settings[TEAM_KEY] === TEAM_VALUE);

    return result;
  }

  async getSettings() {
    const settingsApiObject = await this.api.getSettings();
    const settings = settingsApiObject.optional;
    return settings;
  }
}
