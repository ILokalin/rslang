const API_URL = 'https://afternoon-falls-25894.herokuapp.com/';
const API_USERS = 'users';
const API_SETTINGS = 'settings';
const API_SIGNIN = 'signin';
const API_WORDS = 'words';

function isSuccess(response) {
    return response.status >= 200 && response.status < 300;
  }

function packError(response) {
  return {
    status: response.status,
    message: response.statusText,
  };
}

export apiGetWords({ group = 0, page = 0} = {}) {
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

export apiUserSettingsPut(store) {
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

export apiUserSettingsGet() {
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

export apiUserCreate(user) {
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

export apiUserSignIn(user) {
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
