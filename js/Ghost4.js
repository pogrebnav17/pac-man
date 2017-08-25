console.log("Ghost4.js is connected");

var Ghost4 = (function() {
  return {
    $gameOverText: null,
    $ghost: null,
    ghostPosition: null,
    $ghostSquare: null,
    initialGhost: function() {
      Ghost4.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost4.$ghost.append('<img src=gifs/ghost4.gif alt=ghost id=ghost-image>');
      Ghost4.$ghostSquare = $(`#${Ghost4.ghostPosition}`).attr('style', 'position: relative;');
      Ghost4.$ghostSquare.append(Ghost4.$ghost);
    },
    setGhost: function() {
      Ghost4.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000');
      Ghost4.$ghost.append('<img src=gifs/ghost4.gif alt=ghost id=ghost-image>');
    },
    frozen: function() {
      Ghost4.pause();
      Ghost4.$ghost.remove();
      Ghost4.$ghostSquare = $(`#${Ghost4.ghostPosition}`).attr('style', 'position: relative;');
      Ghost4.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
      Ghost4.$ghost.append('<img src=images/frozen.png alt=ghost id=frozen>');
      Ghost4.$ghostSquare.prepend(Ghost4.$ghost);
    },
    moveGhost: function() {
      $('#start-text').remove();
      Game.setStartText('pause');
      clearInterval(this.interval);
      this.interval = setInterval(function() {
        // remove current ghost, set the square that the ghost will be appended to with position relative
        Ghost4.$ghost.remove();
        Ghost4.$ghostSquare = $(`#${Ghost4.ghostPosition}`).attr('style', 'position: relative;');

        // change position of ghost based on the position of the pac-man
        // get to the same column
        if ((Board.locations[Pacman.pacmanPosition].column) < Board.locations[Ghost4.ghostPosition].column) {
          Ghost4.ghostPosition --;
        }
        else if (Board.locations[Pacman.pacmanPosition].column > Board.locations[Ghost4.ghostPosition].column) {
          Ghost4.ghostPosition ++;
        }
        else {
          // get to the same row
          if (Board.locations[Pacman.pacmanPosition].row < Board.locations[Ghost4.ghostPosition].row) {
            Ghost4.ghostPosition -= 20;
          }
          else if (Board.locations[Pacman.pacmanPosition].row > Board.locations[Ghost4.ghostPosition].row) {
            Ghost4.ghostPosition += 20;
          }
        }
        // move the ghost with postion absolute to the new square/location by appending "on top" of the current square
        Ghost4.setGhost();
        Ghost4.$ghostSquare.prepend(Ghost4.$ghost);
        Game.checkGhost();
      }, Levels.setSpeed());
    },
    pause: function() {
      clearInterval(this.interval);
    }
  }
})();
