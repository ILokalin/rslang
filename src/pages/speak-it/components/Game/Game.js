import Utils from '../../services/utils';
import { CARDS_ITEMS, LEVELS, ERRORS_MAX_COUNT, WORD_IMG, WORD_INPUT } from '../../data/constants';

export default class Game {
  constructor() {
    this.level = 1;
    this.round = 1;
    this.errors = ERRORS_MAX_COUNT;
    this.errorsArr = [];
    this.know = 0;
    this.knowArr = [];
    this.cards = CARDS_ITEMS;
    this.createCardPage();
    LEVELS.forEach((el, index) => {
      el.addEventListener('click', () => {
        this.levelClicked(el, index);
      });
    });
  }

  createCardPage() {
    const wordsData = Utils.getWordsForRound(this.level, this.round);
    wordsData.forEach((item) => {
      this.createCard(item);
    });
    //  await preventCardClick();
  }

  restartGame() {
    Utils.resetCards();
    this.errors = ERRORS_MAX_COUNT;
    this.know = 0;
    this.mistakesArr = [];
    this.knowArr = [];
    const CARDS = document.querySelectorAll('.item');
    CARDS.forEach((card) => {
      const cln = card.cloneNode(true);
      this.mistakesArr.push(cln);
    });
    WORD_IMG.src = WORD_IMG.dataset.src;
    WORD_INPUT.classList.add('none');
  }

  levelClicked(el, index) {
    this.errorsArr = [];
    this.knowArr = [];
    this.restartGame();
    LEVELS.forEach((item) => item.classList.remove('activePoint'));
    el.classList.add('activePoint');
    CARDS_ITEMS.innerHTML = '';
    this.level = index + 1;
    this.round = Math.round(0 - 0.5 + Math.random() * (29 - 0 + 1));
    this.createCardPage();
  }

  createCard(data) {
    const CARD = document.createElement('div');
    CARD.classList.add('item');
    CARD.setAttribute(
      'data-audio',
      `https://raw.githubusercontent.com/anasidorovich/rslang-data/master/${data.audio}`,
    );
    CARD.innerHTML = Utils.getCard(data);
    CARD.onclick = () => {
      Utils.cardClicked(CARD);
      Utils.playAudio(CARD.getAttribute('data-audio'));
      WORD_IMG.src = `https://raw.githubusercontent.com/anasidorovich/rslang-data/master/${data.image}`;
      WORD_INPUT.classList.remove('none');
      WORD_INPUT.value = data.wordTranslate;
    };
    const cln = CARD.cloneNode(true);
    this.errorsArr.push(cln);
    CARDS_ITEMS.appendChild(CARD);
  }
}
