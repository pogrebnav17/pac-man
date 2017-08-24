console.log("main.js connected");
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  // access App.js library
  var Board = App.Board();
  var Game = App.Game();
  var Ghost = App.Ghost();
  var Pacman = App.Pacman();
  var Levels = App.Levels();

  // START GAME
  Game.initializeGame();

  // move the pacman depending to the arrow key pressed by user
  document.onkeydown = function(event) {
    event.preventDefault();
    // only let pacman move if the game has not been paused
    if (Game.spacebarCount === 0) {
      // right arrow key
      if (event.keyCode == '39') {
        // only move right if you are within the board
        if (Pacman.pacmanPosition === 119) {
          Pacman.pacmanPosition = 100;
          Pacman.move();
        }
        else if (Pacman.pacmanPosition === 319) {
          Pacman.pacmanPosition = 300;
          Pacman.move();
        }
        else if (Board.locations[Pacman.pacmanPosition].column < 19) {
          Pacman.moveRight();
        }
      }
      // left arrow key
      else if (event.keyCode == '37') {
        // only move left if you are within the board
        if (Pacman.pacmanPosition === 100) {
          Pacman.pacmanPosition = 119;
          Pacman.move();
        }
        else if (Pacman.pacmanPosition === 300) {
          Pacman.pacmanPosition = 319;
          Pacman.move();
        }
        else if (Board.locations[Pacman.pacmanPosition].column > 0) {
          Pacman.moveLeft();
        }
      }
      // down arrow key
      else if (event.keyCode == '40') {
        // only move down if you are within the board
        if (Board.locations[Pacman.pacmanPosition].row < 19) {
          Pacman.moveDown();
        }
      }
      // up arrow key
      else if (event.keyCode == '38') {
        // only move up if you are within the board
        if (Board.locations[Pacman.pacmanPosition].row > 0) {
          Pacman.moveUp();
        }
      }
    }

    if (event.keyCode == '32') {
      // If spacebar is pressed once, pause the game. If it pressed again unpause. Keep count of the number of presses.
      if (Game.spacebarCount === 0) {
        Ghost.pause();
        $('#start-text').remove();
        Game.setStartText('unpause');
        Game.spacebarCount ++;
      }
      else {
        Ghost.moveGhost();
        Game.spacebarCount --;
      }
    }
  }
  // BUTTON LISTENERS
  // New Game button listener (restarts game)
  var $newGameButton = $('#new-game');
  $newGameButton.on('click', function() {
    Game.spacebarCount === 0;
    $('#level-up').remove();
    $('#game-over').remove();
    $('#you-win').remove();
    $('#start-text').remove();
    Game.newGame();
  });
  // Instructions button listener (shows and hides instructions)
  var $instructionsButton = $('#instructions-button');
  var $instructions = $('#instructions');
  $instructions.hide();
  $instructionsButton.on('click', function() {
    if ($instructionsButton.text() === "Show Instructions") {
      $instructions.show();
      $instructionsButton.text("Hide Instructions");
    }
    else if ($instructionsButton.text() === "Hide Instructions") {
      $instructions.hide();
      $instructionsButton.text("Show Instructions");
    }
  })
});
