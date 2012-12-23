//###########################################
// Contains function related to game controls
//###########################################

// variables for detecting jump gesture
var maxTimeInterval = 500;
var minDistance = 50;
var lastClickTime = 0;
var lastClickY = 0;

// Added event listeners to users actions.
function ApplyControls()
{
    canvas.onmousedown = function(e){
        lastClickTime = Date.now();
        lastClickY = e.offsetY;
        clickedEvent = true;
        var x = e.offsetX;
        if(x > width/2) direction = 'right';
        else direction = 'left';
        hero.IsRunning = true;
    };

    canvas.onmousemove = function(e){
        newPos = GetRelativePosition(canvas, e.pageX, e.pageY);
        var x = e.offsetX;
        if(x > width/2) direction = 'right';
        else direction = 'left';
    };

    canvas.onmouseup = function(e){
        clickedEvent = false;
        if (Date.now() - lastClickTime < maxTimeInterval) {
            if (Math.abs(lastClickY - e.offsetY) > minDistance) {
                hero.Jump();
            }
        }

        hero.IsRunning = false;
    };

    canvas.ondblclick = function (e){
        hero.Jump();
    };

    canvas.addEventListener('touchmove', function(event) {
        event.preventDefault();
        newPos = GetRelativePosition(canvas, event.pageX, event.pageY);
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
        clickedEvent = true;
        lastClickTime = Date.now();
        lastClickY = event.offsetY;

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
        clickedEvent = false;
        if (Date.now() - lastClickTime < maxTimeInterval) {
            if (Math.abs(lastClickY - event.offsetY) > minDistance) {
                hero.Jump();
            }
        }

        hero.IsRunning = false;
    }, false);
}

// Animate left and right controls to user.
function AnimateControls()
{
    var leftControl = jQuery('#leftControl');
    var rightControl = jQuery('#rightControl');

    leftControl.animate({
        opacity: 1,
        left: 10
    },2000, function(){
        leftControl.animate({
            opacity: 0
        },2000, function(){
            leftControl.remove();
        })});

    rightControl.animate({
        opacity: 1,
        right: 10
    },2000, function(){
        rightControl.animate({
            opacity: 0
        },2000, function(){
            rightControl.remove();
        })});

}
