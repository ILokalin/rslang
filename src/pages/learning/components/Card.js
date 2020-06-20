import ElementGen from 'Src/service/DomGen/DomGen';
import measureWordWidth from './helpers';
import {mySwiper, wordContentUrl, divider} from './constants';

export default class Card {
  constructor(wordState) {
    this.wordState = wordState;
    this.cardElem = ElementGen('div', 'swiper-slide card large');
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
    cardContent.appendChild(divider);
    const translation = ElementGen('p', 'translation', cardContent);
    cardContent.appendChild(divider);
    const explanation = ElementGen('p', 'explanation', cardContent);
    const explanationTranslation = ElementGen('p', 'explanation-translation', cardContent);
    cardContent.appendChild(divider);

    const example = ElementGen('p', 'example', cardContent);
    const exampleTranslation = ElementGen('p', 'example-translation', cardContent);
    

  }

  createCardAction() {

  }



  
}