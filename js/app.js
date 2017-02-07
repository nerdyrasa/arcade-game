// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.initialY = y;
    this.currentX = x;
    this.currentY = y;
    this.stepX = 1;

    this.speed = speed;
    //console.log("enemy created");
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
//  console.log("enemy update");
//  console.log("update enemy, dt, time delta = ", dt);

    if ( this.currentX < 500 ) {
      this.currentX += this.stepX + this.speed * dt;
      //console.log("currentX , currentY =", this.currentX, this.currentY);
      this.counter +=1;
      //console.log("enemy updating");
    } else {
      this.currentX = -50;
      this.counter = 0;
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.currentX, this.currentY);
    //console.log("enemy render");
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = 'images/char-horn-girl.png';
    this.initialX = 200;
    this.initialY = 310;
    this.currentX = 200;
    this.currentY = 310;

    this.currentRow = 1;
    this.topBound = 72;
    this.bottomBound = 328;
    this.stepY = 85;
    this.stepX = 97;
};

Player.prototype.update = function() {


};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.currentX, this.currentY);

};

Player.prototype.handleInput = function(key) {
  //console.log("handle Input");
  //console.log(key);

  switch(key) {
    case 'up':
      if (this.currentY > this.topBound) {
        this.currentY -= this.stepY;
      } else {
        this.currentY = this.initialY;
      }
      break;
    case 'down':
      if (this.currentY < this.bottomBound) {
        this.currentY += 85;
      }
      break;
    case 'left':
      if (this.currentX > 10) {
        this.currentX -= this.stepX;
      }
      break;
    case 'right':
      if (this.currentX < 390) {
        this.currentX += this.stepX;
        break;
      }
  }
  //console.log("x and y = ", this.currentX, this.currentY);
};

Player.prototype.setToStartPosition = function() {
  this.currentX = 200;
  this.currentY = 310;
};

//Player.prototype.checkCollisions = function() {
//  console.log("checking collisions");
//  console.log(this);
//  var x = this.currentX;
//  var y = this.currentY;
//
//
//
//
//}

Player.prototype.setPlayerToStart = function() {
  this.currentX = this.initialX;
  this.currentY = this.initialY;
};

//Player.prototype.reset = function

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
  new Enemy(-50, 65, 35),
  new Enemy(-250, 65, 90),
  new Enemy(-50, 145, 70) ,
  new Enemy(-500, 145, 110),
  new Enemy(-50, 225, 155)
];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

