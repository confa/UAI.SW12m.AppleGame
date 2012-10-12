// Our Apple (or Acorn)
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