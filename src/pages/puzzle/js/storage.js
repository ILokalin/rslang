
const store = {
  user: JSON.parse(localStorage.getItem('user')),
  level: (localStorage.getItem('level') || 1),
  round: (localStorage.getItem('round') || 1),
  isAutoPronounceOn: +(localStorage.getItem('isAutoPronounceOn') || 1),
  hints: {
    isPronounceOn: +(localStorage.getItem('isPronounceOn') || 1),
    isTranslationOn: +(localStorage.getItem('isTranslationOn') || 1),
    isPictureOn: +(localStorage.getItem('isPictureOn') || 0),
  },
  passedRounds: (JSON.parse(localStorage.getItem('passedRounds')) || []),
  iKnowPerRound: (JSON.parse(localStorage.getItem('iKnowPerRound')) || []),
  dates: (JSON.parse(localStorage.getItem('dates')) || []),
};


const setInitialStore = (user) => {
  store.user = user;
  store.level = 1;
  store.round = 1;
  store.isAutoPronounceOn = 1;
  store.hints = {
    isPronounceOn: 1,
    isTranslationOn: 1,
    isPictureOn: 0,
  };
  store.passedRounds = [];
  store.iKnowPerRound = [];
  store.dates = [];
};

export { store, setInitialStore };
