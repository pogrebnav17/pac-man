console.log("Board.js is connected");

var Board = (function() {
  return {
    locations: {},
    fruitLocations: [20, 302, 137],
    $board: null,
    createBoard: function() {
      Board.$board = $('<div>').addClass('board');
      var squareLocation = {};
      var rows = [];
      var columns = [];
      for (var row = 0; row < 20; row ++) {
        for (var col = 0; col < 20; col ++) {
          var $squareDiv = $('<div>').addClass(`square row${row} column${col}`);
          var $circleDiv = $('<div>').addClass('circle');
          rows.push(row);
          columns.push(col);
          $squareDiv.append($circleDiv);
          Board.$board.append($squareDiv);
        }
      }
      for (let i = 0; i < 400; i ++) {
        Board.locations[i] = {row: rows[i], column: columns[i]};
      }
      $('#board').prepend(Board.$board);
      // add id to each square div and circle div with their index number
      var $squareDivs = $('.board .square');
      var $circleDivs = $('.circle');
      for (var i = 0; i < $squareDivs.length; i ++) {
        $squareDivs[i].id = i;
        $circleDivs[i].id = 'circle-' + i;
      }
      // add fruits!
      for (let i = 0; i < Board.fruitLocations.length; i ++) {
        $($circleDivs[Board.fruitLocations[i]]).removeClass('circle');
        $(`#${Board.fruitLocations[i]}`).css('position', 'relative');
        $(`#circle-${Board.fruitLocations[i]}`).append($("<img src='gifs/cherry_bonus.gif' id='cherry-bonus'>").css('position', 'relative'));
      }
    }
  }
})();
