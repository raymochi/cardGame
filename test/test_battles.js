require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

var assert = require("chai").assert;
var dataHelpers = require("../lib/data-helpers")(knex);
var battleLogic = require("../lib/battle-logic")(dataHelpers);

// dataHelpers.getUserDeck(1).then((result) => { console.log("result is:", result) });

battleLogic.initMatch(1,1);
