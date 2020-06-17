import { CARDS_ITEMS } from '../../data/constants';

function wordTemplate(data) {
  const html = `<div class="item" data-current="142">
      <span class="audio-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg></span>
      <p class="word">${data.word}</p>
      <p class="transcription">${data.transcription}</p>
      <p class="translation">${data.wordTranslate}</p>
  </div>`;
  return html;
}

export class Cards {
  constructor() {
    this.el = CARDS_ITEMS;
    const data = {};
    this.el.innerHTML = wordTemplate(data);
  }
}
