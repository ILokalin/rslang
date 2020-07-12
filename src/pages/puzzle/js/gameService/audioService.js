import { store } from '../storage';
import { audio, dataController } from '../constants';

const setAudioSrc = (word) => {
  dataController.getMaterials(word.audioExample).then((res) => {
    audio.setAttribute('src', res);
  });
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

export { setAudioSrc, roundStatisticAudioHandler, autopronounce, playAudio };
