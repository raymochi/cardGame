"use strict";

const express       = require('express');
const userRoutes    = express.Router();

module.exports = (dataHelpers, userHelpers) => {

  userRoutes.get('/', (req, res) => {
    res.render('index');
  });

  userRoutes.post('/login', (req, res) => {
    userHelpers.validateLogin(req.body.username)
    .then( (user) => {
      if (req.body.password === user.password) {
        console.log('logged in',user.id);
        req.session.userid = user.id;
        res.redirect('/');
      }
    });
  });

  userRoutes.post('/logout', (req, res) => {
    console.log(req.session.userid,'logged out');
    req.session = null;
    res.redirect('/');
  });

  userRoutes.post('/register', (req, res) => {
    userHelpers.registerAccount(req.body.username, req.body.password, req.body.email)
    .then( () => {
      console.log('register request completed');
    });
    res.redirect('/')
  });

  userRoutes.post('/chat', (req, res) => {

  });


  return userRoutes;
}
