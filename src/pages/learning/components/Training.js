import { ServerAPI } from 'Service/ServerAPI';
import Card from './Card';
import {mySwiper} from './constants';
import 'materialize-css';

export default class Training {
  constructor(newWordsAmountPerDay, maxWordsPerDay) {
    this.date = new Date();
    this.newWordsAmountPerDay = newWordsAmountPerDay;
    this.maxWordsPerDay = maxWordsPerDay;
    // TODO ServerAPI
    const serverApi = new ServerAPI();
    const wordsQuery = {
      group:0,
      page:2,      
    }
    serverApi.getWords(wordsQuery).then(
    (wordsArray) => {
      console.log(wordsArray);
      this.words = wordsArray;
      this.start();
      },
    (rejectReport) => {console.log(rejectReport)}
  )
  }

  start() {
    if(this.words.length) {
      this.words.forEach((word) => {
        const card = new Card(word);
        mySwiper.appendSlide(card.cardElem);
      });
      mySwiper.update();
      M.AutoInit();
    }    
  }
}