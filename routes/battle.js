"use strict";

const express = require('express');
const stringGen   = require('../lib/stringGenerator');
const battleRoutes  = express.Router();

let matches = [];

function findOpenMatch(userId) {
  // TODO, look through existing open matches to find one to add user to.
  return;
}

function addUserToMatch(userId, mid) {
  // TODO, add user to existing match
  return;
}

// generates a new random matchId that doesn't collide with an existing one, and returns the result.
function genMatchId() {
  let matchId = '';
  do {
    matchId = stringGen();
  } while (matches[matchId])
  return matchId;
}

// formats the match state response to each user. 'user' param should be 1 or 2, depending on which they are in the match.
// 'match' param should be the full match object


module.exports = (dataHelpers, battleLogic) => {

  battleRoutes.get('/', (req, res) => {
    console.log(battleLogic.initMatch('rwa2', 1));
    res.render("battle");
  });

  // POST request when first clicking play, cueing the server to look for existing matches, and creating a new one if none found.
  // redirects user to the appropriate match ID.
  battleRoutes.post('/', (req, res) => {
    let foundMatchId = findOpenMatch(1);
    if( foundMatchId ) {
      addUserToMatch(1,foundMatchId);
      res.redirect(`/battle/${foundMatchId}`);
    } else {
      let newMatchId = genMatchId();
       battleLogic.initMatch(newMatchId, 1)
      .then( (result) => {
        matches[newMatchId] = result;
        res.redirect(`/battle/${newMatchId}`);
      });
    }

  })

  //standard get request for loading battle page after
  //clicking play
  battleRoutes.get('/:mid/', (req, res) => {
    res.render("battle");
  });

  // response to ajax request for full game state.
  battleRoutes.get('/:mid/match', (req, res) => {
    if (matches[mid]) {
      res.json("battle");
    }
    res.json("battle");
  });

  //ajax updating every 5 seconds to check opponents moves
  battleRoutes.get('/:mid/update', (req, res) => {

  });

  //user actions such as summoning creature or playing spell
  battleRoutes.post('/:mid/action', (req, res) => {
    let act = req.body.action;
    if ( matches[mid] ) {
      let match = matches[mid];
      if ( match[mid].user1hand[act.handPos] = act.cardId ) {
        let response = {
          changes: [],
          match: battleLogic.formatMatchResponse(match, 1)
        }
        res.json(response);
      }
    }

  });

  //user clicking end turn button
  battleRoutes.post('/:mid/endturn', (req, res) => {

  });

  //user clicking concede button
  battleRoutes.post('/:mid/concede', (req, res) => {

  });

  return battleRoutes;
}
