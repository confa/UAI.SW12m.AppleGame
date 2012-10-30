var canvas, ctx;
var hero;
var apples = [];
var maxAppleCounts = 100;
var width;
var height;
var direction;
var TotalScore;
var leftControlImage;
var rightControlImage;

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
    var x = (Math.random()*width);
    var y = Math.random()*height/2;
    apple = new Apple(x, y);
    apple.setGravity(gravity);
    return apple;
}

function intersects(ctx){
    ctx.font="20px Georgia";

    for(var i=0; i< apples.length; i++)
    {
        // define intersect
        var intersect = positionOf(apples[i], hero);
        // if intersect from left or right side - catch apple and raise Score
        if(intersect == '#WEST#' || intersect == '#EAST#')
        {
            apples[i].isDrawing = false;
            TotalScore+=10;
        }
        // if intersect from left or right side - catch apple and decrease HP
        if(intersect == '#NORTH#')
        {
            apples[i].isDrawing = false;
            hero.HP -= 3;
        }
        // replace catched apples with new ones
        if(apples[i].isDrawing == false)
        {
            apples[i].RebornTimeout -= 50;
            if(apples[i].RebornTimeout == 0)
            {
                apples[i] = newApple();
            }
        }
        //ctx.fillText(intersect,apples[i].x,apples[i].y);
    }
}

// clear canvas function
function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function gameInfo(ctx)
{
    var bar = $('health');
    var score = $('score');
    score.textContent= "Score:" + TotalScore;

    bar.removeClassName('bar-danger');
    bar.removeClassName('bar-warning');
    bar.removeClassName('bar-success');

    if(hero.HP < 30)
    {
        bar.addClassName('bar bar-danger');
        bar.style.width = hero.HP + "%";
    }
    else if(hero.HP < 60)
    {
        bar.addClassName('bar bar-warning');
        bar.style.width = hero.HP + "%";
    }
    else
    {
        bar.addClassName('bar bar-success');
        bar.style.width = hero.HP + "%";
    }
}

function DrawControls(ctx)
{
    ctx.drawImage(leftControlImage, 0, 0, 100, 154, 20, height/2 - 154/2, 100, 154);
    ctx.drawImage(rightControlImage, 0, 0, 100, 154, width - 120, height/2 - 154/2, 100, 154);
}

//-----------------------------

function drawScene(){
    clear();
    DrawControls(ctx);
    drawAllApples(ctx);
    appleRipening();
    appleDisappearance();
    appleFalling();
    hero.DrawHero(ctx);
    hero.ApplyGravity();
    hero.Move(direction);
    intersects(ctx);
    gameInfo(ctx);

}

// initialization

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    // lock scroll position, but retain settings for later
    var scrollPosition = [
        this.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        this.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
    ];
    var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);


    width = canvas.width;
    height = canvas.height;

    leftControlImage = new Image();
    leftControlImage.src = 'img/left.png';

    rightControlImage = new Image();
    rightControlImage.src = 'img/right.png';


    hero = new Hero(300,300);

    direction = 'right';
    TotalScore = 0;

    for (var i=0; i< maxAppleCounts; i++){
        apples.push(newApple());
    }

    canvas.onmousedown = function(e){
        var x = e.offsetX;
        if(x > width/2) direction = 'right';
        else direction = 'left';
        hero.IsRunning = true;
    };

    canvas.onmousemove = function(e){
        var x = e.offsetX;
        if(x > width/2) direction = 'right';
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