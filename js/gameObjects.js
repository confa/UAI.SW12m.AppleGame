// Our Apple (or Acorn)
function Apple(x, y){
    this.x = x;
    this.y = y;
    this.r = 0;
    this.g = 255;
    this.b = 0;
    this.isFalling = false;
    this.speed = 5+Random(7);

    var self = this;
    this.appleTexture = new Image();
    this.appleTexture.src = 'img/apple.png';

    // Drawing one specified apple
    this.drawApple = function (ctx)
    {
        ctx.drawImage(self.appleTexture, 0, 0, 50, 50, self.x, self.y, 50, 50);
    };
}