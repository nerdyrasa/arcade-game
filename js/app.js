
// A game has a player, an array of enemies and a score.

// Game Constructor
var Game = function(document) {

  var score = 0;

  this.winningScore = 1;
  this.collision = false;

  //this.score = 0;
  this.gameOver = false;

  // construct player
  this.player = new Player();

  // Listen for the keyup event


  // contruct enemies
  this.allEnemies = [
    //new Enemy(-100, enemyPosition.topRow, enemySpeed.one),
    //new Enemy(-350, enemyPosition.topRow, enemySpeed.three),
    //new Enemy(-200, enemyPosition.middleRow, enemySpeed.four),
    //new Enemy(-550, enemyPosition.middleRow, enemySpeed.two),
    //new Enemy(-300, enemyPosition.middleRow, enemySpeed.seven),
    //new Enemy(-850, enemyPosition.bottomRow, enemySpeed.three),
    new Enemy(-400, enemyPosition.bottomRow, enemySpeed.eight)
  ];
};

Game.prototype.update = function(dt) {

  this.allEnemies.forEach(function(enemy) {
    enemy.update(dt);
  });
  this.player.update();

  this.checkForCollisions();
  if (this.collision) {
    this.player.setPlayerToStartPosition();
    this.collision = false;
  }
  // TODO: Update score.
};

Game.prototype.updateScore = function(points) {
  this.score += points;

  if (this.score >= this.winningScore) {
    this.gameOver = true;
  }

}

Game.prototype.render = function(){

  // rendering here, not in the engine
  this.allEnemies.forEach(function(enemy) {
    enemy.render();
  });
  this.player.render();

  ctx.font = '24pt Impact';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'red';

  var scoreLine = "Score: " + this.player.score;

  if (scoreLine != null) {
    ctx.fillText(scoreLine, 100, 530 );
 //   ctx.strokeText(scoreLine, 50, 500 );
  }
}

Game.prototype.checkForCollisions = function(){
    //console.log("checking for collisions");
    var x = this.player.currentX;
    var y = this.player.currentY;
    //console.log("x, y ", this.player.currentX, this.player.currentY);
    for (var i = 0; i < this.allEnemies.length; i++) {

      var enemyX = this.allEnemies[i].currentX;
      var enemyY = this.allEnemies[i].currentY;
      //console.log("enemy X, enemy Y = ", enemyX, enemyY);
      if ( x > (enemyX - 55) && x < (enemyX + 55) && y > (enemyY - 50) && y < (enemyY + 50) ) {
        console.log("collision");
        this.collision = true;
        break;
      }
      //else {
      //    console.log("no collision");
      //}
    }
};

// Constructor
// An Enemy is an object that a Player object must avoid
var Enemy = function(x, y, speed) {

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

// 1. Update function.
// Update the enemy's position
// Parameter: dt, a time delta between ticks that ensures the game runs at the same speed for all computers
Enemy.prototype.update = function(dt) {

    if ( this.currentX < this.rightBoundary ) {
      this.currentX += this.stepX + this.speed * dt;
    } else {
      this.currentX = this.initialX;
    }
};

// 2. Render function.
// Draw the enemy on the screen
// ctx and Resources are defined in engine.js
//
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.currentX, this.currentY);
};

// constructor
// The Player object is moved using the up, down, left and right arrow keys.
// The object of the game is to avoid collisions with Enemy objects.
var Player = function() {

    //this.sprite = 'images/char-horn-girl.png';
    this.sprite = 'images/char-boy.png';
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

// 1. update
Player.prototype.update = function() {

};

// 2. render
// Draw the player on to the canvas using the current x and y coordinates
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.currentX, this.currentY);
};

// Move the Player up, down, left and right. Check that the Player is on the
// playing canvas.
Player.prototype.handleInput = function(key) {


  console.log(this);

  switch(key) {
    case 'up':
      // If the player has not reached the top, advance player to next level.
      // Once player reaches the top, reset x and y so that player is at the bottom.
      if (this.currentY > this.topBoundary) {
        this.currentY -= this.stepY;
      } else {
        this.currentY = this.initialY;
        console.log("incrementing score");
        //this.score += 1;

        //Game.updateScore(1);
        this.score += 1;

        console.log("score is ", this.score);
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
};

// This function is called from the engine after a collision has been detected
Player.prototype.setPlayerToStartPosition = function() {
  this.currentX = this.initialX;
  this.currentY = this.initialY;
};

// enumerate enemy positions
var enemyPosition = {
  topRow: 65,
  middleRow: 145,
  bottomRow: 225
};

// enumerate enemy speeds
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

// enemies are now in the game
// All enemy objects are placed in an array called allEnemies
//var allEnemies = [
//  new Enemy(-50, enemyPosition.topRow, enemySpeed.one),
//  new Enemy(-250, enemyPosition.topRow, enemySpeed.three),
//  new Enemy(-50, enemyPosition.middleRow, enemySpeed.four),
//  new Enemy(-50, enemyPosition.middleRow, enemySpeed.two),
//  new Enemy(-500, enemyPosition.middleRow, enemySpeed.seven),
//  new Enemy(-50, enemyPosition.bottomRow, enemySpeed.three),
//  new Enemy(-100, enemyPosition.bottomRow, enemySpeed.eight)
//];


var game = new Game(document);

// The player object is the variable called player
// player is now in the game
// var player = new Player();

//  The up, down, left and right arrow keys are used for game play.
//  Add an event handler to listen for the keyup event.


// Listen for the keyup event

//document.addEventListener('keyup', function(e) {
//    var allowedKeys = {
//        37: 'left',
//        38: 'up',
//        39: 'right',
//        40: 'down'
//    };
//    console.log("keyup");
//    game.player.handleInput(allowedKeys[e.keyCode]);
//});

