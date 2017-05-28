"use strict";

function drawCard(deck, hand) {
  hand.push(deck.pop());
  // console.log(hand);
}

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
      return dataHelpers.getUserDeck(userId)
        .then((result) => {
          const newMatch = {
          mid: mid,
          user1: userId,
          user1Deck: this.shuffle(result),
          user1Hand: [],
          user2: null,
          user2Deck: [],
          user2Hand: [],
          board: this.initBoard(),
          turn: 0,
          phase: 'main',
        };
        for (let i = 0; i < 5; i++) {
          drawCard(newMatch.user1Deck, newMatch.user1Hand);
        }
        // console.log(newMatch);
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
    },

    // formats the response for each player's point of view, only provides needed info.
    formatMatchResponse: function(match, userId) {
      let result = {};
      for (let rowNum = 0; rowNum < match.board.length; rowNum++) {
        for (let colNum = 0; colNum < match.board[rowNum].length; colNum++) {
          if ( match.board[rowNum][colNum] && match.board[rowNum][colNum].ownerId !== userId) {
            match.board[rowNum][colNum].enemyCard = true;
          }
        }
      }

      if ( userId === match.user2 ) { // if player 2, provide their own hand, and the board state.
        result.userHand = match.user2Hand;
        result.board = match.board.slice().reverse(); // make a copy to avoid changing the server board copy, then reverse it.
      } else { // else, if not player 2, either player 1 or observer, provide their own hand, and default board view
        result.userHand = match.user1Hand;
        result.board = match.board;
      }

      return result;
    },

  }
}
