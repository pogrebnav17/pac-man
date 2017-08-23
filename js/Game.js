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
      Pacman.pacmanPosition = 209;
      Pacman.$pacman = $('<div>').attr('id', 'pacman');
      Pacman.$pacman.append('<img src=gifs/pacman.gif alt=pacman id=pacman-image>');
      Game.$square = $(`#${Pacman.pacmanPosition}`);
      $(`#circle-${Pacman.pacmanPosition}`).remove();
      Game.$square.append(Pacman.$pacman);

      //initialize ghost position
      Ghost.ghostPosition = 398;
      Ghost.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost.$ghost.append('<img src=gifs/ghost.gif alt=ghost>');
      Ghost.$ghostSquare = $(`#${Ghost.ghostPosition}`).attr('style', 'position: relative;');
      // $(`#circle-${Ghost.ghostPosition}`).hide();
      Ghost.$ghostSquare.append(Ghost.$ghost);
      Ghost.moveGhost();

      var leftBorder = [];
      var rightBorder = [];
      var leftCount = 0;
      var rightCount = 19;
      for (let i = 0; i < 20; i ++) {
        leftBorder.push(leftCount);
        leftCount += 20;

        rightBorder.push(rightCount);
        rightCount += 20;
      }

      // create left board border
      for (let i = 0; i < leftBorder.length; i ++) {
        if (leftBorder[i] !== 100 && leftBorder[i] !== 300) {
          $(`#${leftBorder[i]}`).attr('style', 'border-left: solid 5px rgb(255, 184, 151);');
        } else {
          $(`#${leftBorder[i]}`).attr('style', 'border-left: solid 5px black;');
        }
      }
      // create right board border
      for (let i = 0; i < rightBorder.length; i ++) {
        if (rightBorder[i] !== 119 && rightBorder[i] !== 319) {
          $(`#${rightBorder[i]}`).attr('style', 'border-right: solid 5px rgb(255, 184, 151);');
        } else {
          $(`#${rightBorder[i]}`).attr('style', 'border-right: solid 5px black;');
        }
      }

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
