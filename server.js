"use strict";

require('dotenv').config();

const PORT          = process.env.PORT || 8080;
const ENV           = process.env.ENV || 'development';
const express       = require('express');
const bodyParser    = require('body-parser');
const sass          = require('node-sass-middleware');
const app           = express();
const cookieSession = require('cookie-session');

const knexConfig    = require('./knexfile');
const knex          = require('knex')(knexConfig[ENV]);
const morgan        = require('morgan');
const knexLogger    = require('knex-logger');
const server        = require('http').createServer(app);
const io            = require('socket.io')(server);

const dataHelpers   = require('./lib/data-helpers')(knex);
const battleLogic   = require('./lib/battle-logic')(dataHelpers);
const userHelpers   = require('./lib/user-helpers')(dataHelpers);

// Seperated Routes for each Resource
const usersRoutes   = require('./routes/users');
const battleRoutes  = require('./routes/battle');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 60 * 60 * 1000

}));

// Mount all resource routes
app.use('/', usersRoutes(dataHelpers, userHelpers, io));
app.use('/battle', battleRoutes(dataHelpers, battleLogic, io));


server.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});

io.on('connection', (socket) => {

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });







})






