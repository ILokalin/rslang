import { translation } from '../constants';
import { setAudioSrc } from './audioService';

const setSentenceTranslation = (word) => { translation.innerText = word.textExampleTranslate; };
const showTranslation = () => { translation.classList.remove('hidden'); };
const hideTranslation = () => { translation.classList.add('hidden'); };

const connectSentenceWithHints = (word) => {
  setAudioSrc(word);
  setSentenceTranslation(word);
};

export {
  setSentenceTranslation, showTranslation, hideTranslation, connectSentenceWithHints,
};
