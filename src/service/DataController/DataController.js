import { AuthPopup } from 'Components/AuthPopup';
import {
  openAuthPopup,
  closeAuthPopup,
  authPopupState,
  userDataStore,
  showAuthReport,
} from 'Service/AppState';
import {
  apiGetWords,
  apiUserSettingsPut,
  apiUserSettingsGet,
  apiUserCreate,
  apiUserSignIn,
  apiUserWordsSave,
  apiUserWordsGet,
  apiUserWordsGetAll,
} from 'Service/ServerAPI';
import { reportMessages } from './reportMessages';
import { dataControllerConst } from './dataControllerConst';

const CANCEL_USER = {
  status: 0,
  message: 'User refused',
  name: 'Unknown',
};

const authPopup = new AuthPopup();

export class DataController {
  constructor() {
    authPopup.init();

    userDataStore.watch((userData) => {
      if (this.isAuthInProgress) {
        this.authChainResponsibility(userData);
      }
    });

    authPopupState.watch((state) => {
      if (state) {
        showAuthReport(reportMessages.default.welcome);
        this.isAuthInProgress = true;
      } else if (this.isAuthInProgress) {
        this.isAuthInProgress = false;
        this.reject(CANCEL_USER);
      }
    });
  }

  userWordsGetAll() {
    return apiUserWordsGetAll();
  }

  userWordsGet(wordId) {
    return apiUserWordsGet(wordId);
  }

  userWordsPut(wordData) {
    const sendWordData = {
      difficulty: wordData.status,
      optional: {
        lastDate: new Date().toDateString()
      }
    }
    return apiUserWordsSave(wordData.id, sendWordData, 'PUT')
  }

  userWordsPost(wordData) {
    const sendWordData = {
      difficulty: wordData.status,
      optional: {
        lastDate: new Date().toDateString()
      }
    }
    return apiUserWordsPut(wordData.id, sendWordData, 'POST')
  }

  getMaterials(file) {
    return new Promise ((resolve, reject) => {
      resolve(`${dataController.materialPath}${file}`);
    })
  }

  getWords(options) {
    return apiGetWords({ ...dataControllerConst.defaultZeroBlock, ...options });
  }

  logoutUser() {
    localStorage.setItem('token', '');
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      if (this.checkToken()) {
        apiUserSettingsGet().then(
          (userSettings) => resolve(this.unpackUserSettings(userSettings.optional)),
          () => {
            this.authChainResponsibility = this.chainSignInSettingsGet;
            openAuthPopup();
          },
        );
      } else {
        this.authChainResponsibility = this.chainSignInSettingsGet;
        openAuthPopup();
      }
    });
  }

  setUserOptions(userSettingsUpload) {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.userSettingsUpload = userSettingsUpload;

      if (this.checkToken()) {
        apiUserSettingsGet()
          .then((userSettingsOrigin) =>
            apiUserSettingsPut(
              this.prepareUploadSetting(userSettingsOrigin, this.userSettingsUpload),
            ),
          )
          .then(
            (userSettings) => resolve(this.unpackUserSettings(userSettings.optional)),
            (rejectReport) => reject(rejectReport),
          );
      } else {
        this.authChainResponsibility = this.chainSignInSettingsGetSettingsPut;
        openAuthPopup();
      }
    });
  }

  chainSignInSettingsGetSettingsPut(userData) {
    apiUserSignIn(userData)
      .then(() => apiUserSettingsGet())
      .then((userSettingsOrigin) =>
        apiUserSettingsPut(this.prepareUploadSetting(userSettingsOrigin, this.userSettingsUpload)),
      )
      .then(
        (userSettings) => {
          this.isAuthInProgress = false;
          closeAuthPopup();
          this.resolve(this.unpackUserSettings(userSettings.optional));
        },
        (rejectReport) => {
          showAuthReport(reportMessages[rejectReport.master][rejectReport.code]);
        },
      );
  }

  chainSignInSettingsGet(userData) {
    apiUserSignIn(userData)
      .then(() => apiUserSettingsGet())
      .then(
        (userSettings) => {
          this.isAuthInProgress = false;
          closeAuthPopup();
          this.resolve(this.unpackUserSettings(userSettings.optional));
        },
        (rejectReport) => {
          showAuthReport(reportMessages[rejectReport.master][rejectReport.code]);
        },
      );
  }

  checkToken() {
    const { userId, token } = localStorage;
    if (userId && token) {
      return true;
    }
    return false;
  }

  prepareUploadSetting(originSettings, uploadSettings) {
    return {
      optional: this.packUserSettings({
        ...this.unpackUserSettings(originSettings.optional),
        ...uploadSettings,
      }),
    };
  }

  unpackUserSettings(userSettings) {
    const resultUserSettings = {};
    for (const field in userSettings) {
      resultUserSettings[field] = JSON.parse(userSettings[field]);
    }
    return resultUserSettings;
  }

  packUserSettings(userSettings) {
    const resultUserSettings = {};
    for (const field in userSettings) {
      resultUserSettings[field] = JSON.stringify(userSettings[field]);
    }
    return resultUserSettings;
  }
}
