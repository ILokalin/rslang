
class Store {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this. level= (localStorage.getItem('level') || 1);
    this.round= (localStorage.getItem('round') || 1);
    this.isAutoPronounceOn= +(localStorage.getItem('isAutoPronounceOn') || 1);
    this.hints= {
      isPronounceOn: +(localStorage.getItem('isPronounceOn') || 1),
      isTranslationOn: +(localStorage.getItem('isTranslationOn') || 1),
      isPictureOn: +(localStorage.getItem('isPictureOn') || 0),
    };
    this.passedRounds= (JSON.parse(localStorage.getItem('passedRounds')) || []);
    this.iKnowPerRound= (JSON.parse(localStorage.getItem('iKnowPerRound')) || []);
    this.dates = (JSON.parse(localStorage.getItem('dates')) || []);
  }

  setUser(user) {
    this.user = user;
  }

  setLevel(value) {
    this.level = value;
  }

  setRound(value) {
    this.round = value;
  }

  setIsAutoPronounceOn(value) {
    this.isAutoPronounceOn = value;
  }

  setHints (hintsObj) {
    this.hints = hints;
  }

  setPassedRounds(arrayOfValues) {
    this.passedRounds = arrayOfValues;
  }

  setIKnowPerRound(arrayOfValues) {
    this.iKnowPerRound = arrayOfValues;
  }

  setDates(arrayOfValues) {
    this.dates = arrayOfValues;
  }

  setInitialStore(user) {
  this.setUser(user);
  this.setLevel(1);
  this.setRound(1);
  this.setIsAutoPronounceOn(1);
  this.setHints({
    isPronounceOn: 1,
    isTranslationOn: 1,
    isPictureOn: 0,
  });
  this.setPassedRounds([]);
  this.setIKnowPerRound([]);
  this.setDates([]);
  }
}

const store = new Store();

export { store };
