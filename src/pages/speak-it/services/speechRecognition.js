import Utils from './utils';
import {
  SPEAK_BTN,
  WORD_INPUT,
  WORD_IMG,
  RESULTS_BTN,
  ERRORS_MAX_COUNT,
  ATTEMPTS_PER_WORD,
  speechRecognitionLanguage,
} from '../data/constants';

export default class SpeechRecognitionService {
  constructor(props) {
    this.props = props;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    // eslint-disable-next-line no-undef
    this.recognition = new SpeechRecognition();
    this.recognition.lang = speechRecognitionLanguage;
    this.recognition.addEventListener('result', this.onResult.bind(this));
    SPEAK_BTN.addEventListener('click', this.speakButtonClick.bind(this));
    this.attempts = ATTEMPTS_PER_WORD;
  }

  startRecording() {
    try {
      this.recognition.start();
      this.recognition.addEventListener('end', this.recognition.start);
    } catch (err) {
      localStorage.isStartSpeakIt = true;
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
    const { errors } = this.props;
    CARDS.forEach(this.checkResults, this);
    this.checkRoundResult(errors);
  }

  checkRoundResult(errors) {
    if (errors === this.props.errors) {
      this.attempts -= 1;
    } else {
      this.attempts = ATTEMPTS_PER_WORD;
    }
    if (this.attempts === 0) {
      Utils.decreaseScore();
      this.attempts = ATTEMPTS_PER_WORD;
    }
    if (Utils.totalScore() === 0 || this.props.knowArr.length === ERRORS_MAX_COUNT) {
      RESULTS_BTN.click();
    }
  }

  checkResults(card) {
    if (card.querySelector('.word').innerText.trim().toLowerCase() === WORD_INPUT.value) {
      if (!card.classList.contains('activeItem')) {
        this.props.knowArr.push(this.props.errorsArr[card.getAttribute('index')]);
        this.props.know += 1;
        this.props.errors -= 1;
        card.classList.add('activeItem');
        WORD_IMG.src = `${card.getAttribute('data-img')}`;
      }
    }
  }

  speakButtonClick(evt) {
    this.attempts = ATTEMPTS_PER_WORD;
    localStorage.isStartSpeakIt = !JSON.parse(localStorage.isStartSpeakIt);
    Utils.prepareScore();
    if (JSON.parse(localStorage.isStartSpeakIt)) {
      this.startRecording();
      SPEAK_BTN.classList.add('activeBtn');
      SPEAK_BTN.innerText = 'Стоп игра';
      Utils.resetMainCard();
      Utils.disableCardClick();
    } else if (!JSON.parse(localStorage.isStartSpeakIt)) {
      this.stopRecording();
      SPEAK_BTN.classList.remove('activeBtn');
      SPEAK_BTN.innerText = 'Начать говорить';
      Utils.resetMainCard();
      Utils.disableCardClick();
      Utils.resetCards();
    }
    evt.preventDefault();
  }
}
