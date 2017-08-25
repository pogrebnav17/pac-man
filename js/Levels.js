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
      $('#user-text').attr('style', 'position: absolute; transform: translateY(5%);').addClass('center');
      $('#vertical').attr('style', 'position: relative;');
      $('#user-text').append($levelUpText);
      setTimeout(function() {
        $('#level-up').remove();
      }, 1000);
    },
    levelUp: function() {
      var level = `level${Levels.level}`;
      var nextLevel = `level${Levels.level + 1}`;
      if (Levels.level < 6) {
        if (Game.getScore() >= Levels[level].levelup) {
          Levels.level ++; // add level
          Levels.setLevel(); // set level
          Levels.levelUpAlert(); // alert user of level change
          Levels.speed = Levels[nextLevel].speed; // set new ghost speed
        }
      }
    },
    level0: {
      speed: 1000, //interval speed of ghost movement
      levelup: 99 //points
    },
    level1: {
      speed: 800,
      levelup: 198
    },
    level2: {
      speed: 600,
      levelup: 297
    },
    level3: {
      speed: 500,
      levelup: 396
    },
    level4: {
      speed: 400,
      levelup: 495
    },
    level5: {
      speed: 300,
      levelup: 594
    },
    level6: {
      speed: 200,
      levelup: 693
    }
  }
})();
