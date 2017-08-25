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
      // add id to each square div and circle div with their index number
      var $squareDivs = $('.board .square');
      var $circleDivs = $('.circle');
      for (var i = 0; i < $squareDivs.length; i ++) {
        $squareDivs[i].id = i;
        $circleDivs[i].id = 'circle-' + i;
      }
      // add fruits!
      $($circleDivs[20]).removeClass('circle');
      $('#20').css('position', 'relative');
      $('#circle-20').append($("<img src='gifs/cherry_bonus.gif' id='cherry-bonus'>").css('position', 'relative'));

      $($circleDivs[302]).removeClass('circle');
      $('#302').css('position', 'relative');
      $('#circle-302').append($("<img src='gifs/cherry_bonus.gif' id='cherry-bonus'>").css('position', 'relative'));

      $($circleDivs[137]).removeClass('circle');
      $('#137').css('position', 'relative');
      $('#circle-137').append($("<img src='gifs/cherry_bonus.gif' id='cherry-bonus'>").css('position', 'relative'));

    }
  }
})();
