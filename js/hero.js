// constants
var frameWidth = 34;
var heroWidth = 60;
var heroHeight = 75;
var maxSpeedY = 15;
var maxSpeedX = 15;
var gravity = 9.8;
var frameCount = 9;
var fallingLambda = 0.5;

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

    // hero speeds
    this.SpeedY = 0;
    this.SpeedX = maxSpeedX;

    // direction for moving
    this.direction = 'right';

    // current frame for drawing
    this.currentFrame = 0;

    // texture for run left // TODO need to used only one run texture and just mirror it
    self.runLeftTexture = new Image();
    self.runLeftTexture.src = 'img/RunLeft.png';

    // texture for run right
    self.runRightTexture = new Image();
    self.runRightTexture.src = 'img/RunRight.png';

    // texture for idle
    self.idleTexture = new Image();
    self.idleTexture.src = 'img/Idle.png';

    // Drawing hero
    this.DrawHero = function (ctx)
    {
        ctx.font="10px Georgia";
        ctx.fillStyle = Color(255,255,255);
        ctx.fillText("X: " + self.x.toFixed(),10,10);
        ctx.fillText("Y: " + self.y.toFixed(),10,20);

        self.currentFrame = (self.currentFrame+1)%frameCount;
        if( !self.IsRunning )
            ctx.drawImage(self.idleTexture, 0, 0, 34, 42, self.x, self.y, heroWidth, heroHeight);
        else{
            if(self.direction == 'left')
                ctx.drawImage (self.runLeftTexture, frameWidth * self.currentFrame, 0,
                    34, 42, self.x, self.y, heroWidth, heroHeight);
            else
                ctx.drawImage (self.runRightTexture, frameWidth * self.currentFrame, 0,
                    34, 42, self.x, self.y, heroWidth, heroHeight);
        }
    };

    // hero gravity
    this.ApplyGravity = function ()
    {
        var tempY = self.y;
        tempY -= self.SpeedY;
        tempY += gravity;

        if(tempY <= height - self.Height)
        {
            self.y = tempY;
        }
        else
        {
            self.y = height - self.Height;
            self.IsJumping = false;
        }

        if(self.SpeedY > 0) self.SpeedY -= fallingLambda;
        else self.IsJumping = false;
    };

    // hero jumping
    this.Jump = function()
    {
        if(!self.IsJumping)
        {
            self.SpeedY = maxSpeedY;
            self.IsJumping = true;
        }
    }

    // hero moving
    this.Move = function(direction){
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