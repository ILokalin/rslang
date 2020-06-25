import { ElementGen } from 'Src/service/DomGen/DomGen';

class VocabularyWord {
  constructor(wordState) {
    this.wordState = wordState;
    this.cardElem = ElementGen('li', 'vocabulary__word-container');
    this.cardElem.appendChild(this.createHeader())
  }

  createHeader () {
    const div = ElementGen('div', 'collapsible-header', this.cardElem);
    div.insertAdjacentHtml('afterbegin',`<i data-source="https://raw.githubusercontent.com/jules0802/rslang-data/master/${this.wordState.audio}" class="material-icons">volume_up</i>
                                        <span class="vocabulary__word">${this.wordState.word}</span> 
                                        <span class="new badge" data-badge-caption="progress">${this.wordState.difficulty}</span>`)
    return div;
  }

  createBody () {
    const div = ElementGen('div', 'collapsible-body', this.cardElem);
    div.insertAdjacentHtml('afterbegin', `<div class="row">
                    <p class="col s6">${this.wordState.wordTranslate}</p>
                    <p class="col s6">${this.wordState.transcription}</p>
                  </div> 
                  <img  src="https://raw.githubusercontent.com/jules0802/rslang-data/master/${this.wordState.image}" alt="">
                  <div class="sentences"> 
                    <p>${this.wordState.textMeaning} <i class="material-icons" data-source="https://raw.githubusercontent.com/jules0802/rslang-data/master/${this.wordState.audioMeaning}">volume_up</i></p>
                    <p>${this.wordState.textMeaningTranslate}</p>
                    <p>${this.wordState.textExample} <i data-source="https://raw.githubusercontent.com/jules0802/rslang-data/master/${this.wordState.audioExample}" class="material-icons">volume_up</i></p>
                    <p>${this.wordState.textExampleTranslate}</p>`);
    return div;
  }

}