/* eslint-disable class-methods-use-this */
import { AuthPopup } from 'Components/AuthPopup';

const API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
const API_USERS = 'users';
const API_SETTINGS = 'settings';
const API_SIGNIN = 'signin';

export class ServerAPI {
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
      const showLoginUserPopup = () => {
        AuthPopup().then(
          () => {
            return true;
          },
          () => {
            return false;
          },
        );
      };

      if (this.checkToken()) {
        this.apiUserSettingsGet(this.userId).then(
          (options) => {
            resolve(options);
          },
          () => {
            showLoginUserPopup().then(
              () => {
                //попытка логина
                resolve();
              },
              () => {
                // Игра без имени
                reject();
              },
            );
          },
        );
      } else {
        showLoginUserPopup().then(
          // TODO убрать повтор после отладки
          () => {
            //попытка логина
            resolve();
          },
          () => {
            // Игра без имени
            reject();
          },
        );
      }
    });
  }

  apiUserSettingsPut(store) {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}${API_USERS}/${localStorage.userId}/${API_SETTINGS}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(store),
      })
        .then((rawResponse) => {
          if (!this.isSuccess(rawResponse)) {
            reject(this.packError(rawResponse));
          }
          return rawResponse.json();
        })
        .then((response) => {
          resolve(response);
        });
    });
  }

  apiUserSettingsGet() {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}${API_USERS}/${localStorage.userId}/${API_SETTINGS}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
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

  apiUserCreate(user) {
    return new Promise((resolve, reject) => {
      fetch(API_URL + API_USERS, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((rawResponse) => {
          if (!this.isSuccess(rawResponse)) {
            reject(this.packError(rawResponse));
          }
          return rawResponse.json();
        })
        .then((response) => {
          const { id, email } = response;
          localStorage.setItem('userId', id);
          localStorage.setItem('email', email);
          resolve(response);
        });
    });
  }

  apiUserSignIn(user) {
    return new Promise((resolve, reject) => {
      fetch(API_URL + API_SIGNIN, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((rawResponse) => {
          if (!this.isSuccess(rawResponse)) {
            reject(this.packError(rawResponse));
          }
          return rawResponse.json();
        })
        .then((response) => {
          const { userId, token } = response;
          localStorage.setItem('userId', userId);
          localStorage.setItem('token', token);
          resolve(response);
        });
    });
  }

  testAuth() {
    return AuthPopup();
  }

  // // Learned words
  // async createUserWord(wordId, word) {
  //   const rawResponse = await fetch(
  //     `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`,
  //     {
  //       method: 'POST',
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(word),
  //     },
  //   );
  //   try {
  //     const content = await rawResponse.json();
  //     this.isValid = 1;
  //     return content;
  //   } catch (e) {
  //     console.log(rawResponse);
  //     this.isValid = 0;
  //   }
  // }

  // async getUserWord(wordId) {
  //   const rawResponse = await fetch(
  //     `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words/${wordId}`,
  //     {
  //       method: 'GET',
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //         Accept: 'application/json',
  //       },
  //     },
  //   );
  //   try {
  //     const content = await rawResponse.json();
  //     this.isValid = 1;
  //     return content;
  //   } catch (e) {
  //     console.log(rawResponse);
  //     this.isValid = 0;
  //   }
  // }

  // async getAllUserWords() {
  //   const rawResponse = await fetch(
  //     `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/words`,
  //     {
  //       method: 'GET',
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //         Accept: 'application/json',
  //       },
  //     },
  //   );
  //   try {
  //     const content = await rawResponse.json();
  //     this.isValid = 1;
  //     return content;
  //   } catch (e) {
  //     console.log(rawResponse);
  //     this.isValid = 0;
  //   }
  // }

  // // settings

  // /* @param {Object} settings
  //  *  @return {Promise}
  //  *
  //  * @example
  //  * const settings = {
  //  *   "wordsPerDay": 0, --> must be > 0
  //  *   "optional": {} --> must contain only NOT EMPTY STRING fields
  //  *  }
  //  */
  // async updateUserSettings(settings) {
  //   const rawResponse = await fetch(
  //     `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/settings`,
  //     {
  //       method: 'PUT',
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(settings),
  //     },
  //   );
  //   try {
  //     const content = await rawResponse.json();
  //     this.isValid = 1;
  //     return content;
  //   } catch (e) {
  //     console.log(rawResponse);
  //     this.isValid = 0;
  //   }
  // }

  // async getUserSettings() {
  //   const rawResponse = await fetch(
  //     `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/settings`,
  //     {
  //       method: 'GET',
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //         Accept: 'application/json',
  //       },
  //     },
  //   );
  //   try {
  //     const content = await rawResponse.json();
  //     this.isValid = 1;
  //     return content;
  //   } catch (e) {
  //     console.log(rawResponse);
  //     this.isValid = 0;
  //   }
  // }

  // // user statistics

  // /* @param {Object} statistics
  //  *  @return {Promise}
  //  *
  //  * @example
  //  * const statistics = {
  //  *   "learnedWords": 0,
  //  *   "optional": {} --> must contain only NOT EMPTY STRING fields
  //  *  }
  //  */
  // async updateUserStatistics(statistics) {
  //   const rawResponse = await fetch(
  //     `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`,
  //     {
  //       method: 'PUT',
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(statistics),
  //     },
  //   );
  //   try {
  //     const content = await rawResponse.json();
  //     this.isValid = 1;
  //     return content;
  //   } catch (e) {
  //     console.log(rawResponse);
  //     this.isValid = 0;
  //   }
  // }

  // async getUserStatistics() {
  //   const rawResponse = await fetch(
  //     `https://afternoon-falls-25894.herokuapp.com/users/${this.userId}/statistics`,
  //     {
  //       method: 'GET',
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${this.token}`,
  //         Accept: 'application/json',
  //       },
  //     },
  //   );
  //   try {
  //     const content = await rawResponse.json();
  //     this.isValid = 1;
  //     return content;
  //   } catch (e) {
  //     console.log(rawResponse);
  //     this.isValid = 0;
  //   }
  // }
}
