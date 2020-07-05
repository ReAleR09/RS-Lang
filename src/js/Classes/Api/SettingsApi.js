import Api from './Api';
import { TEAM_KEY, TEAM_VALUE, GAMES } from '../../../config';
import { DICT_CATEGORIES } from './constants';

export const DEFAULT_USER_SETTINGS = {
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
  games: {},
  firstIntervalMinutes: 5,
  baseIntervalDays: 1,
  baseMultiplierPercents: 150,
  hardMultiplierPercents: 80,
  simpleMultiplierPercents: 120,
  maxIntervalDays: 250,
  annoyinglimit: 5,
  annoyingAction: DICT_CATEGORIES.COMPLICATED,
};
DEFAULT_USER_SETTINGS.saves = {};
Object.values(GAMES).forEach((game) => {
  DEFAULT_USER_SETTINGS.saves[game] = {
    difficulty: 0,
    round: 1,
  };
});

export default class SettingsApi {
  constructor() {
    this.api = new Api();
  }

  async init() {
    const result = await this.update();
    return result;
  }

  async update(settings) {
    let newSettings = settings;
    if (!settings) {
      newSettings = {
        ...DEFAULT_USER_SETTINGS,
      };
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

    if (!settingsApiObject.optional) return false;

    return settingsApiObject.optional;
  }
}
