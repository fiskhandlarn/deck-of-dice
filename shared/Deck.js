import { knuthShuffle } from 'knuth-shuffle';
import Log from './Log';

export default class Deck {
  constructor() {
    this.SET_ASIDE_NR_CARDS = 12; // TODO: move to settings
    this.cards = [];
    this.graveyard = [];
    this.cardDistribution = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

    this.init();
    this.reset();
    Log.add("Shuffling deck and setting " + this.SET_ASIDE_NR_CARDS + " cards aside." + " (Cards left: " + this.cards.length + ")");
  }

  draw() {
    if (!this.hasMoreCards()) {
      this.reset();
      //console.log("Deck exhausted, reshuffling." + " (Cards left: " + this.cards.length + ")");
      Log.add("Deck exhausted, reshuffling and setting " + this.SET_ASIDE_NR_CARDS + " cards aside." + " (Cards left: " + this.cards.length + ")");
    }

    var card = this.cards.pop();
    this.graveyard.push(card);
    //console.log("Drew " + card + "." + " (Cards left: " + this.cards.length + ")");
    Log.add("Drew " + card + "." + " (Cards left: " + this.cards.length + ")");
    return card;
  }

  hasMoreCards() {
    return (this.cards.length > 0);
  }

  init() {
    let loop,
        length = this.cardDistribution.length,
        loop2,
        length2;

    for (loop = 0; loop < length; loop += 1) {
      length2 = this.cardDistribution[loop];
      for (loop2 = 0; loop2 < length2; loop2 += 1) {
        this.graveyard.push((loop + 2));
      }
    }
  }

  reset() {
    // restore all cards
    this.cards = this.cards.concat(this.graveyard);
    this.graveyard = [];

    // randomize draw pile
    knuthShuffle(this.cards);

    // remove 12 cards from draw pile
    this.setAside(this.SET_ASIDE_NR_CARDS);
  }

  setAside(nrCards) {
    this.graveyard = this.cards.splice(0, nrCards);
  };
}
