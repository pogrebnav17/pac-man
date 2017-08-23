console.log("Pacman.js is connected");

var Pacman =(function() {
  return {
    pacmanPosition: null,
    $pacman: null,
    $pacmanGif: $('<img>').attr('src', 'gifs/pacman.gif').attr('alt', 'pacman').attr('id', 'pacman-image'),
    move: function() {
      // removes pacman from the board and re-renders pacman at the new given postion
      Pacman.$pacman.remove();
      Pacman.$pacman = $('<div>').attr('id', 'pacman');
      // Pacman.$pacman.append('<img src=gifs/pacman.gif alt=pacman id=pacman-image>');
      Pacman.$pacman.append(Pacman.$pacmanGif);
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
      Pacman.$pacman.attr('style', 'transform: scaleX(-1)');
    },
    moveDown: function() {
      Pacman.pacmanPosition += 20;
      Pacman.move();
      Pacman.$pacman.attr('style', 'transform: rotate(90deg)');
    },
    moveUp: function() {
      Pacman.pacmanPosition -= 20;
      Pacman.move();
      Pacman.$pacman.attr('style', 'transform: rotate(-90deg)');
    }
  }
})();
