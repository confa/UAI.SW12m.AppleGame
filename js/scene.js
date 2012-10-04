var canvas, ctx;
var hero;
var apples = [];
var width;
var height;
var tempAppleRadius = 10; //TODO Remove this

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
        ctx.fillStyle = 'rgba(0, 0, 255, 1.0)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
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
