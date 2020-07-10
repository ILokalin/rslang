export const dataControllerConst = {
  materialPath: 'https://raw.githubusercontent.com/ilokalin/rslang-data/master/',
  defaultZeroBlock: { page: 0, group: 0 },
  cancelUser: {
    status: 0,
    message: 'User refused',
    name: 'Unknown',
  },
  imageBase64Prifex: 'data:image/jpg;base64,',
  audioBase64Prifex: 'data:audio/mpeg;base64,',
};

export const cardShortStatTemplate = {
  totalCards: 0,
  wrightAnswers: 0,
  newWords: 0,
  chain: 0,
  longestChain: 0,
};

export const cardDefaultSettingsTemplate = {
  autoPlayEnabled: 0,
  cardContainsExample: 1,
  cardContainsExampleTransl: 1,
  cardContainsMeaning: 1,
  cardContainsMeaningTransl: 1,
  cardContainsPicture: 1,
  cardContainsTranscription: 1,
  cardContainsTranslation: 1,
  cardsPerDay: 15,
  deleteBtnEnabled: 1,
  footerBtnsEnabled: 1,
  justNewWords: 0,
  newCardsPerDay: 5,
  showAnswerBtnEnabled: 1,
};
