/* eslint-disable class-methods-use-this */
import { AuthPopup } from 'Components/AuthPopup';



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

  

  apiGetWords({ group = 0, page = 0} = {}) {
    const rejectErrorReport = (errorReport) => {
      reject(errorReport);
    };

    return new Promise((resolve, reject) => {
      fetch(`${API_URL}${API_WORDS}?group=${group}&page=${page}`)
        .then(
          (rawResponse) => {
            if (!this.isSuccess(rawResponse)) {
              reject(this.packError(rawResponse));
            }
            return rawResponse.json();
          }
        )
        .then((response) => {
          resolve(response);
        })
    })
  }

  
  checkToken() {
    const { userId, token } = localStorage;
    if (userId && token) {
      return true;
    }
    return false;
  }
}
