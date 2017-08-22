console.log("Game.js connected");


var Game = (function() {
  return {
    $scoreBoard: $('#score'),
    $square: null,
    score: 0,
    highestScore: 0,
    scoreHistory: [],
    initializeGame: function() {
      Board.createBoard(); // create board
      // label each square with its number
      var $squareDivs = $('.board .square');
      var $circleDivs = $('.circle');
      for (var i = 0; i < $squareDivs.length; i ++) {
        $squareDivs[i].id = i;
        $circleDivs[i].id = 'circle-' + i;
      }
      Game.score = 0;
      Game.$scoreBoard.text(`Score: ${Game.score}`);
      Game.setHighestScore();
      //initialize pacman position
      Pacman.pacmanPosition = 0;
      Pacman.$pacman = $('<div>').attr('id', 'pacman');
      Pacman.$pacman.append('<img src=gifs/pacman.gif alt=pacman>');
      Game.$square = $(`#${Pacman.pacmanPosition}`);
      $(`#circle-${Pacman.pacmanPosition}`).remove();
      Game.$square.append(Pacman.$pacman);

      //initialize ghost position
      Ghost.ghostPosition = 399;
      Ghost.$ghost = $('<div>').attr('id', 'ghost');
      Ghost.$ghost.append('<img src=gifs/ghost.gif alt=ghost>');
      Ghost.$ghostSquare = $(`#${Ghost.ghostPosition}`);
      $(`#circle-${Ghost.ghostPosition}`).hide();
      Ghost.$ghostSquare.append(Ghost.$ghost);
      Ghost.moveGhost();
    },
    addPoint: function() {
      var $squareWithCircle = $(`#circle-${Pacman.pacmanPosition}`);
      // remove the red dot and add 1 point to the score
      if (!$squareWithCircle.is(':hidden')) {
        $(`#circle-${Pacman.pacmanPosition}`).hide();
        Game.score ++;
        Game.$scoreBoard.text(`Score: ${Game.score}`);
      }
    },
    setHighestScore: function() {
      if (Game.scoreHistory.length > 0) {
        Game.highestScore = Math.max.apply(null, Game.scoreHistory);
      }
      var $highestScore = $('#highest');
      $highestScore.text(`Highest score: ${Game.highestScore}`);
    },
    newGame: function() {
      Pacman.$pacman.remove();
      Game.scoreHistory.push(Game.score);
      Board.$board.remove();
      Game.initializeGame();
    }
  }
})();
