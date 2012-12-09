//##############################################################
// Contains common function which are used by whole application.
//##############################################################

// Return color string from 3 channels.
function Color(r, g, b)
{
    return ('rgba(' + r + ',' + g + ',' + b +', 1.0)').toString();
}

// Returns random value from 0 to max.
function Random(max)
{
    return Math.floor((Math.random()*max)+1);
}

// Returns distance between two points.
function Distance(firstX, firstY, secondX, secondY)
{
    return Math.sqrt(Math.pow(secondX-firstX,2) + Math.pow(secondY-firstY,2));
}

function drawMainMenu()
{
    jQuery('#gameInfo').attr('hidden' ,'hidden');

    InGameMenu = new Menu("Game Menu",
        [ "Start", "Awards"],
        "",
        70, 50, 400,
        function(numItem) {
            if (numItem == 0)
            {
                InGameMenu = null;
                jQuery('#gameInfo').removeAttr('hidden');
                Initialization();
                AnimateControls();
            }
            else if (numItem == 1) window.location.href = "awards.html";
        },
        function(elapsed) { });
}

function updateGameTime()
{
    gameTime++;
}

function Pause()
{
    if(pause == true)
    {
        pause = false;
        newAppleInterval = setInterval(AddNewApple, gameLevel);
        jQuery('#gameInfo').removeAttr('hidden');
        //AnimateMessageToUser("Let's continue!", 300, height - 50);
    }
    else
    {
        pause = true;
        clearInterval(newAppleInterval);
        //AnimateMessageToUser("PAUSE", 300, height - 50);
        //jQuery('#score').text("Pause");
        jQuery('#gameInfo').attr('hidden', 'hidden');
        InGameMenu = new Menu("Game Menu",
            [ "Continue", "Restart" , "Back to main"],
            "",
            70, 50, 400,
            function(numItem) {
                if (numItem == 0) { Pause(); InGameMenu = null;  }
                else if (numItem == 1) restart();
                else if (numItem == 2) drawMainMenu();
            },
            function(elapsed) { });

    }
}

// Function for object opacity changing.
function changeOpacity( imageobject, opacity ) {

    var object = imageobject.style;
    object.opacity = opacity;
    object.MozOpacity = opacity;
    object.KhtmlOpacity = opacity;
    object.filter = "alpha(opacity=" + opacity + ")";
}

// Function which fill intersects.
// Remark: two object must has properties x, y, Width, Height
function positionOf(point, relativeTo) {
    var firstCenterX = point.x + point.Width/2;
    var firstCenterY = point.y + point.Height/2;

    var secondCenterX = relativeTo.x + relativeTo.Width/2;
    var secondCenterY = relativeTo.y + relativeTo.Height/2;

    var dx = firstCenterX - secondCenterX; // diff on x axis
    var dy = firstCenterY - secondCenterY; // diff on y axis

    var direction = "";

    if(dx >= dy) { // point is on top right half from relativeTo
        direction = dx >= - dy ? '#EAST#' : '#NORTH#';
    }
    else { // point is on bottom left half from relativeTo
        direction = dx >= - dy ? '#SOUTH#' : '#WEST#';
    }

    var distance = Distance(firstCenterX, firstCenterY, secondCenterX, secondCenterY);

    if(distance < (point.Width + relativeTo.Width) || (distance < point.Height + relativeTo.Height))
    {
        return direction;
    }
    return "#NO INTERSECTS#";
}

// Return bounding rect
// Remark: two object must has properties x, y, Width, Height
function boundingRect(object)
{
    var tempObject = new Object();
    tempObject.Height = 0.5 * object.Height;
    tempObject.Width = 0.3 * object.Width;
    tempObject.x = object.x;
    tempObject.y = object.y;

    return tempObject;
}

// Clear canvas function.
function clear() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Function for game restarting.
function restart()
{
    InGameMenu = null;
    pause = false;
    Initialization();
}

// Function which create and animate message to user.
// x, y - start coordinates.
// text - message text.
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