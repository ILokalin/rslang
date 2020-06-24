import LocalStorageMock from "./LocalStorageMock";
import { createEvent } from "effector";
import { DataController } from "../DataController";
import {
  openAuthPopup,
  closeAuthPopup,
  authPopupState,
  userDataStore,
  setUserData,
  authReportStore,
  showAuthReport,
} from "Service/AppState";

global.fetch = require("node-fetch");

global.localStorage = new LocalStorageMock();
const dataController = new DataController();

const testUser = {
  email: "checker@mail.ru",
  password: "checkerCH#2",
};

const cancelUser = {
  status: 0,
  message: "User refused",
  name: "Unknown",
};

describe("Helpers tests", () => {
  test("unpack create normal object", () => {
    const optionalTest = {
      name: '"Tester Testovich"',
      settings:
        '{"lastTrain":"date","cardsPerDay":30,"newCardsPerDay":15,"justNewWords":0,"cardContainsTranslation":1,"cardContainsMeaning":0,"cardContainsMeaningTransl":0,"cardContainsExample":0,"cardContainsExampleTransl":0,"cardContainsPicture":1,"cardContainsTranscription":1,"footerBtnsEnabled":1,"deleteBtnEnabled":1,"showAnswerBtnEnabled":0,"autoPlayEnabled":1}',
    };

    const expectResult = {
      name: "Tester Testovich",
      settings: {
        lastTrain: "date",
        cardsPerDay: 30,
        newCardsPerDay: 15,
        justNewWords: 0,
        cardContainsTranslation: 1,
        cardContainsMeaning: 0,
        cardContainsMeaningTransl: 0,
        cardContainsExample: 0,
        cardContainsExampleTransl: 0,
        cardContainsPicture: 1,
        cardContainsTranscription: 1,
        footerBtnsEnabled: 1,
        deleteBtnEnabled: 1,
        showAnswerBtnEnabled: 0,
        autoPlayEnabled: 1,
      },
    };

    expect(dataController.unpackUserSettings(optionalTest)).toEqual(
      expectResult
    );
  });
  test("pack converts object fields to strings", () => {
    const optionalTest = {
      name: "Tester Testovich",
      settings: {
        lastTrain: "date",
        cardsPerDay: 30,
        newCardsPerDay: 15,
        justNewWords: 0,
        cardContainsTranslation: 1,
        cardContainsMeaning: 0,
        cardContainsMeaningTransl: 0,
        cardContainsExample: 0,
        cardContainsExampleTransl: 0,
        cardContainsPicture: 1,
        cardContainsTranscription: 1,
        footerBtnsEnabled: 1,
        deleteBtnEnabled: 1,
        showAnswerBtnEnabled: 0,
        autoPlayEnabled: 1,
      },
    };

    const expectResult = {
      name: '"Tester Testovich"',
      settings:
        '{"lastTrain":"date","cardsPerDay":30,"newCardsPerDay":15,"justNewWords":0,"cardContainsTranslation":1,"cardContainsMeaning":0,"cardContainsMeaningTransl":0,"cardContainsExample":0,"cardContainsExampleTransl":0,"cardContainsPicture":1,"cardContainsTranscription":1,"footerBtnsEnabled":1,"deleteBtnEnabled":1,"showAnswerBtnEnabled":0,"autoPlayEnabled":1}',
    };

    expect(dataController.packUserSettings(optionalTest)).toEqual(expectResult);
  });
});

describe("The getWords", () => {
  test("getWords gets custom words per page", async () => {
    await expect(
      dataController.getWords({ wordsPerPage: 100 })
    ).resolves.toHaveLength(100);
  });

  test("getWords gets 500 words from group 0 page 0, after previus request", async () => {
    await expect(
      dataController.getWords({ wordsPerPage: 500 })
    ).resolves.toHaveLength(500);
  });

  test("getWords gets 100 words from group 5", async () => {
    await expect(
      dataController.getWords({ wordsPerPage: 100, group: 5 })
    ).resolves.toHaveLength(100);
  });

  test("The getUser rejects when modal window send cancel", async () => {
    const unwatch = authPopupState.watch((winState) => {
      if (winState) {
        setTimeout(() => {
          closeAuthPopup();
        }, 200);
      }
    });

    await expect(dataController.getUser()).rejects.toEqual(
      expect.objectContaining({
        name: expect.any(String),
      })
    );
    unwatch();
  });

  test("The getUser try chain signIn/userSettingGet and shall return settings", async () => {
    const unwatch = authPopupState.watch((winState) => {
      if (winState) {
        setTimeout(() => {
          setUserData({
            email: "checker@mail.ru",
            password: "checkerCH#2",
          });
        }, 200);
      }
    });

    await expect(dataController.getUser()).resolves.toEqual(
      expect.objectContaining({
        name: expect.any(String),
      })
    );
    unwatch();
  });

  test("The getUser does not open auth window if token is good", async () => {
    await expect(dataController.getUser()).resolves.toEqual(
      expect.objectContaining({
        name: expect.any(String),
      })
    );
  });
});

describe("Test for userWords", () => {
  test("The userWordsPut save word", async () => {
    const testWord = {
      id: "5e9f5ee35eb9e72bc21af6f8",
      status: "hard",
      date: "Wed Jun 24 2020",
    };

    await expect(dataController.userWordsPut(testWord)).resolves.toEqual(
      expect.objectContaining({
        wordId: expect.stringContaining("5e9f5ee35eb9e72bc21af6f8"),
        difficulty: expect.stringContaining(testWord.status),
      })
    );
  });

  test("The userWordsGet load user word with id", async () => {
    const testWordId = "5e9f5ee35eb9e72bc21af6f8";

    await expect(dataController.userWordsGet(testWordId)).resolves.toEqual(
      expect.objectContaining({
        wordId: expect.stringContaining("5e9f5ee35eb9e72bc21af6f8"),
        difficulty: expect.any(String),
      })
    );
  });

  test("The userWordsGetAll load array of user words", async () => {
    const wordsList = [
      {
        id: "5e9f5ee35eb9e72bc21af6f8",
        status: "hard",
        date: "Wed Jun 24 2020",
      },
      {
        id: "5e9f5ee35eb9e72bc21af6fa",
        status: "hard",
        date: "Wed Jun 24 2020",
      },
    ];

    await dataController
          .userWordsPut(wordsList[0])
    await dataController
          .userWordsPut(wordsList[1])
    await expect(dataController.userWordsGetAll()).resolves.toHaveLength(2);
  });
});
