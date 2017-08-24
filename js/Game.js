console.log("Game.js connected");


var Game = (function() {
  return {
    spacebarCount: 0,
    $scoreBoard: $('#score'),
    $pacmanSquare: null,
    score: 0,
    getScore: function() {
      return Game.score;
    },
    highestScore: 0,
    scoreHistory: [],
    initializeGame: function() {
      Board.createBoard(); // create board
      Levels.level = 0;
      Levels.speed = 1000;
      Levels.setLevel();
      Levels.levelUpAlert();
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
      // user must press spacebar to play
      Game.spacebarCount = 1;
      var $startDiv = $("<div id='start-div'></div>");
      var $startText = $(`<p id='start-text'>Press SPACEBAR to start</p>`).addClass('center');
      $startDiv.append($startText);
      $('.top-panel').append($startDiv);
      if (Game.spacebarCount === 0) {
        Ghost.moveGhost();
      }
    },
    addPoint: function() {
      var $squareWithCircle = $(`#circle-${Pacman.pacmanPosition}`);
      // hide the white dot and add 1 point to the score
      if (!$squareWithCircle.is(':hidden')) {
        $(`#circle-${Pacman.pacmanPosition}`).hide();
        Game.score += 3;
        Levels.levelUp();
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
      $('#level-up').remove();
      $('#game-over').remove();
      $('#you-win').remove();
      Pacman.$pacman.remove();
      Game.scoreHistory.push(Game.score);
      Board.$board.remove();
      Game.score = 0;
      Game.$scoreBoard.text(`Score: ${Game.score}`);
      Game.spacebarCount = 0;
      Game.initializeGame();
    },
    youWin: function() {
      if (Game.getScore() === 1200) {
        Ghost.pause();
        Ghost.$ghost.remove();
        Game.spacebarCount = 1;
        $youWinText = $("<p id='you-win'>YOU WIN!!!</p>");
        $('#user-text').attr('style', 'position: absolute; transform: translateY(5%)');
        $('#vertical').attr('style', 'position: relative;');
        $('#user-text').append($youWinText);
        // show the text animation for 3 seconds before removing it and restarting the game
        setTimeout(function() {
          $('#you-win').remove();
          Game.newGame();
        }, 3000);
      }
    }
  }
})();
