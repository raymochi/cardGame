
require('dotenv').config();
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

var assert = require("chai").assert;
var dataHelpers = require("../lib/data-helpers")(knex);

// describe("User-Helpers", function() {
//   it("should return Raymond for user ID 2", function() {
//     var word = "abba";
//     userHelpers.getUserById(2).then( (result) => {
//       console.log(result);
//       assert(result[0].username, 'ymond');
//     });
//   });

//   it("should return ID 1 for user Armel", function() {
//     var word = "abba";
//     userHelpers.getUserByName('Armel').then( (result) => {
//       assert(result[0].username, 1);
//     });
//   });
// });

//   it("should return false if a word is NOT a palindrome", function() {
//     var word = "not";
//     assert.isFalse(isPalindrome(word));
//   });

//   it("should return true if a phrase is a palindrome", function() {
//     var phrase = "a man a plan a canal panama";
//     assert.isTrue(isPalindrome(phrase));
//   });

//   it("should return false if a phrase is NOT a palindrome", function() {
//     var phrase = "this is not a palindrome"
//     assert.isFalse(isPalindrome(phrase));
//   });

