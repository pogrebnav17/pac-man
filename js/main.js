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

var game = {
  createBoard: function() {
    $board = $('<div>').addClass('board');
    for (i = 0; i < 400; i++) {
      var $squareDiv = $('<div>').addClass('square');
      var $circleDiv = $('<div>').addClass('circle').attr('id', `circle-${i}`);
      $squareDiv.append($circleDiv);
      $squareDiv.attr('id', i);
      $board.append($squareDiv);
    }
    $('.container').prepend($board);
  },
  initializeGame: function() {
    game.createBoard(); // create board
    score = 0;
    //initialize pacman position
    pacmanPosition = 0;
    $pacman = $('<div>').attr('style', 'background-color: yellow;').attr('id', 'pacman');
    $square = $(`#${pacmanPosition}`);
    $(`#circle-${pacmanPosition}`).remove();
    $square.append($pacman);
    console.log('pacmanPosition', pacmanPosition);

    //initialize ghost position
    ghostPosition = 399;
    $ghost = $('<div>').attr('style', 'background-color: pink;').attr('id', 'ghost');
    ghostPosition = 399;
    $ghostSquare = $(`#${ghostPosition}`);
    $(`#circle-${ghostPosition}`).remove();
    $ghostSquare.append($ghost);
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
  }
}
//pacman object allow pacman to move accross the board
var pacman = {
  move: function() {
    // removes pacman from the board and re-renders pacman at the new given postion
    $pacman.remove();
    $pacman = $('<div>').attr('style', 'background-color: yellow;').attr('id', 'pacman');
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
}
