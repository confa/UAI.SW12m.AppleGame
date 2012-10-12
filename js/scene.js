var canvas, ctx;
var hero;
var apples = [];
var width;
var height;
var tempAppleRadius = 10; //TODO Remove this
var direction;

// ---------------------

// function related to objects drawing

// Drawing all apples
function drawAllApples(ctx)
{
    for (var i=0; i<apples.length; i++)
    {
        apples[i].drawApple(ctx);
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
        if(apples[i].isFalling && apples[i].y < height - 50) {
            apples[i].y += apples[i].speed;
        }
        else
        {
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
        if(!apples[i].isFalling && apples[i].y < height - tempAppleRadius*2 && apples[i].r >=250) {
            apples.deleteCell(i);
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
    var x = (Math.random()*width);
    var y = Math.random()*height/2;
    apples.push(new Apple(x, y));
}

// clear canvas function
function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

//-----------------------------

function drawScene(){
    clear();
    drawAllApples(ctx);
    appleRipening();
    appleFalling();
    hero.drawHero(ctx);
    hero.applyGravity();
    hero.Move(direction);
}

// initialization

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    width = canvas.width;
    height = canvas.height;

    hero = new Hero(300,300);

    var applesCount = 20;
    direction = 'right';

    for (var i=0; i< applesCount; i++){
        newApple();
    }

    canvas.onmousedown = function(e){
        var x = e.offsetX;
        if(x > hero.x) direction = 'right';
        else direction = 'left';
        hero.IsRunning = true;
    };

    canvas.onmousemove = function(e){
        var x = e.offsetX;
        if(x > hero.x) direction = 'right';
        else direction = 'left';
    };

    canvas.onmouseup = function(e){
        hero.IsRunning = false;
    };

    canvas.ondblclick = function (e){
        hero.Jump();
    };


    setInterval(drawScene, 40);
});