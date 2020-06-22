import { store } from '../storage';
import { audio } from '../constants';

const setAudioSrc = (word) => {
  const src = `https://raw.githubusercontent.com/jules0802/rslang-data/master/${word.audioExample}`;
  audio.setAttribute('src', src);
};

const playAudio = () => {
  audio.setAttribute('autoplay', true);
};

const autopronounce = () => {
  if (store.isAutoPronounceOn) {
    playAudio();
  }
};

const roundStatisticAudioHandler = (event) => {
  if (event.target.closest('.material-icons')) {
    audio.setAttribute('src', event.target.dataset.audioSrc);
    audio.play();
  }
};

export {
  setAudioSrc, roundStatisticAudioHandler, autopronounce, playAudio,
};
