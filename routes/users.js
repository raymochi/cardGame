"use strict";

const express = require('express');
const userRoutes  = express.Router();

module.exports = (dataHelpers, userHelpers) => {

  userRoutes.get('/', (req, res) => {
    let pass = userHelpers.validateLogin('Armel');
    console.log(pass);
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
