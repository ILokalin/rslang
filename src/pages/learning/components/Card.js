import {ElementGen} from 'Src/service/DomGen/DomGen';
import {measureWordWidth} from './helpers';
import {mySwiper, wordContentUrl, divider} from './constants';

export default class Card {
  constructor(wordState) {
    this.wordState = wordState;
    this.cardElem = ElementGen('div', 'swiper-slide card large');
    this.cardElem.appendChild(createCardImage());
    this.cardElem.appendChild(createCardContent());
    this.cardElem.appendChild(createCardAction());
  }

  createCardImage () {
    const imageContainer = ElementGen('div', 'card-image', this.cardElem);
    const image = ElementGen('img', 'image-association', imageContainer);
    image.setAttribute('src', wordContentUrl + this.wordState.image);
    const imagePlaceholder = ElementGen('div', 'img-placeholder', imageContainer);
    return imageContainer;
  }

  createCardContent () {
    const cardContent = ElementGen('div', 'card-content', this.cardElem);
    const input = ElementGen('input', 'card-content', cardContent);
    input.setAttribute('style', `width: ${measureWordWidth(this.wordState.word)}`);
    cardContent.appendChild(divider);
    const transcription = ElementGen('p', 'transcription right', cardContent);
    transcription.innerText = this.wordState.transcription;
    const translation = ElementGen('p', 'translation', cardContent);
    translation.innerText = this.wordState.wordTranslate;
    cardContent.appendChild(divider);
    const explanation = ElementGen('p', 'explanation', cardContent);
    explanation.innerText = this.wordState.textMeaning;
    const explanationTranslation = ElementGen('p', 'explanation-translation', cardContent);
    explanationTranslation.innerText = this.wordState.textMeaningTranslate;
    cardContent.appendChild(divider);
    const example = ElementGen('p', 'example', cardContent);
    example.innerText = this.wordState.textExample;
    const exampleTranslation = ElementGen('p', 'example-translation', cardContent); 
    exampleTranslation.innerText = this.wordState.textExampleTranslate;
    return cardContent;
  }

  createCardAction() {
    const cardAction = ElementGen('div', 'card-action', this.cardElem);
    cardAction.appendChild(createFooterButton('again-btn'));
    cardAction.appendChild(createFooterButton('simple-btn'));
    cardAction.appendChild(createFooterButton('good-btn'));
    cardAction.appendChild(createFooterButton('hard-btn'));
    cardAction.addEventListener('click', this.footerBtnsHandler); 
    return cardAction;
  }

  createFooterButton (buttonName) {
    const buttonData = {
      'again-btn': {
        icon: 'autorenew',
        tooltip: 'Снова',
      },
      'hard-btn': {
        icon:'sentiment_neutral',
        tooltip: 'Трудно',
      },
      'good-btn': {
        icon:'sentiment_satisfied',
        tooltip: 'Хорошо',
      },
      'simple-btn': {
        icon: 'insert_emoticon',
        tooltip: 'Легко',
      },
    }
    const a = ElementGen('a', `${buttonName} waves-effect waves-light btn-large tooltipped`);
    a.dataset.position = 'bottom';
    a.dataset.tooltip = buttonData[buttonName].tooltip;
    a.insertAdjacentHTML(`<i class="material-icons left">${buttonData[buttonName].icon}</i>`);
    return a;
  };

  footerBtnsHandler(event) {
    if(event.target.closest('.again-btn')) {
      //TODO 
      mySwiper.appendSlide(this.cardElem);
      mySwiper.update();
    }
    if(event.target.closest('.simple-btn')) {
      //TODO send the word to to backend w difficulty 'simple'      
    }
    if(event.target.closest('.good-btn')) {
      //TODO send the word to to backend w difficulty 'good' 
    }
    if(event.target.closest('.hard-btn')) {
      //TODO send the word to to backend w difficulty 'hard'       
    }
  }

}