import { ElementGen } from 'Src/service/DomGen/DomGen';
// import { dataController } from '../constants';

const vocabularyDifficult = document.getElementById('vocabulary__difficult');
const vocabularyOnLearn = document.getElementById('vocabulary__on-learn');
const vocabularyDeleted = document.getElementById('vocabulary__deleted');

export default class VocabularyWord {
  constructor(dataController) {
    this.dataController = dataController;
    this.wordState = undefined;
  }

  createHeader(wordState) {
    const div = ElementGen('div', 'collapsible-header', this.cardElem);
    div.insertAdjacentHTML(
      'afterbegin',
      `<i data-source="${wordState.audio}" class="material-icons vocabulary-sound">volume_up</i>
                                        <span class="vocabulary__word">${wordState.word}</span>
                                        <span class="new badge" data-badge-caption="progress">${wordState.difficulty}</span>`,
    );
    return div;
  }

  createBody(wordState) {
    const div = ElementGen('div', 'collapsible-body', this.cardElem);
    div.insertAdjacentHTML(
      'afterbegin',
      `<div class="row">
                    <p class="col s6">${wordState.wordTranslate}</p>
                    <p class="col s6">${wordState.transcription}</p>
                  </div>
                  <img  src="${wordState.image}" alt="">
                  <div class="sentences">
                    <p>${wordState.textMeaning} <i class="material-icons vocabulary-sound" data-source="${wordState.audioMeaning}">volume_up</i></p>
                    <p>${wordState.textMeaningTranslate}</p>
                    <p>${wordState.textExample} <i data-source="${wordState.audioExample}" class="material-icons vocabulary-sound">volume_up</i></p>
                    <p>${wordState.textExampleTranslate}</p>
                  </div>
                  <div class="divider"></div>
                  <div class="vocabulary__card-footer">
                    <p>Последнее повторение было: <span class="last-itaretion-date">${wordState.userWord.optional.lastDate}</span></p>
                    <p>Следующее повторение будет: <span class="last-itaretion-date">${wordState.nextTime}</span></p>
                  </div>`,
    );
    return div;
  }

  renderWordsContainerColum(wordsInColum, colum) {
    const ul = ElementGen(
      'ul',
      `on-learn__column${colum} collapsible col m6 l6 s12`,
      this.cardElem,
    );

    wordsInColum.forEach((element) => {
      const word = element;
      const lastDate = new Date(element.userWord.optional.lastDate);
      const interval = (2 * element.userWord.optional.progress + 1) * 24 * 60 * 60 * 1000;
      const nextTime = new Date(+lastDate + interval).toDateString();

      Promise.all([
        this.dataController.getMaterials(element.image).then((fullPath) => {
          word.image = fullPath;
        }),
        this.dataController.getMaterials(element.audio).then((fullPath) => {
          word.audio = fullPath;
        }),
        this.dataController.getMaterials(element.audioExample).then((fullPath) => {
          word.audioExample = fullPath;
        }),
        this.dataController.getMaterials(element.audioMeaning).then((fullPath) => {
          word.audioMeaning = fullPath;
        }),
      ]).then(() => {
        const wordState = word;
        wordState.nextTime = nextTime;

        const li = ElementGen('li', 'vocabulary__word-container');
        // word
        li.appendChild(this.createHeader(wordState));
        li.appendChild(this.createBody(wordState));
        ul.appendChild(li);
        this.playSound(li);
      });
    });
    return ul;
  }

  renderVocabularyWords(words, category) {
    const { paginatedResults } = words[0];
    category.appendChild(
      this.renderWordsContainerColum(
        paginatedResults.slice(0, Math.ceil(paginatedResults.length / 2)),
        1,
      ),
    );
    category.appendChild(
      this.renderWordsContainerColum(
        paginatedResults.slice(Math.ceil(paginatedResults.length / 2)),
        2,
      ),
    );
    // eslint-disable-next-line no-undef
    M.AutoInit();
  }

  playSound(el) {
    const vocabularySound = el.querySelectorAll('.vocabulary-sound');
    vocabularySound.forEach((element) =>
      element.addEventListener('click', (e) => {
        const sound = new Audio();
        sound.src = e.target.dataset.source;
        sound.play();
      }),
    );
  }

  renderVocabulary() {
    // Promise.all([
    //   dataController.userWordsGetAll(['onlearn']),
    //   dataController.userWordsGetAll(['hard']),
    //   dataController.userWordsGetAll(['deleted']),
    // ]).then(
    //   (response) => {
    //     this.renderVocabularyWords(response[0], vocabularyOnLearn);
    //     this.renderVocabularyWords(response[1], vocabularyDifficult);
    //     this.renderVocabularyWords(response[2], vocabularyDeleted);
    //   },
    //   (rejectReport) => rejectReport,
    // );

    this.dataController.userWordsGetAll(['onlearn']).then(
      (response) => {
        this.renderVocabularyWords(response, vocabularyOnLearn);
      },
      (rejectReport) => rejectReport,
    );

    this.dataController.userWordsGetAll(['hard']).then(
      (response) => {
        this.renderVocabularyWords(response, vocabularyDifficult);
      },
      (rejectReport) => rejectReport,
    );

    this.dataController.userWordsGetAll(['deleted']).then(
      (response) => {
        this.renderVocabularyWords(response, vocabularyDeleted);
      },
      (rejectReport) => rejectReport,
    );

    // dataController.userWordsGetAll(['onlearn', 'hard', 'deleted']).then(() => {
    //   this.playSound();
    // });
  }
}
