console.log("App.js connected");

var App = (function() {
  return {
    Board: function() {
      return Board;
    },
    Game: function() {
      return Game;
    },
    Ghost: function() {
      return Ghost;
    },
    Pacman: function() {
      return Pacman;
    }
  }
})();
