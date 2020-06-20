/* eslint-disable class-methods-use-this */
const API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
const API_USERS = 'users';
const API_SETTINGS = 'settings';
const API_SIGNIN = 'signin';
const API_WORDS = 'words';

export class ServerAPI {

  logoutUser() {
    localStorage.setItem('token', '');
  }

  getWords(wordsQuery) {
    const rejectErrorReport = (errorReport) => {
      reject(errorReport);
    };

    return new Promise((resolve, reject) => {
      fetch(API_URL + API_WORDS, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wordsQuery),
      })
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