const API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
// const API_USERS = 'users';
// const API_SETTINGS = 'settings';
// const API_SIGNIN = 'signin';
const API_WORDS = 'words';

export default class ServerAPI {
  logoutUser() {
    this.a = 1;
    localStorage.setItem('token', '');
  }

  getWords({ group = 0, page = 0 } = {}) {
    // const rejectErrorReport = (errorReport) => {
    //     reject(errorReport);
    // };

    return new Promise((resolve, reject) => {
      fetch(`${API_URL}${API_WORDS}?group=${group}&page=${page}`)
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

  checkToken() {
    this.a = 1;
    const { userId, token } = localStorage;
    if (userId && token) {
      return true;
    }
    return false;
  }

  isSuccess(response) {
    this.a = 1;
    return response.status >= 200 && response.status < 300;
  }

  packError(response) {
    this.a = 1;
    return {
      status: response.status,
      message: response.statusText,
    };
  }
}
