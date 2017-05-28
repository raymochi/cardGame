"use strict";

function drawCard(deck, hand) {
  hand.push(deck.pop());
  // console.log(hand);
}

function getUserHand(userId, match) {
  if ( userId === match.user2 ) {
    return match.user2Hand;
  } else {
    return match.user1Hand;
  }
}

function getUserDeck(userId, match) {
  if ( userId === match.user2 ) {
    return match.user2Deck;
  } else {
    return match.user1Deck;
  }
}

function isFirstPlayer(userId, match) {
  if ( userId === match.user1 ) return true;
  return false
}

function isSecondPlayer(userId, match) {
  if ( userId === match.user2 ) return true;
  return false
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
      return dataHelpers.getUserDeck(userId) //TODO userId
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
            phase: 1,
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

    addUserToMatch: function(userId, match) {
      return dataHelpers.getUserDeck(userId)
        .then((result) => {
          match.user2 = userId;
          match.user2Deck = this.shuffle(result);
          for (let i = 0; i < 5; i++) {
            drawCard(match.user2Deck, match.user2Hand);
          }
        });
    },

    // formats the response for each player's point of view, only provides needed info.
    formatMatchResponse: function(match, userId) {
      let result = {};
      for (let rowNum = 0; rowNum < match.board.length; rowNum++) {
        for (let colNum = 0; colNum < match.board[rowNum].length; colNum++) {
          if ( match.board[rowNum][colNum] && match.board[rowNum][colNum].ownerId !== 1) {
            match.board[rowNum][colNum].enemyCard = true;
          }
        }
      }

      result.userHand = getUserHand(userId, match);
      if ( userId === match.user2 ) { // if player 2, provide their own hand, and the board state.
        result.board = match.board.slice().reverse(); // make a copy to avoid changing the server board copy, then reverse it.
        result.phase = match.turn % 2;
      } else { // else, if not player 2, either player 1 or observer, provide their own hand, and default board view
        result.board = match.board;
        result.phase = (match.turn + 1) % 2;
      }
      console.log('phase is', result.phase)
      result.userId = userId;
      // let test = result.userHand[2];
      // result.board[1][1] = result.userHand[2];

      return result;
    },

    applyAction: function(action, userId, match) {
      let clientSelection = action.handSelection;
      let clientCard = action.handCard;
      let target = action.target;
      let serverHand = getUserHand(userId, match);

      if ( Number(serverHand[clientSelection].id) === Number(clientCard.id) ) {
        match.board[target[0]][target[1]] = serverHand[clientSelection];
        serverHand.splice(clientSelection,1);
        drawCard(getUserDeck(userId, match), getUserHand(userId, match))
        match.turn++;
        let response = {
          changes: [],
          match: this.formatMatchResponse(match, userId)
        }
        return response;
      }

    }

  }
}
