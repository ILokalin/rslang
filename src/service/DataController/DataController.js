import { AuthPopup } from 'Components/AuthPopup';
import { reportMessages } from './reportMessages';
import { 
  openAuthPopup,
  closeAuthPopup, 
  authPopupState, 
  userDateStore, 
  showAuthReport,
} from 'Service/AppState';
import {
  apiGetWords,
  apiUserSettingsPut,
  apiUserSettingsGet,
  apiUserCreate,
  apiUserSignIn,
} from 'Service/ServerAPI';

const CANCEL_USER = {
  status: 0,
  message: 'User refused',
  name: 'Unknown'
}

const authPopup = new AuthPopup;

export class DataController {
  constructor() {
    userDateStore.watch((userData) => {
      if (this.isAuthInProgress) {
        this.authChainResponsibility(userData);
      }
    })

    authPopupState.watch((state) => {
      if (state) {
        showAuthReport('Please input email & password');
        this.isAuthInProgress = true;
      } else {
        if (this.isAuthInProgress) {
          this.isAuthInProgress = false;
          this.reject(CANCEL_USER);
        }
      }
    })
  }

  getWords(options) {
    const { group = 0, page = 0 } = options;
    return apiGetWords({ group, page });
  }

  logoutUser() {
    localStorage.setItem('token', '');
  }

  getUser() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      if (this.checkToken()) {
        apiUserSettingsGet()
          .then(
            (userSettings) => resolve(userSettings.optional),
            () => {
              openAuthPopup();
            }
          )
      } else {
        openAuthPopup();
      }
    })
  }

  authChainResponsibility(userData) {
      apiUserSignIn(userData)
        .then(
          () => apiUserSettingsGet(),
        )
        .then(
          (userSettings) => {
            this.isAuthInProgress = false;
            closeAuthPopup();
            this.resolve(userSettings.optional);
          },
          (rejectReport) => {
            showAuthReport(reportMessages[rejectReport.master][rejectReport.code]);
          }
        )
    }

  checkToken() {
    const { userId, token } = localStorage;
    if (userId && token) {
      return true;
    }
    return false;
  }
}
