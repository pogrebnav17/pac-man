console.log("Board.js is connected");

var Board = (function() {
  return {
    locations: {},
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
    }
  }
})();
