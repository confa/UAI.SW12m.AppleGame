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

                        switch (apple.Type)
                        {
                            case ApplesType.NORMAL:
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
                                break;
                            case ApplesType.WORMY:
                                if(hero.IsInvulnerable) break;
                                hero.HP -= 5;
                                AnimateMessageToUser("WORMY!", apple.x, apple.y);
                                break;
                            case ApplesType.CONFUSED:
                                if(hero.IsInvulnerable) break;
                                hero.Confuse(1000);
                                hero.HP -= 5;
                                AnimateMessageToUser("Confused!", apple.x, apple.y);
                                break;
                            case ApplesType.BONUS:
                                TotalScore+=10;
                                var bonus = Math.random();

                                if(bonus < 0.2){
                                    hero.umbrella = true;
                                    AnimateMessageToUser("Umbrella!", apple.x, apple.y);
                                    jQuery('#invulnerability').removeAttr('disabled');
                                    jQuery('#invulnerability').css('background-image', 'url(img/invul-active.png)');
                                }
                                else if (bonus < 0.4){
                                    hero.slowing = true;
                                    AnimateMessageToUser("Slow!", apple.x, apple.y);
                                    jQuery('#slow').removeAttr('disabled');
                                    jQuery('#slow').css('background-image', 'url(img/slow-active.png)');
                                }
                                else if (bonus < 0.6){
                                    hero.life = true;
                                    AnimateMessageToUser("Life!", apple.x, apple.y);
                                    jQuery('#life').removeAttr('disabled');
                                    jQuery('#life').css('background-image', 'url(img/life-active.png)');
                                }
                                else if (bonus < 0.8){
                                    hero.stun = true;
                                    AnimateMessageToUser("Stun!", apple.x, apple.y);
                                    jQuery('#stun').removeAttr('disabled');
                                    jQuery('#stun').css('background-image', 'url(img/poison-active.png)');
                                }
                                else {
                                    hero.jolt = true;
                                    AnimateMessageToUser("Jolt!", apple.x, apple.y);
                                    jQuery('#jolt').removeAttr('disabled');
                                    jQuery('#jolt').css('background-image', 'url(img/bang-active.png)');
                                }

                                break;
                        }
                    }

                    break;
                }
            case '#NORTH#':
            {
                if(hero.IsInvulnerable)
                {
                    apple.isDrawing = false;
                    TotalScore+=10;
                    break;
                }
                if(apple.isFalling && apple.isDrawing)
                {
                    apple.isDrawing = false;
                    hero.HP -= 7;
                    hero.Confuse(4000);
                    AnimateMessageToUser("OOUPS!", apple.x, apple.y)

                    gameLevel > 30
                        ? gameLevel += 30
                        : gameLevel = 30;

                    clearInterval(newAppleInterval);
                    newAppleInterval = setInterval(AddNewApple, gameLevel);
                }
                break;
            }
            default :
                break;
        }
    });
}

function SaveResults()
{
    var name = jQuery('#playerName').val();
    addNewScore(name, TotalScore);
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
    if(pause) return;
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

    jQuery('#invulnerability').removeAttr('disabled');
    jQuery('#life').removeAttr('disabled');
    jQuery('#stun').removeAttr('disabled');
    jQuery('#jolt').removeAttr('disabled');
    jQuery('#slow').removeAttr('disabled');

    direction = 'right';
    TotalScore = 0;
    gameLevel = 600;

    clearInterval(newAppleInterval);
    newAppleInterval = setInterval(AddNewApple, gameLevel);
    apples = [];
    gameOver=false;
    pause = false;
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

    setInterval(drawScene, 20);
});