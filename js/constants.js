//######################################
// Contains all constants and variables.
//######################################

// Common constants and variables.
var canvas, ctx;
var hero;
var apples = [];
var width;
var height;
var direction;
var TotalScore;
var gameOver;
var gameLevel;
var pause;
var newAppleInterval;

var catchedMessages = ["Catched!", "YEAH!", "Pick!", "Good!", "Perfect!", "Excellent!", "RAMPAGE!!!"];

var ApplesType = {
    NORMAL : 1,
    WORMY : 2,
    CONFUSED : 3,
    BONUS : 4
}

var Bonus = {
    UMBRELLA : 1,
    SLOW : 2,
    JOLT : 3,
    LIFE : 4,
    STUN : 5
}

// Hero constants and variables.
var frameWidth = 34;
var heroWidth = 60;
var heroHeight = 75;
var maxSpeedY = 15;
var maxSpeedX = 10;
var gravity = 9.8;
var frameCount = 9;
var fallingLambda = 0.5;

// Constants and variables related to game objects (apples, bonuses etc.)
var appleWidth = 50;
var appleHeight = 50;

var normalAppleTexture = new Image();
normalAppleTexture.src = 'img/normalApple.png';

var bonusAppleTexture = new Image();
bonusAppleTexture.src = 'img/bonusApple.png';

var confuseAppleTexture = new Image();
confuseAppleTexture.src = 'img/confuseApple.png';

var wormyAppleTexture = new Image();
wormyAppleTexture.src = 'img/wormyApple.png';