class Store {
  constructor() {
    this.playUserWords = 0;
    this.level = 1;
    this.round = 1;
    this.isAutoPronounceOn = 1;
    this.hints = {
      isPronounceOn: 1,
      isTranslationOn: 1,
      isPictureOn: 0,
    };
  }

  setUserSettings(settings) {
    const arr = settings.split(',');
    [this.playUserWords,
    this.level,
    this.round,
    this.isAutoPronounceOn,
    this.hints.isPronounceOn,
    this.hints.isTranslationOn,
    this.hints.isPictureOn,
    ] = arr.map(el => +el);     
    console.log(this);
  }

  stringifySettings() {
    const resArr = [
      this.playUserWords,
      this.level,
      this.round,
      this.isAutoPronounceOn,
      this.hints.isPronounceOn,
      this.hints.isTranslationOn,
      this.hints.isPictureOn,
    ];
    return resArr.join(',');
  }

  setPlayUserWords(value) {
    this.playUserWords = +value;
  }

  setLevel(value) {
    this.level = +value;
  }

  setRound(value) {
    this.round = +value;
  }

  setIsAutoPronounceOn(value) {
    this.isAutoPronounceOn = +value;
  }

  setHints (hintsObj) {
    this.hints = hints;
  }
}

const store = new Store();

export { store };
