self.onmessage = function (e) {
  var booleanArray = [true, false];
  var directionArray = [0, 90, 180, 270];

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  var move = booleanArray[randomInteger(0, 1)];
  var shoot = booleanArray[randomInteger(0, 1)];
  var rotate = directionArray[randomInteger(0, 3)]

  self.postMessage({ move: move, shoot: shoot, rotate: rotate });
}