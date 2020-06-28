/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { ElementGen } from 'Src/service/DomGen/DomGen';
import {
  measureWordWidth,
  hideGuessingWordInSentence,
  showGuessingWordInSentence,
  setProgressbarToCurrentPosition,
  againBtnAct,
  allowNextCard,
  showTranscription,
  showExplanation,
  showExample,
  audioPlay,
  getLearnProgressString,
  updateProgress,
  showToastDeleted,
} from './helpers';
import { mySwiper, settings, dataController } from './constants';
import 'materialize-css';

export default class Card {
  constructor(wordState) {
    this.wordState = wordState;
    this.cardElem = ElementGen('div', 'swiper-slide card large col s12 m6');
    this.cardElem.appendChild(this.createCardImage());
    this.cardElem.appendChild(this.createCardContent());
    this.createAudio();
  }

  createCardImage() {
    const imageContainer = ElementGen('div', 'card-image', this.cardElem);
    const cardTitle = ElementGen('span', 'card-title', imageContainer);
    const image = ElementGen('img', 'image-association', imageContainer);
    const imagePlaceholder = ElementGen('div', 'img-placeholder', imageContainer);
    const progress = this.wordState.userWord ? this.wordState.userWord.optional.progress : 0;     

    cardTitle.innerText = getLearnProgressString(progress);
    if (this.wordState.userWord) {
      cardTitle.dataset.progress = progress;
    }    
    cardTitle.dataset.wordId = this.wordState.id || this.wordState._id ;

    dataController.getMaterials(this.wordState.image).then((fullPath) => {
      image.setAttribute('src', fullPath);
      });
    
    if (!settings.cardContainsPicture) {
      imagePlaceholder.setAttribute('style', 'z-index:2;');
    }

    return imageContainer;
  }

  createCardContent() {
    const cardContent = ElementGen('div', 'card-content', this.cardElem);
    const form = ElementGen('form', 'form', cardContent);
    const input = ElementGen('input', 'input_text', form);
    const result = ElementGen('div', 'result', form);
    const deleteBtn = ElementGen(
      'i',
      'delete-btn teal-text waves-effect waves-light medium material-icons right tooltipped',
      form,
    );
    const showAnswerBtn = ElementGen(
      'i',
      'show-answer-btn teal-text waves-effect waves-light medium material-icons right tooltipped',
      form,
    );
    const div = ElementGen('div', 'word', cardContent);
    const translation = ElementGen('p', 'translation', div);
    const transcription = ElementGen('p', 'transcription', div);
    const cardTabs = this.createCardTabs();
    cardContent.appendChild(cardTabs);
    const tabsContent = ElementGen('div', 'card-content white', cardContent);
    const explain = ElementGen('div', 'explain-container', tabsContent);
    const explanation = ElementGen('p', 'explanation', explain);
    const explanationTranslation = ElementGen('p', 'explanation-translation', explain);
    const example = ElementGen('div', 'example-container', tabsContent);
    const exampleSent = ElementGen('p', 'example', example);
    const exampleTranslation = ElementGen('p', 'example-translation', example);

    form.addEventListener('click', this.formBtnsHandler);
    form.addEventListener('submit', this.formHandler);
   
    input.setAttribute('type', 'text');
    input.setAttribute('style', `width: ${measureWordWidth(this.wordState.word) + 2}px;`);
    result.setAttribute('style', `width: ${measureWordWidth(this.wordState.word) + 2}px;`);
    explain.setAttribute('id', `explain-${this.wordState.word}`);
    example.setAttribute('id', `example-${this.wordState.word}`);
    
    input.dataset.word = this.wordState.word;
    input.dataset.tryCount = 0; 
    deleteBtn.dataset.tooltip = 'Удалить из словаря';   
    showAnswerBtn.dataset.tooltip = 'Показать ответ'; 

    deleteBtn.innerText = 'clear';
    showAnswerBtn.innerText = 'play_arrow';
    translation.innerText = this.wordState.wordTranslate;
    transcription.innerText = this.wordState.transcription;

    explanation.innerHTML = this.wordState.textMeaning;
    explanationTranslation.innerHTML = this.wordState.textMeaningTranslate;
    exampleSent.innerHTML = this.wordState.textExample;
    exampleTranslation.innerHTML = this.wordState.textExampleTranslate;    

    hideGuessingWordInSentence(explanation);   
    hideGuessingWordInSentence(exampleSent);

    if (!settings.deleteBtnEnabled) {
      deleteBtn.classList.add('hidden');
    }      
    if (!settings.showAnswerBtnEnabled) {
      showAnswerBtn.classList.add('hidden');
    } 
    if (!settings.cardContainsTranslation) {
      translation.classList.add('hidden');
    }
    if (!settings.cardContainsTranscription) {
      transcription.classList.add('hidden');
    }
    if (!settings.cardContainsMeaning) {
      explanation.classList.add('hidden');
    }
    if (!settings.cardContainsMeaningTransl) {
      explanationTranslation.classList.add('hidden');
    }
    if (!settings.cardContainsExample) {
      exampleSent.classList.add('hidden');
    }
    if (!settings.cardContainsExampleTransl) {
      exampleTranslation.classList.add('hidden');
    }
    if (settings.footerBtnsEnabled) {
      cardContent.appendChild(this.createCardAction());
    }  

    return cardContent;
  }

  createCardTabs() {
    const cardTabs = ElementGen('div', 'card-tabs');
    const ul = ElementGen('ul', 'tabs', cardTabs);
    const tab1 = ElementGen('li', 'tab col s3', ul);
    const tab2 = ElementGen('li', 'tab col s3', ul);

    tab1.innerHTML = `<a class="active" href="#explain-${this.wordState.word}">Explain</a>`;
    tab2.innerHTML = `<a href="#example-${this.wordState.word}">Example</a>`;

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
  createFooterButton(buttonName) {
    const buttonData = {
      'again-btn': {
        icon: 'plus_one',
        tooltip: 'Снова',
      },
      'hard-btn': {
        icon: 'sentiment_neutral',
        tooltip: 'Трудно',
      },
      'good-btn': {
        icon: 'sentiment_satisfied',
        tooltip: 'Хорошо',
      },
      'simple-btn': {
        icon: 'insert_emoticon',
        tooltip: 'Легко',
      },
    };
    const a = ElementGen('a', `${buttonName} waves-effect waves-light btn-small tooltipped`);

    a.dataset.position = 'bottom';
    a.dataset.tooltip = buttonData[buttonName].tooltip;

    a.insertAdjacentHTML(
      'afterbegin',
      `<i class="material-icons center">${buttonData[buttonName].icon}</i>`,
    );

    return a;
  }

  footerBtnsHandler(event) {
    const buttonsArr = [
      mySwiper.slides[mySwiper.activeIndex].querySelector('.simple-btn'),
      mySwiper.slides[mySwiper.activeIndex].querySelector('.good-btn'),
      mySwiper.slides[mySwiper.activeIndex].querySelector('.hard-btn'),
    ];
    let progress = event.target.closest('.card').querySelector('.card-title').dataset.progress;
    const wordId = event.target.closest('.card').querySelector('.card-title').dataset.wordId;
    let saveOption;

    if (event.target.closest('.again-btn')) {
      againBtnAct();
    } else {
      if (event.target.closest('.simple-btn')) {
        // TODO send the word to backend w progress
        const newProgress = progress ? progress + 1 : 1;
          saveOption = {
            id: wordId, 
            status: 'onlearn',
            progress: newProgress,
          }
          if (progress) {       
          dataController.userWordsPut(saveOption).then((response) => {
            console.log(response);
            progress = newProgress;
            }, 
            (report) => console.log(report));
          } else {
            dataController.userWordsPost(saveOption).then((response) => {
              console.log(response);
              progress = newProgress;
              }, 
              (report) => console.log(report));
          }
      }

      if (event.target.closest('.good-btn')) {
        // TODO send the word to backend w new ptogress
        const newProgress = progress ? progress + 0.5 : 0.5;
          saveOption = {
            id: wordId, 
            status: 'onlearn',
            progress: newProgress,
          }
          if (progress) {       
          dataController.userWordsPut(saveOption).then((response) => {
            console.log(response);
            progress = newProgress;
            }, 
            (report) => console.log(report));
          } else {
            dataController.userWordsPost(saveOption).then((response) => {
              console.log(response);
              progress = newProgress;
              }, 
              (report) => console.log(report));
          }
      }
      if (event.target.closest('.hard-btn')) {
        // TODO send the word to backend w difficulty 'hard'
        const newProgress = progress ? progress - 0.5 : 0;
          saveOption = {
            id: wordId, 
            status: 'hard',
            progress: (newProgress >= 0) ? newProgress : 0,
          }
          console.log(newProgress);
          if (progress) {       
          dataController.userWordsPut(saveOption).then((response) => {
            console.log(response);
            progress = newProgress;
            }, 
            (report) => console.log(report));
          } else {
            dataController.userWordsPost(saveOption).then((response) => {
              console.log(response);
              progress = newProgress;
              }, 
              (report) => console.log(report));
          }
      }
      buttonsArr.forEach((el) => el.setAttribute('disabled', 'disabled'))
    }    
  }

  formBtnsHandler(event) {
    const input = event.target.closest('.form').querySelector('.input_text');
    let progress = event.target.closest('.card').querySelector('.card-title').dataset.progress;
    const wordId = event.target.closest('.card').querySelector('.card-title').dataset.wordId;
    const audio = event.target.closest('.card').querySelector('.audio');    
    let saveOption;

    if (event.target.closest('.delete-btn')) {   
      // TODO send the word to backend w difficulty 'deleted'
      saveOption = {
        id: wordId, 
        status: 'deleted',
      }
      if (progress) {       
        dataController.userWordsPut(saveOption).then((response) => {
          showToastDeleted(input.dataset.word);
          }, 
          (report) => console.log(report));
      } else {
        dataController.userWordsPost(saveOption).then((response) => {
          showToastDeleted(input.dataset.word);
          }, 
          (report) => console.log(report));
      }
    }
    if (event.target.closest('.show-answer-btn')) {
      // TODO send the word to backend w difficulty 'hard'??
      const newProgress = progress ? progress - 0.5 : 0;
      saveOption = {
        id: wordId, 
        status: 'onlearn',
        progress: (newProgress >= 0) ? newProgress : 0,
      }

      if (progress) {       
        dataController.userWordsPut(saveOption).then((response) => {
          progress = (newProgress >= 0) ? newProgress : 0;
        }, 
          (report) => console.log(report));
      } else {
        dataController.userWordsPost(saveOption).then((response) => {
          progress = (newProgress >= 0) ? newProgress : 0;
        }, 
          (report) => console.log(report));
      }
      input.value = input.dataset.word;      
      if (settings.autoPlayEnabled) {
        audioPlay(audio);
      }
      allowNextCard();
      showTranscription();
      showExplanation();
      showExample();
    }
  }

  createAudio() {
    const audio = ElementGen('audio', `audio`, this.cardElem);
    this.setAudio(audio);
  }

  setAudio(audio) {
    dataController.getMaterials(this.wordState.audio).then((fullPath) => {
      audio.dataset.wordPronounce = fullPath;
    });  
    dataController.getMaterials(this.wordState.audioMeaning).then((fullPath) => {
      audio.dataset.explanationPronounce = fullPath;
    });  
    dataController.getMaterials(this.wordState.audioExample).then((fullPath) => {
      audio.dataset.examplePronounce = fullPath;
    });
  }

  formHandler(event) {
    event.preventDefault();

    const input = event.target.querySelector('.input_text');
    const result = event.target.querySelector('.result');
    const audio = event.target.closest('.card').querySelector('.audio');
    const cardTitle = event.target.closest('.card').querySelector('.card-title');
    let progress = event.target.closest('.card').querySelector('.card-title').dataset.progress;
    const wordId = event.target.closest('.card').querySelector('.card-title').dataset.wordId;;
    let isWrong;

    input.blur();

    input.dataset.tryCount += 1;        
    input.dataset.word.split('').forEach((el, i) => {
      if (el === input.value[i]) {
        result.innerHTML += `<span class="correct">${el}</span>`;
      } else {
        result.innerHTML += `<span class="wrong">${el}</span>`;
        isWrong = true;
      }
    });

    const newProgress = updateProgress(progress, isWrong);

    if (isWrong) {
      mySwiper.train.shortTermStat.chain = 0;
      result.style.zIndex = 2;
      input.value = '';
      input.setAttribute('placeholder', input.dataset.word);
      input.focus();
      setTimeout(() => {
        result.style.zIndex = -1;
        result.innerHTML = '';
      }, 3000);
      againBtnAct();   

    } else {
      if (+input.dataset.tryCount === 1) {
        mySwiper.train.shortTermStat.wrightAnswers++;      
      }    
      mySwiper.train.shortTermStat.chain++;
      mySwiper.train.shortTermStat.totalCards++;
      
      if (settings.autoPlayEnabled) {
        //audioPlay(audio);
      }
      mySwiper.train.updateStat();  
      allowNextCard();
      showTranscription();
      showExplanation();
      showExample();    
    } 

    let saveOption;

    // если новое слово отправляем в user words c коэф 0 вне зависимотси от правильности ответа
// TODO установить progress поле для отправки в userWords
    if (!progress) {
      saveOption = {
        id: wordId, 
        status: 'onlearn',
        progress: 0,
      }
      console.log(saveOption);
      dataController.userWordsPost(saveOption).then((response) => {
        console.log(response);
        cardTitle.dataset.progress = 0;
      },      
      (report) => console.log(report));
    } else {
      saveOption = {
        id: wordId, 
        status: 'onlearn',
        progress: newProgress,
      }
      console.log(saveOption);
      dataController.userWordsPut(saveOption).then((response) => {
        console.log(response);
        cardTitle.dataset.progress = newProgress;
        }, 
        (report) => console.log(report));
    }
  } 
}
