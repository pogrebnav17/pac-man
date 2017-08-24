console.log("Ghost.js is connected");

var Ghost = (function() {
  return {
    $gameOverText: null,
    $ghost: null,
    ghostPosition: null,
    $ghostSquare: null,
    checkGhost: function() {
      // if position of the pacman and the ghost are the same, alert the user that they have lost and remove the pacman from the board
      if (Pacman.pacmanPosition === Ghost.ghostPosition) {
        // Pause the ghost from moving
        Ghost.pause();
        Pacman.$pacman.remove();
        Game.spacebarCount = 1;
        $gameOverText = $("<p id='game-over'>GAME OVER</p>");
        $('#user-text').attr('style', 'position: absolute; transform: translateY(5%)');
        $('#vertical').attr('style', 'position: relative;');
        $('#user-text').append($gameOverText);
        // show the text animation for 3 seconds before removing it and restarting the game
        setTimeout(function() {
          $('#game-over').remove();
          Game.newGame();
        }, 3000);
      }
    },
    moveGhost: function() {
      $('#start-div').remove();
      clearInterval(this.interval);
      this.interval = setInterval(function() {
        // remove current ghost, set the square that the ghost will be appended to with position relative
        Ghost.$ghost.remove();
        Ghost.$ghostSquare = $(`#${Ghost.ghostPosition}`).attr('style', 'position: relative;');;

        // change position of ghost based on the position of the pac-man
        // get to the same column
        if ((Board.locations[Pacman.pacmanPosition].column) < Board.locations[Ghost.ghostPosition].column) {
          Ghost.ghostPosition --;
        }
        else if (Board.locations[Pacman.pacmanPosition].column > Board.locations[Ghost.ghostPosition].column) {
          Ghost.ghostPosition ++;
        }
        else {
          // get to the same row
          if (Board.locations[Pacman.pacmanPosition].row < Board.locations[Ghost.ghostPosition].row) {
            Ghost.ghostPosition -= 20;
          }
          else if (Board.locations[Pacman.pacmanPosition].row > Board.locations[Ghost.ghostPosition].row) {
            Ghost.ghostPosition += 20;
          }
        }
        // move the ghost with postion absolute to the new square/location by appending "on top" of the current square
        Ghost.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%)');
        Ghost.$ghost.append('<img src=gifs/ghost.gif alt=ghost id=ghost-image>');
        Ghost.$ghostSquare.prepend(Ghost.$ghost);
        Ghost.checkGhost();
      }, Levels.setSpeed());
    },
    pause: function() {
      clearInterval(this.interval);
    }
  }
})();
