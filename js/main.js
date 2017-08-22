console.log("main.js connected");
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  // access App.js library
  var Board = App.Board();
  var Game = App.Game();
  var Ghost = App.Ghost();
  var Pacman = App.Pacman();

  // START GAME
  Game.initializeGame();

  var spacebarCount = 0;
  // move the pacman depending to the arrow key pressed by user
  document.onkeydown = function(event) {
    event.preventDefault();
    if (event.keyCode == '39') {
      // right arrow
      Pacman.moveRight();
    }
    else if (event.keyCode == '37') {
      // left arrow
      Pacman.moveLeft();
    }
    else if (event.keyCode == '40') {
      // down arrow
      Pacman.moveDown();
    }
    else if (event.keyCode == '38') {
      // up arrow
      Pacman.moveUp();
    }
    else if (event.keyCode == '32') {
      // If spacebar is pressed once, pause the game. If it pressed again unpause. Keep count of the number of presses.
      if (spacebarCount % 2 === 0) {
        Ghost.pause();
        spacebarCount ++;
      }
      else {
        Ghost.moveGhost();
        spacebarCount --;
      }
    }
  }

  // button listeners
  var $newGameButton = $('#new-game');
  $newGameButton.on('click', function() {
    Game.newGame();
  });
});
