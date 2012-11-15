//###########################################
// Contains function related to game controls
//###########################################

// Added event listeners to users actions.
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

// Animate left and right controls to user.
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
