/* eslint-disable no-param-reassign */
import { progressBar, mySwiper, settings } from './constants';

const measureWordWidth = (word) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 2rem Segoe UI';
  return ctx.measureText(word).width;
}

const againBtnHandler = () => {


};

const simpleBtnHandler = () => {

}

const goodBtnHandler = () => {

}

const hardBtnHandler = () => {

}

const updateMaterialComponents = () => {
  // eslint-disable-next-line no-undef
  M.AutoInit();
  const sideNavOptions = {
    edge: 'right',
  }
  const sideNav = M.Sidenav.init(document.querySelector('.sidenav'), sideNavOptions);

  const modal = document.querySelector('.modal');
  const modalInstance = M.Modal.init(modal);
}

const setProgressbarToCurrentPosition = () => {
  const current = document.querySelector('.swiper-pagination-current').innerText;
  const total = document.querySelector('.swiper-pagination-total').innerText;  
  const progress = `${Math.floor((current - 1) / total * 100)}%`;
  progressBar.querySelector('.determinate').style.width = progress;
  progressBar.dataset.tooltip = progress;
}
const hideGuessingWordInSentence = (element) => {
    if (element.classList.contains('explanation')) {      
      element.querySelector('i').style.color = 'white';
      element.querySelector('i').style.borderBottom = '1px solid black';
    }
    if (element.classList.contains('example')) {
      element.querySelector('b').style.color = 'white';
      element.querySelector('b').style.borderBottom = '1px solid black';
    }
  }

const showGuessingWordInSentence = (element) => {
    if (element.classList.contains('explanation')) {
      element.querySelector('i').style.color = 'black';
      element.querySelector('i').style.borderBottom = 'none';
    }
    if (element.classList.contains('example')) {
      element.querySelector('b').style.color = 'black';
      element.querySelector('b').style.borderBottom = 'none';
    }
}

const showTranscription = () => {
  mySwiper.slides[mySwiper.activeIndex].querySelector('.transcription').classList.remove('.hidden');
}

const hideTranscription = () => {
  mySwiper.slides[mySwiper.activeIndex].querySelector('.transcription').classList.add('.hidden');
}

const allowNextCard = () => {
  if (mySwiper.activeIndex === mySwiper.slides.length - 1) {
    const modal = M.Modal.getInstance(document.querySelector('.modal'));
    modal.open();
    progressBar.querySelector('.determinate').style.width = '100%';
    progressBar.dataset.tooltip = '100%';
  } else {
    mySwiper.allowSlideNext = true;
    mySwiper.navigation.nextEl.classList.remove('swiper-button-disabled');
  }
}

const audioPlay = (audio) => {
  const tracks = [audio.dataset.wordPronounce, audio.dataset.explanationPronounce, audio.dataset.examplePronounce];
  let current = 0;
  audio.src = tracks[0];
  audio.autoplay = true;
  audio.onended = function() {
    console.log(current);
    current+=1;
    if (current === tracks.length) {
      allowNextCard();
      
    } else {
      audio.src = tracks[current];
      audio.play();
    }    
  }
} 


const showExplanation = () => {
  const explanation = mySwiper.slides[mySwiper.activeIndex].querySelector('.explanation');  
  const explanationTranslation = mySwiper.slides[mySwiper.activeIndex].querySelector('.explanation-translation');

  showGuessingWordInSentence(explanation);

  explanation.classList.remove('hidden');
  explanationTranslation.classList.remove('hidden');
}

const showExample = () => {
  const example = mySwiper.slides[mySwiper.activeIndex].querySelector('.example');  
  const exampleTranslation = mySwiper.slides[mySwiper.activeIndex].querySelector('.example-translation');

  showGuessingWordInSentence(example);
  
  example.classList.remove('hidden');
  exampleTranslation.classList.remove('hidden');
}

const formHandler = (event) => {
  event.preventDefault();
  const input = event.target.querySelector('.input_text');
  input.dataset.tryCount += 1;
  const result = event.target.querySelector('.result');
  input.blur();
  let isWrong;
  input.dataset.word.split('').forEach((el, i)=>{   
    if (el === input.value[i]) {
      result.innerHTML +=`<span class="correct">${el}</span>`;
    } else {
      result.innerHTML += `<span class="wrong">${el}</span>`;    
      isWrong = true;  
    }    
  })

  if (isWrong) {
    // TODO set word to difficult category if wrong
    result.style.zIndex = 2;
    input.value = '';
    input.setAttribute('placeholder', input.dataset.word);
    input.focus();

    setTimeout(() => {
      result.style.zIndex = -1;
      result.innerHTML = '';
    }, 3000);
  } else {
    const audio = event.target.closest('.card').querySelector('.audio');
    if(settings.autoplay) {
      audioPlay(audio);
    }    
    allowNextCard();
    showTranscription();
    showExplanation();
    showExample();
    if (input.dataset.tryCount === 1) {
      // TODO send to learned user words
    }
  }  
}

const againBtnAct = () => {
  const dupl = mySwiper.slides[mySwiper.activeIndex].cloneNode(true);
  console.log(dupl);
  dupl.querySelector('.input_text').value = '';
  dupl.querySelector('.result').innerText = '';
  mySwiper.appendSlide(dupl);
  mySwiper.update();
  setProgressbarToCurrentPosition(); 
}

export { measureWordWidth, updateMaterialComponents, 
setProgressbarToCurrentPosition, 
hideGuessingWordInSentence, showGuessingWordInSentence, 
formHandler, againBtnAct, allowNextCard, showTranscription,
showExplanation, showExample, audioPlay  }

