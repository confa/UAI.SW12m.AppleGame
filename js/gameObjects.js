// Our Apple (or Acorn)
function Apple(x, y){
    this.x = x;
    this.y = y;
    this.ySpeed = 5+Random(7);
    this.gravity = 0;
    this.r = 0;
    this.g = 255;
    this.b = 0;
    this.Width = appleWidth;
    this.Type = ApplesType.NORMAL;
    this.Height = appleHeight;
    this.isFalling = false;
    this.isDrawing = true;
    this.speed = 5+Random(7);

    this.prevFrameDrawCounter = 0;
    this.prevFrame = 0;
    this.currentFrame = 0;
    this.disappearanceTimeout = normalDisTimeout;

    var self = this;

    // Drawing one specified apple
    this.drawApple = function (ctx)
    {
        if(self.isDrawing) {
            switch (self.Type)
            {
                case ApplesType.NORMAL:
                    ctx.drawImage (normalAppleTexture, appleWidth * this.currentFrame, 0,
                        appleWidth, appleHeight, self.x, self.y, appleWidth, appleHeight);

                    if (this.prevFrameDrawCounter > 0) {
                        this.prevFrameDrawCounter--;
                        ctx.globalAlpha = this.prevFrameDrawCounter/30.0;
                        ctx.drawImage (normalAppleTexture, appleWidth * this.prevFrame, 0,
                            appleWidth, appleHeight, self.x, self.y, appleWidth, appleHeight);
                        ctx.globalAlpha = 1;
                    }
                    break;
                case ApplesType.WORMY:
                    ctx.drawImage (wormyAppleTexture, 72 * this.currentFrame, 0,
                        72, 70, self.x, self.y - 10, 72, 70);

                    if (this.prevFrameDrawCounter > 0) {
                        this.prevFrameDrawCounter--;
                        ctx.globalAlpha = this.prevFrameDrawCounter/30.0;
                        ctx.drawImage (wormyAppleTexture, 72 * this.prevFrame, 0,
                            72, 70, self.x, self.y - 10, 72, 70);
                        ctx.globalAlpha = 1;
                    }
                    break;
                case ApplesType.BONUS:
                    ctx.drawImage (bonusAppleTexture, appleWidth * this.currentFrame, 0,
                        appleWidth, appleHeight, self.x, self.y, appleWidth, appleHeight);

                    if (this.prevFrameDrawCounter > 0) {
                        this.prevFrameDrawCounter--;
                        ctx.globalAlpha = this.prevFrameDrawCounter/30.0;
                        ctx.drawImage (bonusAppleTexture, appleWidth * this.prevFrame, 0,
                            appleWidth, appleHeight, self.x, self.y, appleWidth, appleHeight);
                        ctx.globalAlpha = 1;
                    }
                    break;
            }
        }
    };

    this.setGravity = function (gravity)
    {
        this.gravity = gravity/10;
    };

    this.applyGravity = function()
    {
        this.ySpeed += this.gravity;
        this.y += this.ySpeed;
    };
}

// function related to objects drawing

// Drawing all apples
function drawAllApples(ctx)
{
    Enumerable.From(apples).ForEach(function(value)
    {
        value.drawApple(ctx);
    });
}

function AddNewApple()
{
    var disabledApple = -1;

    for(var i=0; i<apples.count; i++)
    {
        if(!apples[i].isDrawing)
        {
            disabledApple = i;
            break;
        }
    }

    if(disabledApple == -1)
    {
        apples.push(newApple());
    }
    else
    {
        apples[disabledApple] = newApple();
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
        var tempY = apples[i].y + apples[i].ySpeed;
        if(apples[i].isFalling && tempY <= height - apples[i].Height) {
            apples[i].y += apples[i].ySpeed;
            apples[i].ySpeed += apples[i].gravity;
        }
        else
        {
            if(apples[i].isFalling)
            {
                apples[i].y = height - apples[i].Height;
            }
            apples[i].isFalling = false;
        }
    }
}
// If apple lying per 3 seconds
// it will disappeared
function appleDisappearance()
{
    Enumerable.From(apples).ForEach(function(apple, index)
    {
        if(apple.disappearanceTimeout < 0)
        {
            apple.isDrawing = false;
        }
        else
        {
            if(apple.y == height - apple.Height)
            {
                apple.disappearanceTimeout -= dissapearingTick;
            }
        }
    });
}

// Apple ripening time per time
// If apple is riped - start it falling
function appleRipening(){

    for (var i=0; i< apples.length; i++)
    {
        if(!apples[i].isFalling){
            var r = apples[i].r += appleRiperingSpeed;

            if(r == 300){
                apples[i].isFalling = true;
            }
            if(r > apples[i].currentFrame * 300 / appleFrameCount && apples[i].currentFrame < appleFrameCount - 1)
            {
                apples[i].prevFrameDrawCounter = 30;
                apples[i].prevFrame = apples[i].currentFrame;
                apples[i].currentFrame++;
            }
        }
    }
}

// Added new apple on tree
function newApple(){
    var x = Random(width-appleWidth);
    var y = Random(height/2);
    var apple = new Apple(x, y);
    apple.ySpeed = hero.IsSlowed ? appleLowSpeed : 5+Random(7);
    var appleType = Math.random();

    if(appleType < 0.85)
    {
        apple.Type = ApplesType.NORMAL;
        apple.disappearanceTimeout = normalDisTimeout;
    }
    else if (appleType < 0.95)
    {
        apple.Type = ApplesType.WORMY;
        apple.disappearanceTimeout = wormyDisTimeout;
    }
    else
    {
        apple.Type = ApplesType.BONUS;
        apple.disappearanceTimeout = bonusDisTimeout;
    }

    apple.setGravity(gravity);
    return apple;
}