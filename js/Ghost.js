console.log("Ghost.js is connected");

var Ghost = (function() {
  return {
    $ghost: null,
    ghostPosition: null,
    $ghostSquare: null,
    checkGhost: function() {
      // if position of the pacman and the ghost are the same, alert the user that they have lost and remove the pacman from the board
      if (Pacman.pacmanPosition === Ghost.ghostPosition) {
        console.log("You ran into a ghost! You lose!");
        Game.newGame();
      }
    },
    moveGhost: function() {
      clearInterval(this.interval);
      this.interval = setInterval(function() {
        // remove current ghost, set the square that the ghost will be appended to with position relative
        Ghost.$ghost.remove();
        Ghost.$ghostSquare = $(`#${Ghost.ghostPosition}`).attr('style', 'position: relative;');;

        // $(`#circle-${Ghost.ghostPosition}`).show();
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
        Ghost.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-80%)');
        Ghost.$ghost.append('<img src=gifs/ghost.gif alt=ghost>');
        Ghost.$ghostSquare.append(Ghost.$ghost);
        Ghost.checkGhost();
      }, 1000);
    },
    pause: function() {
      clearInterval(this.interval);
    }
  }
})();
