"use strict";


// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeBattleLogic(dataHelpers) {

  // Of note: Each database request opens a new connection, and closes it when done, to avoid connection remaining open.
  return {

    shuffle: function(arr) {
      for (let i = arr.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    },

    initMatch: function(mid, userId) {

      const newMatch = {
        mid: mid,
        user1: userId,
        user1Deck: dataHelpers.getUserDeck(userId),
        user1Hand: [],
        user2: null,
        user2Deck: null,
        user2Hand: [],
        board: this.initBoard(),
      };

      return dataHelpers.getUserDeck(userId)
      .then((result) => {
        newMatch.user1Deck = this.shuffle(result);
        console.log(newMatch);
        return newMatch;
      });
    },

    initBoard: function() {
      return [
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null]
      ];
    }
  }
}
