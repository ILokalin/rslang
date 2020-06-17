import { AuthPopup } from 'Components/AuthPopup';

const API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
const API_CREATE_USER = 'users';
const API_LOGIN_USER = 'signin';

export class ServerAPI {
  constructor() {
    this.userId = localStorage.getItem('userId');
    this.token = localStorage.getItem('token');
    this.isValid = '0';
  }

  isSuccess(response) {
    return response.status >= 200 && response.status < 300;
  }

  packError(response) {
    return {
      status: response.status,
      message: response.statusText,
    };
  }

  checkToken() {
    const { userId, token } = localStorage;

    if (userId && token) {
      return true;
    } 
    return false;
  }

  getUser() {
    return new Promise((resolve, reject) => {
      if (checkToken()) {
        // try connect
      }
      AuthPopup().then(
        () => {
          return true;
        },
        () => {
          return false;
        }
      )
    })
  }

  createUser(user) {
    return new Promise((resolve, reject) => {
      fetch(API_URL + API_CREATE_USER, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((rawResponse) => {
          if (this.isSuccess(rawResponse)) {
            return rawResponse.json();
          }
          reject(this.packError(rawResponse));
        })
        .then((response) => {
          resolve(response);
        });
    });
  }

  loginUser(user) {
    return new Promise((resolve, reject) => {
      fetch(API_URL + API_LOGIN_USER, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((rawResponse) => {
          if (this.isSuccess(rawResponse)) {
            return rawResponse.json();
          }
          reject(this.packError(rawResponse));
        })
        .then((response) => {
          resolve(response);
        });
    });
  }

  // Learned words
  async createUserWord(wordId, word) {
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`,
      {
        method: 'POST',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(word),
      },
    );
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
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
        },
      },
    );
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
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
        },
      },
    );
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
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/settings`,
      {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      },
    );
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
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/settings`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
        },
      },
    );
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
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`,
      {
        method: 'PUT',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statistics),
      },
    );
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
    const rawResponse = await fetch(
      `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`,
      {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: 'application/json',
        },
      },
    );
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
