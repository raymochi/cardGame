"use strict";

const express = require('express');
const stringGen   = require('../lib/stringGenerator');
const battleRoutes  = express.Router();

let matches = [];

function isMatchOpen(userId, mid) {
  console.log('is match open !matches[mid].user2 && matches[mid].user1 !== userId', !matches[mid].user2, matches[mid].user1 !== userId)
  return !matches[mid].user2 && matches[mid].user1 !== userId;
}

function findOpenMatch(userId) {
  console.log('find open match');
  for (let mid in matches) {
    if ( isMatchOpen(userId, mid) ) {
      return mid;
    }
  }
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


module.exports = (dataHelpers, battleLogic, io) => {

  battleRoutes.get('/', (req, res) => {
    res.render('battle');
  });

  // POST request when first clicking play, cueing the server to look for existing matches, and creating a new one if none found.
  // redirects user to the appropriate match ID.
  battleRoutes.post('/', (req, res) => {
    let userId = req.session.userid;
    let foundMatchId = findOpenMatch(userId);
    if( foundMatchId ) {
      battleLogic.addUserToMatch(userId, matches[foundMatchId])
      .then( (result) => {
        res.redirect(`/battle/${foundMatchId}`);
      });

    } else {
      let newMatchId = genMatchId();
      battleLogic.initMatch(newMatchId, userId)
      .then( (result) => {
        matches[newMatchId] = result;
        res.redirect(`/battle/${newMatchId}`);
      });
    }

  })

  //standard get request for loading battle page after
  //clicking play
  battleRoutes.get('/:mid/', (req, res) => {
    let mid = req.params.mid
    if ( matches[mid] ) {
      // let currMatch = battleLogic.formatMatchResponse(matches[mid], 1);
      res.render('battle');
    } else {
      res.redirect('/')
    }
  });

  // response to ajax request for full game state.
  battleRoutes.get('/:mid/match', (req, res) => {
    let mid = req.params.mid
    let userId = req.session.userid
    if ( matches[mid] ) {
      let currMatch = battleLogic.formatMatchResponse(matches[mid], userId);
      res.json(currMatch);
    } else {
      res.redirect('/')
    }
  });

  //ajax updating every 5 seconds to check opponents moves
  battleRoutes.get('/:mid/update', (req, res) => {

  });

  //user actions such as summoning creature or playing spell
  battleRoutes.post('/:mid/action', (req, res) => {
    let mid = req.params.mid;
    let userId = req.session.userid;
    if ( matches[mid] ) {
      let response = battleLogic.applyAction(req.body, userId, matches[mid]);
      res.json(response);
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
