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
    levelUpAlert: function() {
      // show user message that they have leveled up
      $levelUpText = $(`<p id='level-up'>LEVEL ${Levels.level}</p>`);
      $('#user-text').attr('style', 'position: absolute; transform: translateY(5%); z-index: 100000').addClass('center');
      $('#vertical').attr('style', 'position: relative;');
      $('#user-text').append($levelUpText);
      setTimeout(function() {
        $('#level-up').remove();
      }, 1000);
    },
    levelUp: function() {
      if(Game.getScore() === Levels.level0.levelup) {
        Levels.level ++; // add level
        Levels.setLevel(); // set level
        Levels.levelUpAlert(); // alert user of level change
        Levels.speed = Levels.level1.speed; // set new ghost speed
        Ghost.moveGhost();
      }
      else if (Game.getScore() === Levels.level1.levelup) {
        Levels.level ++;
        Levels.setLevel();
        Levels.levelUpAlert();
        Levels.speed = Levels.level2.speed;
        Ghost.moveGhost();
      }
      else if (Game.getScore() === Levels.level2.levelup) {
        Levels.level ++;
        Levels.setLevel();
        Levels.levelUpAlert();
        Levels.speed = Levels.level3.speed;
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
