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
    this.Type = ApplesType.NORMAL;
    this.Height = appleHeight;
    this.isFalling = false;
    this.isDrawing = true;
    this.speed = 5+Random(7);

    var self = this;

    // Drawing one specified apple
    this.drawApple = function (ctx)
    {
        if(self.isDrawing) {
            switch (self.Type)
            {
                case ApplesType.NORMAL:
                    ctx.drawImage(normalAppleTexture, 0, 0, appleWidth, appleHeight,
                        self.x, self.y, appleWidth, appleHeight);
                    break;
                case ApplesType.WORMY:
                    ctx.drawImage(wormyAppleTexture, 0, 0, appleWidth, appleHeight,
                        self.x, self.y, appleWidth, appleHeight);
                    break;
                case ApplesType.CONFUSED:
                    ctx.drawImage(confuseAppleTexture, 0, 0, appleWidth, appleHeight,
                        self.x, self.y, appleWidth, appleHeight);
                    break;
                case ApplesType.BONUS:
                    ctx.drawImage(bonusAppleTexture, 0, 0, appleWidth, appleHeight,
                        self.x, self.y, appleWidth, appleHeight);
                    break;
            }
        }
    };

    this.setGravity = function (gravity)
    {
        this.gravity = gravity/6;
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
    for (var i=0; i< apples.length; i++)
    {
        if(!apples[i].isFalling && apples[i].y + apples[i].Height >= height && apples[i].r >=250) {
            apples[i].isDrawing = false;
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

// Added new apple on tree
function newApple(){
    var x = Random(width-appleWidth);
    var y = Random(height/2);
    var apple = new Apple(x, y);

    var appleType = Math.random();

    if(appleType < 0.7)
        apple.Type = ApplesType.NORMAL;
    else if (appleType < 0.8)
        apple.Type = ApplesType.CONFUSED
    else if (appleType < 0.9)
        apple.Type = ApplesType.WORMY
    else
        apple.Type = ApplesType.BONUS;

    apple.setGravity(gravity);
    return apple;
}