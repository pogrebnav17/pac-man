console.log("main.js connected");

// create the board
var $board = $('.board');
var history = [];
var score = 0;
var $scoreBoard = $('#score');

for (i = 0; i < 400; i++) {
  var $squareDiv = $('<div>').addClass('square');
  var $circleDiv = $('<div>').addClass('circle').attr('id', `circle-${i}`);
  $squareDiv.append($circleDiv);
  $squareDiv.attr('id', i);
  $board.append($squareDiv);
}


// initial positioning of pacman
var pacmanPosition = 0;
var $pacman = $('<div>').attr('style', 'background-color: yellow;').attr('id', 'pacman');
var $square = $(`#${pacmanPosition}`);
$(`#circle-${pacmanPosition}`).remove();
$square.append($pacman);
console.log('pacmanPosition', pacmanPosition);

// initial positioning of the ghost
var $ghost = $('<div>').attr('style', 'background-color: pink;').attr('id', 'ghost');
var ghostPosition = 399;
var $ghostSquare = $(`#${ghostPosition}`);
$(`#circle-${ghostPosition}`).remove();
$ghostSquare.append($ghost);



//pacman object allow pacman to move accross the board
var pacman = {
  move: function() {
    // removes pacman from the board and re-renders pacman at the new given postion
    $pacman.remove();
    $pacman = $('<div>').attr('style', 'background-color: yellow;').attr('id', 'pacman');
    $square = $(`#${pacmanPosition}`);
    $square.append($pacman);
    console.log('pacmanPosition', pacmanPosition);

    // remove the red dot and add 1 point to the score
    $(`#circle-${pacmanPosition}`).remove();
    score ++;
    console.log('score', score);
    $scoreBoard.text(`Score: ${score}`);
    // check if you ran into a ghost
    checkGhost();

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

function checkGhost() {
  if (pacmanPosition === ghostPosition) {
    console.log(pacmanPosition);
    console.log(ghostPosition);
    alert("You ran into a ghost! You lose!");
  }
}
