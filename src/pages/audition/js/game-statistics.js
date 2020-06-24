export default class AuditionGameStatistics {
  constructor (words) {
    this.gameWords = words;
    this.getGameStatistics();
  }



  getGameStatistics() {
    const answeredWords = this.gameWords.filter((word) => word.answer);
    const errorWords = this.gameWords.filter((word) => !word.answer);
    const gamePoints = answeredWords.length;
    console.log(answeredWords);
    console.log(errorWords);
    alert(`У вас ${gamePoints} правильных ответов`)
  }
}
