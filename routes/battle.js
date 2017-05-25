"use strict";

const express = require('express');
const stringGen   = require('./lib/stringGenerator');
const battleRoutes  = express.Router();

let matchId = null;

module.exports = (knex) => {

  battleRoutes.get('/', (req, res) => {
    if (!matchId) {
      matchId = stringGen();
      res.redirect(`/${matchId}`);
    } else {
      res.redirect(`/${matchId}`);
      matchId = null;
    }
  });

  //standard get request for loading battle page after
  //clicking play
  battleRoutes.get('/:mid/', (req, res) => {

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
