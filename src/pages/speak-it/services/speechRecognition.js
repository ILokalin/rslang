import Utils from './utils';
import {
  SPEAK_BTN,
  WORD_INPUT,
  WORD_IMG,
  RESULTS_BTN,
  ERRORS_MAX_COUNT,
  speechRecognitionLanguage,
} from '../data/constants';

export default class SpeechRecognitionService {
  constructor(props) {
    this.props = props;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = speechRecognitionLanguage;
    this.recognition.addEventListener('result', this.onResult.bind(this));
    SPEAK_BTN.addEventListener('click', this.speakButtonClick.bind(this));
  }

  startRecording() {
    try {
      this.recognition.start();
      this.recognition.addEventListener('end', this.recognition.start);
    } catch (err) {
      localStorage.isStart = true;
    }
  }

  stopRecording() {
    this.recognition.removeEventListener('end', this.recognition.start);
    this.recognition.stop();
  }

  onResult(event) {
    const { transcript } = event.results[0][0];
    WORD_INPUT.value = String(transcript).trim().toLowerCase();
    const CARDS = document.querySelectorAll('.container .item');
    CARDS.forEach(this.checkResults, this);
  }

  checkResults(card) {
    if (card.querySelector('.word').innerText.trim().toLowerCase() === WORD_INPUT.value) {
      if (!card.classList.contains('activeItem')) {
        this.props.knowArr.push(this.props.errorsArr[card.getAttribute('index')]);
        this.props.know += 1;
        this.props.errors -= 1;
        card.classList.add('activeItem');
        WORD_IMG.src = `${card.getAttribute('data-img')}`;
        Utils.increaseScore();
        if (this.props.knowArr.length === ERRORS_MAX_COUNT) {
          RESULTS_BTN.click();
        }
      }
    }
  }

  speakButtonClick(evt) {
    Utils.clearScore();
    localStorage.isStart = !JSON.parse(localStorage.isStart);
    if (JSON.parse(localStorage.isStart)) {
      this.startRecording();
      SPEAK_BTN.classList.add('activeBtn');
      SPEAK_BTN.innerText = 'Stop game';
      Utils.resetMainCard();
      Utils.disableCardClick();
    } else if (!JSON.parse(localStorage.isStart)) {
      this.stopRecording();
      SPEAK_BTN.classList.remove('activeBtn');
      SPEAK_BTN.innerText = 'Speak please';
      Utils.resetMainCard();
      Utils.disableCardClick();
      Utils.resetCards();
    }
    evt.preventDefault();
  }
}
