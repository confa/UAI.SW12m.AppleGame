var canvas, ctx;
var hero;
var apples = [];
var width;
var height;

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
