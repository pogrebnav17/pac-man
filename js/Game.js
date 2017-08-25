console.log("Game.js connected");


var Game = (function() {
  return {
    setStartText: function(text) {
      $startText = $(`<p id='start-text'>Press SPACEBAR to ${text}</p>`).addClass('center');
      $('#start-div').append($startText);
    },
    spacebarCount: 0,
    $scoreBoard: $('#score'),
    $pacmanSquare: null,
    score: 0,
    getScore: function() {
      return Game.score;
    },
    highestScore: 0,
    scoreHistory: [],
    controlMusic: function(soundFile, task) {
      soundFile.trigger('load');
      // start intro music
      function play_audio(task) {
        if (task === 'play') {
          soundFile.trigger('play');
        }
        if (task === 'pause') {
          soundFile.trigger('pause');
          soundFile.prop("currentTime", 0);
        }
      }
      play_audio('play');
    },
    initializeGame: function() {
      Game.spacebarCount = 1;
      Board.createBoard(); // create board
      Levels.level = 0;
      Levels.speed = 1000;
      Levels.setLevel();
      Levels.levelUpAlert();
      Game.setHighestScore(); // set the highest score

      // play intro music
      Game.controlMusic($('#intro'), 'play');
      $('#start-div').append($(`<p id='start-text'>Starting in 3</p>`).addClass('center'));
      setTimeout(function() {
        $('#start-text').remove();
        $('#start-div').append($(`<p id='start-text'>Starting in 2</p>`).addClass('center'));
      }, 1000);
      setTimeout(function() {
        $('#start-text').remove();
        $('#start-div').append($(`<p id='start-text'>Starting in 1</p>`).addClass('center'));
      }, 2000);
      setTimeout(function() {
        $('#start-text').remove();
        $('#start-div').append($(`<p id='start-text'>START!</p>`).addClass('center'));
      }, 2400);

      //initialize pacman position
      Pacman.pacmanPosition = 209;
      Pacman.$pacman = $('<div>').attr('id', 'pacman');
      Pacman.$pacman.append('<img src=gifs/pacman.gif alt=pacman id=pacman-image>');
      Game.$pacmanSquare = $(`#${Pacman.pacmanPosition}`);
      $(`#circle-${Pacman.pacmanPosition}`).remove();
      Game.$pacmanSquare.append(Pacman.$pacman);

      //initialize ghost position
      Ghost.ghostPosition = 0;
      Ghost.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost.$ghost.append('<img src=gifs/ghost.gif alt=ghost id=ghost-image>');
      Ghost.$ghostSquare = $(`#${Ghost.ghostPosition}`).attr('style', 'position: relative;');
      Ghost.$ghostSquare.append(Ghost.$ghost);

      //initialize ghost2 position
      Ghost2.ghostPosition = 19;
      Ghost2.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost2.$ghost.append('<img src=gifs/ghost2.gif alt=ghost id=ghost-image>');
      Ghost2.$ghostSquare = $(`#${Ghost2.ghostPosition}`).attr('style', 'position: relative;');
      Ghost2.$ghostSquare.append(Ghost2.$ghost);

      //initialize ghost3 position
      Ghost3.ghostPosition = 380;
      Ghost3.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost3.$ghost.append('<img src=gifs/ghost3.gif alt=ghost id=ghost-image>');
      Ghost3.$ghostSquare = $(`#${Ghost3.ghostPosition}`).attr('style', 'position: relative;');
      Ghost3.$ghostSquare.append(Ghost3.$ghost);

      //initialize ghost4 position
      Ghost4.ghostPosition = 399;
      Ghost4.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-85%)');
      Ghost4.$ghost.append('<img src=gifs/ghost4.gif alt=ghost id=ghost-image>');
      Ghost4.$ghostSquare = $(`#${Ghost4.ghostPosition}`).attr('style', 'position: relative;');
      Ghost4.$ghostSquare.append(Ghost4.$ghost);

      // wait for intro music to finish and start the game automatically!
      setTimeout(function() {
        Game.spacebarCount = 0;
        Ghost.moveGhost();
        Ghost2.moveGhost();
        Ghost3.moveGhost();
        Ghost4.moveGhost();
      }, 3000);
    },
    addPoint: function() {
      var $squareWithCircle = $(`#circle-${Pacman.pacmanPosition}`);
      // hide the white dot and add 3 points to the score
      if (!$squareWithCircle.is(':hidden') && Pacman.pacmanPosition !== 209) {
        $(`#circle-${Pacman.pacmanPosition}`).hide();
        if (Pacman.pacmanPosition === 20 || Pacman.pacmanPosition === 302 || Pacman.pacmanPosition === 137) {
          Game.controlMusic($('#eatfruit'), 'play');
          Game.score += 100;
          Ghost.pause();
          Ghost2.pause();
          Ghost3.pause();
          Ghost4.pause();
          // change all ghosts to frozen ghosts
          Ghost.$ghost.remove();
          Ghost.$ghostSquare = $(`#${Ghost.ghostPosition}`).attr('style', 'position: relative;');
          Ghost.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
          Ghost.$ghost.append('<img src=images/frozen.png alt=ghost id=frozen>');
          Ghost.$ghostSquare.prepend(Ghost.$ghost);

          Ghost2.$ghost.remove();
          Ghost2.$ghostSquare = $(`#${Ghost2.ghostPosition}`).attr('style', 'position: relative;');
          Ghost2.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
          Ghost2.$ghost.append('<img src=images/frozen.png alt=ghost id=frozen>');
          Ghost2.$ghostSquare.prepend(Ghost2.$ghost);

          Ghost3.$ghost.remove();
          Ghost3.$ghostSquare = $(`#${Ghost3.ghostPosition}`).attr('style', 'position: relative;');
          Ghost3.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
          Ghost3.$ghost.append('<img src=images/frozen.png alt=ghost id=frozen>');
          Ghost3.$ghostSquare.prepend(Ghost3.$ghost);

          Ghost4.$ghost.remove();
          Ghost4.$ghostSquare = $(`#${Ghost4.ghostPosition}`).attr('style', 'position: relative;');
          Ghost4.$ghost = $('<div>').attr('id', 'ghost').attr('style', 'position: absolute; transform: translateY(-10%); z-index: 10000;');
          Ghost4.$ghost.append('<img src=images/frozen.png alt=ghost id=frozen>');
          Ghost4.$ghostSquare.prepend(Ghost4.$ghost);

          // wait 3 seconds before changing the ghosts back and letting them continue the chase
          setTimeout(function() {
            Ghost.moveGhost();
            Ghost2.moveGhost();
            Ghost3.moveGhost();
            Ghost4.moveGhost();
          }, 3000);
        }
        else {
          Game.controlMusic($('#chomp'), 'play');
          Game.score += 3;
        }
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
      $('#start-text').remove();
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
      if (Game.getScore() >= 100) {
        // play intro music
        Game.controlMusic($('#win-sound'), 'play');
        Ghost.pause();
        Ghost.$ghost.remove();
        Ghost2.pause();
        Ghost2.$ghost.remove();
        Ghost3.pause();
        Ghost3.$ghost.remove();
        Ghost4.pause();
        Ghost4.$ghost.remove();
        Game.spacebarCount = 1;
        $youWinText = $("<p id='you-win'>YOU WIN!!!</p>");
        $('#user-text').attr('style', 'position: absolute; transform: translateY(5%); z-index: 100000');
        $('#vertical').attr('style', 'position: relative;');
        $('#user-text').append($youWinText);
        // show the text animation for 3 seconds before removing it and restarting the game
        setTimeout(function() {
          $('#you-win').remove();
          Game.newGame();
        }, 5500);
      }
    }
  }
})();
