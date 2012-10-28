var appleWidth = 50;
var appleHeight = 50;
var rebornTimeout = 1000;

// Our Apple (or Acorn)
function Apple(x, y){
    this.x = x;
    this.y = y;
    this.ySpeed = 0;
    this.gravity = 0;
    this.r = 0;
    this.g = 255;
    this.b = 0;
    this.Width = appleWidth;
    this.Height = appleHeight;
    this.isFalling = false;
    this.isDrawing = true;
    this.RebornTimeout = rebornTimeout;
    this.speed = 5+Random(7);

    var self = this;
    this.appleTexture = new Image();
    this.appleTexture.src = 'img/apple.png';

    // Drawing one specified apple
    this.drawApple = function (ctx)
    {
        if(self.isDrawing) {
            ctx.drawImage(self.appleTexture, 0, 0, appleWidth, appleHeight, self.x, self.y, appleWidth, appleHeight);
        }
    };

    this.setGravity = function (gravity)
    {
        this.gravity = gravity/6;
    };
}