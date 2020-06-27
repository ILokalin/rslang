/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { progressBar, mySwiper, settings } from './constants';

const measureWordWidth = (word) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 2rem Segoe UI';
  return ctx.measureText(word).width;
};

const simpleBtnHandler = () => {};

const goodBtnHandler = () => {};

const hardBtnHandler = () => {};

const updateMaterialComponents = () => {
  // eslint-disable-next-line no-undef
  M.AutoInit();
  const sideNavOptions = {
    edge: 'right',
  };
  // eslint-disable-next-line no-undef
  const sideNav = M.Sidenav.init(document.querySelector('.sidenav'), sideNavOptions);

  const modal = document.querySelector('.modal');
  // eslint-disable-next-line no-undef
  const modalInstance = M.Modal.init(modal);
};

const setProgressbarToCurrentPosition = () => {
  const current = document.querySelector('.swiper-pagination-current').innerText;
  const total = document.querySelector('.swiper-pagination-total').innerText;
  const progress = `${Math.floor(((current - 1) / total) * 100)}%`;

  progressBar.querySelector('.determinate').style.width = progress;
  progressBar.dataset.tooltip = progress;
};

const hideGuessingWordInSentence = (element) => {
  if (element.classList.contains('explanation')) {
    element.querySelector('i').style.color = 'white';
    element.querySelector('i').style.borderBottom = '1px solid black';
  }
  if (element.classList.contains('example')) {
    element.querySelector('b').style.color = 'white';
    element.querySelector('b').style.borderBottom = '1px solid black';
  }
};

const showGuessingWordInSentence = (element) => {
  if (element.classList.contains('explanation')) {
    element.querySelector('i').style.color = 'black';
    element.querySelector('i').style.borderBottom = 'none';
  }
  if (element.classList.contains('example')) {
    element.querySelector('b').style.color = 'black';
    element.querySelector('b').style.borderBottom = 'none';
  }
};

const showTranscription = () => {
  mySwiper.slides[mySwiper.activeIndex].querySelector('.transcription').classList.remove('.hidden');
};

const hideTranscription = () => {
  mySwiper.slides[mySwiper.activeIndex].querySelector('.transcription').classList.add('.hidden');
};

const allowNextCard = () => {
  console.log(mySwiper);
  if (mySwiper.activeIndex === mySwiper.slides.length - 1) {
    // eslint-disable-next-line no-undef
    const modal = M.Modal.getInstance(document.querySelector('.modal'));
    modal.open();
    progressBar.querySelector('.determinate').style.width = '100%';
    progressBar.dataset.tooltip = '100%';
  } else {
    mySwiper.allowSlideNext = true;
    mySwiper.navigation.nextEl.classList.remove('swiper-button-disabled');
  }
};

const audioPlay = (audio) => {
  const tracks = [
    audio.dataset.wordPronounce,
    audio.dataset.explanationPronounce,
    audio.dataset.examplePronounce,
  ];
  let current = 0;
  // eslint-disable-next-line prefer-destructuring
<<<<<<< HEAD

=======
>>>>>>> 93fc7d33ab3d3ceecc9886cff00839cd45e87fcb
  audio.src = tracks[0];
  audio.autoplay = true;

  audio.onended = function () {
    current += 1;
    if (current === tracks.length) {
      allowNextCard();
    } else {
      audio.src = tracks[current];
      audio.play();
    }
  };
};

const showExplanation = () => {
  const explanation = mySwiper.slides[mySwiper.activeIndex].querySelector('.explanation');
  const explanationTranslation = mySwiper.slides[mySwiper.activeIndex].querySelector(
    '.explanation-translation',
  );

  showGuessingWordInSentence(explanation);

  explanation.classList.remove('hidden');
  explanationTranslation.classList.remove('hidden');
};

const showExample = () => {
  const example = mySwiper.slides[mySwiper.activeIndex].querySelector('.example');
  const exampleTranslation = mySwiper.slides[mySwiper.activeIndex].querySelector(
    '.example-translation',
  );

  showGuessingWordInSentence(example);

  example.classList.remove('hidden');
  exampleTranslation.classList.remove('hidden');
};

const againBtnAct = () => {
  const dupl = mySwiper.slides[mySwiper.activeIndex].cloneNode(true);

  dupl.querySelector('.input_text').value = '';
  dupl.querySelector('.result').innerText = '';

  mySwiper.appendSlide(dupl);
  mySwiper.update();

  setProgressbarToCurrentPosition();
};

const getLearnProgressString = (k) => {
  if (k) {
    if (k===0) {
      return 'в начале изучения';
    }
    if (k>0 && k<=2) {
      return 'недавно начали изучать';
    }
    if (k>2 && k<=4) {
      return 'хорошее начало';
    }
    if (k>4 && k<=8) {
      return 'хорошо знаете слово';
    }
    if (k>8) {
      return 'отлично знаете слово';
    }
  } 
  return 'новое слово';
}

const updateProgress = (curProgress, isWrong) => {
  let res;
  const quantityOfSettingsEnabled = settings.cardContainsExample 
    + settings.cardContainsMeaning
    + settings.cardContainsTranslation
    + settings.cardContainsTranscription
    + settings.cardContainsPicture;
  
  if (isWrong) {
    res = curProgress - quantityOfSettingsEnabled * 0.1;
  } else {
    res = curProgress + (6 - quantityOfSettingsEnabled) * 0.1 > 0;
  }
  return res > 0 ? res : 0;
}

const showToastDeleted = (word) => {
  // eslint-disable-next-line no-undef  
  M.toast({
    html: `Слово ${word} удалено из Словаря. Вы можете восстановить его в Словаре`,
  });
}

export {
  measureWordWidth,
  updateMaterialComponents,
  setProgressbarToCurrentPosition,
  hideGuessingWordInSentence,
  showGuessingWordInSentence,
  againBtnAct,
  allowNextCard,
  showTranscription,
  showExplanation,
  showExample,
  audioPlay,
  getLearnProgressString, 
  updateProgress,
  showToastDeleted,
};
