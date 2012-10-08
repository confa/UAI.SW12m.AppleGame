var canvas, ctx;
var hero;
var apples = [];
var width;
var height;
var tempAppleRadius = 10; //TODO Remove this
var currentFrame;
var direction;

// ---------------------

// Game objects

// Our main hero
// TODO Maybe this method must be renamed
function Hero(x, y){
    this.x = x;
    this.y = y;
    this.IsRunning = false;

    // Drawing hero
    this.drawHero = function (ctx)
    {
        currentFrame = ++currentFrame%9;

        var runTexture = new Image();
        runTexture.src = 'img/Run.png';
        runTexture.onload = function() {
            if( !this.IsRunning )
                ctx.drawImage (runTexture, 34 * currentFrame, 0, 34, 42, this.x, this.y, 34, 42);
        };

        var idleTexture = new Image();
        idleTexture.src = 'img/Idle.png';
        idleTexture.onload = function() {
            if( this.IsRunning )
                ctx.drawImage(idleTexture, 0, 0, 34, 42, this.x, this.y, 34, 42);
        };
    };

    // hero gravity
    this.applyGravity = function ()
    {
        if ((this.y + 20) < height)
        {
            this.y += 10;
        }
    };
}

// Our Apple (or Acorn)
// TODO Maybe this method must be renamed
function Apple(x, y){
    this.x = x;
    this.y = y;
    this.r = 0;
    this.g = 255;
    this.b = 0;
    this.isFalling = false;
    this.speed = 5+Random(7);

    // Drawing one specified apple
    this.drawApple = function (ctx)
    {   var color = Color(this.r, this.g, this.b);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, tempAppleRadius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    };
}

// ---------------------

// common functions

// return color string from 3 channels
function Color(r, g, b)
{
    return ('rgba(' + r + ',' + g + ',' + b +', 1.0)').toString();
}

// returns random value from 0 to max
function Random(max)
{
    return Math.floor((Math.random()*max)+1);
}

// clear canvas function
function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// ---------------------

// function related to objects drawing

// Drawing all apples
function drawAllApples(ctx)
{
    for (var i=0; i<apples.length; i++)
    {
        apples[i].drawApple(ctx);
    }
}

// ------------------------

// functions related to objects state changing

// If apples falling flag is true
// apple is falling
function appleFalling()
{
    for (var i=0; i< apples.length; i++)
    {
        if(apples[i].isFalling && apples[i].y < height - tempAppleRadius) {
            apples[i].y += apples[i].speed;
        }
        else
        {
            apples[i].isFalling = false;
        }
    }
}
// If apple lying per 3 seconds
// it will disappeared
function appleDisappearance()
{
    for (var i=0; i< apples.length; i++)
    {
        if(!apples[i].isFalling && apples[i].y < height - tempAppleRadius*2 && apples[i].r >=250) {
            apples.deleteCell(i);
        }
    }
}

// Apple ripening time per time
// If apple is riped - start it falling
function appleRipening(){

    for (var i=0; i< apples.length; i++)
    {
        if(!apples[i].isFalling){
            var colorLambda = 1+Random(2);
            var r = apples[i].r += colorLambda;
            var g = apples[i].g -= colorLambda;

            if(g <= 0 && r >=250){
                apples[i].isFalling = true;
            }
        }
    }
}

// hero moving
function move(direction){
    if(direction == 'left' && hero.x > 0)
    {
        hero.x -= 5;
    }
    if(direction == 'right' && hero.x < width)
    {
        hero.x += 5;
    }
}

// Added new apple on tree
function newApple(){
    var x = (Math.random()*width);
    var y = Math.random()*height/2;
    apples.push(new Apple(x, y));
}

//-----------------------------

function drawScene(){
    clear();
    drawAllApples(ctx);
    appleRipening();
    appleFalling();
    hero.drawHero(ctx);
    hero.applyGravity();
    move(direction);
}

// initialization

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    width = canvas.width;
    height = canvas.height;

    hero = new Hero(100,100);

    var applesCount = 1;
    currentFrame = 0;
    direction = 'right';

    for (var i=0; i< applesCount; i++){
        newApple();
    }


    setInterval(drawScene, 30);
});