console.log("Ghost3.js is connected");

var Ghost3 = (function() {
  return {
    $gameOverText: null,
    $ghost: null,
    ghostPosition: null,
    $ghostSquare: null,
    initialGhost: function() {
      Ghost3.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost3.$ghost.append('<img src=gifs/ghost3.gif alt=ghost id=ghost-image>');
      Ghost3.$ghostSquare = $(`#${Ghost3.ghostPosition}`).attr('style', 'position: relative;');
      Ghost3.$ghostSquare.append(Ghost3.$ghost);
    },
    setGhost: function() {
      Ghost3.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
      Ghost3.$ghost.append('<img src=gifs/ghost3.gif alt=ghost id=ghost-image>');
    },
    frozen: function() {
      Ghost3.pause();
      Ghost3.$ghost.remove();
      Ghost3.$ghostSquare = $(`#${Ghost3.ghostPosition}`).attr('style', 'position: relative;');
      Ghost3.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
      Ghost3.$ghost.append('<img src=images/frozen.png alt=ghost id=frozen>');
      Ghost3.$ghostSquare.prepend(Ghost3.$ghost);
    },
    moveGhost: function() {
      $('#start-text').remove();
      Game.setStartText('pause');
      clearInterval(this.interval);
      this.interval = setInterval(function() {
        // remove current ghost, set the square that the ghost will be appended to with position relative
        Ghost3.$ghost.remove();
        Ghost3.$ghostSquare = $(`#${Ghost3.ghostPosition}`).attr('style', 'position: relative;');

        // change position of ghost based on the position of the pac-man
        // get to the same column
        if ((Board.locations[Pacman.pacmanPosition].column) < Board.locations[Ghost3.ghostPosition].column) {
          Ghost3.ghostPosition --;
        }
        else if (Board.locations[Pacman.pacmanPosition].column > Board.locations[Ghost3.ghostPosition].column) {
          Ghost3.ghostPosition ++;
        }
        else {
          // get to the same row
          if (Board.locations[Pacman.pacmanPosition].row < Board.locations[Ghost3.ghostPosition].row) {
            Ghost3.ghostPosition -= 20;
          }
          else if (Board.locations[Pacman.pacmanPosition].row > Board.locations[Ghost3.ghostPosition].row) {
            Ghost3.ghostPosition += 20;
          }
        }
        // move the ghost with postion absolute to the new square/location by appending "on top" of the current square
        Ghost3.setGhost();
        Ghost3.$ghostSquare.prepend(Ghost3.$ghost);
        Game.checkGhost();
      }, Levels.setSpeed());
    },
    pause: function() {
      clearInterval(this.interval);
    }
  }
})();
