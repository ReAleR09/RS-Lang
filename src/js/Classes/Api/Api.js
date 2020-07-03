import { BACKEND_URL } from '../../../config';
import LocalStorageAdapter from '../../Utils/LocalStorageAdapter';
import { FIELD_TOKEN, FIELD_USER_ID } from '../../Utils/Constants';

const REQUESTS = {
  PUT: 'PUT',
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

let instance = null;

export default class Api {
  constructor() {
    if (instance) {
      return instance;
    }

    this.url = BACKEND_URL;

    instance = this;
  }

  static createUrlObject(urlString, endpoint, searchParams) {
    const newUrl = new URL(`${urlString}${endpoint}`);
    if (searchParams) {
      Object.entries(searchParams).forEach(([name, value]) => {
        newUrl.searchParams.append(name, value);
      });
    }
    return newUrl;
  }

  // eslint-disable-next-line class-methods-use-this
  get token() {
    return LocalStorageAdapter.get(FIELD_TOKEN);
  }

  // eslint-disable-next-line class-methods-use-this
  get userId() {
    return LocalStorageAdapter.get(FIELD_USER_ID);
  }

  async requestToAPI(type, endpoint, searchParams = undefined, bodyObject = undefined) {
    const url = Api.createUrlObject(this.url, endpoint, searchParams);

    const fetchOptions = {
      method: type,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    if (bodyObject) {
      fetchOptions.body = JSON.stringify(bodyObject);
    }

    const rawResponse = await fetch(url, fetchOptions);

    let content = {};
    if (rawResponse.status >= 400) {
      content.error = rawResponse.status;
    } else if (type !== REQUESTS.DELETE) {
      content = await rawResponse.json();
    }

    return content;
  }

  async post(endpoint, params, body) {
    const result = await this.requestToAPI(REQUESTS.POST, endpoint, params, body);
    return result;
  }

  async get(endpoint, params) {
    const result = await this.requestToAPI(REQUESTS.GET, endpoint, params);
    return result;
  }

  async put(endpoint, params, body) {
    const result = await this.requestToAPI(REQUESTS.PUT, endpoint, params, body);
    return result;
  }

  async delete(endpoint, params) {
    const result = await this.requestToAPI(REQUESTS.DELETE, endpoint, params);
    return result;
  }

  async authorize(user) {
    const endpoint = 'signin';
    const result = await this.post(endpoint, {}, user);
    return result;
  }

  async getNewTokensUsingRefreshToken(refreshToken, userId) {
    const endpoint = `users/${userId}/tokens`;

    const url = Api.createUrlObject(this.url, endpoint);

    const fetchOptions = {
      method: REQUESTS.GET,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    const rawResponse = await fetch(url, fetchOptions);

    let content = {};
    if (rawResponse.status >= 400) {
      content.error = rawResponse.status;
    } else {
      content = await rawResponse.json();
    }

    return content;
  }

  async register(user) {
    const endpoint = 'users';
    const result = await this.post(endpoint, {}, user);
    return result;
  }

  async getChunkOfWords(searchParams) {
    const endpoint = 'words';
    const result = await this.get(endpoint, searchParams);
    return result;
  }

  async getWordsCount(searchParams) {
    const endpoint = 'words/count';
    const result = await this.get(endpoint, searchParams);
    return result;
  }

  async getWordById(wordId) {
    const endpoint = `words/${wordId}`;
    const result = await this.get(endpoint);
    return result;
  }

  async getUsersWords() {
    const endpoint = `users/${this.userId}/words`;
    const result = await this.get(endpoint);
    return result;
  }

  async postUserWordById(wordId, wordData) {
    const endpoint = `users/${this.userId}/words/${wordId}`;
    const result = await this.post(endpoint, {}, wordData);
    return result;
  }

  async getUserWordById(wordId) {
    const endpoint = `users/${this.userId}/words/${wordId}`;
    const result = await this.get(endpoint);
    return result;
  }

  async putUserWordById(wordId, wordData) {
    const endpoint = `users/${this.userId}/words/${wordId}`;
    const result = await this.put(endpoint, {}, wordData);
    return result;
  }

  async deleteUserWordById(wordId) {
    const endpoint = `users/${this.userId}/words/${wordId}`;
    const result = await this.delete(endpoint);
    return result;
  }

  async getAggregatedWords(params) {
    const endpoint = `users/${this.userId}/aggregatedWords`;
    const result = await this.get(endpoint, params);
    return result;
  }

  async getAggregatedWordById(wordId) {
    const endpoint = `users/${this.userId}/aggregatedWords/${wordId}`;
    const result = await this.get(endpoint);
    return result;
  }

  async getUserStatistics() {
    const endpoint = `users/${this.userId}/statistics`;
    const result = await this.get(endpoint);
    return result;
  }

  async putUserStatistics(statistics) {
    const endpoint = `users/${this.userId}/statistics`;
    const result = await this.put(endpoint, {}, statistics);
    return result;
  }

  async getUserSettings() {
    const endpoint = `users/${this.userId}/settings`;
    const result = await this.get(endpoint);
    return result;
  }

  async putUserSettings(settings) {
    const endpoint = `users/${this.userId}/settings`;
    const result = await this.put(endpoint, {}, settings);
    return result;
  }

  async postUser(user) {
    const endpoint = 'users';
    const result = await this.put(endpoint, {}, user);
    return result;
  }

  async deleteUser() {
    const endpoint = `users/${this.userId}`;
    const result = await this.delete(endpoint);
    return result;
  }

  async putUser(user) {
    const endpoint = `users/${this.userId}`;
    const result = await this.put(endpoint, {}, user);
    return result;
  }

  async getUser() {
    const endpoint = `users/${this.userId}`;
    const user = await this.get(endpoint);
    return user;
  }
}
