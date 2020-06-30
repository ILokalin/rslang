import { ElementGen } from 'Src/service/DomGen/DomGen';
import { dataController } from '../constants';

const vocabularyDifficult = document.getElementById('vocabulary__difficult');
const vocabularyOnLearn = document.getElementById('vocabulary__on-learn');
const vocabularyDeleted = document.getElementById('vocabulary__deleted');

export default class VocabularyWord {
  constructor(wordState) {
    this.wordState = wordState;
  }

  createHeader() {
    const div = ElementGen('div', 'collapsible-header', this.cardElem);
    div.insertAdjacentHTML(
      'afterbegin',
      `<i data-source="${this.wordState.audio}" class="material-icons" id="vocabulary-sound">volume_up</i>
                                        <span class="vocabulary__word">${
      this.wordState.word
      }</span> 
                                        <span class="new badge" data-badge-caption="progress">${
      this.wordState.difficulty
      }</span>`,
    );
    return div;
  }

  createBody() {
    const div = ElementGen('div', 'collapsible-body', this.cardElem);
    div.insertAdjacentHTML('afterbegin', `<div class="row">
                    <p class="col s6">${this.wordState.wordTranslate}</p>
                    <p class="col s6">${this.wordState.transcription}</p>
                  </div> 
                  <img  src="${this.wordState.image}" alt="">
                  <div class="sentences"> 
                    <p>${
      this.wordState.textMeaning
      } <i class="material-icons" data-source="${this.wordState.audioExample}" id="vocabulary-sound" onclick = "alert('Клик!')>volume_up</i></p>
                    <p>${this.wordState.textMeaningTranslate}</p>
                    <p>${this.wordState.textExample} <i data-source="${this.wordState.audioMeaning}" class="material-icons" id="vocabulary-sound">volume_up</i></p>
                    <p>${this.wordState.textExampleTranslate}</p>
                  </div>
                  <div class="divider"></div>
                  <div class="vocabulary__card-footer">
                    <p>Последнее повторение было: <span class="last-itaretion-date">${
      this.wordState.date
      }</span></p>
                    <p>Следующее повторение будет: <span class="last-itaretion-date">${
      this.wordState.date
      }</span></p>
                  </div>`);
    return div;
  }

  renderWordsContainerColum(wordsInColum, colum) {
    const ul = ElementGen('ul', `on-learn__column${colum} collapsible col m6 l6 s12`, this.cardElem);
    wordsInColum.forEach(element => {
      const word = element;
      Promise.all([dataController.getMaterials(element.image).then((fullPath) => {
        word.image = fullPath
      }),
      dataController.getMaterials(element.audio).then((fullPath) => { word.audio = fullPath }),
      dataController.getMaterials(element.audioExample).then((fullPath) => { word.audioExample = fullPath }),
      dataController.getMaterials(element.audioMeaning).then((fullPath) => { word.audioMeaning = fullPath })]).
        then(() => {
          this.wordState = word;
          const li = ElementGen('li', 'vocabulary__word-container');
          li.appendChild(this.createHeader());
          li.appendChild(this.createBody());
          ul.appendChild(li);
        }
        )
    })
    return ul;
  }

  renderVocabularyWords(words, category) {
    const { paginatedResults } = words[0];
    category.appendChild(
      this.renderWordsContainerColum(paginatedResults.slice(0, Math.ceil(paginatedResults.length / 2)), 1),
    );
    category.appendChild(
      this.renderWordsContainerColum(paginatedResults.slice(Math.ceil(paginatedResults.length / 2)), 2),
    );

    // eslint-disable-next-line no-undef
    M.AutoInit()
  }

  playSound() {
    const vocabularySound = document.querySelectorAll('#vocabulary-sound');
    vocabularySound.forEach(element => {
      element.addEventListener('click', (e) => {
        console.log(e);
      });
    });
  }

  renderVocabulary() {
    dataController.userWordsGetAll(['onlearn']).then(
      (response) => {
        this.renderVocabularyWords(response, vocabularyOnLearn)
      },
      (rejectReport) => rejectReport
    );

    dataController.userWordsGetAll(['hard']).then(
      (response) => {
        this.renderVocabularyWords(response, vocabularyDifficult)
      },
      (rejectReport) => rejectReport
    );

    dataController.userWordsGetAll(['deleted']).then(
      (response) => {
        this.renderVocabularyWords(response, vocabularyDeleted);
      },
      (rejectReport) => rejectReport
    );
  }
}
