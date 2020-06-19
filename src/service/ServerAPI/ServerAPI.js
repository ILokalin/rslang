/* eslint-disable class-methods-use-this */
import { AuthPopup } from 'Components/AuthPopup';
// import { openLoginPopup, stateAuth } from 'Service/Model';

const API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
const API_USERS = 'users';
const API_SETTINGS = 'settings';
const API_SIGNIN = 'signin';

export class ServerAPI {

  checkToken() {
    const { userId, token } = localStorage;
    if (userId && token) {
      return true;
    }
    return false;
  }

  logoutUser() {
    localStorage.setItem('token', '');
  }

  getUser() {
    return new Promise((resolve, reject) => {
      const showLoginUserPopup = () => {
        return new Promise((resolve, reject) => {
          AuthPopup().then(
            (user) => {
              resolve(user);
            },
            (error) => {
              reject(error);
            },
          );
        })
      };

      const rejectErrorReport = (errorReport) => {
        reject(errorReport);
      };

      if (this.checkToken()) {
        this.apiUserSettingsGet().then(
          (userSettings) => {
            resolve(userSettings.optional);
          },
          (errorUser) => {
            showLoginUserPopup().then(
              (user) => {
                //попытка логина
                resolve(user);
              },
              rejectErrorReport
            );
          },
        );
      } else {
        showLoginUserPopup()
          .then(
            (user) => {
              console.log(user)
              return this.apiUserSignIn(user);
            },
          )
          .then(
            () => {
              return this.apiUserSettingsGet();
            },
          )
          .then(
            (userSettings) => {
              resolve(userSettings.optional);
            },
            rejectErrorReport
          )
      }
    });
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
