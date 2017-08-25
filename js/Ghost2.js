console.log("Ghost2.js is connected");

var Ghost2 = (function() {
  return {
    $ghost: null,
    ghostPosition: null,
    $ghostSquare: null,
    initialGhost: function() {
      Ghost2.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost2.$ghost.append('<img src=gifs/ghost2.gif alt=ghost id=ghost-image>');
      Ghost2.$ghostSquare = $(`#${Ghost2.ghostPosition}`).attr('style', 'position: relative;');
      Ghost2.$ghostSquare.append(Ghost2.$ghost);
    },
    setGhost: function() {
      Ghost2.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000');
      Ghost2.$ghost.append('<img src=gifs/ghost2.gif alt=ghost id=ghost-image>');
    },
    frozen: function() {
      Ghost2.pause();
      Ghost2.$ghost.remove();
      Ghost2.$ghostSquare = $(`#${Ghost2.ghostPosition}`).attr('style', 'position: relative;');
      Ghost2.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
      Ghost2.$ghost.append('<img src=images/frozen.png alt=ghost id=frozen>');
      Ghost2.$ghostSquare.prepend(Ghost2.$ghost);
    },
    moveGhost: function() {
      $('#start-text').remove();
      Game.setStartText('pause');
      clearInterval(this.interval);
      this.interval = setInterval(function() {
        // remove current ghost, set the square that the ghost will be appended to with position relative
        Ghost2.$ghost.remove();
        Ghost2.$ghostSquare = $(`#${Ghost2.ghostPosition}`).attr('style', 'position: relative;');;

        // change position of ghost based on the position of the pac-man
        // get to the same column
        if ((Board.locations[Pacman.pacmanPosition].column) < Board.locations[Ghost2.ghostPosition].column) {
          Ghost2.ghostPosition --;
        }
        else if (Board.locations[Pacman.pacmanPosition].column > Board.locations[Ghost2.ghostPosition].column) {
          Ghost2.ghostPosition ++;
        }
        else {
          // get to the same row
          if (Board.locations[Pacman.pacmanPosition].row < Board.locations[Ghost2.ghostPosition].row) {
            Ghost2.ghostPosition -= 20;
          }
          else if (Board.locations[Pacman.pacmanPosition].row > Board.locations[Ghost2.ghostPosition].row) {
            Ghost2.ghostPosition += 20;
          }
        }
        // move the ghost with postion absolute to the new square/location by appending "on top" of the current square
        Ghost2.setGhost();
        Ghost2.$ghostSquare.prepend(Ghost2.$ghost);
        Game.checkGhost();
      }, Levels.setSpeed());
    },
    pause: function() {
      clearInterval(this.interval);
    }
  }
})();
