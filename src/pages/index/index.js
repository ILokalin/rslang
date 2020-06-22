import './index.scss';
import 'materialize-css';
require.context('Src', true, /\.(png|svg|jpg|gif|mp3)$/);

// eslint-disable-next-line no-console
console.log(
  '%cTask RS Lang\n',
  'font-family: sans-serif; font-size: 28px; letter-spacing: 0.1em;',
  'RS School, group 22 2020q1',
);

 M.AutoInit();

document.querySelector('.menu__settings').addEventListener('click', () => {
  document.querySelector('.settings-container').classList.remove('hidden');
})

const settings = {
  cardsPerDay: 30,
  newCardsPerDay: 15,
  justNewWords: 0,
  cardContainsTranslation: 1,
  cardContainsMeaning: 0,
  cardContainsExample: 0,
  cardContainsPicture: 1,
  cardContainsTranscription: 1,
  footerBtnsEnabled: 1,
  deleteBtnEnabled: 1,
}