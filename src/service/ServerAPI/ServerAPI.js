/* eslint-disable class-methods-use-this */
import { AuthPopup } from 'Components/AuthPopup';

const API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
const API_USERS = 'users';
const API_SETTINGS = 'settings';
const API_SIGNIN = 'signin';

export class ServerAPI {
  logoutUser() {
    localStorage.setItem('token', '');
  }

  getUser() {
    return new Promise((resolve, reject) => {
      const showLoginUserPopup = () => {
        // TODO correct promises
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
            showLoginUserPopup()
              .then(
                (user) => {
                  this.apiUserSignIn(user)
                    then(
                      () => {
                        return this.apiUserSettingsGet();
                      }
                    )
                })
              .then(
                (userSettings) => {
                  resolve(userSettings.optional);
                },
                rejectErrorReport
              )
          },
        );
      } else {
        showLoginUserPopup()
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

  checkToken() {
    const { userId, token } = localStorage;
    if (userId && token) {
      return true;
    }
    return false;
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
}
