/**************************************************************

 Game

 ***************************************************************/


// Game Constructor serves to initialize the game object to a known initial state
// Use the new keyword to invoke the Game function as a constructor.



var Game = function (options) {

  this.winningScore = options.winningScore;
  this.collision = false;

  // Construct a player.

  this.player = new Player(options.character);

  // Construct Enemies -- Easy
  // TODO: Allow user to select a difficulty level.
  this.allEnemies = [
    new Enemy(-350, enemyPosition.topRow, enemySpeed.seven),
    new Enemy(-100, enemyPosition.topRow, enemySpeed.five),
    new Enemy(-200, enemyPosition.middleRow, enemySpeed.six),
    new Enemy(-100, enemyPosition.bottomRow, enemySpeed.eight)
  ];

  // Construct Enemies -- Harder
  /*  this.allEnemies = [
   new Enemy(-100, enemyPosition.topRow, enemySpeed.one),
   new Enemy(-350, enemyPosition.topRow, enemySpeed.three),
   new Enemy(-200, enemyPosition.middleRow, enemySpeed.four),
   new Enemy(-550, enemyPosition.middleRow, enemySpeed.two),
   new Enemy(-300, enemyPosition.middleRow, enemySpeed.seven),
   new Enemy(-850, enemyPosition.bottomRow, enemySpeed.three),
   new Enemy(-400, enemyPosition.bottomRow, enemySpeed.eight)
   ];*/

};

// Prototypes are used in JS as a convenient means of defining properties and functionality that will be
// automatically applied to instances of objects
Game.prototype = {
  update: function (dt) {
    this.allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });
    this.player.update();

    this.checkForCollisions();
    if (this.collision) {
      this.player.setPlayerToStartPosition();
      this.collision = false;
    }
  },
  render: function () {
    this.allEnemies.forEach(function (enemy) {
      enemy.render();
    });
    this.player.render();

    ctx.font = '20pt Sansita';
    ctx.fillStyle = 'red';

    var scoreLine = "Score: " + this.player.score;

    // Display the score.
    if (scoreLine !== null) {
      ctx.fillText(scoreLine, 210, 80);
    }
  },
  checkForCollisions: function () {
    var x = this.player.currentX;
    var y = this.player.currentY;

    for (var i = 0; i < this.allEnemies.length; i++) {

      var enemyX = this.allEnemies[i].currentX;
      var enemyY = this.allEnemies[i].currentY;

      if (x > (enemyX - 55) && x < (enemyX + 55) && y > (enemyY - 50) && y < (enemyY + 50)) {
        this.collision = true;
        break;
      }
    }
  },
  gameOver: function () {
    return (this.player.score >= this.winningScore);
  }
}

/**************************************************************

 Enemy

 ***************************************************************/

// Constructor
// An Enemy is an object that a Player object must avoid
var Enemy = function (x, y, speed) {

  // The image/sprite for our enemies
  this.sprite = 'images/enemy-bug.png';
  this.initialX = x;
  this.initialY = y;
  this.currentX = x;
  this.currentY = y;
  this.stepX = 0;
  this.rightBoundary = 500;
  this.speed = speed;
};

Enemy.prototype = {
  // Parameter: dt, a time delta between ticks that ensures the game runs at the same speed for all computers
  update: function(dt){
    if (this.currentX < this.rightBoundary) {
      this.currentX += this.stepX + this.speed * dt;
    } else {
      this.currentX = this.initialX;
    }
  },
  // ctx and Resources are defined in engine.js
  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.currentX, this.currentY);
  }
}

// Enumerate enemy positions.
var enemyPosition = {
  topRow: 65,
  middleRow: 145,
  bottomRow: 225
};

// Enumerate enemy speeds
var enemySpeed = {
  one: 35,
  two: 45,
  three: 55,
  four: 70,
  five: 90,
  six: 110,
  seven: 145,
  eight: 160
};

/**************************************************************

 Player

 ***************************************************************/

// constructor
// The Player object is moved using the up, down, left and right arrow keys.
// The object of the game is to avoid collisions with Enemy objects.
var Player = function (character) {

  // TODO: Check is character has a value. If not, assign a default value.
  // this.sprite = 'images/char-boy.png';

  this.sprite = character;
  this.initialX = 200;
  this.initialY = 310;
  this.currentX = 200;
  this.currentY = 310;
  this.topBoundary = 72;
  this.bottomBoundary = 328;
  this.leftBoundary = 10;
  this.rightBoundary = 390;
  this.stepY = 85;
  this.stepX = 97;
  this.score = 0;
};

Player.prototype = {
  update: function() {
    // Currently this function has no operations. Do I need to restructure my code?
  },
  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.currentX, this.currentY);
  },
  handleInput: function(key) {
    switch (key) {
      case 'up':
        // If the player has not reached the top, advance player to next level.
        // Once player reaches the top, reset x and y so that player is at the bottom.
        if (this.currentY > this.topBoundary) {
          this.currentY -= this.stepY;
        } else {
          this.currentY = this.initialY;
          this.score += 1;
        }
        break;
      case 'down':
        // Only allow the player to go down if it hasn't reached the bottom boundary.
        if (this.currentY < this.bottomBoundary) {
          this.currentY += this.stepY;
        }
        break;
      case 'left':
        // Only allow the player to go left if it hasn't reached the left boundary.
        if (this.currentX > this.leftBoundary) {
          this.currentX -= this.stepX;
        }
        break;
      case 'right':
        // Only allow the player to go right if it hasn't reached the right boundary.
        if (this.currentX < this.rightBoundary) {
          this.currentX += this.stepX;
          break;
        }
    }
  },
  setPlayerToStartPosition: function() {
    this.currentX = this.initialX;
    this.currentY = this.initialY;
  }
}


