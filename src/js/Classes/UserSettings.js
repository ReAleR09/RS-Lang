import SettingsApi, { DEFAULT_USER_SETTINGS } from './Api/SettingsApi';
import Api from './Api/Api';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import {
  FIELD_USER_ID, FIELD_TOKEN, FIELD_REFRESH_TOKEN, FIELD_EMAIL,
} from '../Utils/Constants';
import { GAMES } from '../../config';
import ProgressBarInstance from './ProgressBar';
import ErrorHandling from './ErrorHandling';
import { API_SEND_ERROR } from './Api/constants';

class UserSettings {
  constructor() {
    this.settingsObject = {};
    this.settingsApi = new SettingsApi();
    this.api = new Api();
    this.isAuth = false;
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
    const result = await this.settingsApi.update(this.settingsObject);
    if (result.error) {
      ErrorHandling.handleNonCriticalError(result.error, API_SEND_ERROR);
    }
    return result;
  }

  /**
   * Возвращает false в случае фейла.
   * Когда создаётся новый пользователь, сеттинги по дефолту не создаются.
   * ТАк что false скорее всего потому, что сеттинги еще ни разу не сохранялись
   */
  async loadSettings() {
    const newSettings = await this.settingsApi.get();
    if (newSettings && !newSettings.error) {
      this.settingsObject = newSettings;
    } else {
      // if failed to load settings, init local settings with default object
      this.settingsObject = { ...DEFAULT_USER_SETTINGS };
    }
    // just in case
    if (!this.settingsObject.saves) {
      this.settingsObject.saves = {};
    }
    Object.values(GAMES).forEach((game) => {
      if (!this.settingsObject.saves[game]) {
        this.settingsObject.saves[game] = {
          difficulty: 0,
          round: 1,
        };
      }
    });
  }

  async setDifficultyLevel(difficulty) {
    this.settingsObject.difficulty = difficulty;
    await this.saveSettings();
  }

  async saveGame(game, save = { difficulty: 0, round: 1 }) {
    this.settingsObject.saves[game] = save;
    await this.saveSettings();
  }

  /**
   * Первая сложность - 0,
   * первый раунд - 1,
   * так повелось, сорян :D
   */
  loadGame(game) {
    const difficulty = 0;
    const round = 1;
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

  async auth({ email, password }) {
    UserSettings.clearLocalStorage();

    const userData = await this.api.authorize({ email, password });
    if (userData && !userData.error) {
      LocalStorageAdapter.set(FIELD_USER_ID, userData.userId);
      LocalStorageAdapter.set(FIELD_TOKEN, userData.token);
      LocalStorageAdapter.set(FIELD_REFRESH_TOKEN, userData.refreshToken);
      LocalStorageAdapter.set(FIELD_EMAIL, email);
      UserSettings.displayUserLogin(email);
      this.isAuth = true;

      // if success - get saved settings
      await this.loadSettings();
    }
    return userData;
  }

  async reviveAuth() {
    const refreshToken = LocalStorageAdapter.get(FIELD_REFRESH_TOKEN);
    const userId = LocalStorageAdapter.get(FIELD_USER_ID);
    if (!refreshToken || !userId) {
      UserSettings.clearLocalStorage();
      return false;
    }
    const response = await this.api.getNewTokensUsingRefreshToken(refreshToken, userId);
    if (response.error) {
      UserSettings.clearLocalStorage();
      return false;
    }
    LocalStorageAdapter.set(FIELD_TOKEN, response.token);
    LocalStorageAdapter.set(FIELD_REFRESH_TOKEN, response.refreshToken);
    const login = LocalStorageAdapter.get(FIELD_EMAIL);
    UserSettings.displayUserLogin(login);
    this.isAuth = true;
    // if success - get saved settings
    await this.loadSettings();
    return true;
  }

  logout() {
    UserSettings.removeUserLogin();
    UserSettings.clearLocalStorage();
    ProgressBarInstance.clearProgressBar();
    this.settingsObject = {};
    this.isAuth = false;
  }

  static clearLocalStorage() {
    LocalStorageAdapter.remove(FIELD_USER_ID);
    LocalStorageAdapter.remove(FIELD_TOKEN);
    LocalStorageAdapter.remove(FIELD_REFRESH_TOKEN);
    LocalStorageAdapter.remove(FIELD_EMAIL);
  }

  static displayUserLogin(login) {
    const nameBar = document.querySelector('#application_username');
    nameBar.innerHTML = login;
  }

  static removeUserLogin() {
    const nameBar = document.querySelector('#application_username');
    nameBar.innerHTML = '';
  }
}

const SettingsModel = new UserSettings();

export default SettingsModel;
