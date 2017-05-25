"use strict";

const express = require('express');
const stringGen   = require('../lib/stringGenerator');
const battleRoutes  = express.Router();

let matches = [];

function findOpenMatch(userId) {
  return;
}

function addUserToMatch(userId) {
  return;
}

function genMatchId() {
  let matchId = '';
  do {
    matchId = stringGen();
  } while (matches[matchId])
  return matchId;
}

module.exports = (dataHelpers, battleLogic) => {

  battleRoutes.get('/', (req, res) => {

    res.render("battle");
  });

  battleRoutes.post('/', (req, res) => {
    let foundMatchId = findOpenMatch(1);
    if( foundMatchId ) {
      addUserToMatch(foundMatchId);
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

  battleRoutes.get('/:mid/match', (req, res) => {
    res.render("battle");
  });

  //ajax updating every 5 seconds to check opponents moves
  battleRoutes.get('/:mid/update', (req, res) => {

  });

  //user actions such as summoning creature or playing spell
  battleRoutes.post('/:mid/action', (req, res) => {

  });

  //user clicking end turn button
  battleRoutes.post('/:mid/endturn', (req, res) => {

  });

  //user clicking concede button
  battleRoutes.post('/:mid/concede', (req, res) => {

  });

  return battleRoutes;
}
