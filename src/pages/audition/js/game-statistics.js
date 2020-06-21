export default class AuditionGameStatistics {
  constructor (correct, error) {
    this.correctWords = correct;
    this.errorWords = error;
    this.writeStatistics();
  }

  writeStatistics () {
    console.log(this.correctWords)
    console.log(this.errorWords)
  }
}
