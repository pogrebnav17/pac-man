console.log("Game.js connected");


var Game = (function() {
  return {
    $scoreBoard: $('#score'),
    $pacmanSquare: null,
    score: 0,
    highestScore: 0,
    scoreHistory: [],
    initializeGame: function() {
      Board.createBoard(); // create board
      Game.setHighestScore(); // set the highest score
      //initialize pacman position
      Pacman.pacmanPosition = 209;
      Pacman.$pacman = $('<div>').attr('id', 'pacman');
      Pacman.$pacman.append('<img src=gifs/pacman.gif alt=pacman id=pacman-image>');
      Game.$pacmanSquare = $(`#${Pacman.pacmanPosition}`);
      $(`#circle-${Pacman.pacmanPosition}`).remove();
      Game.$pacmanSquare.append(Pacman.$pacman);

      //initialize ghost position
      Ghost.ghostPosition = 398;
      Ghost.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost.$ghost.append('<img src=gifs/ghost.gif alt=ghost id=ghost-image>');
      Ghost.$ghostSquare = $(`#${Ghost.ghostPosition}`).attr('style', 'position: relative;');
      Ghost.$ghostSquare.append(Ghost.$ghost);
      Ghost.moveGhost();
    },
    addPoint: function() {
      var $squareWithCircle = $(`#circle-${Pacman.pacmanPosition}`);
      // hide the white dot and add 1 point to the score
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
      Game.score = 0;
      Game.$scoreBoard.text(`Score: ${Game.score}`);
      Game.initializeGame();
    }
  }
})();
