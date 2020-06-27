import { ElementGen } from 'Src/service/DomGen/DomGen';
import {dataController} from '../constants';


class VocabularyWord {
  constructor(wordState) {
    this.wordState = wordState;
    this.cardElem = ElementGen('li', 'vocabulary__word-container');
    this.cardElem.appendChild(this.createHeader());
    this.cardElem.appendChild(this.createBody());
  }

  createHeader () {
    const div = ElementGen('div', 'collapsible-header', this.cardElem);
    div.insertAdjacentHtml('afterbegin',`<i data-source="${dataController.getMaterials(this.wordState.audio).then((fullPath) => fullPath)}" class="material-icons">volume_up</i>
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
                  <img  src="${dataController.getMaterials(this.wordState.image).then((fullPath) => fullPath)}" alt="">
                  <div class="sentences"> 
                    <p>${this.wordState.textMeaning} <i class="material-icons" data-source="${dataController.getMaterials(this.wordState.audioMeaning).then((fullPath) => fullPath)}">volume_up</i></p>
                    <p>${this.wordState.textMeaningTranslate}</p>
                    <p>${this.wordState.textExample} <i data-source="${dataController.getMaterials(this.wordState.audioExample).then((fullPath) => fullPath)}" class="material-icons">volume_up</i></p>
                    <p>${this.wordState.textExampleTranslate}</p>
                  </div>
                  <div class="divider"></div>
                  <div class="vocabulary__card-footer">
                    <p>Последнее повторение было: <span class="last-itaretion-date">${this.wordState.date}</span></p>
                    <p>Следующее повторение будет: <span class="last-itaretion-date">${this.wordState.date}</span></p>
                  </div>`);
    return div;
  }
}