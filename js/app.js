// Enemies our player must avoid
var Enemy = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + Math.floor(Math.random() + 5) + 50 * dt;

  if (this.x >= 505) {
    this.x = 0;
  }
  checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// A handleInput() method.
const Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  // Function not used for this build
};

// Draw Player char on canvas
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checking input and location on the board to stop player from leaving board
Player.prototype.handleInput = function(e) {
  if (e === 'up' && this.y > 0) {
    this.y = this.y - 82;
  } else if (e === 'down' && this.y < 400) {
    this.y = this.y + 82;
  }
  if (e === 'left' && this.x > 100) {
    this.x = this.x - 100;
  }
  if (e === 'right' && this.x < 400) {
    this.x = this.x + 100;
  }
};

// Checking for collisions
const checkCollision = enemy => {
  if (
    player.y + 131 >= enemy.y + 90 &&
    player.x + 25 <= enemy.x + 88 &&
    player.y + 73 <= enemy.y + 135 &&
    player.x + 76 >= enemy.x + 11
  ) {
    console.log('collided');
    player.x = 202;
    player.y = 400;
    score += 1;
    addEnemy(score);
  }
  // Check hero reaching goal
  if (player.y <= 0) {
    player.x = 202.5;
    player.y = 383;
    console.log('you made it!');
    score += 1;
    addEnemy(score);
    scoreBoard.innerHTML = score;
  }
};

// Add enemy as score increases or as collisions happen
const addEnemy = numEnemies => {
  // Remove all previous enemies on canvas
  allEnemies.length = 0;
  // Load new set of enemies
  for (var i = 0; i <= numEnemies; i++) {
    let enemy = new Enemy(Math.random() * 200 + 50, Math.random() * 256);
    allEnemies.push(enemy);
  }
};

// Now instantiate your objects.
// Place the player object in a variable called player
// Place all enemy objects in an array called allEnemies
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
const allEnemies = [];
const enemy = new Enemy(Math.random() * 200 + 50, Math.random() * 256);
const player = new Player(202, 400);
const scoreBoard = document.getElementById('score');
let score = 0;

allEnemies.push(enemy);

// Display for score count
scoreBoard.innerHTML = score;
document.addEventListener('keyup', e => {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
