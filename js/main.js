console.log("main.js connected");

// GLOBAL VARIABLES
var $board;
var scoreHistory = [];
var score = 0;
var $scoreBoard = $('#score');
var pacmanPosition;
var $pacman;
var $square;
var $ghost;
var ghostPosition;
var $ghostSquare;
var squareLocation = {};
var game = {
  createBoard: function() {
    $board = $('<div>').addClass('board');

    for (var row = 0; row < 20; row ++) {
      for (var col = 0; col < 20; col ++) {
        var $squareDiv = $('<div>').addClass(`square row${row} column${col}`);
        var $circleDiv = $('<div>').addClass('circle');
        $squareDiv.append($circleDiv);
        $board.append($squareDiv);
      }
    }
    $('.container').prepend($board);
  },
  initializeGame: function() {
    game.createBoard(); // create board
    // label each square with its number
    var $squareDivs = $('.board .square');
    var $circleDivs = $('.circle');
    for (var i = 0; i < $squareDivs.length; i ++) {
      $squareDivs[i].id = i;
      $circleDivs[i].id = 'circle-' + i;
    }
    score = 0;
    //initialize pacman position
    pacmanPosition = 0;
    $pacman = $('<div>').attr('id', 'pacman');
    $pacman.append('<img src=gifs/pacman.gif alt=pacman>');
    $square = $(`#${pacmanPosition}`);
    $(`#circle-${pacmanPosition}`).remove();
    $square.append($pacman);
    console.log('pacmanPosition', pacmanPosition);

    //initialize ghost position
    ghostPosition = 399;
    $ghost = $('<div>').attr('id', 'ghost');
    $ghost.append('<img src=gifs/ghost.gif alt=ghost>');
    ghostPosition = 399;
    ghost.moveGhost();
  },
  addPoint: function() {
    var $squareWithCircle = $(`#circle-${pacmanPosition}`);
    // remove the red dot and add 1 point to the score
    if (!$squareWithCircle.is(':hidden')) {
      $(`#circle-${pacmanPosition}`).hide();
      score ++;
      console.log('score', score);
    }
    else {
      console.log("you\'ve already collected this point");
    }
  }
}

var ghost = {
  checkGhost: function() {
    // if position of the pacman and the ghost are the same, alert the user that they have lost and remove the pacman from the board
    if (pacmanPosition === ghostPosition) {
      console.log(pacmanPosition);
      console.log(ghostPosition);
      alert("You ran into a ghost! You lose!");
      $pacman.remove();
      scoreHistory.push(score);
      console.log('score history: ', scoreHistory);
      $board.remove();
      game.initializeGame();
    }
  },
  moveGhost: function() {
    clearInterval(this.interval);
    this.interval = setInterval(function() {
      // $(`#circle-${ghostPosition}`).show();
      // ghostPosition --;
      // $ghostSquare = $(`#${ghostPosition}`);
      // $(`#circle-${ghostPosition}`).hide();
      // $ghostSquare.append($ghost);

      // insert moving logic here
      // show dot at current position
      // change position based on location of pac-man
        // increment by one
        // hide the dot
        //append the ghost
      

      $ghost.fadeOut(500, function() {
        var maxLeft = 200 - 10;
        var maxTop = 200 - 10;
        var leftPos = Math.floor(Math.random() * (maxLeft + 10))
        var topPos = Math.floor(Math.random() * (maxTop + 10))
        $ghost.css({ left: leftPos, top: topPos }).fadeIn(500);
      });
      ghost.checkGhost();
    }, 1000);
  },
  pause: function() {
    clearInterval(this.interval);
  }
}
//pacman object allow pacman to move accross the board
var pacman = {
  move: function() {
    // removes pacman from the board and re-renders pacman at the new given postion
    $pacman.remove();
    $pacman = $('<div>').attr('id', 'pacman');
    $pacman.append('<img src=gifs/pacman.gif alt=pacman>');
    $square = $(`#${pacmanPosition}`);
    $square.append($pacman);
    console.log('pacmanPosition', pacmanPosition);
    game.addPoint();
    // check if you ran into a ghost
    ghost.checkGhost();
    $scoreBoard.text(`Score: ${score}`);
  },
  // follow 4 methods change the position of the pacman according to the grid and the direction
  moveRight: function() {
    pacmanPosition ++;
    pacman.move();
  },
  moveLeft: function() {
    pacmanPosition --;
    pacman.move();
  },
  moveDown: function() {
    pacmanPosition += 20;
    pacman.move();
  },
  moveUp: function() {
    pacmanPosition -= 20;
    pacman.move();
  }
}

// START GAME
game.initializeGame();

var spacebarCount = 0;
// move the pacman depending to the arrow key pressed by user
document.onkeydown = function(event) {
  event.preventDefault();
  if (event.keyCode == '39') {
    // right arrow
    pacman.moveRight();
  }
  else if (event.keyCode == '37') {
    // left arrow
    pacman.moveLeft();
  }
  else if (event.keyCode == '40') {
    // down arrow
    pacman.moveDown();
  }
  else if (event.keyCode == '38') {
    // up arrow
    pacman.moveUp();
  }
  else if (event.keyCode == '32') {
    // If spacebar is pressed once, pause the game. If it pressed again unpause. Keep count of the number of presses.
    if (spacebarCount % 2 === 0) {
      ghost.pause();
      spacebarCount ++;
    }
    else {
      ghost.moveGhost();
      spacebarCount --;
    }
  }
}
