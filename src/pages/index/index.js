import './index.scss';
import 'materialize-css';
import './js/components/buttons';
import './js/components/form-components';
require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);


M.AutoInit();

document.querySelector('.menu__settings').addEventListener('click', () => {
  document.querySelector('.settings-container').classList.remove('hidden');
})

 const settings = {
  lastTrain: 'date',
  cardsPerDay: 30,
  newCardsPerDay: 15,
  justNewWords: 0,
  cardContainsTranslation: 1,
  cardContainsMeaning: 0,

  cardContainsMeaningTransl: 0,
  cardContainsExample: 0,
  cardContainsExampleTransl: 0,
  cardContainsPicture: 1,
  cardContainsTranscription: 1,
  footerBtnsEnabled: 1,
  deleteBtnEnabled: 1,
  showAnswerBtnEnabled: 0,
  autoPlayEnabled: 1,
}