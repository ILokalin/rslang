import { createEvent, createStore } from 'effector';
import { preloaderCommand, defaultMessageReport } from './AppStateConst';

export const openAuthPopup = createEvent();
export const closeAuthPopup = createEvent();
export const authPopupState = createStore(false)
  .on(openAuthPopup, () => true)
  .on(closeAuthPopup, () => false);

export const setUserData = createEvent();
export const userDataStore = createStore({}).on(setUserData, (_, userData) => userData);

export const showAuthReport = createEvent();
export const authReportStore = createStore('').on(
  showAuthReport,
  (_, rejectReport) => rejectReport,
);

export const openPreloader = createEvent();
export const closePreloader = createEvent();
export const preloaderState = createStore(preloaderCommand.hide)
  .on(openPreloader, (_, value) => value)
  .on(closePreloader, (_, value) => value);

export const openMessageReport = createEvent();
export const closeMessageReport = createEvent();
export const messageReportState = createStore(defaultMessageReport)
  .on(openMessageReport, (_, value) => ({ ...value, ...{ isVisible: true } }))
  .on(closeMessageReport, () => defaultMessageReport);

export const answerFromMessageReport = createEvent();
export const answerfromReportStore = createStore('').on(
  answerFromMessageReport,
  (_, answer) => answer,
);
