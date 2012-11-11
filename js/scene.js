var canvas, ctx;
var hero;
var apples = [];
var maxAppleCounts = 30;
var width;
var height;
var direction;
var TotalScore;
var gameOver;

var catchedMessages = ["Catched!", "YEAH!", "Pick!", "Good!", "Perfect!", "Excellent!", "RAMPAGE!!!"];

// ---------------------

// function related to objects drawing

// Drawing all apples
function drawAllApples(ctx)
{
    Enumerable.From(apples).ForEach(function(value)
    {
        value.drawApple(ctx);
    });
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
    var apple = new Apple(x, y);
    apple.setGravity(gravity);
    return apple;
}

function boundingRect(object)
{
    var tempObject = new Object();
    tempObject.Height = 0.5 * object.Height;
    tempObject.Width = 0.3 * object.Width;
    tempObject.x = object.x;
    tempObject.y = object.y;

    return tempObject;
}

function intersects(ctx){

    Enumerable.From(apples).ForEach(function(apple, index)
    {
        // define intersect
        var intersect = positionOf(boundingRect(apple), boundingRect(hero));

        switch (intersect)
        {
            case '#WEST#':
            case '#EAST#':
            case '#SOUTH#':
                {
                    if(apple.isDrawing)
                    {
                        apple.isDrawing = false;
                        TotalScore+=10;
                        if(TotalScore % 100 == 0)
                        var message = catchedMessages[Random(catchedMessages.length - 1)]
                        AnimateMessageToUser(message, apple.x, apple.y)
                    }
                    break;
                }
            case '#NORTH#':
            {
                if(apple.isFalling && apple.isDrawing)
                {
                    apple.isDrawing = false;
                    hero.HP -= 7;
                    AnimateMessageToUser("OOUPS!", apple.x, apple.y)
                }
                break;
            }
            default :
                break;
        }

        if(apple.isDrawing == false)
        {
            apple.RebornTimeout -= 50;
            if(apple.RebornTimeout == 0)
            {
                apples[index] = newApple();
            }
        }
    });
}

// clear canvas function
function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function restart()
{
    Initialization();
}

function gameInfo(ctx)
{
    var bar = jQuery('#health');
    var score = jQuery('#score');
    score.text("Score:" + TotalScore);

    bar.removeClass('bar-danger');
    bar.removeClass('bar-warning');
    bar.removeClass('bar-success');

    if(hero.HP < 0) {
        gameOver = true;
        if(gameOver) {
            jQuery('#gameOver').modal();
            jQuery('#scoreModal').text(TotalScore);
        };
    }
    else if(hero.HP < 30)
    {
        bar.addClass('bar bar-danger');
        bar.width(hero.HP + "%");
    }
    else if(hero.HP < 60)
    {
        bar.addClass('bar bar-warning');
        bar.width(hero.HP + "%");
    }
    else
    {
        bar.addClass('bar bar-success');
        bar.width(hero.HP + "%");
    }
}

//-----------------------------

function drawScene(){
    if(gameOver) return;
    clear();
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

function Initialization()
{
    hero = new Hero(500,500);

    direction = 'right';
    TotalScore = 0;

    apples = [];

    for (var i=0; i< maxAppleCounts; i++){
        apples.push(newApple());
    }

    gameOver=false;
}

function ApplyControls()
{
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

    canvas.addEventListener('touchmove', function(event) {
        event.preventDefault();
        var touch = event.touches[0];

        if (touch.length > 1) {
            hero.Jump();
        }

        var x = touch.pageX;
        if(x > width/2) direction = 'right';
        else direction = 'left';
    }, false);

    canvas.addEventListener('touchstart', function(event) {
        event.preventDefault();
        var touch = event.touches[0];

        if (touch.length > 1) {
            hero.Jump();
        }

        var x = touch.pageX;
        if(x > width/2) direction = 'right';
        else direction = 'left';
        hero.IsRunning = true;
    }, false);

    canvas.addEventListener('touchend', function(event) {
        event.preventDefault();
        hero.IsRunning = false;
    }, false);
}

function AnimateMessageToUser(text, x, y)
{
    var randomId = Random(1000);

    var message = jQuery(document.createElement('span'));
    message.text(text);
    message.attr('id', randomId);
    message.addClass('message');


    message.css({
        left: x,
        top: y
    });

    var infoContainer = jQuery('#info');
    infoContainer.append(message);

    var createdMessage = jQuery('#' + randomId)

    var randomTop = Random(400);

    createdMessage.animate({
        opacity: 1,
        top: randomTop + 30
    }, 1000, function(){
        createdMessage.animate({
            opacity: 0
        }, 1000, function(){
            createdMessage.remove();
        })
    })
}

function AnimateControls()
{

    var leftControl = jQuery('#leftControl');
    var rightControl = jQuery('#rightControl');

    leftControl.animate({
        opacity: 1
    },4000, function(){
        leftControl.animate({
            opacity: 0
        },4000, function(){
            leftControl.remove();
        })});

    rightControl.animate({
        opacity: 1
    },4000, function(){
        rightControl.animate({
            opacity: 0
        },4000, function(){
            rightControl.remove();
        })});

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
    var html = jQuery('#html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    canvas.onselectstart = function () { return false; }

    width = canvas.width;
    height = canvas.height;

    Initialization();
    ApplyControls();
    AnimateControls();
    AnimateMessageToUser("LET'S START!!", 20);

    setInterval(drawScene, 40);
});