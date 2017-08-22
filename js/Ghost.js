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
        // show circle in old position
        $(`#circle-${Ghost.ghostPosition}`).show();
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
        // hide the circle and move the ghost to the new position
        Ghost.$ghostSquare = $(`#${Ghost.ghostPosition}`);
        $(`#circle-${Ghost.ghostPosition}`).hide();
        Ghost.$ghostSquare.append(Ghost.$ghost);


        // Adds effect for the ghost gif to fade in and fade out as it move from one square to the next
        Ghost.$ghost.fadeOut(500, function() {
          var maxLeft = 200 - 10;
          var maxTop = 200 - 10;
          var leftPos = Math.floor(Math.random() * (maxLeft + 10))
          var topPos = Math.floor(Math.random() * (maxTop + 10))
          Ghost.$ghost.css({ left: leftPos, top: topPos }).fadeIn(500);
        });
        Ghost.checkGhost();
      }, 1000);
    },
    pause: function() {
      clearInterval(this.interval);
    }
  }
})();
