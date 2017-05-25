"use strict";

const express = require('express');
const userRoutes  = express.Router();

module.exports = (knex) => {

  userRoutes.get('/', (req, res) => {
    knex
      .select('*')
      .from('users')
      .then((results) => {
        res.json(results);
    });
  });

  userRoutes.post('/login', (req, res) => {

  });

  userRoutes.post('/logout', (req, res) => {

  });

  userRoutes.post('/register', (req, res) => {

  });

  userRoutes.post('/chat', (req, res) => {

  });


  return userRoutes;
}
