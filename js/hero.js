// Our main hero
function Hero(x, y){
    this.x = x;
    this.y = y;
    this.IsRunning = false;
    this.SpeedY = 0;
    this.IsJumping = false;

    // Drawing hero
    this.drawHero = function (ctx, hero)
    {
        currentFrame = ++currentFrame%9;

        var runLeftTexture = new Image();
        runLeftTexture.src = 'img/RunLeft.png';
        runLeftTexture.onload = function() {
            if( hero.IsRunning && direction == 'left')
                ctx.drawImage (runLeftTexture, 34 * currentFrame, 0, 34, 42, hero.x, hero.y, 34, 42);
        };

        var runRightTexture = new Image();
        runRightTexture.src = 'img/RunRight.png';
        runRightTexture.onload = function() {
            if( hero.IsRunning && direction == 'right')
                ctx.drawImage (runRightTexture, 34 * currentFrame, 0, 34, 42, hero.x, hero.y, 34, 42);
        };

        var idleTexture = new Image();
        idleTexture.src = 'img/Idle.png';
        idleTexture.onload = function() {
            if( !hero.IsRunning )
                ctx.drawImage(idleTexture, 0, 0, 34, 42, hero.x, hero.y, 34, 42);
        };

    };

    // hero gravity
    this.applyGravity = function ()
    {
        if ((this.y + 40) < height)
        {
            this.y += 10;
        }

        if(this.SpeedY > 0) this.SpeedY -=0.5;
        else this.IsJumping = false;
    };

    this.Jump = function()
    {
        if(!this.IsJumping)
        {
            this.SpeedY = 20;
            this.IsJumping = true;
        }
    }
}