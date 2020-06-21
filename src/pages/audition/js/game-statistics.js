export default class AuditionGameStatistics {
  constructor (correct, error, answers) {
    this.correctWords = correct;
    this.errorWords = error;
    this.correctAnswers = answers;
    this.writeStatistics();
  }

  writeStatistics () {
    console.log(this.correctWords)
    console.log(this.errorWords)
    alert(this.correctAnswers)
  }
}
