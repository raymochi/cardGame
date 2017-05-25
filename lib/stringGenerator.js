module.exports = function () {
  var text = "";
  var possible = "ZXCVBNMASDFGHJKLQWERTYUIOPzxcvbnmasdfghjklqwertyuiop1234567890";
  for(var i = 0; i < 4; i++) {
    text += possible[Math.floor(Math.random()*possible.length)];
  }
  return text;
}
