"use strict";

function drawCard(deck, hand) {
  hand.push(deck.pop());
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

function getAdjacentPositions(pos, board) {
  let result = []
  if ( pos[0] - 1 >= 0 ){
    result.push([pos[0]-1, pos[1]]);
  }
  if ( Number(pos[0]) + 1 < board.length ){
    result.push([Number(pos[0])+1, pos[1]]);
  }
  if ( pos[1] - 1 >= 0 ){
    result.push([pos[0], pos[1]-1]);
  }
  if ( Number(pos[1]) + 1 < board[pos[0]].length ){
    result.push([pos[0], Number(pos[1])+1]);
  }
  return result;
}

function getCardAtPosition(pos, board) {
  return board[pos[0]][pos[1]];
}

function isEnemyCard( card, userId) {
  if ( card && card.ownerId !== userId) return true;
}

function runFight(newCard, otherCard, side) {
  // console.log('in run fight, new card[side]', newCard[side]);
  let newCardDamage = newCard[side];
  let otherCardDamage = otherCard[side];
  let accumDamage = 0;
  if ( newCard.creatureType === "Rock" && otherCard.creatureType === "Scissors" || newCard.creatureType === "Paper" && otherCard.creatureType === "Rock" || newCard.creatureType === "Scissors" && otherCard.creatureType === "Paper") {
    newCardDamage = Math.max(newCardDamage + 1 , 0);
    otherCardDamage = Math.max(otherCardDamage - 1 , 0);
  }
  otherCard[side] -= newCardDamage;
  console.log('in fight, newCard[side + "Accum"]', newCard[side + 'Accum'])
  newCard[side + 'Accum'] += Number(otherCardDamage);
  console.log('in fight, after newCard[side + "Accum"]', newCard[side + 'Accum'])
}

function runCombat(newCard, newCardPos, match) {
  // console.log('in run combat', newCard, newCardPos);
  let posList = getAdjacentPositions(newCardPos, match.board);
  newCard['frontPowerAccum'] = 0;
  newCard['sidePowerAccum'] = 0;
  let newCardDied = false;
  posList.forEach( (pos) => {
    let otherCard = match.board[pos[0]][pos[1]];
    if( otherCard && isEnemyCard ( otherCard, newCard.ownerId )) {
      let side = 'sidePower';
      if( isFirstPlayer(newCard.ownerId, match) && pos[0] < newCardPos[0] || isSecondPlayer(newCard.ownerId, match) && pos[0] > newCardPos[0]) {
        side = 'frontPower';
      }
      runFight(newCard, otherCard, side);
      if ( otherCard[side] <= 0 ) match.board[pos[0]][pos[1]] = null;
    }

    // console.log('newCardDied', newCardDied);
  });
  if ( newCard['frontPowerAccum']) {
    console.log('newCard["frontPowerAccum"] before', newCard.frontPower, newCard['frontPowerAccum'])
    newCard.frontPower -= newCard['frontPowerAccum'];
    console.log('newCard.accum.frontPower after', newCard.frontPower, newCard['frontPowerAccum'])
    if ( newCard.frontPower <= 0 ) newCardDied = true;
  }
  if ( newCard['sidePowerAccum']) {
    console.log('newCard.accum.sidePower before', newCard.sidePower, newCard['sidePowerAccum'])
    newCard.sidePower -= newCard['sidePowerAccum'];
    console.log('newCard.accum.sidePower before', newCard.sidePower, newCard['sidePowerAccum'])
    if ( newCard.sidePower <= 0 ) newCardDied = true;
  }

  delete newCard['sidePowerAccum'];
  delete newCard['frontPowerAccum'];
  if ( newCardDied ) match.board[newCardPos[0]][newCardPos[1]] = null;
}

function addScoreFor(userId, match) {
  let result = 0;
  for (let rowNum = 0; rowNum < match.board.length; rowNum++) {
    for (let colNum = 0; colNum < match.board[rowNum].length; colNum++) {
      let card = match.board[rowNum][colNum];
      if ( card && card.ownerId === userId) {
        result += Number(card.value);
      }
    }
  }
  return result;
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
            user1Score: 0,
            user2: null,
            user2Deck: [],
            user2Hand: [],
            user2Score: 0,
            board: this.initBoard(),
            turn: 0,
            playedCreature: false,
            playedSpell: false,
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

    endTurn: function(userId, match) {
      drawCard(getUserDeck(userId, match), getUserHand(userId, match))
      match.turn++;
      if( match.turn < 14) {
        if ( isFirstPlayer(userId, match) ) {
          match.user2Score += addScoreFor(match.user2, match);
        } else {
          match.user1Score += addScoreFor(match.user1, match);
        }
      }
      match.playedCreature = false;
      match.playedSpell = false;
    },

    // formats the response for each player's point of view, only provides needed info.
    formatMatchResponse: function(match, userId) {
      let result = {};


      result.userHand = getUserHand(userId, match);
      result.userId = userId;
      result.user1Score = match.user1Score;
      result.user2Score = match.user2Score;
      result.turn = Math.floor(match.turn / 2) + 1;
      if ( /*isSecondPlayer(userId, match)*/ userId === match.user2 ) { // if player 2, provide their own hand, and the board state.
        result.board = match.board.slice().reverse(); // make a copy to avoid changing the server board copy, then reverse it.
        result.phase = match.turn % 2;
      } else { // else, if not player 2, either player 1 or observer, provide their own hand, and default board view
        result.board = match.board;
        result.phase = (match.turn + 1) % 2;
      }

      // console.log('phase is', result.phase);


      return result;
    },

    applyAction: function(action, userId, match) {
      let clientSelection = action.handSelection;
      let clientCard = action.handCard;
      let target = action.target;
      let serverHand = getUserHand(userId, match);
      let response = {
        changes: [],
      }
      // console.log('in apply action, response', response)
      if ( Number(serverHand[clientSelection].id) === Number(clientCard.id) ) {
        if ( isSecondPlayer(userId, match) ) {
          target[0] = 3 - target[0];
        }

        match.board[target[0]][target[1]] = serverHand[clientSelection];
        serverHand.splice(clientSelection,1);
        runCombat(match.board[target[0]][target[1]], [target[0],target[1]], match);

        // drawCard(getUserDeck(userId, match), getUserHand(userId, match))
        // match.turn++;
        // if( match.turn < 14) {
        //   if ( isFirstPlayer(userId, match) ) {
        //     match.user2Score += addScoreFor(match.user2, match);
        //   } else {
        //     match.user1Score += addScoreFor(match.user1, match);
        //   }
        // }

        this.endTurn(userId, match);

        response.match = match;
        // console.log('apply action, before return, response', response);
        return response;
      }

    },

    emitToPlayers: function(outcome, io) {
      let user1 = outcome.match.user1;
      let user2 = outcome.match.user2;
      // console.log('checking socket');
      let response = { changes: outcome.changes }
      if ( user1 && io.gameUserList[user1] ) {
        // console.log('user and socket found, emitting', user1 );
        response.match = this.formatMatchResponse(outcome.match, user1);
        // console.log('after format', user1 )
        io.gameUserList[user1].emit('gameState', response );
      }
      if ( user2 && io.gameUserList[user2] ) {

        // console.log('user and socket found, emitting', user2 );
        response.match = this.formatMatchResponse(outcome.match, user2);
        io.gameUserList[user2].emit('gameState', response );
      }

    }

  }
}
