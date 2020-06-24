import LocalStorageMock from './LocalStorageMock';
import { DataController } from '../DataController';

global.fetch = require('node-fetch');

const dataController = new DataController();

const testUser = {
  email: 'checker@mail.ru',
  password: 'checkerCH#2',
};

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
});

describe('Interface methods', () => {
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
});
