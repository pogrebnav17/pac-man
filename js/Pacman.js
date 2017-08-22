console.log("Pacman.js is connected");

var Pacman =(function() {
  return {
    pacmanPosition: null,
    $pacman: null,
    move: function() {
      // removes pacman from the board and re-renders pacman at the new given postion
      Pacman.$pacman.remove();
      Pacman.$pacman = $('<div>').attr('id', 'pacman');
      Pacman.$pacman.append('<img src=gifs/pacman.gif alt=pacman>');
      Game.$square = $(`#${Pacman.pacmanPosition}`);
      Game.$square.append(Pacman.$pacman);
      Game.addPoint();
      // check if you ran into a ghost
      Ghost.checkGhost();
    },
    // follow 4 methods change the position of the pacman according to the grid and the direction
    moveRight: function() {
      Pacman.pacmanPosition ++;
      Pacman.move();
    },
    moveLeft: function() {
      Pacman.pacmanPosition --;
      Pacman.move();
    },
    moveDown: function() {
      Pacman.pacmanPosition += 20;
      Pacman.move();
    },
    moveUp: function() {
      Pacman.pacmanPosition -= 20;
      Pacman.move();
    }
  }
})();
