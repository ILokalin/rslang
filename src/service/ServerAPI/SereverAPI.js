import { api } from './apiPath';

const defaultWordsPerExample = 100;

function isSuccess(response) {
  return response.status >= 200 && response.status < 300;
}

export function apiGetWords(requestData) {
  const { page, group, wordsPerExampleSentenceLTE = '', wordsPerPage = '' } = requestData;

  let wordsPerExampleString = wordsPerExampleSentenceLTE
    ? `&wordsPerExampleSentenceLTE=${wordsPerExampleSentenceLTE}`
    : '';
  const wordsPerPageString = wordsPerPage ? `&wordsPerPage=${wordsPerPage}` : '';

  if (wordsPerPage !== '' && wordsPerExampleSentenceLTE === '') {
    wordsPerExampleString = `&wordsPerExampleSentenceLTE=${defaultWordsPerExample}`;
  }

  return new Promise((resolve, reject) => {
    fetch(
      `${api.url}${api.words}?group=${group}&page=${page}${wordsPerExampleString}${wordsPerPageString}`,
    )
      .then((rawResponse) => {
        if (isSuccess(rawResponse)) {
          return rawResponse.json();
        }
        const error = new Error(rawResponse.statusText);
        error.master = 'words';
        error.code = rawResponse.status;
        throw error;
      })
      .then((response) => {
        resolve(response);
      })
      .catch((errorReport) => reject(errorReport));
  });
}

export function apiUserSettingsPut(store) {
  return new Promise((resolve, reject) => {
    fetch(`${api.url}${api.users}/${localStorage.userId}/${api.settings}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(store),
    })
      .then((rawResponse) => {
        if (isSuccess(rawResponse)) {
          return rawResponse.json();
        }
        const error = new Error(rawResponse.statusText);
        error.master = 'userSettings';
        error.code = rawResponse.status;
        throw error;
      })
      .then((response) => {
        resolve(response);
      })
      .catch((errorReport) => reject(errorReport));
  });
}

export function apiUserSettingsGet() {
  return new Promise((resolve, reject) => {
    fetch(`${api.url}${api.users}/${localStorage.userId}/${api.settings}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((rawResponse) => {
        if (isSuccess(rawResponse)) {
          return rawResponse.json();
        }
        const error = new Error(rawResponse.statusText);
        error.master = 'userSettings';
        error.code = rawResponse.status;
        throw error;
      })
      .then((response) => {
        resolve(response);
      })
      .catch((errorReport) => reject(errorReport));
  });
}

export function apiUserCreate(user) {
  return new Promise((resolve, reject) => {
    fetch(api.url + api.users, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((rawResponse) => {
        if (isSuccess(rawResponse)) {
          return rawResponse.json();
        }
        const error = new Error(rawResponse.statusText);
        error.master = 'user';
        error.code = rawResponse.status;
        throw error;
      })
      .then((response) => {
        const { id, email } = response;
        localStorage.setItem('userId', id);
        localStorage.setItem('email', email);
        resolve(response);
      })
      .catch((errorReport) => reject(errorReport));
  });
}

export function apiUserSignIn(user) {
  return new Promise((resolve, reject) => {
    fetch(api.url + api.signin, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((rawResponse) => {
        if (isSuccess(rawResponse)) {
          return rawResponse.json();
        }
        const error = new Error(rawResponse.statusText);
        error.master = 'signIn';
        error.code = rawResponse.status;
        throw error;
      })
      .then((response) => {
        const { userId, token } = response;
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        resolve(response);
      })
      .catch((errorReport) => reject(errorReport));
  });
}
