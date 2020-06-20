import { ServerAPI } from 'Service/ServerAPI';

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
      },
    (rejectReport) => {console.log(rejectReport)}
  )
  }

  start() {
    if(this.words.length) {
      this.words.forEach((word) => {
        const card = new Card();
        mySwiper.appendSlide(card.cardElem);
      });
      mySwiper.update();
    }    
  }
}