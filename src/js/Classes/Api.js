export default class Api {
  constructor() {
    this.url = 'https://afternoon-falls-25894.herokuapp.com/';
  }

  async post(endpoint, param) {
    const rawResponse = await fetch(`${this.url}${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    });

    let content = {};
    if (rawResponse.status >= 400) {
      content.error = rawResponse.status;
    } else {
      content = await rawResponse.json();
    }

    return content;
  }

  async authorize(user) {
    const endpoint = 'signin';
    const result = await this.post(endpoint, user);
    return result;
  }

  async register(user) {
    const endpoint = 'users';
    const result = await this.post(endpoint, user);
    return result;
  }
}
