import Api from './Api';
import { TEAM_KEY, TEAM_VALUE, GAMES } from '../../../config';
import { DICT_CATEGORIES } from './constants';

export default class SettingsApi {
  constructor() {
    this.api = new Api();
  }

  updateUserData(userData) {
    this.api.updateUserData(userData);
  }

  async init() {
    const result = await this.update();
    return result;
  }

  async update(settings) {
    let newSettings = settings;
    if (!settings) {
      newSettings = {
        difficulty: 0,
        wordsPerDay: 50,
        newWordsPerDay: 20,
        showWordTranslate: true,
        showExample: true,
        showTranscription: true,
        showMeaning: true,
        showButtonAnswer: true,
        showButtonDelete: true,
        showButtonComplicated: true,
        showImage: true,
        showWordRate: true,
        firstIntervalMinutes: 5,
        baseIntervalDays: 1,
        baseMultiplierPercents: 150,
        hardMultiplierPercents: 80,
        simpleMultiplierPercents: 120,
        maxIntervalDays: 250,
        annoyinglimit: 5,
        annoyingAction: DICT_CATEGORIES.COMPLICATED,
      };
      newSettings.saves = {};
      Object.values(GAMES).forEach((game) => {
        newSettings.saves[game] = {
          difficulty: 0,
          round: 0,
        };
      });
    }
    const settingStructure = {
      wordsPerDay: 50,
      optional: newSettings,
    };
    settingStructure.optional[TEAM_KEY] = TEAM_VALUE;
    const result = await this.api.putUserSettings(settingStructure);
    return result;
  }

  async checkValidity() {
    const settings = await this.get();

    let result = Object.prototype.hasOwnProperty.call(settings, TEAM_KEY);
    result = result && (settings[TEAM_KEY] === TEAM_VALUE);

    return result;
  }

  async get() {
    const settingsApiObject = await this.api.getUserSettings();
    const settings = settingsApiObject.optional;

    return settings;
  }
}
