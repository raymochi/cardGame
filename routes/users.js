"use strict";

const bcrypt        = require('bcrypt');
const express       = require('express');
const userRoutes    = express.Router();

module.exports = (dataHelpers, userHelpers, io) => {

  userRoutes.get('/', (req, res) => {
    let posts = [];
    dataHelpers.getChatsByChannel('global')
    .then( (logs) => {
      for (let log of logs) {
        posts.push(log.message);
      }
      // console.log(posts);
      let templateVars = {
        chatLog: posts
      }
      res.render('index', templateVars);
    })
  });

  userRoutes.post('/login', (req, res) => {
    let username = req.body.username.toLowerCase();
    userHelpers.validateLogin(username)
    .then( (user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log('logged in',user.id);
        req.session.userid = user.id;
        res.redirect('/');
      } else {
        console.log('invalid password');
        res.status(401);
      }
    });
  });

  userRoutes.get('/renderlogin', (req, res) => {
    let userID = req.session.userid;
    res.json(userID);
  });

  userRoutes.post('/logout', (req, res) => {
    console.log(req.session.userid,'logged out');
    req.session = null;
    res.redirect('/');
  });

  userRoutes.post('/register', (req, res) => {
    let username = req.body.username.toLowerCase();
    let email = req.body.email.toLowerCase();
    let hashedPass = bcrypt.hashSync(req.body.password, 10);
    userHelpers.registerAccount(username, hashedPass, email)
    .then( (data) => {
      if (data) {
        userHelpers.validateLogin(username)
        .then( (user) => {
          console.log('logging in', user.id);
          req.session.userid = user.id;
          res.redirect('/');
        })
        console.log('register request completed');
      } else {
        res.redirect('/');
      }
    });
    // res.redirect('/')
  });

  userRoutes.get('/chat', (req, res) => {
    let posts = [];
    dataHelpers.getChatsByChannel('global')
    .then( (logs) => {
      for (let log of logs){
        posts.push(log.message);
      }
      res.json(posts);
    });
  })

  userRoutes.post('/chat', (req, res) => {
    let userId = req.session.userid;
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (req.session.userid) {
      dataHelpers.getUserName(userId)
      .then( (currentUser) => {
        userHelpers.postMessage(userId, 'global', `[${hours}:${minutes}] ${currentUser.toUpperCase()}: ${req.body.post}`)
        .then( () => {
          console.log('submitting message now');
          io.sockets.emit('submit message', `[${hours}:${minutes}] ${currentUser.toUpperCase()}: ${req.body.post}`)
        })
      });
    }
    res.status(201);
  });


  return userRoutes;
}
