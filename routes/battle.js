"use strict";

const express = require('express');
const battleRoutes  = express.Router();

module.exports = (knex) => {

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
