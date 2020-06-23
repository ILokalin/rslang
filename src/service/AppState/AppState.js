import { createEvent, createStore } from 'effector';

export const openAuthPopup = createEvent();
export const closeAuthPopup = createEvent();
export const authPopupState = createStore(false)
  .on(openAuthPopup, () => true)
  .on(closeAuthPopup, () => false);

export const setUserData = createEvent();
export const userDateStore = createStore({}).on(setUserData, (_, userData) => userData);

export const showAuthReport = createEvent();
export const authReportStore = createStore('').on(
  showAuthReport,
  (_, rejectReport) => rejectReport,
);
