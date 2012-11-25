//########################################
// Contains hero class and hero functions.
//########################################

// Our main hero
function Hero(x, y){
    var self = this; // pointer on current hero instance

    // coordinates
    this.x = x;
    this.y = y;

    this.HP = 100;

    this.Width = heroWidth;
    this.Height = heroHeight;

    // hero states
    this.IsRunning = false;
    this.IsJumping = false;
    this.IsConfused = false;

    // confused timeout
    this.confuseTimeout = 0;

    // hero speeds
    this.SpeedY = 0;
    this.SpeedX = maxSpeedX;

    // direction for moving
    this.direction = 'right';

    // current frame for drawing
    this.currentFrame = 0;

    // texture for run left /
    self.runLeftTexture = new Image();
    self.runLeftTexture.src = 'img/RunLeft.png';

    // texture for run right
    self.runRightTexture = new Image();
    self.runRightTexture.src = 'img/RunRight.png';

    // texture for idle
    self.idleTexture = new Image();
    self.idleTexture.src = 'img/Idle.png';

    // texture for confuse
    self.confuseTexture = new Image();
    self.confuseTexture.src = 'img/Confuse.png';

    // Drawing hero
    this.DrawHero = function (ctx)
    {
        self.currentFrame = (self.currentFrame+1)%frameCount;
        if(self.IsConfused)
            ctx.drawImage(self.confuseTexture, 0, 0, 34, 42, self.x, self.y, heroWidth, heroHeight);
        else {
            if( !self.IsRunning )
                ctx.drawImage(self.idleTexture, 0, 0, 34, 42, self.x, self.y, heroWidth, heroHeight);
            else{
                if(self.direction == 'left')
                    ctx.drawImage (self.runLeftTexture, frameWidth * self.currentFrame, 0,
                        34, 42, self.x, self.y, heroWidth, heroHeight);
                else
                {
                    ctx.drawImage (self.runRightTexture, frameWidth * self.currentFrame, 0,
                        34, 42, self.x, self.y, heroWidth, heroHeight);
                }
            }
        }
    };

    // hero gravity
    this.Update = function ()
    {
        //------ gravity ---------
        var tempY = self.y;
        tempY -= self.SpeedY;
        tempY += gravity;

        if(tempY <= height - self.Height)
        {
            self.y = tempY;
            self.SpeedY -= fallingLambda;
        }
        else
        {
            self.y = height - self.Height;
            self.IsJumping = false;
        }
        //-------------------------

        // ------- confusing ------

        if(self.confuseTimeout > 0)
        {
            self.IsConfused = true;
            self.confuseTimeout -= 40;
        }
        else
        {
            self.IsConfused = false;
            self.confuseTimeout = 0;
        }

        // ------------------------

    };

    // hero confuse
    this.Confuse = function (timespan)
    {
        self.confuseTimeout = timespan;
    }

    // hero jumping
    this.Jump = function()
    {
        if(!self.IsJumping && !self.IsConfused)
        {
            self.SpeedY = maxSpeedY;
            self.IsJumping = true;
        }
    }

    // hero moving
    this.Move = function(direction){
        if(!self.IsConfused)
        {
            self.y -= self.SpeedY;
            self.direction = direction;

            if(self.IsRunning){
                if(direction == 'left' && self.x > 0)
                {
                    self.x -= maxSpeedX;
                }
                if(direction == 'right' && self.x < width - heroWidth)
                {
                    self.x += maxSpeedX;
                }
            }
        }
    }
}