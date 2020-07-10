import { api } from './SereverApiConst';

const defaultWordsPerExample = 100;

function isSuccess(response) {
  return response.status >= 200 && response.status < 300;
}

export function apiWordMaterialsGet(wordId) {
  const fetchUrl = `${api.url}${api.words}/${wordId}`;
  return new Promise((resolve, reject) => {
    fetch(fetchUrl)
      .then((rawResponse) => {
        if (isSuccess(rawResponse)) {
          return rawResponse.json();
        }
        const error = new Error(rawResponse.statusText);
        error.master = 'words';
        error.code = rawResponse.status;
        throw error;
      })
      .then((response) => resolve(response))
      .catch((errorReport) => reject(errorReport));
  });
}

export function apiUserAggregatedWords(difficultyGroup) {
  const queryString = difficultyGroup.map((group) => `{"userWord.difficulty":"${group}"}`);
  const filter = encodeURIComponent(`{"$or":[${queryString}]}`);
  const fetchUrl = `${api.url}${api.users}/${localStorage.userId}/${api.aggregatedWords}?wordsPerPage=3600&filter=${filter}`;

  return new Promise((resolve, reject) => {
    fetch(fetchUrl, {
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

export function apiUserWordsGetAll() {
  return new Promise((resolve, reject) => {
    fetch(`${api.url}${api.users}/${localStorage.userId}/${api.words}`, {
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

export function apiUserWordsGet(wordId) {
  return new Promise((resolve, reject) => {
    fetch(`${api.url}${api.users}/${localStorage.userId}/${api.words}/${wordId}`, {
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

export function apiUserWordsSave(wordId, wordData, method) {
  const fetchUrl = `${api.url}${api.users}/${localStorage.userId}/${api.words}/${wordId}`;
  return new Promise((resolve, reject) => {
    fetch(fetchUrl, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(wordData),
    })
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

export function apiUserSettingsPut(userSettingsUpload, section = 'settings') {
  return new Promise((resolve, reject) => {
    fetch(`${api.url}${api.users}/${localStorage.userId}/${api[section]}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userSettingsUpload),
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
      .then((userSettings) => {
        resolve(userSettings);
      })
      .catch((errorReport) => reject(errorReport));
  });
}

export function apiUserSettingsGet(section = 'settings') {
  return new Promise((resolve, reject) => {
    fetch(`${api.url}${api.users}/${localStorage.userId}/${api[section]}`, {
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
          return resolve();
        }
        const error = new Error(rawResponse.statusText);
        error.master = 'user';
        error.code = rawResponse.status;
        throw error;
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
