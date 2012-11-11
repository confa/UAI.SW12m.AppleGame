// common functions

// return color string from 3 channels
function Color(r, g, b)
{
    return ('rgba(' + r + ',' + g + ',' + b +', 1.0)').toString();
}

// returns random value from 0 to max
function Random(max)
{
    return Math.floor((Math.random()*max)+1);
}

function Distance(firstX, firstY, secondX, secondY)
{
    return Math.sqrt(Math.pow(secondX-firstX,2) + Math.pow(secondY-firstY,2));
}

function changeOpacity( imageobject, opacity ) {

    var object = imageobject.style;
    object.opacity = opacity;
    object.MozOpacity = opacity;
    object.KhtmlOpacity = opacity;
    object.filter = "alpha(opacity=" + opacity + ")";
}

// intersect function
// two object must has properties x, y, Width, Height
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
// ---------------------