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
  showToastHard,
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
    const progress = (this.wordState.userWord ? this.wordState.userWord.optional.progress : undefined);     

    cardTitle.innerText = getLearnProgressString(progress);

    if (this.wordState.userWord) {
      cardTitle.dataset.progress = progress;
      cardTitle.dataset.difficulty = this.wordState.userWord.difficulty;
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

  async footerBtnsHandler(event) {
    const buttonsArr = [
      mySwiper.slides[mySwiper.activeIndex].querySelector('.simple-btn'),
      mySwiper.slides[mySwiper.activeIndex].querySelector('.good-btn'),
      mySwiper.slides[mySwiper.activeIndex].querySelector('.hard-btn'),
    ];
    const cardTitle = event.target.closest('.card').querySelector('.card-title');
    const progress = cardTitle.dataset.progress;
    const wordId = cardTitle.dataset.wordId;
    const wordDifficulty = cardTitle.dataset.difficulty;
    let saveOption;

    if (event.target.closest('.again-btn')) {
      await againBtnAct();
    } else {
      if (event.target.closest('.simple-btn')) {
        const newProgress = progress ? +progress + 1 : 1;
          saveOption = {
            id: wordId, 
            status: 'onlearn',
            progress: newProgress,
          }
          console.log(saveOption);
          if (progress) {       
            await dataController.userWordsPut(saveOption);
          } else {
            await dataController.userWordsPost(saveOption);           
          }
          cardTitle.dataset.progress = newProgress;
          cardTitle.dataset.difficulty = 'onlearn';
      }
      if (event.target.closest('.good-btn')) {
        const newProgress = progress ? +progress + 0.5 : 0.5;
          saveOption = {
            id: wordId, 
            status: 'onlearn',
            progress: newProgress,
          }
          console.log(saveOption);
          if (progress) {       
            await dataController.userWordsPut(saveOption);
          } else {
            await dataController.userWordsPost(saveOption);            
          }
          cardTitle.dataset.progress = newProgress;
          cardTitle.dataset.difficulty = 'onlearn';
      }
      if (event.target.closest('.hard-btn')) {
        const newProgress = progress ? +progress - 0.5 : 0;
          saveOption = {
            id: wordId, 
            status: 'hard',
            progress: (newProgress >= 0 ? newProgress : 0),
          }
          console.log(saveOption);
          if (progress) {       
            await dataController.userWordsPut(saveOption);
          } else {
            await dataController.userWordsPost(saveOption);
          }
          cardTitle.dataset.progress = (newProgress >= 0 ? newProgress : 0);
          cardTitle.dataset.difficulty = 'hard';
          showToastHard()
      }
      buttonsArr.forEach((el) => el.setAttribute('disabled', 'disabled'))
    }    
  }

  async formBtnsHandler(event) {
    const input = event.target.closest('.form').querySelector('.input_text');
    const cardTitle = event.target.closest('.card').querySelector('.card-title');
    const progress = cardTitle.dataset.progress;
    const wordId = cardTitle.dataset.wordId;    
    const wordDifficulty = cardTitle.dataset.difficulty; 
    const audio = event.target.closest('.card').querySelector('.audio');
    const buttonsArr = [
      mySwiper.slides[mySwiper.activeIndex].querySelector('.simple-btn'),
      mySwiper.slides[mySwiper.activeIndex].querySelector('.good-btn'),
      mySwiper.slides[mySwiper.activeIndex].querySelector('.hard-btn'),
    ];   
    let saveOption;
    if (event.target.closest('.delete-btn')) {   
      saveOption = {
        id: wordId, 
        status: 'deleted',
        progress: (progress ? progress : 0),
      }
      console.log(saveOption);
      if (progress) {       
        await dataController.userWordsPut(saveOption);       
      } else {
        await dataController.userWordsPost(saveOption);            
      }
      showToastDeleted(input.dataset.word);
      cardTitle.dataset.progress = (progress ? progress : 0);
      cardTitle.dataset.difficulty = 'deleted';
      buttonsArr.forEach((el) => el.setAttribute('disabled', 'disabled'));
    }
    if (event.target.closest('.show-answer-btn')) {
      const newProgress = progress ? +progress - 0.5 : 0;
      saveOption = {
        id: wordId, 
        status: (wordDifficulty ? wordDifficulty : 'onlearn'),
        progress: (newProgress >= 0 ? newProgress : 0),
      }
      console.log(saveOption);
      if (progress) {       
        await dataController.userWordsPut(saveOption);        
      } else {
        await dataController.userWordsPost(saveOption);
        mySwiper.train.shortTermStat.newWords++;
      }
      cardTitle.dataset.progress = (newProgress >= 0 ? newProgress : 0);
      cardTitle.dataset.difficulty = (wordDifficulty ? wordDifficulty : 'onlearn');
      input.value = input.dataset.word;
      mySwiper.train/shortTermStat.newWords++;      
      if (settings.autoPlayEnabled) {
       // audioPlay(audio);
      }
      mySwiper.train.shortTermStat.totalCards++;
      allowNextCard();
      showTranscription();
      showExplanation();
      showExample();
      event.target.closest('.show-answer-btn').classList.add('hidden');
    }
  }  

  async formHandler(event) {
    event.preventDefault();

    const input = event.target.querySelector('.input_text');
    const result = event.target.querySelector('.result');
    const audio = event.target.closest('.card').querySelector('.audio');
    const cardTitle = event.target.closest('.card').querySelector('.card-title');
    const progress = cardTitle.dataset.progress;
    const wordId = cardTitle.dataset.wordId;
    const wordDifficulty = cardTitle.dataset.difficulty;
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

    mySwiper.train.shortTermStat.totalCards++;

    const newProgress = updateProgress(+progress, isWrong);

    let saveOption;

    console.log('progress', progress);
    console.log(typeof progress);
    console.log('!!progress', !!progress);

    // если новое слово отправляем в user words c коэф 0 вне зависимотси от правильности ответа
    if (progress) {
      mySwiper.train.shortTermStat.newWords++;  
      saveOption = {
        id: wordId, 
        status: 'onlearn',
        progress: 0,
      }  
      console.log(saveOption)
      await dataController.userWordsPut(saveOption);    
      cardTitle.dataset.progress = 0;
      cardTitle.dataset.difficulty = 'onlearn';
    } else {
      saveOption = {
        id: wordId, 
        status: (wordDifficulty ? wordDifficulty : 'onlearn'),
        progress: newProgress,
      }
      console.log(saveOption)
      await dataController.userWordsPost(saveOption);
      cardTitle.dataset.progress = newProgress;
      cardTitle.dataset.difficulty = wordDifficulty ? wordDifficulty : 'onlearn';
    }

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
      await againBtnAct();  

    } else {
      if (+input.dataset.tryCount === 1) {
        mySwiper.train.shortTermStat.wrightAnswers++;      
      }    
      mySwiper.train.shortTermStat.chain++;     
      
      if (settings.autoPlayEnabled) {
        //audioPlay(audio);
      }
      mySwiper.train.updateStat();  
      allowNextCard();
      showTranscription();
      showExplanation();
      showExample();    
    } 
  } 
}
