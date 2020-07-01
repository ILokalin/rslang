class Store {
  constructor() {
    this.level = 1;
    this.round = 1;
    this.isAutoPronounceOn = 1;
    this.hints = {
      isPronounceOn: 1,
      isTranslationOn: 1,
      isPictureOn: 0,
    };
    this.passedRounds = [];
    this.iKnowPerRound = [];
    this.dates = [];
  }

  setUserSettings(settings) {
    const arr = settings.split(',');
    arr.forEach((element, index) => {
     switch(index) {
      case 0: {
        this.setLevel(element);
        break;
      }
      case 1: {
        this.setRound(element);
        break;
      }
      case 2: {
        this.setIsAutoPronounceOn(element);
        break;
      }
      case 3: {
        this.hints.isPronounceOn = +element;
        break;
      } 
      case 4: {
        this.hints.isTranslationOn = +element;
        break;
      }
      case 5: {
        this.hints.isPictureOn = +element;
        break;
      }    
     }
    });
    console.log(this);
  }

  setUserStat(stat) {
    const arr = stat.split('|');
    arr.forEach((element, index) => {
      const elemArr = element.split(',');
      switch (index) {
        case 0: {
          this.setPassedRounds(elemArr);
          break;
        }
        case 1: {
          this.setIKnowPerRound(elemArr);
          break;
        }
        case 2: {
          this.setDates(elemArr);
          break;
        }
      }
    });
    console.log(this);
  }

  stringifySettings() {
    const resArr = [
      this.level,
      this.round,
      this.isAutoPronounceOn,
      this.hints.isPronounceOn,
      this.hints.isTranslationOn,
      this.hints.isPictureOn,
    ];
    return resArr.join(',');
  }

  stringifyStatistics() {
    const resArr = [
      this.passedRounds,
      this.iKnowPerRound,
      this.dates,
    ];
    resArr.map((el) => el.join(','));

    return resArr.join('|');
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

  setPassedRounds(arrayOfValues) {
    this.passedRounds = arrayOfValues;
  }

  setIKnowPerRound(arrayOfValues) {
    this.iKnowPerRound = arrayOfValues;
  }

  setDates(arrayOfValues) {
    this.dates = arrayOfValues;
  }
}

const store = new Store();

export { store };
