/* eslint-disable consistent-return */
export default class UserService {
  constructor() {
    this.userId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
    this.isValid = '0';
  }

  async createUser(user) {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }

  // Logins a user and returns a JWT-token
  async loginUser(user) {
    const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }

  // Learned words
  async createUserWord(wordId, word) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`, {
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }

  async getUserWord(wordId) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }

  async getAllUserWords() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }

  // settings

  /* @param {Object} settings
  *  @return {Promise}
  *
  * @example
  * const settings = {
  *   "wordsPerDay": 0, --> must be > 0
  *   "optional": {} --> must contain only NOT EMPTY STRING fields
  *  }
  */
  async updateUserSettings(settings) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }

  async getUserSettings() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/settings`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }

  // user statistics

  /* @param {Object} statistics
  *  @return {Promise}
  *
  * @example
  * const statistics = {
  *   "learnedWords": 0,
  *   "optional": {} --> must contain only NOT EMPTY STRING fields
  *  }
  */
  async updateUserStatistics(statistics) {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistics),
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }

  async getUserStatistics() {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/json',
      },
    });
    try {
      const content = await rawResponse.json();
      this.isValid = 1;
      return content;
    } catch (e) {
      console.log(rawResponse);
      this.isValid = 0;
    }
  }
}
