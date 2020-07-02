import SettingsApi, { DEFAULT_USER_SETTINGS } from './Api/SettingsApi';
import Api from './Api/Api';
import { GAMES } from '../../config';
import LocalStorageAdapter from '../Utils/LocalStorageAdapter';
import { FIELD_USER_ID, FIELD_TOKEN, FIELD_REFRESH_TOKEN } from '../Utils/Constants';

class UserSettings {
  constructor() {
    this.settingsObject = {};
    this.settingsApi = new SettingsApi();
    this.api = new Api();
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
      this.settingsObject = DEFAULT_USER_SETTINGS;
    }
    // Создать пустые записи для игор, которые еще не фигурировали в сейвах на бэке
    const gamesArray = Object.values(GAMES);
    gamesArray.forEach((game) => {
      if (!Object.prototype.hasOwnProperty.call(this.settingsObject.games, game)) {
        this.settingsObject.games[game] = {};
      }
    });
  }

  async setDifficultyLevel(difficulty) {
    this.settingsObject.difficulty = difficulty;
    await this.saveSettings();
  }

  async saveGame(game, save = { difficulty: 0, round: 0 }) {
    this.settingsObject.games[game].lastSave = save;
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

    if (this.settingsObject.games[game].lastSave) {
      save = this.settingsObject.games[game].lastSave;
    }

    return save;
  }

  async auth({ email, password }) {
    UserSettings.clearLocalStorage();

    const userData = await this.api.authorize({ email, password });
    if (userData && !userData.error) {
      LocalStorageAdapter.set(FIELD_USER_ID, userData.userId);
      LocalStorageAdapter.set(FIELD_TOKEN, userData.token);
      LocalStorageAdapter.set(FIELD_REFRESH_TOKEN, userData.refreshToken);

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
    // if success - get saved settings
    await this.loadSettings();
    return true;
  }

  logout() {
    UserSettings.clearLocalStorage();
    this.settingsObject = {};
  }

  static clearLocalStorage() {
    LocalStorageAdapter.remove(FIELD_USER_ID);
    LocalStorageAdapter.remove(FIELD_TOKEN);
    LocalStorageAdapter.remove(FIELD_REFRESH_TOKEN);
  }
}

const SettingsModel = new UserSettings();

export default SettingsModel;
