/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {ElementGen} from 'Src/service/DomGen/DomGen';
import {measureWordWidth, hideGuessingWordInSentence, showGuessingWordInSentence, 
setProgressbarToCurrentPosition, againBtnAct} from './helpers';
import {mySwiper, wordContentUrl} from './constants';

export default class Card {
  constructor(wordState) {
    this.wordState = wordState;
    this.cardElem = ElementGen('div', 'swiper-slide card large col s12 m6');
    this.cardElem.appendChild(this.createCardImage());
    this.cardElem.appendChild(this.createCardContent());
    this.createAudio();
  }

  createCardImage () {
    const imageContainer = ElementGen('div', 'card-image', this.cardElem);
    const image = ElementGen('img', 'image-association scale-transition', imageContainer);
    image.setAttribute('src', wordContentUrl + this.wordState.image);
    image.onload = () => {
      image.classList.add('scale-in');
    }
    const imagePlaceholder = ElementGen('div', 'img-placeholder', imageContainer);
    return imageContainer;
  }

  createCardContent () {
    const cardContent = ElementGen('div', 'card-content', this.cardElem);    

    const form = ElementGen('form', 'form', cardContent);

    const input = ElementGen('input', 'input_text', form);
    input.setAttribute('type', 'text');
    input.setAttribute('style', `width: ${measureWordWidth(this.wordState.word) + 2}px;`);
    input.dataset.word = this.wordState.word;
    input.dataset.tryCount = 0;

    const result =  ElementGen('div', 'result', form);
    result.setAttribute('style', `width: ${measureWordWidth(this.wordState.word) + 2}px;`);

    

    const div = ElementGen('div', 'word', cardContent);

    const translation = ElementGen('p', 'translation', div);
    translation.innerText = this.wordState.wordTranslate;

    const transcription = ElementGen('p', 'transcription', div);
    transcription.innerText = this.wordState.transcription;
  
    const cardTabs = this.createCardTabs();
    cardContent.appendChild(cardTabs);

    const tabsContent = ElementGen('div', 'card-content white', cardContent)

    const explain = ElementGen('div', 'explain-container', tabsContent);  
    explain.setAttribute('id', `explain-${this.wordState.word}`);
    
    const explanation = ElementGen('p', 'explanation', explain);    
    explanation.innerHTML = this.wordState.textMeaning;
    hideGuessingWordInSentence(explanation);

    const explanationTranslation = ElementGen('p', 'explanation-translation', explain);
    explanationTranslation.innerHTML = this.wordState.textMeaningTranslate;

    const example = ElementGen('div', 'example-container', tabsContent);  
    example.setAttribute('id', `example-${this.wordState.word}`);   

    const exampleSent = ElementGen('p', 'example', example);
    exampleSent.innerHTML = this.wordState.textExample;
    hideGuessingWordInSentence(exampleSent);

    const exampleTranslation = ElementGen('p', 'example-translation', example); 
    exampleTranslation.innerHTML = this.wordState.textExampleTranslate;

    cardContent.appendChild(this.createCardAction());
    return cardContent;
  }

  createCardTabs() {
    const cardTabs = ElementGen('div', 'card-tabs');
    const ul = ElementGen('ul', 'tabs', cardTabs);
    const tab1 = ElementGen('li', 'tab col s3', ul);
    const tab2 = ElementGen('li', 'tab col s3', ul);

    tab1.innerHTML = `<a class="active" href="#explain-${this.wordState.word}">Explain</a>`;
    tab2.innerHTML = `<a class="active" href="#example-${this.wordState.word}">Example</a>`;

    return cardTabs;
  }

  createCardAction() {
    const cardAction = ElementGen('div', 'card-action', this.cardElem);
    cardAction.appendChild(this.createFooterButton('again-btn'));
    cardAction.appendChild(this.createFooterButton('simple-btn'));
    cardAction.appendChild(this.createFooterButton('good-btn'));
    cardAction.appendChild(this.createFooterButton('hard-btn'));
    cardAction.addEventListener('click', this.footerBtnsHandler); 
    return cardAction;
  }

  // eslint-disable-next-line class-methods-use-this
  createFooterButton (buttonName) {
    const buttonData = {
      'again-btn': {
        icon: 'plus_one',
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
    const a = ElementGen('a', `${buttonName} waves-effect waves-light btn-small tooltipped`);
    a.dataset.position = 'bottom';
    a.dataset.tooltip = buttonData[buttonName].tooltip;
    a.insertAdjacentHTML('afterbegin', `<i class="material-icons center">${buttonData[buttonName].icon}</i>`);
    return a;
  };

  footerBtnsHandler(event) {
    if(event.target.closest('.again-btn')) {
      againBtnAct();     
    }
    if(event.target.closest('.simple-btn')) {
      //TODO send the word to backend w difficulty 'simple'      
    }
    if(event.target.closest('.good-btn')) {
      //TODO send the word to backend w difficulty 'good' 
    }
    if(event.target.closest('.hard-btn')) {
      //TODO send the word to backend w difficulty 'hard'       
    }
  } 

  createAudio () {
    const audio = ElementGen('audio', `audio`, this.cardElem)
    this.setAudio(audio);
  }

  setAudio(audio) {
    audio.dataset.wordPronounce = wordContentUrl + this.wordState.audio;
    audio.dataset.explanationPronounce = wordContentUrl + this.wordState.audioMeaning;
    audio.dataset.examplePronounce = wordContentUrl + this.wordState.audioExample;
  }
}