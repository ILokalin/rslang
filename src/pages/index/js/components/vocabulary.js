import { ElementGen } from 'Src/service/DomGen/DomGen';

const vocabularyDifficult = document.getElementById('vocabulary__difficult');
const vocabularyOnLearn = document.getElementById('vocabulary__on-learn');
const vocabularyDeleted = document.getElementById('vocabulary__deleted');

export default class VocabularyWord {
  constructor(dataController) {
    this.dataController = dataController;
    this.wordState = undefined;
    this.curentCloum = 1;
  }

  createHeader(wordState) {
    const div = ElementGen('div', 'collapsible-header', this.cardElem);
    div.insertAdjacentHTML(
      'afterbegin',
      `<i data-source="${wordState.audio}" class="material-icons vocabulary-sound">volume_up</i>
                                        <span class="vocabulary__word">${wordState.word}</span>
                                        <i class="material-icons restore-icon" title="Восстановить в категорию на изучении">restore_page</i>
                                        <span class="new badge" data-badge-caption="${wordState.progress}"></span>`,
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
                    <p>Последнее повторение было: <span class="last-itaretion-date">${wordState.lastDate}</span></p>
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
      const nextTime = new Date(+lastDate + interval);

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
        wordState.lastDate = lastDate.toLocaleString("ru", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        wordState.nextTime = nextTime.toLocaleString("ru", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        wordState.progress = this.getLearnProgressString(word.userWord.optional.progress);
        const li = ElementGen('li', 'vocabulary__word-container');
        li.appendChild(this.createHeader(wordState));
        li.appendChild(this.createBody(wordState));
        ul.appendChild(li);
        this.playSound(li);
        this.restoreWordInLerningCategory(li, word);
      });
    });
    return ul;
  }

  static sortWords(arrayWords) {
    return arrayWords.sort((a, b) => {
      const wordA = a.word.toLowerCase();
      const wordB = b.word.toLowerCase();
      if (wordA < wordB)
        return -1
      if (wordA > wordB)
        return 1
      return 0
    })
  }


  renderVocabularyWords(words, category) {
    const { paginatedResults } = words[0];
    const sortArrayWords = VocabularyWord.sortWords(paginatedResults);
    category.appendChild(
      this.renderWordsContainerColum(
        sortArrayWords.slice(0, Math.ceil(sortArrayWords.length / 2)),
        1,
      ),
    );
    category.appendChild(
      this.renderWordsContainerColum(
        sortArrayWords.slice(Math.ceil(sortArrayWords.length / 2)),
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
        e.stopPropagation();
        const sound = new Audio();
        sound.src = e.target.dataset.source;
        sound.play();
      }),
    );
  }

  restoreWordInLerningCategory(li, wordState) {
    const vocabularyRestorIcon = li.querySelectorAll('.restore-icon');
    const vocabularyOnLearnColumn = vocabularyOnLearn.getElementsByClassName(`on-learn__column${this.curentCloum}`);

    if (this.curentCloum === 1) { this.curentCloum = 2 }
    else { this.curentCloum = 1 }
    vocabularyRestorIcon.forEach((element) =>
      element.addEventListener('click', () => {
        vocabularyOnLearnColumn[0].appendChild(li);
        const saveOption = {
          // eslint-disable-next-line no-underscore-dangle
          id: wordState._id,
          status: 'onlearn',
          progress: wordState.userWord.optional.progress,
        }
        this.dataController.userWordsPut(saveOption).then((response) => response,
          (report) => console.log(report));
      }),
    );
  }

  getLearnProgressString(coefficient) {
    if (coefficient === 0) {
      return 'в начале изучения';
    }
    if (coefficient > 0 && coefficient <= 2) {
      return 'недавно начали изучать';
    }
    if (coefficient > 2 && coefficient <= 4) {
      return 'хорошее начало';
    }
    if (coefficient > 4 && coefficient <= 8) {
      return 'хорошо знаете слово';
    }
    if (coefficient > 8) {
      return 'отлично знаете слово';
    }
    return 'новое слово';
  }

  renderVocabulary() {
    this.dataController.userWordsGetAll(['onlearn']).then(
      (response) => {
        this.renderVocabularyWords(response, vocabularyOnLearn);
      },
      (rejectReport) => console.log(rejectReport),
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
  }
}