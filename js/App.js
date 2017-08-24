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
    },
    Levels: function() {
      return Levels;
    },
    Ghost2: function() {
      return Ghost2;
    }
  }
})();
