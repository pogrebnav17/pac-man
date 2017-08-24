console.log("Levels.js connected");

var Levels = (function() {
  return {
    speed: 1000,
    setSpeed: function() {
      return Levels.speed;
    },
    level: 0,
    setLevel: function() {
      $('#level').text(`Level: ${Levels.level}`);
    },
    levelUp: function() {
      if(Game.getScore() === Levels.level0.levelup) {
        Levels.level ++; //go to level one
        Levels.setLevel();
        Levels.speed = Levels.level1.speed;
        console.log('level 1 speed', Levels.speed);
        Ghost.moveGhost();
      }
      else if (Game.getScore() === Levels.level1.levelup) {
        Levels.level ++;
        Levels.setLevel();
        Levels.speed = Levels.level2.speed;
        console.log('level 2 speed', Levels.speed);
        Ghost.moveGhost();
      }
      else if (Game.getScore() === Levels.level2.levelup) {
        Levels.level ++;
        Levels.setLevel();
        Levels.speed = Levels.level3.speed;
        console.log('level 3 speed', Levels.speed);
        Ghost.moveGhost();
      }
    },
    level0: {
      speed: 1000, //interval speed of ghost movement
      levelup: 99 //points
    },
    level1: {
      speed: 700,
      levelup: 198
    },
    level2: {
      speed: 400,
      levelup: 402
    },
    level3: {
      speed: 200,
      levelup: 600
    }



  }
})();
