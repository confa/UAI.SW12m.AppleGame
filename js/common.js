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

// ---------------------