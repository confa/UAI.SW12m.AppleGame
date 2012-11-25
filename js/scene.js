function intersects() {
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
                        {
                            var message = catchedMessages[Random(catchedMessages.length - 1)]
                            AnimateMessageToUser(message, apple.x, apple.y)
                            gameLevel > 30
                                ? gameLevel -= 30
                                : gameLevel = 30;

                            hero.HP < 95
                                ? hero.HP +=5
                                : hero.HP = 100;

                            clearInterval(newAppleInterval);
                            newAppleInterval = setInterval(AddNewApple, gameLevel);
                        }
                    }
                    break;
                }
            case '#NORTH#':
            {
                if(apple.isFalling && apple.isDrawing)
                {
                    apple.isDrawing = false;
                    hero.HP -= 7;
                    hero.Confuse(4000);
                    AnimateMessageToUser("OOUPS!", apple.x, apple.y)
                }
                break;
            }
            default :
                break;
        }
    });
}

function UpdateGameInfo(ctx)
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
    hero.Update();
    hero.Move(direction);
    intersects();
    UpdateGameInfo(ctx);
}

function Initialization()
{
    hero = new Hero(500,500);

    direction = 'right';
    TotalScore = 0;
    gameLevel = 600;

    clearInterval(newAppleInterval);
    newAppleInterval = setInterval(AddNewApple, gameLevel);
    apples = [];
    gameOver=false;
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