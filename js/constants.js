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
var newAppleInterval;

var catchedMessages = ["Catched!", "YEAH!", "Pick!", "Good!", "Perfect!", "Excellent!", "RAMPAGE!!!"];

// Hero constants and variables.
var frameWidth = 34;
var heroWidth = 60;
var heroHeight = 75;
var maxSpeedY = 15;
var maxSpeedX = 15;
var gravity = 9.8;
var frameCount = 9;
var fallingLambda = 0.5;

// Constants and variables related to game objects (apples, bonuses etc.)
var appleWidth = 50;
var appleHeight = 50;
var appleTexture = new Image();
appleTexture.src = 'img/apple.png';