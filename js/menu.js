// Simple menu class
var menuCounter = 0;
var menuCounterIncrease = 10;

Menu = function(title, items, footer, y, size, width, callback, backgroundCallback)
{
    this.title = title;
    this.items = items;
    this.footer = footer;
    this.selectedItem = 0;
    this.callback = callback;
    this.y = y;
    this.size = size;
    this.width = width;
    this.backgroundCallback = backgroundCallback;
}

Menu.prototype.constructor = Menu;

Menu.prototype.Render = function(elapsed)
{
    var lingrad = ctx.createLinearGradient(0,0,0,canvas.height);
    lingrad.addColorStop(0, '#063A01');
    lingrad.addColorStop(1, '#359209');
    ctx.fillStyle = lingrad;
    ctx.fillRect(0,0,canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.fillStyle = "White";

    var y = this.y;
    if (this.title)
    {
        ctx.font = Math.floor(this.size*1.3).toString() + "px Times New Roman";
        var text = this.title;
        var blur = 10;
        ctx.textBaseline = "top";
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 13;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = blur;
        ctx.fillText(text, canvas.width/2, y);
        y += this.size;
    }

    for (var i = 0; i < this.items.length; i++)
    {
        var size = Math.floor(this.size*0.8);
        if (i == this.selectedItem)
        {
//            var v = Math.floor(127*Math.sin(Random(gameTime)*0.04) + 127);
            if (menuCounter > 255) {
                menuCounterIncrease = -10;
            } else if (menuCounter < 0) {
                menuCounterIncrease = 10;
            }

            menuCounter += menuCounterIncrease;

            var v = menuCounter;
            ctx.fillStyle = "rgba(255,"+v.toString()+",255,255)";
            size = this.size;
        }
        ctx.font = size.toString() + "px Times New Roman";
        y += this.size;
        ctx.fillText(this.items[i], canvas.width/2, y);
        ctx.fillStyle = "White";
    }
    if (this.footer)
    {
        ctx.textAlign = "right";
        ctx.font = "14px Times New Roman";
        ctx.fillText(this.footer, canvas.width-1, canvas.height-3);
    }
    ctx.shadowColor = null;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = null;
    this.Input();
}

function GetRelativePosition(target, x,y) {
    //this section is from http://www.quirksmode.org/js/events_properties.html
    // jQuery normalizes the pageX and pageY
    // pageX,Y are the mouse positions relative to the document
    // offset() returns the position of the element relative to the document
    var offset = $(target).offset();
    var x = x - offset.left;
    var y = y - offset.top;

    return {"x": x, "y": y};
}

Menu.prototype.Input = function()
{
//    console.log(this.lastMouseX);

    if(!newPos)
    {
        this.deltaX = 0 - this.lastMouseX;
        this.deltaY = 0 - this.lastMouseY;

        this.lastMouseX = 0;
        this.lastMouseY = 0;
    }

    else
    {
        this.deltaX = newPos.x - this.lastMouseX;
        this.deltaY = newPos.y - this.lastMouseY;

        this.lastMouseX = newPos.x;
        this.lastMouseY = newPos.y;
    }


    if (clickedEvent)
    {
        this.callback(this.selectedItem);
        clickedEvent = false;
        return;
    }

    var leftx = (canvas.width - this.width)/2;
    if (this.lastMouseX >= leftx && this.lastMouseX < leftx+this.width)
    {
        if(menuChangeAudio == undefined)
        {
            menuChangeAudio = document.getElementById('menuChange');
        }

        if(prevSelected != this.selectedItem && menuChangeAudio != undefined)
        {
            menuChangeAudio.play();
            prevSelected = this.selectedItem;
        }
        var y = this.y + this.size*0.2; // Adjust for baseline
        if (this.title)
            y += this.size*2;
        if (this.lastMouseY >= y && this.lastMouseY < (y + this.size*this.items.length))
        {
            this.selectedItem = Math.floor((this.lastMouseY - y)/this.size);
        }

    }
}

