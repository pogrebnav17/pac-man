console.log("Ghost3.js is connected");

var Ghost3 = (function() {
  return {
    $gameOverText: null,
    $ghost: null,
    ghostPosition: null,
    $ghostSquare: null,
    checkGhost: function() {
      // if position of the pacman and the ghost are the same, alert the user that they have lost and remove the pacman from the board
      if (Pacman.pacmanPosition === Ghost3.ghostPosition) {
        $('#game-over').remove();
        Pacman.$pacman.remove();
        // Pause the ghost from moving
        Ghost.pause();
        Ghost2.pause();
        Ghost3.pause();
        Ghost4.pause();
        Pacman.$pacman.remove();
        Game.spacebarCount = 1;
        $gameOverText = $("<p id='game-over'>GAME OVER</p>");
        $('#user-text').attr('style', 'position: absolute; transform: translateY(5%);');
        $('#vertical').attr('style', 'position: relative;');
        $('#user-text').append($gameOverText);

        //play game over music
        Game.controlMusic($('#death'), 'play');

        // show the text animation for 3 seconds before removing it and restarting the game
        setTimeout(function() {
          $('#game-over').remove();
          Pacman.$pacman.remove();
          Game.newGame();
        }, 3000);
      }
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
        Ghost3.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
        Ghost3.$ghost.append('<img src=gifs/ghost3.gif alt=ghost id=ghost-image>');
        Ghost3.$ghostSquare.prepend(Ghost3.$ghost);
        Ghost3.checkGhost();
      }, Levels.setSpeed());
    },
    pause: function() {
      clearInterval(this.interval);
    }
  }
})();
