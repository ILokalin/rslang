import { closeAuthPopup, authPopupState, setUserData } from 'Service/AppState';
import moment from 'moment';
import LocalStorageMock from './LocalStorageMock';
import { DataController } from '../DataController';

global.fetch = require('node-fetch');

global.localStorage = new LocalStorageMock();
const dataController = new DataController();

describe('Helpers tests', () => {
  test('unpack create normal object', () => {
    const optionalTest = {
      name: '"Tester Testovich"',
      settings:
        '{"lastTrain":"date","cardsPerDay":30,"newCardsPerDay":15,"justNewWords":0,"cardContainsTranslation":1,"cardContainsMeaning":0,"cardContainsMeaningTransl":0,"cardContainsExample":0,"cardContainsExampleTransl":0,"cardContainsPicture":1,"cardContainsTranscription":1,"footerBtnsEnabled":1,"deleteBtnEnabled":1,"showAnswerBtnEnabled":0,"autoPlayEnabled":1}',
    };

    const expectResult = {
      name: 'Tester Testovich',
      settings: {
        lastTrain: 'date',
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

    expect(dataController.unpackUserSettings(optionalTest)).toEqual(expectResult);
  });

  test('pack converts object fields to strings', () => {
    const optionalTest = {
      name: 'Tester Testovich',
      settings: {
        lastTrain: 'date',
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

  test('The prepareUploadStatistic add game statistic and pack object', () => {
    const originStatistics = {
      learnedWords: 5,
      optional: dataController.packUserSettings({
        card: {
          longTime: [
            ['02-Jul-2020', 40],
            ['03-Jul-2020', 40],
          ],
          shortTime: {
            date: '04-Jul-2020',
            totalCards: 6,
            wrightAnswers: 5,
            newWords: 2,
            chain: 1,
            longestChain: 3,
          },
        },
        savanna: {
          top: [
            { date: '01-Jul-2020', result: 100 },
            { date: '02-Jul-2020', result: 80 },
            { date: '03-Jul-2020', result: 75 },
          ],
          longTime: [
            { date: '03-Jul-2020', result: 50 },
            { date: '03-Jul-2020', result: 50 },
            { date: '03-Jul-2020', result: 100 },
            { date: '03-Jul-2020', result: 80 },
            { date: '03-Jul-2020', result: 75 },
          ],
        },
      }),
    };

    const uploadStatistics = {
      savanna: { result: 25 },
    };

    expect(
      JSON.parse(
        dataController.prepareUploadStatistics(originStatistics, uploadStatistics).optional.savanna,
      ).longTime.length,
    ).toBe(6);
  });

  test('Cards statistics has replaced on days', () => {
    const originStatOptionalCard = {
      longTime: [
        ['02-Jul-2020', 40],
        ['03-Jul-2020', 40],
      ],
      shortTime: {
        date: '04-Jul-2020',
        totalCards: 1,
        wrightAnswers: 1,
        newWords: 0,
        chain: 1,
        longestChain: 1,
      },
    };

    const shortTimeStat = {
      totalCards: 5,
      wrightAnswers: 4,
      newWords: 2,
      chain: 1,
      longestChain: 3,
    };

    const checkStat = {
      longTime: [
        ['02-Jul-2020', 40],
        ['03-Jul-2020', 40],
      ],
      shortTime: {
        date: '04-Jul-2020',
        totalCards: 5,
        wrightAnswers: 4,
        newWords: 2,
        chain: 1,
        longestChain: 3,
      },
    };

    const today = moment(new Date('07-04-20')).format('DD-MMM-YYYY');
    expect(
      dataController.cardStatisticsAggregate(originStatOptionalCard, shortTimeStat, today),
    ).toEqual(checkStat);
  });

  test('Cards statistics aggregated one day statistics', () => {
    const originStatOptionalCard = {
      longTime: [
        ['02-Jul-2020', 40],
        ['03-Jul-2020', 40],
      ],
      shortTime: {
        date: '04-Jul-2020',
        totalCards: 1,
        wrightAnswers: 1,
        newWords: 5,
        chain: 1,
        longestChain: 1,
      },
    };

    const shortTimeStat = {
      totalCards: 5,
      wrightAnswers: 4,
      newWords: 2,
      chain: 1,
      longestChain: 3,
    };

    const checkStat = {
      longTime: [
        ['02-Jul-2020', 40],
        ['03-Jul-2020', 40],
        ['04-Jul-2020', 5],
      ],
      shortTime: {
        date: '05-Jul-2020',
        totalCards: 5,
        wrightAnswers: 4,
        newWords: 2,
        chain: 1,
        longestChain: 3,
      },
    };

    const today = moment(new Date('07-05-20')).format('DD-MMM-YYYY');
    expect(
      dataController.cardStatisticsAggregate(originStatOptionalCard, shortTimeStat, today),
    ).toEqual(checkStat);
  });

  test('Day statistics move to long time list if new date', () => {
    const originStatistics = {
      learnedWords: 10,
      optional: {
        card:
          '{"longTime":[["03-Jul-2020",20],["04-Jul-2020",15],["05-Jul-2020",35],["06-Jul-2020",3],["07-Jul-2020",2],["08-Jul-2020",6],["09-Jul-2020",2],["10-Jul-2020",1],["11-Jul-2020",10],["12-Jul-2020",0],["13-Jul-2020",10]],"shortTime":{"totalCards":1,"wrightAnswers":1,"newWords":5,"chain":1,"longestChain":1,"date":"14-Jul-2020"}}',
      },
    };

    const uploadStatistics = {
      card: {
        totalCards: 5,
        wrightAnswers: 4,
        newWords: 2,
        chain: 1,
        longestChain: 3,
      },
    };

    const testResult = {
      optional: {
        card:
          '{"longTime":[["03-Jul-2020",20],["04-Jul-2020",15],["05-Jul-2020",35],["06-Jul-2020",3],["07-Jul-2020",2],["08-Jul-2020",6],["09-Jul-2020",2],["10-Jul-2020",1],["11-Jul-2020",10],["12-Jul-2020",0],["13-Jul-2020",10],["14-Jul-2020",5]],"shortTime":{"totalCards":5,"wrightAnswers":4,"newWords":2,"chain":1,"longestChain":3,"date":"15-Jul-2020"}}',
      },
      learnedWords: 109,
    };

    expect(dataController.prepareUploadStatistics(originStatistics, uploadStatistics)).toEqual(
      testResult,
    );
  });

  test('Cards statistics create new short stat with clear original', () => {
    const originStatOptionalCard = {};

    const shortTimeStat = {
      totalCards: 5,
      wrightAnswers: 4,
      newWords: 2,
      chain: 1,
      longestChain: 3,
    };

    const checkStat = {
      longTime: [],
      shortTime: {
        date: '04-Jul-2020',
        totalCards: 5,
        wrightAnswers: 4,
        newWords: 2,
        chain: 1,
        longestChain: 3,
      },
    };

    const today = moment(new Date('07-04-20')).format('DD-MMM-YYYY');
    expect(
      dataController.cardStatisticsAggregate(originStatOptionalCard, shortTimeStat, today),
    ).toEqual(checkStat);
  });

  test('Cards statistics create new longTime stat and start new short', () => {
    const originStatOptionalCard = {
      longTime: [
        ['02-Jul-2020', 40],
        ['03-Jul-2020', 40],
      ],
      shortTime: {
        date: '04-Jul-2020',
        totalCards: 1,
        wrightAnswers: 1,
        newWords: 5,
        chain: 1,
        longestChain: 1,
      },
    };

    const shortTimeStat = {
      totalCards: 5,
      wrightAnswers: 4,
      newWords: 2,
      chain: 1,
      longestChain: 3,
    };

    const checkStat = {
      longTime: [
        ['02-Jul-2020', 40],
        ['03-Jul-2020', 40],
        ['04-Jul-2020', 5],
      ],
      shortTime: {
        date: '05-Jul-2020',
        totalCards: 5,
        wrightAnswers: 4,
        newWords: 2,
        chain: 1,
        longestChain: 3,
      },
    };

    const today = moment(new Date('07-05-20')).format('DD-MMM-YYYY');
    expect(
      dataController.cardStatisticsAggregate(originStatOptionalCard, shortTimeStat, today),
    ).toEqual(checkStat);
  });
});

describe('The getWords', () => {
  test('getWords gets custom words per page', async () => {
    await expect(dataController.getWords({ wordsPerPage: 100 })).resolves.toHaveLength(100);
  });

  test('getWords gets 500 words from group 0 page 0, after previus request', async () => {
    await expect(dataController.getWords({ wordsPerPage: 500 })).resolves.toHaveLength(500);
  });

  test('getWords gets 100 words from group 5', async () => {
    await expect(dataController.getWords({ wordsPerPage: 100, group: 5 })).resolves.toHaveLength(
      100,
    );
  });

  test('The getUser rejects when modal window send cancel', async () => {
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
      }),
    );
    unwatch();
  });

  test('The getUser try chain signIn/userSettingGet and shall return settings', async () => {
    const unwatch = authPopupState.watch((winState) => {
      if (winState) {
        setTimeout(() => {
          setUserData({
            email: 'tocka-test@test.ru',
            password: 'tockaTest#1',
          });
        }, 200);
      }
    });

    await expect(dataController.getUser()).resolves.toEqual(
      expect.objectContaining({
        name: expect.any(String),
      }),
    );
    unwatch();
  });

  test('The getUser does not open auth window if token is good', async () => {
    await expect(dataController.getUser()).resolves.toEqual(
      expect.objectContaining({
        name: expect.any(String),
      }),
    );
  });
});

describe('Test for userWords', () => {
  test('The userWordsPut save word', async () => {
    const testWord = {
      id: '5e9f5ee35eb9e72bc21af6f8',
      status: 'hard',
    };

    await expect(dataController.userWordsPut(testWord)).resolves.toEqual(
      expect.objectContaining({
        wordId: expect.stringContaining('5e9f5ee35eb9e72bc21af6f8'),
        difficulty: expect.stringContaining(testWord.status),
      }),
    );
  });

  test('The userWordsGet load user word with id', async () => {
    const testWordId = '5e9f5ee35eb9e72bc21af6f8';

    await expect(dataController.userWordsGet(testWordId)).resolves.toEqual(
      expect.objectContaining({
        wordId: expect.stringContaining('5e9f5ee35eb9e72bc21af6f8'),
        difficulty: expect.any(String),
      }),
    );
  });

  test('The userWordsGetAll load array of aggregated user words', async () => {
    const wordsList = [
      {
        id: '5e9f5ee35eb9e72bc21af6f8',
        status: 'hard',
        progress: 0.5,
      },
      {
        id: '5e9f5ee35eb9e72bc21af6fa',
        status: 'hard',
        progress: 0.5,
      },
    ];

    await dataController.userWordsPut(wordsList[0]);
    await dataController.userWordsPut(wordsList[1]);
    const result = await dataController.userWordsGetAll(['hard', 'easy']);
    expect(result[0].paginatedResults.length).toBeGreaterThanOrEqual(2);
  });

  test('The setUserStatistics write statistic', async () => {
    const testStat = {
      savanna: { result: 90 },
    };

    const statistics = await dataController.setUserStatistics(testStat);
    expect(statistics.savanna.longTime.length).toBeGreaterThanOrEqual(1);
  });

  test('The setUserStatistics write statistics card', async () => {
    const testStat = {
      card: {
        totalCards: 5,
        wrightAnswers: 4,
        newWords: 10,
        chain: 1,
        longestChain: 3,
      },
    };

    const statistics = await dataController.setUserStatistics(testStat);
    expect(statistics.learnedWords).toBeGreaterThanOrEqual(10);
  });

  test('The userStatisticsGet returned combination of statistics object', async () => {
    const statistics = await dataController.getUserStatistics();
    expect(statistics.savanna.longTime.length).toBeGreaterThanOrEqual(1);
  });

  test('The getWordMaterials retuned all materias from server', async () => {
    const materials = await dataController.getWordMaterials('5e9f5ee35eb9e72bc21af4a0');
    expect(materials.audio).toEqual(
      expect.stringContaining('data:audio/mpeg;base64,SUQzBAAAAAAAI1'),
    );
  });
});
