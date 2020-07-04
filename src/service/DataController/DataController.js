import { AuthPopup } from 'Components/AuthPopup';
import moment from 'moment';
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
  apiUserAggregatedWords,
  apiWordMaterialsGet,
} from 'Service/ServerAPI';
import { reportMessages } from './reportMessages';
import { dataControllerConst } from './dataControllerConst';

const authPopup = new AuthPopup();

export class DataController {
  constructor() {
    authPopup.init();

    userDataStore.watch((userData) => {
      if (this.isAuthInProgress) {
        if (userData.statusRegister) {
          this.authChainResponsibility = this.chainCreateSignInSettingsGet;
        }
        this.authChainResponsibility(userData);
      }
    });

    authPopupState.watch((state) => {
      if (state) {
        showAuthReport(reportMessages.default.welcome);
        this.isAuthInProgress = true;
      } else if (this.isAuthInProgress) {
        this.isAuthInProgress = false;
        this.reject(dataControllerConst.cancelUser);
      }
    });
  }

  getWordMaterials(wordId) {
    return apiWordMaterialsGet(wordId).then((wordMaterials) => {
      const materials = {
        image: dataControllerConst.imageBase64Prifex.concat(wordMaterials.image),
        audio: dataControllerConst.audioBase64Prifex.concat(wordMaterials.audio),
        audioExample: dataControllerConst.audioBase64Prifex.concat(wordMaterials.audioExample),
        audioMeaning: dataControllerConst.audioBase64Prifex.concat(wordMaterials.audioMeaning),
      };

      return { ...wordMaterials, ...materials };
    });
  }

  userWordsGetAll(groupWords) {
    return apiUserAggregatedWords(groupWords);
  }

  userWordsGet(wordId) {
    return apiUserWordsGet(wordId);
  }

  userWordsPut({ status = 'onlearn', id, progress = 0 }) {
    const sendWordData = {
      difficulty: status,
      optional: {
        lastDate: new Date().toDateString(),
        progress,
      },
    };
    return apiUserWordsSave(id, sendWordData, 'PUT');
  }

  userWordsPost({ status = 'onlearn', id, progress = 0 }) {
    const sendWordData = {
      difficulty: status,
      optional: {
        lastDate: new Date().toDateString(),
        progress,
      },
    };
    return apiUserWordsSave(id, sendWordData, 'POST');
  }

  getMaterials(file) {
    return new Promise((resolve) => {
      resolve(`${dataControllerConst.materialPath}${file}`);
    });
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

  setUserStatistics(statisticsData) {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      this.userStatisticUpload = statisticsData;

      if (this.checkToken()) {
        apiUserSettingsGet('statistics')
          .then((currentStatistics) =>
            apiUserSettingsPut(
              this.prepareUploadStatistics(currentStatistics, statisticsData),
              'statistics',
            ),
          )
          .then(
            (data) => resolve(this.orderingStatResult(data)),
            (rejectReport) => reject(rejectReport),
          );
      } else {
        // temp cover - TODO algorithm for auth
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ message: 'user not defined' });
      }
    });
  }

  getUserStatistics() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      if (this.checkToken()) {
        apiUserSettingsGet('statistics').then(
          (userStatistics) => {
            resolve(this.orderingStatResult(userStatistics));
          },
          (rejectReport) => reject(rejectReport),
        );
      } else {
        // temp cover - TODO algorithm for auth
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({ message: 'user not defined' });
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

  chainCreateSignInSettingsGet(userData) {
    const userSettingsName = {
      optional: this.packUserSettings({
        name: userData.name,
      }),
    };
    apiUserCreate(userData)
      .then(() => apiUserSignIn(userData))
      .then(() => apiUserSettingsPut({ learnedWords: 0 }, 'statistics'))
      .then(() => apiUserSettingsPut(userSettingsName))
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

  orderingStatResult(userStatistics) {
    const { learnedWords = 0, optional = {} } = userStatistics;
    const originStatistics = {
      ...this.unpackUserSettings(optional),
    };
    originStatistics.learnedWords = learnedWords;

    return originStatistics;
  }

  findTopStatistics(topList, currentResult) {
    let nextFindPosition = currentResult;

    const topResult = topList.map((topPosition) => {
      if (nextFindPosition.result >= topPosition.result) {
        const returnItem = nextFindPosition;
        nextFindPosition = topPosition;
        return returnItem;
      }
      return topPosition;
    });

    if (topResult.length < 5) {
      topResult.push(nextFindPosition);
    }

    return topResult;
  }

  // this.shortTermStat = {
  //     date: new Date().toDateString(),
  //     totalCards: 0, //суммируется
  //     wrightAnswers: 0,//суммируется
  //     newWords:0,//суммируется и отправляется в долгосруочную
  //     chain: 0,//суммируется
  //     longestChain:0, // НЕ суммируется
  //   }

  cardStatisticsAggregate(originStatOptionalCard, shortTimeStat, today) {
    const shortStatTemplate = {
      date: today,
      totalCards: 0,
      wrightAnswers: 0,
      newWords: 0,
      chain: 0,
      longestChain: 0,
    };
    const { longTime = [], shortTime = shortStatTemplate } = originStatOptionalCard;
    const { totalCards, wrightAnswers, newWords, chain, longestChain } = shortTimeStat;
    const resultOptionalCard = {
      longTime,
      shortTime,
    };

    if (shortTime.date === today) {
      resultOptionalCard.shortTime.totalCards += totalCards;
      resultOptionalCard.shortTime.wrightAnswers += wrightAnswers;
      resultOptionalCard.shortTime.newWords += newWords;
      resultOptionalCard.shortTime.chain = chain;
      resultOptionalCard.shortTime.longestChain = longestChain;
    } else {
      const longTimeStatItem = [shortTime.date, shortTime.newWords];
      resultOptionalCard.longTime.push(longTimeStatItem);
      resultOptionalCard.shortTime = { ...shortStatTemplate, ...shortTimeStat };
    }

    return resultOptionalCard;
  }

  prepareUploadStatistics(originStatistics, uploadStatistics) {
    const today = moment().format('DD-MMM-YYYY');
    const { learnedWords = 0, optional = {} } = originStatistics;
    const tempStatisticsObject = {
      optional: this.unpackUserSettings(optional),
    };

    if (uploadStatistics.card) {
      tempStatisticsObject.learnedWords = learnedWords + uploadStatistics.card.newWords;
      tempStatisticsObject.optional.card = this.cardStatisticsAggregate(
        optional,
        uploadStatistics.card,
        today,
      );
    } else {
      Object.keys(uploadStatistics).forEach((key) => {
        const todayAsObj = { date: today };
        const statisticsItem = { ...uploadStatistics[key], ...todayAsObj };
        if (optional[key]) {
          tempStatisticsObject.optional[key].longTime.push(statisticsItem);
          tempStatisticsObject.optional[key].top = this.findTopStatistics(
            tempStatisticsObject.optional[key].top,
            statisticsItem,
          );
        } else {
          tempStatisticsObject.optional[key] = {
            longTime: [statisticsItem],
            top: [statisticsItem],
          };
        }
      });
    }

    tempStatisticsObject.optional = this.packUserSettings(tempStatisticsObject.optional);
    console.log(tempStatisticsObject);
    return tempStatisticsObject;
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
    Object.keys(userSettings).forEach((field) => {
      resultUserSettings[field] = JSON.parse(userSettings[field]);
    });
    return resultUserSettings;
  }

  packUserSettings(userSettings) {
    const resultUserSettings = {};
    Object.keys(userSettings).forEach((field) => {
      resultUserSettings[field] = JSON.stringify(userSettings[field]);
    });
    return resultUserSettings;
  }
}
