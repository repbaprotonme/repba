//todo: https://obfuscator.io

/* ++ += ==
Copyright 2017 Tom Brinkman
http://www.reportbase.com
*/

const FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const VIRTCONST = 0.8;
const MAXVIRTUAL = 5760*(SAFARI?3:10);
const SWIPETIME = 200;
const MENUBARWIDTH = 12;
const MENUPANWIDTH = 25;
const THUMBORDER = 5;
const THUMBSELECT = 10;
const JULIETIME = 100;
const ALIEXTENT = 60;
const BEXTENT = 80;
const TIMEOBJ = 3927;
const DELAYCENTER = TIMEOBJ;
const MENUSELECT = "rgba(255,175,0,0.7)";
const MENUTAP = "rgba(255,125,0,0.7)";
const MENUTAG = "rgba(200,0,0,0.9)";
const SELECTAP = "rgba(255,0,0.75,0.7)";
const SCROLLNAB = "rgba(0,0,0,0.3)";
const BARFILL = "rgba(0,0,0,0.5)";
const MENUCOLOR = "rgba(0,0,0,0.5)";
const OPTIONFILL = "white";
const THUMBFILP = "rgba(0,0,0,0.4)";
const THUMBFILL = "rgba(0,0,0,0.4)";
const THUMBSTROKE = "rgba(255,255,255,0.4)";
const SEARCHFRAME = "rgba(255,255,255,0.5)";
const TRANSPARENT = "rgba(0,0,0,0)";
const ARROWFILL = "white";
const SCROLLMARG = 30;
const SCROLLBARWIDTH = 8;
const MARGINBAR = 5;
const SMALLFONT = "15px archivo black";
const DEFAULTFONT = "17px archivo black";
const LARGEFONT = "20px archivo black";
const HUGEFONT = "24px archivo black";
globalobj = {};
let photo = {};
photo.image = 0;

let url = new URL(window.location.href);

function getRandomColor()
{
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++)
    color += letters[Math.floor(Math.random() * 16)];
  return color;
}

function initializeArrayWithRange(start, end)
{
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
}

function generateUID()
{
  let timestamp = Date.now().toString(36);
  let randomPart = Math.random().toString(36).substr(2, 5);
  return timestamp + randomPart;
}

Math.randomvalue = function (min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Math.clamp2 = function (min, max)
{
    return function(value)
    {
        return Math.max(min, Math.min(max, value));
    };
}

Math.clamp = function (min, max, val)
{
    if (typeof val === "undefined" || Number.isNaN(val) || val == null)
        val = max;
    if (max < min)
        return min;
    return (val < min) ? min : (val > max) ? max : val;
};

function istouch()
{
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

function getrotatedlist (lst, size, start, width)
{
    width = Math.min(size, width);
    start += size - width;
    return lst.slice(start,start+width*2);
}

let circular_array = function (title, data)
{
    this.title = title;
    this.ANCHOR = 0;
    this.CURRENT = 0;
    this.data = data;

    this.length = function ()
    {
        return Array.isArray(this.data) ? this.data.length : Number(this.data);
    };

    this.value = function ()
    {
        if (this.CURRENT < this.length() && Array.isArray(this.data))
            return this.data[this.CURRENT];
        return this.CURRENT;
    };

    this.anchor = function () { return this.ANCHOR; };
    this.current = function () { return this.CURRENT; };

    this.split = function(k,j,size)
    {
        k = Math.floor(k);
        let s = j.split("-");
        let begin = Number(s[0]);
        let end = Number(s[1]);
        let mn = begin;
        let mx = end;
        let ad = (mx-mn)/size;
        if (mx == mn)
            size = 1;
        let lst = [];
        for (let n = 0; n < size; ++n, mn+=ad)
            lst.push(mn.toFixed(4));
        this.data = lst;
        this.set(k);
        this.begin = begin;
        this.end = end;
    }

    this.berp = function ()
    {
        if (this.length() <= 1)
            return 0;
        return Math.berp(0,this.length()-1,this.current());
    };

    this.lerp = function ()
    {
        if (this.length() <= 1)
            return 0;
        return Math.lerp(0,this.length()-1,1-this.berp());
    };

    this.rotate = function (index)
    {
        this.CURRENT+=index;
        if (this.CURRENT >= this.length())
            this.set(this.CURRENT-this.length());
        else if (this.CURRENT < 0)
            this.set(this.length()-this.CURRENT);
    };

    this.setanchor = function (index)
    {
        if (typeof index === "undefined" || Number.isNaN(index) || index == null)
            index = 0;
        this.ANCHOR = Math.clamp(0, this.length() - 1, index);
    };

    this.setdata = function (data)
    {
        this.data = data;
        if (this.current() >= this.length())
            this.setcurrent(this.length()-1);
    };

    this.setdata = function (data)
    {
        this.data = data;
        if (this.current() >= this.length())
            this.setcurrent(this.length()-1);
    };

    this.setcurrent = function (index)
    {
        if (typeof index === "undefined" || Number.isNaN(index) || index == null)
            index = 0;
        this.CURRENT = Math.clamp(0, this.length() - 1, index);
    };

    this.set = function (index)
    {
        this.setcurrent(index);
        this.setanchor(index);
    };

    this.add = function (index)
    {
        this.set(Number(this.current())+Math.floor(index));
    };

    this.addperc = function (g)
    {
        this.add(this.length()*g);
    };

    this.rotateperc = function (perc)
    {
        var k = this.current() + ((perc/100)*this.length());
        this.set(k);
    };

    this.setperc = function (p)
    {
        var len = this.length();
        var k = Math.lerp(0,len-1,p);
        this.set(Math.floor(k));
    };

    this.findindex = function (k)
    {
        return this.data.findIndex(function(a){return a == k;})
    }

    this.setindex = function (k)
    {
        var k = this.data.findIndex(function(a){return a == k;})
        this.set(k);
    }
};

var timemain = new circular_array("TIMEMAIN", 30);
timemain.set(6);

var colobj = new circular_array("COLUMNS", [0,10,20,30,40,50,60,70,80,90].reverse());
var channelobj = new circular_array("CHANNELS", [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]);

function drawboss()
{
    menuobj.draw();
    if (!photo.image)
        return;
    if (!photo.image.complete)
        return;
    if (!photo.image.naturalHeight)
        return;
    var canvas = _4cnv;
    var context = _4cnvctx;
    var rect = context.rect();

    if (canvas.lastime == canvas.timeobj.current())
        return;
    else
        canvas.lastime = canvas.timeobj.current();

    if (globalobj.swipetimeout)
    {
        canvas.slidestop -= canvas.slidereduce;
        if (canvas.slidestop > 0)
        {
            var j = _4cnv.autodirect*(TIMEOBJ/1000)
            canvas.timeobj.rotate(j*canvas.slidestop);
        }
        else
        {
            clearInterval(globalobj.swipetimeout);
            globalobj.timeout = 0;
        }
    }

    var stretch = stretchobj.value();
    var virtualpinch = _4cnv.virtualwidth*(stretch.value()/100);
    var colwidth = _4cnv.colwidth;
    var virtualeft = (virtualpinch-rect.width)/2;
    var j = (colwidth/(colwidth+_4cnv.virtualwidth))*TIMEOBJ;
    var time = (canvas.timeobj.value()+j)/1000;

    var slicelst = _4cnv.sliceobj.data;
    var slice = slicelst[0];
    if (!slice)
        return;
    context.save();
    if (galleryobj.value().ispng || slicewidthobj.debug)
        context.clear();
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    for (var m = 0; m < slicelst.length; ++m)
    {
        slicelst[m].stretchwidth = 0;
    }

    offbosscnv.width = rect.width;
    offbosscnv.height = rect.height;
    for (var m = slicelst.length; m < slicelst.length*2; ++m)
    {
        var n = _4cnv.rotated[m];
        var slice = slicelst[n];
        var j = time + slice.time;
        var b = Math.tan(j*VIRTCONST);
        var x = Math.berp(-1, 1, b) * virtualpinch - virtualeft;

        var n2 = _4cnv.rotated[m+1];
        var slice2 = slicelst[n2];
        var j2 = time + slice2.time;
        var b2 = Math.tan(j2*VIRTCONST);
        var x2 = Math.berp(-1, 1, b2) * virtualpinch - virtualeft;

        var g = x2 > x ? x2-x : x-x2;
        var w = slicewidthobj.debug ? colwidth : g;
        w = Math.ceil(x+w)-x;

        if (x < -w || x >= rect.width)
            continue;
        offbossctx.drawImage(slice.canvas,
            slice.x, 0, colwidth, rect.height,
            x, 0, w, rect.height);
        overlayobj.value().draw(offbossctx,
            new rectangle(x,0,w,rect.height), `${n+1}of${slicelst.length}`, 0);
    }

    context.drawImage(offbosscnv,0,0)
    context.restore();

    delete _4cnv.selectrect;
    delete _4cnv.thumbrect;
    delete context.extentrect;
    delete context.slicerect;
    delete context.slicewidthrect;
    delete context.stretchrect;
    delete context.zoomrect;

    if (!menuobj.value())
    {
        var a = new Layer(
            [
                bossobj.value()
            ]);
        a.draw(context, rect, 0, 0);
    }
}

var YollPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
    };

	this.tap = function (context, rect, x, y, shift, ctrl)
    {
        if (context.canvas.tap_)
    		context.canvas.tap_(context, rect, x, y, shift, ctrl);
	};

    this.wheelright = function (context, x, y, ctrl, shift, alt)
    {
		if (context.canvas.wheelright_)
      		context.canvas.wheelright_(context, x, y, ctrl, shift, alt);
   	};

    this.wheeleft = function (context, x, y, ctrl, shift, alt)
    {
		if (context.canvas.wheeleft_)
      		context.canvas.wheeleft_(context, x, y, ctrl, shift, alt);
   	};

    this.wheeldown = function (context, x, y, ctrl, shift, alt)
    {
		if (context.canvas.wheeldown_)
      		context.canvas.wheeldown_(context, x, y, ctrl, shift, alt);
   	};

    this.wheelup = function (context, x, y, ctrl, shift, alt)
    {
		if (context.canvas.wheelup_)
      		context.canvas.wheelup_(context, x, y, ctrl, shift, alt);
   	};

    this.drop = function (context, evt)
    {
		if (context.canvas.drop)
      		context.canvas.drop(context, evt);
   	};

    this.mouseout = function (context, evt)
    {
        var canvas = context.canvas;
		if (canvas.mouse && canvas.mouse.out)
      		canvas.mouse.out(context, evt);
   	};

    this.mouseenter = function (context, evt)
    {
        var canvas = context.canvas;
		if (canvas.mouse && canvas.mouse.enter)
      		canvas.mouse.enter(evt);
   	};

    this.mousemove = function (context, rect, x, y)
    {
        var canvas = context.canvas;
		if (canvas.mouse && canvas.mouse.move)
      		canvas.mouse.move(context, rect, x, y);
   	};

    this.dblclick = function (context, rect, x, y)
    {
		if (context.canvas.dblclick_)
      		context.canvas.dblclick_(context, rect, x, y);
   	};

	this.pan = function (context, rect, x, y, type)
	{
		context.canvas.pan_(context, rect, x, y, type);
	};

	this.panend = function (context, rect, x, y)
    {
      	context.canvas.panend_(context, rect, x, y);
   	};

	this.panleftright = function (context, rect, x, y, type)
    {
       	context.canvas.panleftright_(context, rect, x, y, type);
    };

	this.panupdown = function (context, rect, x, y, type)
    {
   		context.canvas.panupdown_(context, rect, x, y, type);
    };

	this.panstart = function (context, rect, x, y)
    {
       	context.canvas.panstart_(context, rect, x, y);
	};

    this.swipeleftright = function (context, rect, x, y, type)
    {
   		if (context.canvas.swipeleftright_)
        	context.canvas.swipeleftright_(context, rect, x, y, type);
	};

    this.swipeupdown = function (context, rect, x, y, type)
    {
   		if (context.canvas.swipeupdown_)
        	context.canvas.swipeupdown_(context, rect, x, y, type);
	};

    this.pinch = function (context, x, y, scale)
    {
   		if (context.canvas.pinch_)
        	context.canvas.pinch_(context, x, y, scale);
	};

    this.pinchend = function(context)
	{
   		if (context.canvas.pinchend_)
        	context.canvas.pinchend_(context);
	}

    this.pinchstart = function(context, rect, x, y)
	{
   		if (context.canvas.pinchstart_)
        	context.canvas.pinchstart_(context, rect, x, y);
	}

	this.pressup = function(context, rect, x, y, shift, ctrl)
	{
		if (context.canvas.pressup_)
        	context.canvas.pressup_(context, rect, x, y, shift, ctrl);
	}

	this.press = function(context, rect, x, y, shift, ctrl)
	{
		if (context.canvas.press_)
        	context.canvas.press_(context, rect, x, y, shift, ctrl);
	}
};


const opts =
{
    synchronized: true,
    alpha: true,
    antialias: false,
    depth: false,
};

const opts4 =
{
    synchronized: true,
    antialias: false,
    depth: false,
};

let _1cnv = document.getElementById("_1");
let _1cnvctx = _1cnv.getContext("2d", opts);
let _2cnv = document.getElementById("_2");
let _2cnvctx = _2cnv.getContext("2d", opts);
let _3cnv = document.getElementById("_3");
let _3cnvctx = _3cnv.getContext("2d", opts);
let _4cnv = document.getElementById("_4");
let _4cnvctx = _4cnv.getContext("2d", opts4);
let _5cnv = document.getElementById("_5");
let _5cnvctx = _5cnv.getContext("2d", opts);

let _6cnv = document.getElementById("_6");
let _6cnvctx = _6cnv.getContext("2d");

let _7cnv = document.getElementById("_7");
let _7cnvctx = _7cnv.getContext("2d", opts);
let _8cnv = document.getElementById("_8");
let _8cnvctx = _8cnv.getContext("2d", opts);
let _9cnv = document.getElementById("_9");
let _9cnvctx = _9cnv.getContext("2d", opts);
let headcnv = document.getElementById("head");
let headcnvctx = headcnv.getContext("2d", opts);

headcnvctx.canvas.scrollobj = new circular_array("TEXTSCROLL", window.innerWidth/4);
headcnvctx.font = DEFAULTFONT;
headcnvctx.fillText("  ", 0, 0);

var offmenucnv = new OffscreenCanvas(1, 1);
var offmenuctx = offmenucnv.getContext("2d");
offmenuctx.font = DEFAULTFONT;
offmenuctx.fillText("  ", 0, 0);

var offbosscnv = new OffscreenCanvas(1, 1);
var offbossctx = offbosscnv.getContext("2d");
offbossctx.font = DEFAULTFONT;
offbossctx.fillText("  ", 0, 0);

let canvaslst = [];
for (var n = 0; n < 6; ++n)
    canvaslst[n] = document.createElement("canvas");

let ganvaslst = [];
for (var n = 0; n < ALIEXTENT; ++n)
    ganvaslst[n] = document.createElement("canvas");

let imagelst = [];
for (var n = 0; n < ALIEXTENT; ++n)
    imagelst[n] = new Image();


var Empty = function()
{
    this.draw = function (context, rect, user, time)
    {
    }
};

var MenuBar = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var j = window.innerWidth - rect.width >= 180;
        var a = new Row([80,0,80],
        [
            new Layer(
            [
                new Col([0,60,20],
                [
                    0,
                    0,
                    0,
                ]),

                new ColA([MARGINBAR,60,0,50,50,50,0,60,MARGINBAR],
                [
                    0,
                    j?0:new OptionPanel(),
                    0,
                    new ShiftPanel(new OpenPanel(),-10,0),
                    new SearchPanel(),
                    new ShiftPanel(new UploadPanel(),10,0),
                    0,
                   j?0:new HelpPanel(),
                    0,
                ]),

                new ColA([ 0,50,50,50,0 ],
                [
                    0,
                    0,
                ]),
           ]),
           0,
           0,
        ]);

        a.draw(context, rect, 0, 0);
        context.restore();
    }
};

var SearchBar = function (header)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var a = new Row([80,0],
        [
            new Col([MARGINBAR,0,50,0,MARGINBAR],
            [
                0,
                0,
                new SearchPanel(),
                0,
                0,
            ]),
           0,
        ]);

        a.draw(context, rect, header, 0);
        context.restore();
    }
};

var GalleryBar = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.canvas.buttonrect = new rectangle();
        context.canvas.hscrollrect = new rectangle();
        context.canvas.vscrollrect = new rectangle();
        context.canvas.pageshowrect = new rectangle();
        var w = Math.min(320,rect.width-100);
        var j = window.innerWidth - rect.width >= 180;
        context.save();
        var a = new LayerA(
        [
            new Col([0,SCROLLBARWIDTH,5],
            [
                0,
                new Row([20,0,20],
                [
                    0,
                    new Layer(
                    [
                        new Expand(new Rectangle(context.canvas.vscrollrect),10,0),
                        new CurrentVPanel(
                            new ShadowPanel(new FillPanel("white")), 90, 1),
                    ]),
                    0,
                ]),
                0,
            ]),
            new RowA([80,0,40,60,SCROLLBARWIDTH,5],
            [
                context.canvas.nohide?
                    new Col([MARGINBAR,60,0,50,50,50,0,60,MARGINBAR],
                [
                    0,
                    0,
                    0,
                    new ShiftPanel(new FullPanel(),-10,0),
                    new ScrollPanel(),
                    new ShiftPanel(new HomePanel(),10,0),
                    0,
                    0,
                    0,
                ]):0,
                 0,
                 context.canvas.nohide?new Col([0,w,0],
                 [
                     0,
                      new Layer(
                     [
                        new Rectangle(context.canvas.buttonrect),
                        new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0.5)", 16, 16),
                        new Shrink(new CurrentHPanel(new Shrink(new CirclePanel("white"),9,9), 30, 1),6,0)
                     ]),
                     0,
                 ]):0,
                new Layer(
                [
                    new Rectangle(context.canvas.pageshowrect),
                    new ShadowPanel(new Text("rgb(255,255,255)", "center", "middle",0, 0)),
                ]),
                new Col([20,0,20],
                [
                    0,
                    new Layer(
                    [
                        new Expand(new Rectangle(context.canvas.hscrollrect),0,10),
                        new CurrentHPanel(
                            new ShadowPanel(new FillPanel("white")), 90, 1),
                    ]),
                    0,
                ]),
                0
            ]),
        ]);

        var buttonobj = context.canvas.buttonobj;
        var j = Math.lerp(1,context.canvas.sliceobj.length(),
            1-context.canvas.timeobj.berp());
        j += galleryobj.startimage;
        a.draw(context, rect,
        [
            context.canvas.timeobj,
            [
                0,
                0,
                buttonobj,
                `${j.toFixed(0)} of ${galleryobj.lastimage}`,
                context.canvas.scrollobj.value(),
                0,
            ],
        ], 0, 0);
        context.restore();
    }
};

var DualPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
    }
};

var ScrollMenuBar = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();

        var a = new Col([12,3,0,3,12],
        [
            0,
            0,
            0,
            0,
            new CurrentVPanel(new FillPanel("white"), 90, 1),
        ]);

        a.draw(context, rect, context.canvas.timeobj, 0);
        context.restore();
    }
};

function calculateAspectRatioFit(imgwidth, imgheight, rectwidth, rectheight)
{
	let ratio = Math.min(rectwidth/imgwidth, rectheight/imgheight);
	let imgaspectratio = imgwidth/imgheight;
	let rectaspectratio = rectwidth/rectheight;
	let xstart = 0;
	let ystart = 0;
	let width = imgwidth * ratio;
	let height = imgheight * ratio;
	if (imgaspectratio < rectaspectratio)
	{
		xstart = (rectwidth - width) / 2;
		ytart = 0;
	}
	else if (imgaspectratio > rectaspectratio)
	{
		xstart = 0;
		ystart = (rectheight - height) / 2;
	}

	return new rectangle(xstart, ystart, width, height);
}

Math.berp = function (v0, v1, t) { return (t - v0) / (v1 - v0); };
Math.lerp = function (v0, v1, t) { return (1 - t) * v0 + t * v1; };

String.prototype.proper = function()
{
    if (!this.length)
        return this;
    return this.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

String.prototype.clean = function()
{
	let _trimLeft  = /^\s+/,
        _trimRight = /\s+$/,
	    _multiple  = /\s+/g;
	return this.replace(_trimLeft, '').replace(_trimRight, '').replace(_multiple, ' ');
};

Array.prototype.sum = function()
{
    return this.reduce(function(a,b){return a+b;});
};

Array.prototype.move = function (from, to)
{
    this.splice(to, 0, this.splice(from, 1)[0]);
};

String.prototype.wild = function (e)
{
    let re = new RegExp("^" + e.split("*").join(".*") + "$");
    return re.test(this);
};

var PatternPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        const cnv = document.createElement('canvas');
        const ctx = cnv.getContext('2d');
        cnv.width = 50;
        cnv.height = 50;
        ctx.fillStyle = '#fec';
        ctx.fillRect(0, 0, cnv.width, cnv.height);
        ctx.arc(0, 0, 50, 0, .5 * Math.PI);
        ctx.stroke();
        const pattern = context.createPattern(cnv, 'repeat');
        context.fillStyle = pattern;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    };
};

var DrawHeader = function (e)
{
    this.draw = function (context, rect, user, time)
    {
        var lst = wraptext(context, user, rect.width);
        var len = Math.min(lst.length,Math.floor(rect.height/20));
        var k = len < lst.length;
        rect.y -= 12;
        var lines = wraptext(context, user, rect.width);
        if (e)
        {
            var j = Math.floor(Math.lerp(0,lines.length-1,e));
            lines = lines.slice(j);
        }

        for (var m = 0; m < lines.length; m++)
        {
            var str = lines[m].clean();
            if (!str.length)
                continue;
            var a = new Text("white", "center", "middle", 0, 0);
            a.draw(context, rect, str, 0);
            rect.y += 20;
        }
    };
};

var MultiText = function (e)
{
    this.draw = function (context, rect, user, time)
    {
        context.font = SMALLFONT;
        var lst = [];
        for (var n = 0; n < user.length; n++)
        {
            var str = user[n].clean();
            if (!str.length)
                continue;
            lst = lst.concat(wraptext(context, str, rect.width));
        }

        var rowheight = 20;
        var len = Math.min(lst.length,Math.floor(rect.height/rowheight));
        var k = len < lst.length;
        rect.y -= (len*(rowheight))/2;
        rect.y += 10;

        if (e)
        {
            var j = Math.round(Math.lerp(0,lst.length-1,e));
            lst = lst.slice(j);
        }

        for (var n = 0; n < Math.min(len,lst.length); n++)
        {
            var lines = wraptext(context, lst[n], rect.width);
            for (var m = 0; m < lines.length; m++)
            {
                var str = lines[m].clean();
                if (!str.length)
                    continue;
                var a = new Text("white", "center", "middle", 0, 0, SMALLFONT);
                a.draw(context, rect, str, 0);
                rect.y += rowheight;
            }
        }
    };
};

var FillPanel = function (color)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.fillStyle = color?color:user;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    };
};

var FullPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.fullrect = new rectangle()

        var a = new Layer(
        [
            new Rectangle(context.fullrect),
            screenfull.isFullscreen ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),19,20) : 0,
            new Shrink(new CirclePanel(screenfull.isFullscreen ? TRANSPARENT : SCROLLNAB, SEARCHFRAME,4),15,15),
        ]);

        a.draw(context, rect, user, time);
		context.strokeStyle = "white";
		context.shadowColor = "black";

        var e = 5.5;
        var x = rect.width/2-8;
        var y = rect.height/2-8;
        var r = new rectangle(rect.x+x,rect.y+y,rect.width,rect.height);
        context.lineWidth = 3;
        var x = r.x;
        var y = r.y;
        var path = new Path2D();
        y += e
        path.moveTo(x,y);
        y -= e;
        path.lineTo(x,y);
        x += e;
        path.lineTo(x,y);
        context.stroke(path);

        var x = r.x+e*3;
        var y = r.y;
        var path = new Path2D();
        y += e;
        path.moveTo(x,y);
        y -= e;
        path.lineTo(x,y);
        x -= e+1;
        path.lineTo(x,y);
        context.stroke(path);

        var x = r.x+e*3;
        var y = r.y;
        var path = new Path2D();
        y += e*2;
        path.moveTo(x,y);
        y += e;
        path.lineTo(x,y);
        x -= e+1;
        path.lineTo(x,y);
        context.stroke(path);

        var x = r.x;
        var y = r.y;
        var path = new Path2D();
        y += e*2;
        path.moveTo(x,y);
        y += e;
        path.lineTo(x,y);
        x += e;
        path.lineTo(x,y);
        context.stroke(path);
        context.restore();
    }
};

var OpenPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.canvas.openrect = new rectangle();

        var Panel = function ()
        {
            this.draw = function (context, rect, user, time)
            {
                context.save();
                var w = rect.width;
                var h = rect.height;
                var a = new ArrowPanel(ARROWFILL,180);
                a.draw(context, rect, user, time);
                var a = new FillPanel(ARROWFILL);
                var r = new rectangle(rect.x+rect.width/2-3,rect.y-rect.height/2+1,6,10);
                a.draw(context, r, user, time);
                var r = new rectangle(rect.x,rect.y+rect.height+3,rect.width,3);
                a.draw(context, r, user, time);
                context.restore();
            }
        };

        var a = new Layer(
        [
            new Rectangle(context.canvas.openrect),
            new Shrink(new CirclePanel(SCROLLNAB, SEARCHFRAME,4),15,15),
            new Shrink(new Panel(),16,34),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var UploadPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.canvas.uploadrect = new rectangle();

        var Panel = function ()
        {
            this.draw = function (context, rect, user, time)
            {
                context.save();
                var w = rect.width;
                var h = rect.height;
                var a = new ArrowPanel(ARROWFILL,0);
                a.draw(context, rect, user, time);
                var a = new FillPanel(ARROWFILL);
                var r = new rectangle(rect.x+rect.width/2-3,rect.y+7,6,10);
                a.draw(context, r, user, time);
                var r = new rectangle(rect.x,rect.y-6,rect.width,3);
                a.draw(context, r, user, time);
                context.restore();
            }
        };

        var a = new Layer(
        [
            new Rectangle(context.canvas.uploadrect),
            new Shrink(new CirclePanel(SCROLLNAB, SEARCHFRAME,4),15,15),
            new Shrink(new Panel(),16,34),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var ScrollPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.canvas.scrollrect = new rectangle();

        var a = new Layer(
        [
            new Rectangle(context.canvas.scrollrect),
            _8cnv.scrollobj.current() ? 0 : new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),17,17),
            new Shrink(new CirclePanel(_8cnv.scrollobj.current() ? SCROLLNAB:TRANSPARENT, SEARCHFRAME,4),13,13),
            new Shrink(new Row([0,4,0],
            [
                new CirclePanel("white"),
                0,
                new CirclePanel("white"),
            ]),22,30),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var ThumbPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.thumbpanel = new rectangle()
        var a = new Layer(
        [
            new Rectangle(context.thumbpanel),
            galleryobj.hidebars ? 0 : new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),19,19),
            new Shrink(new CirclePanel(galleryobj.hidebars?SCROLLNAB:TRANSPARENT,SEARCHFRAME,4),15,15),
            new Shrink(new Rounded(TRANSPARENT, 3, "white", 4, 4),16,30),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var HomePanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        //context.canvas.timeobj.set((1-galleryobj.berp())*TIMEOBJ);//set to current item
        context.save();
        context.canvas.homerect = new rectangle();
        var a = new Layer(
        [
            new Rectangle(context.canvas.homerect),
            globalobj.hometap ? new Shrink(new CirclePanel( MENUTAP,TRANSPARENT,4),19,19) : 0,
            new Shrink(new CirclePanel(globalobj.hometap?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),15,15),
            new Shrink(new Row([0,0],
            [
                new ArrowPanel(ARROWFILL,0),
                new ArrowPanel(ARROWFILL,180),
            ]),18,26),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var PrevPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.moveprev = new rectangle()
		context.fillStyle = "white";
		context.strokeStyle = "white";

        var a = new Layer(
        [
            new Rectangle(context.moveprev),
            _4cnv.movingpage == -1 ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new Shrink(new CirclePanel(_4cnv.movingpage == -1?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
            new Shrink(new ArrowPanel(ARROWFILL,270),20,30),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var NextPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.movenext = new rectangle()
		context.fillStyle = "white";
		context.strokeStyle = "white";

        var a = new Layer(
        [
            new Rectangle(context.movenext),
            _4cnv.movingpage == 1 ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new Shrink(new CirclePanel(_4cnv.movingpage == 1?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
            new Shrink(new ArrowPanel(ARROWFILL,90),20,30),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var SearchPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
		context.strokeStyle = "white";
		context.shadowColor = "black";
        context.canvas.searchrect = new rectangle();
        var Panel = function ()
        {
            this.draw = function (context, rect, user, time)
            {
                rect.x -= 2;
                rect.y += 7;
                rect.width = 19 ;
                rect.height = 19;
                var a = new CirclePanel(TRANSPARENT,"white",4,1);
                a.draw(context, rect, user, time);
                context.lineWidth = 8;
                context.beginPath();
                context.moveTo(rect.x+14, rect.y+16);
                context.lineTo(rect.x+22, rect.y+27);
                context.stroke();
            }
        };

        var s = menuobj.value() == _3cnvctx;
        var a = new Layer(
        [
            new Rectangle(context.canvas.searchrect),
            s ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),17,17) : 0,
            new Shrink(new CirclePanel(s?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),13,13),
            new Shrink(new Panel(),15,20),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var StrokePanel = function (color, width)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.lineWidth = width;
        context.strokeStyle = color;
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    }
}

var ArrowPanel = function (color, degrees)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
	    var w = rect.width
        var h = rect.height
        var x = rect.x
        var y = rect.y
        var k = degrees == 270 ? 0 : 0;
        context.translate(x+w/2-k, y+h/2);
        context.rotate(degrees*Math.PI/180.0);
        context.translate(-x-w/2, -y-h/2);
	    var path = new Path2D();
		path.moveTo(rect.x+rect.width/2,rect.y);
		path.lineTo(rect.x+rect.width,rect.y+rect.height-3);
		path.lineTo(rect.x,rect.y+rect.height-3);
		path.lineTo(rect.x+rect.width/2,rect.y);
		context.lineWidth = 2;
		context.fillStyle = color;
		context.strokeStyle = color;
    	context.fill(path);
        context.restore();
    };
};

function rectangle(x, y, w, h, user)
{
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.user = user;
    this.right = x+w;
    this.left = x;
    this.top = y;
    this.bottom = y+h;
}

rectangle.prototype.hitest = function (x, y)
{
    return x >= this.x && y >= this.y &&
		x < (this.x + this.width) && y < (this.y + this.height);
};

rectangle.prototype.get = function (x, y, w, h)
{
    return new rectangle(this.x + x, this.y + y, w, h);
};

rectangle.prototype.getindex = function(cols, rows, x, y)
{
    var b = (x-this.x)/this.width;
    var col = Math.floor(b*cols);
    var b = (y-this.y)/this.height;
    var row = Math.floor(b*rows);
    return cols*row+col;
}

rectangle.prototype.shrink = function (x, y)
{
	this.x += x;
	this.y += y;
	this.width -= x*2;
	this.height -= y*2;
    return this;
};

rectangle.prototype.expand = function (x, y)
{
	this.x -= x;
	this.y -= y;
	this.width += x*2;
	this.height += y*2;
    return this;
};

CanvasRenderingContext2D.prototype.movepage = function(j)
{
    var context = this;
    if (galleryobj.length() <= 1)
        return;

    var e = galleryobj.current();
    galleryobj.rotate(j);
    var k = galleryobj.value();
    galleryobj.set(e);
    if (_4cnv.movingpage || !k.loaded || galleryobj.length() == 1)
    {
        masterload();
        _4cnv.movingpage = 0;
        this.refresh();
        return;
    }

    clearInterval(globalobj.swipetimeout);
    globalobj.swipetimeout = 0;
    _4cnv.movingpage = j;
    galleryobj.rotate(j);
    _4cnvctx.refresh();
    _8cnvctx.refresh();
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    delete _4cnv.thumbcanvas;
    delete photo.image;
    contextobj.reset();
}

CanvasRenderingContext2D.prototype.hide = function ()
{
    if (this.canvas.height == 0)
        return;
    this.canvas.height = 0;
};

CanvasRenderingContext2D.prototype.refresh = function ()
{
    this.canvas.lastime = -0.0000000000101010101;
    drawboss()
};

CanvasRenderingContext2D.prototype.show = function (x, y, width, height)
{
	if (this.canvas.style.left != x+"px")
	    this.canvas.style.left = x+"px";
	if (this.canvas.style.top != y+"px");
		this.canvas.style.top = y+"px";
	if (this.canvas.width != width)
	    this.canvas.width = width;
	if (this.canvas.height != height)
	    this.canvas.height = height;
};

CanvasRenderingContext2D.prototype.rect = function ()
{
    return new rectangle(0, 0, this.canvas.width, this.canvas.height);
};

CanvasRenderingContext2D.prototype.clear =
    CanvasRenderingContext2D.prototype.clear || function (rect)
    {
        if (!rect)
            rect = new rectangle(0, 0, this.canvas.width, this.canvas.height);
        this.clearRect(rect.x, rect.y, rect.width, rect.height);
    };

var makehammer = function (context, v, t)
{
    var canvas = context.canvas;
    var ham = new Hammer(canvas, { domEvents: true });
    ham.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    ham.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    ham.get('swipe').set({ velocity: 0.6});//0.30
	ham.get('swipe').set({ threshold: 20});//10
	ham.get('press').set({ time: 350 });//251

	ham.on("pinch", function (evt)
	{
		evt.preventDefault();
		var x = evt.center.x;
		var y = evt.center.y;
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
		if (typeof (ham.panel.pinch) == "function")
			ham.panel.pinch(context, x, y, evt.scale);
	});

	ham.on("pinchend", function (evt)
	{
		evt.preventDefault();
		if (typeof (ham.panel.pinchend) == "function")
			ham.panel.pinchend(context);
	});

	ham.on("pinchstart", function (evt)
	{
		evt.preventDefault();
		var x = evt.center.x;
		var y = evt.center.y;
		if (typeof (ham.panel.pinchstart) == "function")
			ham.panel.pinchstart(context,
			    new rectangle(0, 0, ham.element.width, ham.element.height), x, y);
	});

	ham.on("swipeleft swiperight", function (evt)
    {
        if ((new Date() - ham.panstart) > 200)
            return;
   	    evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof (ham.panel.swipeleftright) == "function")
            ham.panel.swipeleftright(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt);
    });

    ham.on("swipeup swipedown", function (evt)
    {
        if ((new Date() - ham.panstart) > 200)
            return;
   	    evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof (ham.panel.swipeupdown) == "function")
            ham.panel.swipeupdown(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt);
    });

    ham.element.addEventListener("touchstart", function (evt)
    {
    }, false);

    ham.element.addEventListener("touchend", function (evt)
    {
    }, false);

    ham.element.addEventListener("dragleave", function (evt)
    {
   	    evt.preventDefault();
    }, false);

    ham.element.addEventListener("dragenter", function (evt)
    {
   	    evt.preventDefault();
    }, false);

    ham.element.addEventListener("dragover", function (evt)
    {
   	    evt.preventDefault();
    }, false);

    ham.element.addEventListener("drop", function (evt)
    {
   	    evt.preventDefault();
        if (typeof (ham.panel.drop) !== "function")
            return;
        ham.panel.drop(context, evt);
    }, false);

    ham.element.addEventListener("mouseout", function (evt)
    {
        if (typeof (ham.panel.mouseout) !== "function")
            return;
        ham.panel.mouseout(context, evt);
    });

    ham.element.addEventListener("mouseenter", function (evt)
    {
        if (typeof (ham.panel.mouseenter) !== "function")
            return;
        ham.panel.mouseenter(context, evt);
    });

    ham.element.addEventListener("mousemove", function (evt)
    {
        var x = evt.offsetX;
        var y = evt.offsetY;
        if (typeof (ham.panel.mousemove) !== "function")
            return;
        ham.panel.mousemove(context, context.rect(), x, y);
    });

    ham.element.addEventListener("dblclick", function (evt)
    {
        var x = evt.offsetX;
        var y = evt.offsetY;
        if (typeof (ham.panel.dblclick) !== "function")
            return;
        ham.panel.dblclick(context, context.rect(), x, y);
    });

    ham.element.addEventListener("wheel", function (evt)
    {
        const { deltaY } = evt;
        var trackpad = deltaY && !Number.isInteger(deltaY);

        var x = evt.offsetX;
        var y = evt.offsetY;
        evt.preventDefault();
        if (evt.deltaY < 0)
        {
            if (typeof (ham.panel.wheelup) == "function")
                ham.panel.wheelup(context, x, y, evt.ctrlKey, evt.shiftKey, evt.altKey);
        }
        else
        {
            if (typeof (ham.panel.wheeldown) == "function")
                ham.panel.wheeldown(context, x, y, evt.ctrlKey, evt.shiftKey, evt.altKey);
        }

        if (evt.deltaX < 0)
        {
            if (typeof (ham.panel.wheeleft) == "function")
                ham.panel.wheeleft(context, x, y, evt.ctrlKey, evt.shiftKey, evt.altKey);
        }
        else
        {
            if (typeof (ham.panel.wheelright) == "function")
                ham.panel.wheelright(context, x, y, evt.ctrlKey, evt.shiftKey, evt.altKey);
        }
    });

	ham.on("press", function (evt)
    {
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof (ham.panel.press) !== "function")
            return;
        var k = evt.srcEvent;
        ham.panel.press(context,
			new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
    });

    ham.on("pressup", function (evt)
    {
        evt.preventDefault();
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (typeof (ham.panel.pressup) !== "function")
            return;
        var k = evt.srcEvent;
        ham.panel.pressup(context,
			new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
    });

    ham.on("panmove", function (evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panmove) == "function")
            ham.panel.panmove(context, rect, x, y);
    });

    ham.on("panend", function (evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panend) == "function")
            ham.panel.panend(context, rect, x, y);
    });

	ham.on("panstart", function (evt)
    {
        evt.preventDefault();
        ham.x = evt.center.x;
        ham.y = evt.center.y;
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panstart) == "function")
            ham.panel.panstart(context, rect, x, y);
	});

    ham.on("panleft panright", function (evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panleftright) == "function")
            ham.panel.panleftright(context, rect, x, y, evt.type);
        else if (evt.type == "panleft" && typeof (ham.panel.panleft) == "function")
            ham.panel.panleft(context, rect, x, y);
        else if (evt.type == "panright" && typeof (ham.panel.panright) == "function")
            ham.panel.panright(context, rect, x, y);
    });

    ham.on("pandown panup", function (evt)
    {
    	evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, ham.element.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, ham.element.height - 1, evt.center.y - evt.target.offsetTop);
     	if (typeof (ham.panel.panupdown) == "function")
            ham.panel.panupdown(context, rect, x, y, evt.type);
        else if (evt.type == "panup" && typeof (ham.panel.panup) == "function")
            ham.panel.panup(context, rect, x, y);
        else if (evt.type == "pandown" && typeof (ham.panel.pandown) == "function")
            ham.panel.pandown(context, rect, x, y);
    });

    ham.on("pan", function (evt)
    {
        evt.preventDefault();
		var x = evt.center.x - evt.target.offsetLeft;
		var y = evt.center.y - evt.target.offsetTop;
		if (x < 0 || x >= ham.element.width)
			return;
		if (y < 0 || y >= ham.element.height)
			return;
		if (typeof (ham.panel.pan) == "function")
			ham.panel.pan(context,
				new rectangle(0, 0, ham.element.width, ham.element.height), x, y, evt.additionalEvent);
    });

	ham.on("tap", function (evt)
    {
        var x = evt.center.x - evt.target.offsetLeft;
        var y = evt.center.y - evt.target.offsetTop;
        if (x < 0 || x >= ham.element.width)
            return;
        if (y < 0 || y >= ham.element.height)
            return;
		if (typeof (ham.panel.tap) != "function")
			return;
        var k = evt.srcEvent;
        ham.panel.tap(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y, k.shiftKey, k.ctrlKey);
 	});

    ham.panel = new function () { this.draw = function () {}; }();
    return ham;
};

var _1ham = makehammer(_1cnvctx,0.5,15);
var _2ham = makehammer(_2cnvctx,0.5,15);
var _3ham = makehammer(_3cnvctx,0.5,15);
var _4ham = makehammer(_4cnvctx,0.5,15);
var _5ham = makehammer(_5cnvctx,0.5,15);
var _6ham = makehammer(_6cnvctx,0.5,15);
var _7ham = makehammer(_7cnvctx,0.5,15);
var _8ham = makehammer(_8cnvctx,0.5,15);
var _9ham = makehammer(_9cnvctx,0.5,15);
var headham = makehammer(headcnvctx,0.5,15);
_4ham.get('pinch').set({ enable: true });
_8ham.get('pinch').set({ enable: true });

var wheelst =
[
{
    name: "DEFAULT",
    up: function (context, x, y, ctrl, shift, alt) { },
 	down: function (context, x, y, ctrl, shift, alt) { },
 	left: function (context, x, y, ctrl, shift, alt) { },
 	right: function (context, x, y, ctrl, shift, alt) { },
},
{
    name: "GALLERY",
    up: function (context, x, y, ctrl, shift, alt)
    {
        if (ctrl)
        {
            var buttonobj = context.canvas.buttonobj;
            buttonobj.addperc(1.5/100);
            context.refresh();
        }
        else
        {
            var k = 50*(window.innerHeight/context.canvas.virtualheight);
            context.canvas.timeobj.rotate(k);
            context.refresh()
        }
    },
 	down: function (context, x, y, ctrl, shift, alt)
    {
        if (ctrl)
        {
            var buttonobj = context.canvas.buttonobj;
            buttonobj.addperc(-1.5/100);
            context.refresh();
        }
        else
        {
            var k = 50*(window.innerHeight/context.canvas.virtualheight);
            context.canvas.timeobj.rotate(-k);
            context.refresh()
        }
    },
 	left: function (context, x, y, ctrl, shift, alt)
    {
    },
 	right: function (context, x, y, ctrl, shift, alt)
    {
    },
},
{
    name: "MENU",
    up: function (context, x, y, ctrl, shift, alt)
    {
        if (ctrl)
        {
        }
        else
        {
            var k = 20*(window.innerHeight/context.canvas.virtualheight);
            context.canvas.timeobj.rotate(k);
            context.refresh()
        }
    },
 	down: function (context, x, y, ctrl, shift, alt)
    {
        if (ctrl)
        {
        }
        else
        {
            var k = 20*(window.innerHeight/context.canvas.virtualheight);
            context.canvas.timeobj.rotate(-k);
            context.refresh()
        }
    },
 	left: function (context, x, y, ctrl, shift, alt)
    {
    },
 	right: function (context, x, y, ctrl, shift, alt)
    {
    },
},
{
    name: "BOSS",
    up: function (context, x, y, ctrl, shift, alt)
    {
        if (ctrl)
        {
            var isthumb = context.canvas.thumbrect &&
                   context.canvas.thumbrect.hitest(x,y);
            if (isthumb)
            {
                pinchobj.set(0);
                var obj = heightobj.value();
                delete context.canvas.thumbcanvas;
                obj.add(1);
                context.refresh();
            }
            else
            {
                zoomobj.value().add(-1);
                contextobj.reset()
            }
        }
        else if (shift)
        {
            stretchobj.value().add(1);
            context.refresh();
        }
        else
        {
            var zoom = zoomobj.value();
            var j = (100-zoom.value())/100;
            var k = rowobj.length()/30;
            rowobj.add(j*k);
            contextobj.reset()
        }
	},
 	down: function (context, x, y, ctrl, shift, alt)
    {
        if (ctrl)
        {
            var isthumb = context.canvas.thumbrect &&
                   context.canvas.thumbrect.hitest(x,y);
            if (isthumb)
            {
                pinchobj.set(0);
                var obj = heightobj.value();
                delete context.canvas.thumbcanvas;
                obj.add(-1);
                context.refresh();
            }
            else
            {
                zoomobj.value().add(1);
                contextobj.reset()
            }
        }
        else if (shift)
        {
            stretchobj.value().add(-1);
            context.refresh();
        }
        else
        {
            var zoom = zoomobj.value();
            var j = (100-zoom.value())/100;
            var k = rowobj.length()/30;
            rowobj.add(-j*k);
            contextobj.reset()
        }
	},
 	left: function (context, x, y, ctrl, shift, alt)
    {
    },
 	right: function (context, x, y, ctrl, shift, alt)
    {
    },
},
];

var dblclicklst =
[
{
    name: "DEFAULT",
    click: function (context, rect, x, y) { },
},
{
    name: "GALLERY",
    click: function (context, rect, x, y)
    {
    },
},
{
    name: "BOSS",
    click: function (context, rect, x, y)
    {
        var isthumb = context.canvas.thumbrect &&
            context.canvas.thumbrect.hitest(x,y);
        if (isthumb)
            return;
        if (context.zoomrect && context.zoomrect.hitest(x,y))
            return;
        if (context.stretchrect && context.stretchrect.hitest(x,y))
            return;
        headobj.set(1);
        headham.panel = headobj.value();
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        menuobj.toggle(_8cnvctx);
    },
}
]

var pinchlst =
[
{
    name: "DEFAULT",
    pinch: function (context, x, y, scale) { },
    pinchend: function (context) { },
    pinchstart: function (context, rect, x, y) { },
},
{
    name: "GALLERY",
    pinch: function (context, x, y, scale)
    {
        var obj = context.canvas.buttonobj;
        var data = obj.data;
        var k = Math.clamp(data[0], data[data.length-1], scale*context.canvas.savepinch);
        var j = Math.berp(data[0], data[data.length-1], k);
        var e = Math.lerp(0,obj.length(),j)/obj.length();
        var f = Math.floor(obj.length()*e);
        if (scale >= 1 && obj.current() < (obj.length()*0.15))
        {
            obj.set(f+1);
            context.canvas.savepinch = obj.value();
        }
        else if (scale <= 1 && obj.current() < (obj.length()*0.15))
        {
            obj.set(f-1);
            context.canvas.savepinch = obj.value();
        }
        else
        {
            obj.set(f);
        }
        context.refresh();
    },
    pinchstart: function (context, rect, x, y)
    {
        var obj = context.canvas.buttonobj;
        context.canvas.slideshow = 0;
        context.canvas.pinching = 1;
        context.canvas.savepinch = obj.value()
        context.canvas.slideshow = 0;
        clearInterval(globalobj.swipetimeout);
        globalobj.swipetimeout = 0;
        clearInterval(globalobj.timeauto);
        globalobj.timeauto = 0;
    },
    pinchend: function (context)
    {
        clearTimeout(globalobj.pinchtime);
        globalobj.pinchtime = setTimeout(function()
        {
            var obj = context.canvas.buttonobj;
            context.canvas.pinching = 0;
            context.refresh();
            menuobj.draw();
        }, 40);
    },
},
{
    name: "BOSS",
    pinch: function (context, x, y, scale)
    {
        var obj = context.obj;
        var data = obj.data;
        var k = Math.clamp(data[0], data[data.length-1], scale*context.canvas.savepinch);
        var j = Math.berp(data[0], data[data.length-1], k);
        var e = Math.lerp(0,obj.length(),j)/obj.length();
        var f = Math.floor(obj.length()*e);
        if (scale >= 1 && obj.current() < (obj.length()*0.15))
        {
            obj.set(f+1);
            context.canvas.savepinch = obj.value();
        }
        else if (scale <= 1 && obj.current() < (obj.length()*0.15))
        {
            obj.set(f-1);
            context.canvas.savepinch = obj.value();
        }
        else
        {
            obj.set(f);
        }

        if (pinchobj.current() == 0)
        {
            delete _4cnv.thumbcanvas;
            context.refresh();
        }
        else if (pinchobj.current() == 1)
        {
            contextobj.reset();
        }
    },
    pinchstart: function (context, rect, x, y)
    {
        clearInterval(globalobj.timeout);
        globalobj.timeout = 0;
        context.canvas.pinching = 1;
        menuobj.hide();
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        context.canvas.isthumb = context.canvas.thumbrect && context.canvas.thumbrect.expand &&
            context.canvas.thumbrect.expand(40,40).hitest(x,y);
        pinchobj.set(context.canvas.isthumb?0:1)
        context.obj = pinchobj.value().value();
        context.canvas.savepinch = context.obj.value()
    },
    pinchend: function (context)
    {
        clearTimeout(globalobj.pinchtime);
        globalobj.pinchtime = setTimeout(function()
        {
            context.canvas.pinching = 0;
            context.canvas.isthumb = 0;
            context.refresh();
        }, 40);
    },
},
];

var rowobj = new circular_array("ROW", window.innerHeight);
rowobj.set(Math.floor((50/100)*window.innerHeight));

var pretchobj = new circular_array("PORTSTRETCH", 100);
var letchobj = new circular_array("LANDSTRETCH", 100);
var stretchobj = new circular_array("STRETCH", [pretchobj,letchobj]);

var searchlst =
[
    "unsplash",
    "unsplash_user",
    "unsplash_collection",
    "pexels",
    "pexels_collection",
    "pixabay",
    "sidney",
];

var searchobj = new circular_array("SEARCH", searchlst);
var extentobj = new circular_array("EXTENT", []);
var infobj = new circular_array("INFO", []);

var slicewidthobj = new circular_array("SLICEWIDTH", 640);
slicewidthobj.debug = 0;

var poomobj = new circular_array("PORTZOOM", 100);
var loomobj = new circular_array("LANDZOOM", 100);
var zoomobj = new circular_array("ZOOM", [poomobj,loomobj]);
var traitobj = new circular_array("TRAIT", 100);
var scapeobj = new circular_array("SCAPE", 100);
var heightobj = new circular_array("HEIGHT", [traitobj,scapeobj]);
var pinchobj = new circular_array("PINCH", [heightobj,zoomobj]);

var userobj = {}
userobj.load = function()
{
    fetch(`https://bucket.reportbase5836.workers.dev/user.json`)
    .then((response) => jsonhandler(response))
    .then(function (json) { userobj = Object.assign(userobj,json); })
    .catch((error) => {});
}

userobj.save = function()
{
    fetch(`https://bucket.reportbase5836.workers.dev/user.json`,
        {
            method: 'POST',
            body: JSON.stringify(userobj)
        })
      .then(response => jsonhandler(response))
      .then(json => console.log(json) )
      .catch(error => console.log(error) );
}

function explore()
{
    var input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    return new Promise(function(resolve)
    {
        document.activeElement.onfocus = function()
        {
            document.activeElement.onfocus = null;
            setTimeout(resolve, 500);
        };

        input.onchange = function()
        {
            var files = Array.from(input.files);
            return resolve(files);
        };

        input.click();
    });
}

async function loadblob(url)
{
    return await fetch(url).then(r => r.blob());
}

async function dropfiles(files)
{
    var lst = [];
    delete galleryobj.repos;
    for (var i = 0; i < files.length; i++)
    {
        var fileName = files[i].name.toLowerCase();
        var ext = fileName.replace(/^.*\./, '');
        if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' ||
            ext == 'webp' || ext == 'avif' || ext == 'gif')
        {
            var k = {}
            k.pos = i;
            k.file = files[i];
            k.ispng = (ext == 'png');
            lst.push(k);
        }
        else if (ext == 'json')
        {
            var k = URL.createObjectURL(files[i])
            let blob = await loadblob(k);
            var txt = await blob.text();
            var json = JSON.parse(txt);
            lst = lst.concat(json.data);
        }
    }
    userobj.data = userobj.data.concat(lst);
    userobj.save();
    galleryobj.data.splice(0,0,...lst);

    var a = Array(galleryobj.length()).fill().map((_, index) => index);
    _8cnv.rotated = [...a,...a,...a];

    _8cnv.timeobj.set(0);
    _8cnvctx.refresh();
    menuobj.hide();
    menuobj.setindex(_8cnvctx);
    menuobj.show()
}

var droplst =
[
{
    name: "DEFAULT",
    drop: function (context, evt)
    {
        dropfiles(evt.dataTransfer.files);
    },
},
{
    name: "GALLERY",
    drop: function (context, evt)
    {
        dropfiles(evt.dataTransfer.files);
    },
},
];

var panlst =
[
{
    name: "DEFAULT",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) { },
	pan: function (context, rect, x, y, type) { },
	panstart: function (context, rect, x, y) { },
	panend: function (context, rect, x, y) { }
},
{
    name: "GALLERY",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) {},

	pan: function (context, rect, x, y, type)
    {
        var obj = context.canvas.scrollobj.value();
        if (globalobj.dblclicktime)
            return;
        if (type == "panleft" || type == "panright")
        {
            if (context.canvas.type == "panup" ||
                context.canvas.type == "pandown")
               return;
            context.canvas.type = type;
            if (context.canvas.isbuttonbar)
            {
                   var obj = context.canvas.buttonobj
                   var k = (x - context.canvas.buttonrect.x) / context.canvas.buttonrect.width;
                   obj.setperc(k);
                   context.refresh()
            }
            else if (context.canvas.ishbar)
            {
                var obj = context.canvas.scrollobj.value();
                var k = (x-context.canvas.hscrollrect.x)/context.canvas.hscrollrect.width;
                obj.setperc(k);
                context.refresh();
            }
            else
            {
                var but = context.canvas.buttonobj;
                var e = Math.lerp(1,0.5,but.berp());
                var obj = context.canvas.scrollobj.value();
                var j = (rect.width-x)*e;
                var k = panhorz(obj, j);
                if (k == -1)
                    return;
                if (k == obj.anchor())
                    return;
                obj.set(k);
                context.refresh()
            }
        }
        else if (type == "panup" || type == "pandown")
        {
            if (context.canvas.type == "panleft" ||
                context.canvas.type == "panright")
               return;
            context.canvas.type = type;
            if (context.canvas.isvbar)
            {
                var obj = context.canvas.timeobj;
                var k = (y-context.canvas.vscrollrect.y)/context.canvas.vscrollrect.height;
                obj.setperc(1-k);
                context.refresh()
            }
            else
            {
                var k = context.canvas.timeobj.length();
                if (!context.canvas.starty)
                    context.canvas.starty = rect.height/2;
                var e = context.canvas.starty-y;
                var jvalue = (k/(context.canvas.virtualheight)*(e));
                var j = context.canvas.startt - jvalue;
                var len = context.canvas.timeobj.length();
                if (j < 0)
                     j = len+j-1;
                else if (j >= len)
                     j = j-len-1;
                j = j % context.canvas.timeobj.length();
                context.canvas.timeobj.set(j);
                context.canvas.nohide = type == "pandown";
                context.refresh()
            }
        }
    },
	panstart: function (context, rect, x, y)
    {
        context.canvas.panning = 0;
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        delete context.canvas.slideshow;
        clearInterval(globalobj.timeauto);
        globalobj.timeauto = 0;
        context.canvas.starty = y;
        context.canvas.startt = context.canvas.timeobj.current();
        context.canvas.isbuttonbar = context.canvas.buttonrect && context.canvas.buttonrect.hitest(x,y);
        context.canvas.ishbar =  context.canvas.hscrollrect && context.canvas.hscrollrect.hitest(x,y);
        context.canvas.isvbar =  context.canvas.vscrollrect && context.canvas.vscrollrect.hitest(x,y);
    },
	panend: function (context, rect, x, y)
    {
        delete context.canvas.type;
        delete context.canvas.panning;
        delete context.canvas.starty;
        delete context.startt;
        delete context.canvas.timeobj.offset;
        delete context.canvas.buttonobj.offset;
        var obj = context.canvas.scrollobj;
        if (context == _8cnvctx)
            obj = context.canvas.scrollobj.value();
        if (obj)
            delete obj.offset;
        context.refresh();
    }
},
{
    name: "MENU",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) {},

	pan: function (context, rect, x, y, type)
    {
        var obj = context.canvas.scrollobj;
        if (obj && (type == "panleft" || type == "panright"))
        {
            var k = panhorz(obj, rect.width-x);
            if (k == -1)
                return;
            if (k == obj.anchor())
                return;
            obj.set(k);
            context.refresh()
        }
        else if (type == "panup" || type == "pandown")
        {
            var k = context.canvas.timeobj.length();
            var jvalue = (k/(context.canvas.virtualheight)*
                (context.canvas.starty-y)/2);
            var j = context.canvas.startt - jvalue;
            var len = context.canvas.timeobj.length();
            if (j < 0)
                 j = len+j-1;
            else if (j >= len)
                 j = j-len-1;
            j = j % context.canvas.timeobj.length();
            context.canvas.timeobj.set(j);
            context.refresh()
        }
    },
	panstart: function (context, rect, x, y)
    {
        delete context.canvas.slideshow;
        clearInterval(globalobj.timeauto);
        globalobj.timeauto = 0;
        context.canvas.starty = y;
        context.canvas.startt = context.canvas.timeobj.current();
    },
	panend: function (context, rect, x, y)
    {
        delete context.canvas.starty;
        delete context.startt;
        delete context.canvas.timeobj.offset;
        var obj = context.canvas.scrollobj;
        delete obj.offset;
        context.refresh();
    }
},
{
    name: "BOSS",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) { },
	pan: function (context, rect, x, y, type)
	{
        if (context.canvas.pinching)
            return;

        x = movingx.update(x);
        y = movingy.update(y);
        if (galleryobj.hidefocus)
        {
            var positx = positxobj.value();
            var posity = posityobj.value();
            positx.set((x/rect.width)*100);
            posity.set((y/rect.height)*100);
            context.refresh();
        }
        else if (context.canvas.isthumb)
        {
            context.hithumb(x,y);
            if (!zoomobj.value().value())
                context.refresh();
            else if (y != context.canvas.lasty)
                contextobj.reset()
            else
                context.refresh();
            context.canvas.lasty = y;
        }
       else if (type == "panleft" || type == "panright")
        {
            if (context.canvas.iszoom)
            {
               var obj = zoomobj.value();
               var k = (x - context.zoomrect.x) / context.zoomrect.width;
               obj.setperc(k);
               contextobj.reset();
            }
            else if (context.canvas.islicewidth)
            {
                var k = (x - context.slicewidthrect.x) / context.slicewidthrect.width;
                slicewidthobj.setperc(k);
                contextobj.reset();
            }
            else if (context.canvas.istretch)
            {
               var obj = stretchobj.value();
               var k = (x - context.stretchrect.x) / context.stretchrect.width;
               obj.setperc(k);
               context.refresh();
            }
            else
            {
                context.canvas.autodirect = (type == "panleft")?-1:1;
                var len = context.canvas.timeobj.length();
                var diff = context.canvas.startx-x;
                var jvalue = ((len/context.canvas.virtualwidth))*diff;
                var j = context.canvas.startt - jvalue;
                if (j < 0)
                    j = len+j-1;
                else if (j >= len)
                    j = j-len-1;
                if (Number.isNaN(j))
                    return;
                context.canvas.timeobj.set(j);
                context.refresh()
            }
        }
        else if (type == "panup" || type == "pandown")
        {
            var zoom = zoomobj.value()
            if (Number(zoom.value()))
            {
                var h = (rect.height*(1-zoom.value()/100))*2;
                y = (y/rect.height)*h;
                var k = panvert(rowobj, h-y);
                if (k == -1)
                    return;
                if (k == rowobj.anchor())
                    return;
                rowobj.set(k);
                resetboss();
            }
        }
    },
	panstart: function (context, rect, x, y)
	{
        clearInterval(globalobj.timeout);
        globalobj.timeout = 0;
        context.canvas.startx = x;
        context.canvas.starty = y;
        context.canvas.startt = context.canvas.timeobj.current();
        context.canvas.isthumb = context.canvas.thumbrect &&
            context.canvas.thumbrect.hitest(x,y);
        context.canvas.islicewidth = context.slicewidthrect && context.slicewidthrect.hitest(x,y);
        context.canvas.istretch = context.stretchrect && context.stretchrect.hitest(x,y);
        context.canvas.iszoom = context.zoomrect && context.zoomrect.hitest(x,y);
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    },
    panend: function (context, rect, x, y)
	{
        if (galleryobj.hidefocus)
            galleryobj.transparent = 0;
        galleryobj.hidefocus = 0;
        clearTimeout(context.timepan)
        context.canvas.isthumb = 0;
        context.canvas.iszoom = 0;
        context.canvas.istretch = 0;
        delete stretchobj.value().offset;
        delete zoomobj.value().offset;
        delete context.canvas.startx;
        delete context.canvas.starty;
        delete context.canvas.startt;
        delete rowobj.offset;
        context.refresh();
    }
},
];

var mouselst =
[
{
    name: "DEFAULT",
    down: function (evt) { },
 	out: function (evt) { },
    enter: function (evt) { },
    up: function (evt) { },
	move: function (context, rect, x, y) { },
},
];

var mouseobj = new circular_array("MOUSE", mouselst);

var overlaylst =
[
{
    name: "DEFAULT",
    draw: function (context, rect, x, y) { }
},
{
    name: "DEBUG",
    draw: function (context, rect, user, time)
    {
        var a = new Row([0,60,0],
        [
            0,
            new ShadowPanel(new Text("white", "center", "middle",0, 0)),
            0,
        ]);

        a.draw(context, rect, user, time);
    }
}
]

var overlayobj = new circular_array("OVERLAY", overlaylst);

var presslst =
[
{
    name: "DEFAULT",
    pressup: function (context, rect, x, y) { },
    press: function (context, rect, x, y) { }
},
{
    name: "GALLERY",
    pressup: function (context, rect, x, y)
    {
        if (context.canvas.pageshowrect && context.canvas.pageshowrect.hitest(x,y))
            return;
        if (context.canvas.buttonrect && context.canvas.buttonrect.hitest(x,y))
            return;
        if (context.canvas.hscrollrect && context.canvas.hscrollrect.hitest(x,y))
            return;
        if (context.canvas.vscrollrect && context.canvas.vscrollrect.hitest(x,y))
            return;
        if (context.canvas.homerect && context.canvas.homerect.hitest(x,y))
            return;
        if (context.canvas.fullrect && context.canvas.fullrect.hitest(x,y))
            return;
        if (context.canvas.searchrect && context.canvas.searchrect.hitest(x,y))
            return;
        buttonobjreset();
        globalobj.hometap = 0;
        context.refresh();
    },
    press: function (context, rect, x, y)
    {
    }
},
{
    name: "MENU",
    pressup: function (context, rect, x, y)
    {
    },
    press: function (context, rect, x, y)
    {
    }
},
{
    name: "BOSS",
    pressup: function (context, rect, x, y)
    {
        galleryobj.hidefocus = 0;
    },
    press: function (context, rect, x, y)
    {
        if (context.zoomrect && context.zoomrect.hitest(x,y))
            return;
        if (context.stretchrect && context.stretchrect.hitest(x,y))
            return;
            headobj.set(3);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            bossobj.set(1);
            galleryobj.transparent = 0;
            galleryobj.hidefocus = 0;
            menuobj.hide();
            galleryobj.hidefocus = 1;
            var positx = positxobj.value();
            var posity = posityobj.value();
            positx.set((x/rect.width)*100);
            posity.set((y/rect.height)*100);
            context.refresh();
        context.refresh();
    }
},
];

var pressobj = new circular_array("PRESS", presslst);
pressobj.set(3);

var swipelst =
[
{
    name: "DEFAULT",
    swipeleftright: function (context, rect, x, y, evt) {},
    swipeupdown: function (context, rect, x, y, evt) {},
},
{
    name: "GALLERY",
    swipeleftright: function (context, rect, x, y, evt) { },
    swipeupdown: function (context, rect, x, y, evt)
    {
        var canvas = context.canvas;
        context.swipetype = evt.type;
        var slidestop = 12;
        var slidereduce = 48;
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        canvas.slideshow = (canvas.timeobj.length()/canvas.virtualheight)*slidestop;
        canvas.slidereduce = canvas.slideshow/slidereduce;
        clearInterval(globalobj.swipetimeout);
        globalobj.swipetimeout = setInterval(function ()
            {
                context.refresh();
            }, timemain.value());
   },
},
{
    name: "MENU",
    swipeleftright: function (context, rect, x, y, evt) { },
    swipeupdown: function (context, rect, x, y, evt)
    {
        var canvas = context.canvas;
        context.swipetype = evt.type;
        var slidestop = 4;
        var slidereduce = 50;
        canvas.slideshow = (context.canvas.timeobj.length()/context.canvas.virtualheight)*slidestop;
        canvas.slidereduce = canvas.slideshow/slidereduce;
        clearInterval(globalobj.swipetimeout);
        globalobj.swipetimeout = setInterval(function ()
            {
                context.refresh();
            }, timemain.value());
    },
},
{
    name: "BOSS",
    swipeleftright: function (context, rect, x, y, evt)
    {
        var canvas = context.canvas;
        if (evt)
            canvas.autodirect = evt.type == "swipeleft"?-1:1;
        var slidestop = Number(galleryobj.slidestop?galleryobj.slidestop:6);
        var slidereduce = Number(galleryobj.slidereduce?galleryobj.slidereduce:100);
        canvas.slidestop += slidestop;
        canvas.slidestop = (window.innerWidth/context.canvas.virtualwidth)*canvas.slidestop;
        canvas.slidereduce = canvas.slidestop/slidereduce;
        clearInterval(globalobj.swipetimeout);
        globalobj.swipetimeout = setInterval(function ()
            {
                drawboss()
            }, timemain.value());
    },

    swipeupdown: function (context, rect, x, y, evt)
    {
    },
},
];

var swipeobj = new circular_array("SWIPE", swipelst);
swipeobj.set(3);

var dialog = 0;

var keylst =
[
{
	name: "DEFAULT",
	keyup: function (evt) { },
	keydown: function (evt) { }
},
{
	name: "GALLERY",
	keyup: function (evt)
    {
   		var context = menuobj.value()
        var canvas = context.canvas;
        canvas.keyblock = 100;
    },
	keydown: function (evt)
	{
        if (dialog && dialog.open)
            return;
   		var context = menuobj.value()
        var canvas = context.canvas;
        var key = evt.key.toLowerCase();
        canvas.shiftKey = evt.shiftKey;
        canvas.ctrlKey = evt.ctrlKey;
        canvas.slideshow = 0;
        var obj = context.canvas.scrollobj.value();
        if (canvas.ctrlKey && key == "arrowup" ||
            canvas.shiftKey && key == "enter")
        {
            var e = {type:"swipedown"}
            swipelst[1].swipeupdown (context, context.rect, 0, 0, e)
            evt.preventDefault();
        }
        else if (
            canvas.ctrlKey && key == "arrowdown" ||
            key == "enter")
        {
            var e = {type:"swipeup"}
            swipelst[1].swipeupdown (context, context.rect, 0, 0, e)
            evt.preventDefault();
        }
        else if (
            canvas.ctrlKey && key == "arrowleft" ||
            canvas.ctrlKey && key == "h")
        {
            canvas.imagescrollobj.set(0);
            context.refresh();
            evt.preventDefault();
        }
        else if (canvas.ctrlKey && key == "arrowright" ||
           canvas.ctrlKey && key == "l")
        {
            canvas.imagescrollobj.set(canvas.imagescrollobj.length()-1);
            context.refresh();
            evt.preventDefault();
        }
        else if (key == "pageup" || key == "arrowup" || key == "k")
		{
            var e = {type:"swipedown"}
            swipelst[1].swipeupdown (context, context.rect, 0, 0, e)
            evt.preventDefault();
        }
        else if (key == "pagedown" || key == "arrowdown" || key == "j")
		{
            var e = {type:"swipeup"}
            swipelst[1].swipeupdown (context, context.rect, 0, 0, e)
            evt.preventDefault();
        }
        else if (key == "-" || key == "[")
        {
            var obj = context.canvas.buttonobj;
            obj.addperc(-1.5/100);
            context.refresh()
        }
        else if (key == "+" || key == "]" || key == "=")
        {
            var obj = context.canvas.buttonobj;
            obj.addperc(1.5/100);
            context.refresh()
        }
        else if (key == "arrowleft" || key == "h")
		{
            obj.rotateperc(-2.5);
            context.refresh()
        }
        else if (key == "arrowright" || key == "l")
		{
            obj.rotateperc(2.5);
            context.refresh()
        }
        else if (key == " " || key == "\\" || key == "/")
        {
            if (galleryobj.hideboss)
                return;
            clearInterval(globalobj.swipetimeout);
            globalobj.swipetimeout = 0;
            headobj.set(3);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            bossobj.set(1);
            menuobj.toggle(_8cnvctx);
        }
        else if (key == "f")
        {
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }

            context.refresh();
            evt.preventDefault();
        }
        else if (key == "escape")
        {
            escape();
            evt.preventDefault();
        }
 	}
},
{
	name: "MENU",
	keyup: function (evt)
    {
   		var context = menuobj.value()
        var canvas = context.canvas;
        canvas.keyblock = 100;
    },
	keydown: function (evt)
	{
        if (dialog && dialog.open)
            return;
   		var context = menuobj.value()
        var canvas = context.canvas;

        canvas.shiftKey = evt.shiftKey;
        canvas.ctrlKey = evt.ctrlKey;
        canvas.slideshow = 0;

        var key = evt.key.toLowerCase();
        if (key == "pageup" || key == "arrowup" || evt.key == "j")
		{
            if (!canvas.shiftKey && canvas.block)
                return;
            canvas.block = 1;
            setTimeout(function() { canvas.block = 0; }, canvas.keyblock);
            canvas.keyblock = Math.clamp(25,100,canvas.keyblock-5);
            evt.preventDefault();
            var k = (20/context.canvas.virtualheight)*context.canvas.timeobj.length();
            context.canvas.timeobj.rotate(-k);
            context.refresh()
        }
        else if (key == "pagedown" || key == "arrowdown" || evt.key == "k")
		{
            if (!canvas.shiftKey && canvas.block)
                return;
            canvas.block = 1;
            setTimeout(function() { canvas.block = 0; }, canvas.keyblock);
            canvas.keyblock = Math.clamp(25,100,canvas.keyblock-5);
            evt.preventDefault();
            var k = (20/context.canvas.virtualheight)*context.canvas.timeobj.length();
            context.canvas.timeobj.rotate(k);
            context.refresh()
        }
        else if (key == " " || key == "\\" || key == "/")
        {
            menuobj.hide();
        }
        else if (key == "enter")
        {
            evt.preventDefault();
            _4cnvctx.movepage(evt.shiftKey?-1:1);
            setTimeout(function(){ _8cnvctx.refresh();}, 100);
        }
        else if (key == "f")
        {
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }

            context.refresh();
            evt.preventDefault();
        }
        else if (key == "escape")
        {
            escape();
            evt.preventDefault();
        }
  	}
},
{
	name: "BOSS",
	keyup: function (evt)
	{
		var canvas = _4cnv;
		var context = _4cnvctx;
        canvas.keyuptime = 0;
        canvas.keyblock = 100;
        canvas.keydown = 0;
        context.refresh();
	},
	keydown: function (evt)
	{
        if (dialog && dialog.open())
            return;
		var canvas = _4cnv;
		var context = _4cnvctx;
		var rect = context.rect();
        canvas.keydown = 1;
        canvas.ctrlKey = evt.ctrlKey;
        canvas.shiftKey = evt.shiftKey;

        context.refresh();
        var key = evt.key.toLowerCase();

        if (!canvas.shiftKey && canvas.block)
        {
            evt.preventDefault();
            return;
        }

        if (key == "f")
        {
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }

            context.refresh();
            evt.preventDefault();
        }
        else if (key == "arrowleft" || key == "h")
        {
            canvas.block = 1;
            setTimeout(function() { canvas.block = 0; }, canvas.keyblock);
            canvas.keyblock = Math.clamp(50,200,canvas.keyblock-5);
            canvas.autodirect = 1;
            swipeobj.value().swipeleftright(context, context.rect(), 0, 0, 0)
        }
        else if (key == "arrowright" || key == "l")
        {
            canvas.block = 1;
            setTimeout(function() { canvas.block = 0; }, canvas.keyblock);
            canvas.keyblock = Math.clamp(50,200,canvas.keyblock-5);
            canvas.autodirect = -1;
            swipeobj.value().swipeleftright(context, context.rect(), 0, 0, 0)
        }
        else if (key == " ")
        {
            menuobj.toggle(_8cnvctx);
        }
        else if (key == "tab")
        {
            evt.preventDefault();
            canvas.autodirect = evt.shiftKey?1:-1;
            swipeobj.value().swipeleftright(context, context.rect(), 0, 0, 0)
        }
        else if (key == "arrowup" || key == "k")
        {
            var k = rowobj.length()/500;
            canvas.keyuptime += 0.3;
            rowobj.add(-k-canvas.keyuptime);
            contextobj.reset();
        }
        else if (key == "arrowdown" || key == "j" )
        {
            var k = rowobj.length()/500;
            canvas.keyuptime += 0.3;
            rowobj.add(k+canvas.keyuptime);
            contextobj.reset();
        }
        else if (key == "-" || key == "{")
        {
            zoomobj.value().add(-1);
            contextobj.reset()
        }
        else if (key == "+" || key == "}" || key == "=")
        {
            zoomobj.value().add(1);
            contextobj.reset()
        }
        else if (key == "[")
        {
            stretchobj.value().add(-1);
            context.refresh();
        }
        else if (key == "]")
        {
            stretchobj.value().add(1);
            context.refresh();
        }
        else if (key == "enter")
        {
            if (!galleryobj.length())
                return;
            context.movepage(evt.shiftKey?-1:1);
            evt.preventDefault();
        }
        else if (key == "pageup")
        {
            if (!galleryobj.length())
                return;
            context.movepage(-1);
            evt.preventDefault();
        }
        else if (key == "pagedown")
        {
            if (!galleryobj.length())
                return;
            context.movepage(1);
            evt.preventDefault();
        }
        else if (key == "escape")
        {
            escape();
            evt.preventDefault();
        }
	}
},

];

CanvasRenderingContext2D.prototype.hithumb = function(x,y)
{
    if (typeof x !== "undefined")
    {
        var rect = this.canvas.thumbrect;
        var c = (x-rect.x) % rect.width;
        var b = c/rect.width;
        var e = this.canvas.sliceobj.length();
        var m = (1-b)*e;
        var j = DELAYCENTER/e;
        var time = j*m;
        var k = time % DELAYCENTER;
        var e = this.canvas.timeobj.length()*(k/DELAYCENTER);
        this.canvas.timeobj.set(e);
    }

    if (typeof y !== "undefined")
    {
        var b = (y-rect.y)/rect.height;
        var e = b*rowobj.length();
        rowobj.set(e);
    }
}

var taplst =
[
{
	name: "DEFAULT",
	tap: function (context, rect, x, y, shift, ctrl) { }
},
{
	name: "BOSS",
	tap: function (context, rect, x, y, shift, ctrl)
	{
        clearInterval(globalobj.timeout);
        globalobj.timeout = 0;
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

        if (context.canvas.thumbrect && context.canvas.thumbrect.hitest(x,y))
        {
            headobj.set(3);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

            if (context.canvas.selectrect &&
                context.canvas.selectrect.hitest(x,y)>=0)
            {
                galleryobj.transparent = galleryobj.transparent?0:1;
                context.refresh();
            }
            else
            {
                context.hithumb(x,y);
                galleryobj.transparent = 1;
                contextobj.reset()
            }
        }
        else if (context.extentrect && context.extentrect.hitest(x,y))
        {
            if (!galleryobj.visible || context.canvas.shiftlKey)
            {
                if (galleryobj.value().id)
                    copytext(galleryobj.value().id);
                extentobj.rotate(1);
                context.refresh();
            }
            else
            {
                var k = Math.lerp(0,TIMEOBJ,1-galleryobj.berp());
                _8cnv.timeobj.set(k);
                menuobj.toggle(_8cnvctx);
            }
        }
        else if (context.zoomrect && context.zoomrect.hitest(x,y))
        {
            var k = (x - context.zoomrect.x) / context.zoomrect.width;
            zoomobj.value().setperc(k);
            contextobj.reset();
        }
        else if (context.slicewidthrect && context.slicewidthrect.hitest(x,y))
        {
            var k = (x - context.slicewidthrect.x) / context.slicewidthrect.width;
            slicewidthobj.setperc(k);
            contextobj.reset();
        }
        else if (context.stretchrect && context.stretchrect.hitest(x,y))
        {
            var obj = stretchobj.value();
            var k = (x - context.stretchrect.x) / context.stretchrect.width;
            obj.setperc(k);
            context.refresh();
        }
        else if (menuobj.value())
        {
            menuobj.hide();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnvctx.refresh();
        }
        else
        {
            var obj = new circular_array("", [1,3]);
            obj.set(obj.findindex(headobj.current()));
            obj.rotate(1);
            headobj.set(obj.value());
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            bossobj.set(headobj.current()==1?0:1);
            galleryobj.transparent = 0;
            galleryobj.hidefocus = 0;
            context.refresh();
            menuobj.hide();
        }
    }
},
{
    name: "MENU",
    tap: function (context, rect, x, y)
    {
        var obj = context.canvas.scrollobj;
        if (context.thumbpanel && context.thumbpanel.hitest(x,y))
        {
            galleryobj.hidebars = galleryobj.hidebars?0:1;
            _8cnvctx.refresh();
        }
        else if (context.canvas.searchrect && context.canvas.searchrect.hitest(x,y))
        {
            menuobj.showindex(_3cnvctx);
        }
        else if (context.fullrect && context.fullrect.hitest(x,y))
        {
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }
        }
        else if (context.canvas.optionrect && context.canvas.optionrect.hitest(x,y))
        {
            headobj.set(1);
            bossobj.set(0);
            headham.panel = headobj.value();
            menuobj.showindex(_2cnvctx);
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            context.refresh();
        }
        else if (context.canvas.openrect && context.canvas.openrect.hitest(x,y))
        {
            explore().then(function(files) { dropfiles(files); })
        }
        else if (context.canvas.helprect && context.canvas.helprect.hitest(x,y))
        {
            headobj.set(1);
            bossobj.set(0);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            menuobj.showindex(_7cnvctx);
            _4cnvctx.refresh()
        }
        else if ( context.canvas.searchrect && context.canvas.searchrect.hitest(x,y) )
        {
            menuobj.showindex(_3cnvctx);
        }
        else if (x > rect.width - (MENUBARWIDTH*2) )
        {
            var j = y/rect.height;
            var k = TIMEOBJ*(1-j);
            context.canvas.timeobj.set(k);
            context.refresh();
        }
        else
        {
            var k = getfrompoint(context, x, y);
            var slice = context.canvas.sliceobj.data[k];
            if (!slice)
                return;

            slice.tap = 1;
            context.refresh();
            setTimeout(function ()
            {
                slice.tap = 0;
                slice.func(k)
                context.refresh();
            }, JULIETIME*3);
        }
    },
},
{
    name: "GALLERY",
    tap: function (context, rect, x, y)
    {
        context.canvas.slideshow = 0;
        var timeauto = globalobj.timeauto;
        clearInterval(globalobj.timeauto);
        clearInterval(globalobj.timeout);
        globalobj.timeauto = 0;
        globalobj.timeout = 0;
        var obj = context.canvas.scrollobj.value();
        context.refresh();

        if (context.canvas.hscrollrect && context.canvas.hscrollrect.hitest(x,y))
        {
            var obj = context.canvas.scrollobj.value();
            var k = (x-context.canvas.hscrollrect.x)/context.canvas.hscrollrect.width;
            obj.setperc(k);
            context.refresh();
        }
        else if (context.canvas.vscrollrect && context.canvas.vscrollrect.hitest(x,y))
        {
            var obj = context.canvas.timeobj;
            var k = (y-context.canvas.vscrollrect.y)/context.canvas.vscrollrect.height;
            obj.setperc(1-k);
            context.refresh();
        }
        else if (context.fullrect && context.fullrect.hitest(x,y))
        {
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }
        }
        else if (context.canvas.buttonrect && context.canvas.buttonrect.hitest(x,y))
        {
            var obj = context.canvas.buttonobj;
            var k = (x-context.canvas.buttonrect.x)/context.canvas.buttonrect.width;
            obj.setperc(k);
            context.refresh();
        }
        else if (context.canvas.pageshowrect && context.canvas.pageshowrect.hitest(x,y))
        {
            pageshow();
        }
        else if (context.canvas.searchrect && context.canvas.searchrect.hitest(x,y))
        {
            menuobj.showindex(_3cnvctx);
        }
        else if (context.canvas.optionrect && context.canvas.optionrect.hitest(x,y))
        {
            headobj.set(1);
            bossobj.set(0);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            menuobj.showindex(_2cnvctx);
            _4cnvctx.refresh();
        }
        else if (context.canvas.helprect && context.canvas.helprect.hitest(x,y))
        {
            headobj.set(1);
            bossobj.set(0);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            menuobj.showindex(_7cnvctx);
            _4cnvctx.refresh()
        }
        else if (context.canvas.scrollrect && context.canvas.scrollrect.hitest(x,y))
        {
            clearInterval(globalobj.timeout);
            clearInterval(globalobj.timeauto);
            globalobj.timeauto = 0;
            globalobj.timeout = 0;
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            context.canvas.scrollobj.rotate(1);
            context.refresh();
        }
        else if (context.canvas.homerect && context.canvas.homerect.hitest(x,y))
        {
            clearTimeout(globalobj.hometap)
            globalobj.hometap = setTimeout(function()
                {
                    buttonobjreset();
                    globalobj.hometap = 0;
                    context.refresh();
                }, 400);
            context.refresh();
        }
        else if (!galleryobj.hideboss)
        {
            var visibles = context.canvas.visibles;

            var k;
            for (k = 0; k < visibles.length; k++)
            {
                var slice = visibles[k];
                if (slice.slice.rect.hitest(x,y))
                    break;
            }

            if (k == visibles.length)
                return;
            if (context.canvas.pageshowrect && context.canvas.pageshowrect.hitest(x,y))
                return;
            if (context.canvas.buttonrect && context.canvas.buttonrect.hitest(x,y))
                return;
            if (context.canvas.hscrollrect && context.canvas.hscrollrect.hitest(x,y))
                return;
            if (context.canvas.vscrollrect && context.canvas.vscrollrect.hitest(x,y))
                return;
            if (context.canvas.homerect && context.canvas.homerect.hitest(x,y))
                return;
            if (context.canvas.fullrect && context.canvas.fullrect.hitest(x,y))
                return;
            if (context.canvas.searchrect && context.canvas.searchrect.hitest(x,y))
                return;

            var n = visibles[k].n;
            var slice = galleryobj.data[n];
            galleryobj.set(n);
            clearInterval(globalobj.swipetimeout);
            globalobj.swipetimeout = 0;
            headobj.set(3);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            bossobj.set(1);
            delete _4cnv.thumbcanvas;
            delete photo.image;
            slice.tap = 1;
            context.refresh();
            setTimeout(function ()
            {
                slice.tap = 0;
                context.refresh();
                menuobj.toggle(_8cnvctx);
                contextobj.reset();
            }, 1000);
        }
    },
},
];

var tapobj = new circular_array("TAP", taplst);
tapobj.set(1)

Number.prototype.inrange = function(a, b)
{
    var min = Math.min(a, b),
        max = Math.max(a, b);
    return this >= min && this < max;
}

Number.prototype.pad = function(size)
{
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
	    return s;
}

var bosslst =
[
    new function ()
	{
    	this.draw = function (context, rect, user, time)
        {
            if (galleryobj.hidebars)
                return;
            if (menuobj.value())
                return;
            context.zoomrect = new rectangle();
            context.slicewidthrect = new rectangle();
            context.stretchrect = new rectangle();
            context.extentrect = new rectangle();
            var w = Math.min(320,rect.width-100);
            var a = new RowA([60,0,40,8,40,8,40,ALIEXTENT,SCROLLBARWIDTH,MARGINBAR],
             [
                 0,
                 0,
                 slicewidthobj.debug?new Col([0,w,0],
                 [
                     0,
                    new Layer(
                    [
                        new Shrink(new Rectangle(context.slicewidthrect),4,0),
                        new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0.5)", 16, 16),
                         new Shrink(new CurrentHPanel(new Shrink(new CirclePanel("white"),9,9), 30, 1),6,0)
                    ]),
                     0,
                ]):0,
                 0,
                 new Col([0,w,0],
                 [
                     0,
                    new Layer(
                    [
                        new Shrink(new Rectangle(context.zoomrect),4,0),
                        new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0.5)", 16, 16),
                         new Shrink(new CurrentHPanel(new Shrink(new CirclePanel("white"),9,9), 30, 1),6,0)
                    ]),
                     0,
                ]),
                 0,
                 new Col([0,w,0],
                 [
                    0,
                    new Layer(
                    [
                        new Shrink(new Rectangle(context.stretchrect),4,0),
                        new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0.5)", 16, 16),
                         new Shrink(new CurrentHPanel(new Shrink(new CirclePanel("white"),9,9), 30, 1),6,0)
                    ]),
                    0,
                ]),
                new Layer(
                [
                    new Rectangle(context.extentrect),
                    new ShadowPanel(new Text("rgb(255,255,255)", "center", "middle",0, 0)),
                ]),
                0,
                0
            ]);

            a.draw(context, rect,
                [
                    0,
                    0,
                    slicewidthobj,
                    0,
                    zoomobj.value(),
                    0,
                    stretchobj.value(),
                    extentobj.value(),
                    0,
                    0,
                ], 0);
        }
    },
    new function ()
	{
    	this.draw = function (context, r, user, time)
        {
            if (
                !photo.image ||
                !photo.image.complete ||
                !photo.image.naturalHeight)
                return;

            var canvas = context.canvas;
            context.extentrect = new rectangle();
            var a = new RowA([0,ALIEXTENT,SCROLLBARWIDTH,MARGINBAR],
            [
                0,
                new Layer(
                [
                    new Rectangle(context.extentrect),
                    new ShadowPanel(new Text("rgb(255,255,255)", "center", "middle",0, 0)),
                ]),
                0,
                0,
            ]);

            a.draw(context, rect,
                [
                    0,
                    extentobj.value(),
                    0,
                    0,
                ], user, time);

            var he = heightobj.value();
            var b = Math.berp(0,he.length()-1,he.current());
            var height = Math.max(60,Math.lerp(0, rect.height, b));
            var width = Math.max(60,Math.lerp(0, rect.width, b));
            var r = calculateAspectRatioFit(photo.image.width, photo.image.height, width, height);
            var h = r.height;
            var w = r.width;
            var positx = positxobj.value();
            var posity = posityobj.value();
            var x = Math.floor(Math.nub(positx.value(), positx.length(), w, rect.width))+THUMBSELECT;
            var y = Math.floor(Math.nub(posity.value(), posity.length(), h, rect.height))+THUMBSELECT;
            context.canvas.thumbrect = new rectangle(x,y,w,h);
            var r = context.canvas.thumbrect;

            context.save();
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            if (galleryobj.transparent)
            {
                var blackfill = new FillPanel(THUMBFILP);
                blackfill.draw(context, context.canvas.thumbrect, 0, 0);
            }
            else
            {
                if (!context.canvas.thumbcanvas)
                {
                    context.canvas.thumbcanvas = document.createElement('canvas');
                    context.canvas.thumbcanvas.width = w;
                    context.canvas.thumbcanvas.height = h;
                    var thumbcontext = context.canvas.thumbcanvas.getContext('2d');
                    thumbcontext.drawImage(photo.image,0,0,w,h);
                }

                context.drawImage(context.canvas.thumbcanvas, x, y, w, h);
            }

            var whitestroke = new StrokePanel(THUMBSTROKE,THUMBORDER);
            whitestroke.draw(context, r, 0, 0);
            var region = new Path2D();
            region.rect(x,y,w,h);
            context.clip(region);

            var ww = Math.max(30,(rect.width/context.canvas.virtualwidth)*w);
            var stretch = stretchobj.value();
            if (stretch < 50)
                stretch = (50-stretch.value())/100;
            else
                stretch = (stretch.value()-50)/100;
            stretch = 1-stretch;
            ww *= stretch;

            var b = Math.berp(0,photo.image.height,context.canvas.imageheight);
            var hh = Math.lerp(0,h,b);
            var b = Math.berp(0,photo.image.height,_4cnv.nuby);
            var yy = y+Math.lerp(0,h,b);
            var jj = context.canvas.timeobj.berp();
            var bb = w*(1-jj);
            var xx = x+bb-ww/2;
            context.lineWidth = THUMBORDER;
            var r = new rectangle(xx,yy,ww,hh);
            context.canvas.selectrect = []
            context.canvas.selectrect.push(r);
            if (!galleryobj.hidefocus)
            {
                var blackfill = new FillPanel(THUMBFILL);
                blackfill.draw(context, r, 0, 0);
                whitestroke.draw(context, r, 0, 0);
                if (xx > x)//leftside
                {
                    var r = new rectangle(xx-w,yy,ww,hh);
                    context.canvas.selectrect.push(r);
                    blackfill.draw(context, r, 0, 0);
                    whitestroke.draw(context, r, 0, 0);
                }
                else if (xx < x)//right side
                {
                    var r = new rectangle(w+xx,yy,ww,hh);
                    context.canvas.selectrect.push(r);
                    blackfill.draw(context, r, 0, 0);
                    whitestroke.draw(context, r, 0, 0);
                }
            }

            context.restore();
        }
    },
 ];

var bossobj = new circular_array("THUMB", bosslst);
bossobj.set(1);

var getfrompoint = function (context, x, y)
{
	var slices = context.canvas.sliceobj.data;

    var k;
    for (k = 0; k < slices.length; k++)
    {
        var slice = slices[k];
        if (slice.rect.hitest(x,y))
            break;
    }

	return k;
}

var buttonlst =
[
{
    name: "DEFAULT",
    draw: function (context, rect, user, time){}
},
{
    name: "OPTION",
    draw: function (context, rect, user, time)
    {
        context.save()
        var clr = SCROLLNAB;
        if (user.tap)
            clr = MENUTAP;
        var e = context.canvas.scrollobj.berp();
        var a = new Col([20,0,20],
        [
            0,
            new Layer(
            [
                new Expand(new Rounded(clr, 4, SEARCHFRAME, 8, 8), 0, 20),
                new Shrink(new MultiText(e), 20, 0),
            ]),
            0,
        ]);

        a.draw(context, rect, user.line.split("\n"), time);
        context.restore();
    }
},
{
    name: "MENU",
    draw: function (context, rect, user, time)
    {
        context.save()
        var clr = SCROLLNAB;
        if (user.tap)
        {
            clr = MENUTAP;
        }
        else if (user.enabled)
        {
            if (user.enabled())
              clr = MENUSELECT;
        }

        var a = new Col([20,0,20],
        [
            0,
            new Layer(
            [
                new Expand(new Rounded(clr, 4, SEARCHFRAME, 8, 8), 0, 10),
                new Shrink(new Text("white", "center", "middle",0, 0), 20, 0),
            ]),
            0,
        ]);

        a.draw(context, rect, user.title, time);
        context.restore();
    }
},
{
    name: "GALLERY",
    draw: function (context, rect, user, time)
    {
        var index = time%ganvaslst.length;
        var view = Math.floor(time/ganvaslst.length)
        user.thumbimg = imagelst[index]
        if (context.canvas.scrollobj.current() == 0 &&
            user.thumbimg.view != view)
        {
            user.thumbimg.view = view;
            try
            {
                if (user.full)
                    user.thumbimg.src = user.full;
                else if (user.file)
                    user.thumbimg.src = URL.createObjectURL(user.file);
                else
                {
                    const variant = "2160x2160";
                    user.thumbimg.src = `https://reportbase.com/image/${user.id}/${variant}`;
                }

                user.thumbimg.onload = function()
                {
                    this.count = 0;
                    menuobj.draw();
                }

                user.thumbimg.onerror =
                    user.thumbimg.onabort = function(error)
                {
                    console.log(error);
                }
            }
            catch (error)
            {
                console.log(error);
            }
        }
        else if (context.canvas.scrollobj.current() == 0 &&
            user.thumbimg && user.thumbimg.width)
        {
            var obj = context.canvas.scrollobj.value();
            var b = user.thumbimg.width/user.thumbimg.height;
            var b2 = rect.width/rect.height;
            user.thumbfitted = ganvaslst[index];
            if (user.thumbfitted.view != view)
            {
                user.thumbfitted.view = view;
                delete user.thumbimg;
            }
            else
            {
                if (b > b2)
                {
                    if (user.thumbfitted.height != rect.height ||
                        user.thumbimg.count < 1)
                    {
                        var thumbfittedctx = user.thumbfitted.getContext("2d");
                        user.thumbfitted.height = rect.height;
                        user.thumbfitted.width = rect.height*b;
                        thumbfittedctx.drawImage(
                            user.thumbimg,0,0,user.thumbimg.width,user.thumbimg.height,
                            0,0,user.thumbfitted.width,user.thumbfitted.height);
                        user.thumbimg.count += 1;
                    }
                    else
                    {
                        delete user.thumbimg;
                    }

                    if  (user.isvisible)
                    {
                        var x = Math.nub(obj.value(), obj.length(),
                            rect.width, user.thumbfitted.width);
                        context.drawImage(user.thumbfitted,
                            x, 0, rect.width, rect.height,
                            0, 0, rect.width, rect.height);
                    }
                }
                else
                {
                    if (user.thumbfitted.width != rect.width ||
                        user.thumbimg.count < 1)
                    {
                        var thumbfittedctx = user.thumbfitted.getContext("2d");
                        user.thumbfitted.width = rect.width;
                        user.thumbfitted.height = rect.width/b;
                        thumbfittedctx.drawImage(
                            user.thumbimg,0,0,user.thumbimg.width,user.thumbimg.height,
                            0,0,user.thumbfitted.width,user.thumbfitted.height);
                        user.thumbimg.count += 1;
                    }

                    if (user.isvisible)
                    {
                        var y = Math.nub(obj.value(), obj.length(),
                            rect.height, user.thumbfitted.height);
                        context.drawImage(user.thumbfitted,
                            0, y, rect.width, rect.height,
                            0, 0, rect.width, rect.height);
                    }
                }
            }

            if (user.tap)
            {
                var a = new FillPanel("rgba(255,125,0,0.4)");
                a.draw(context, rect, 0, 0);
            }
        }
        else if (context.canvas.scrollobj.current() == 1)
        {
            var lst = [];
            lst[0] = `${time+1} of ${galleryobj.length()}`;
            lst[1] = `y: ${user.center.y.toFixed(2)}`;
            let keys = Object.keys(user);
            for (var n = 0; n < keys.length; ++n)
            {
                var key = keys[n];
                var value = user[key]
                if (value && value.length && typeof value === 'string')
                {
                    if (value.substr(0,4) != "http")
                        lst.push(value);
                }
            }

            var e = _8cnv.textscrollobj.berp();
            var a = new Col([25,0,25],
            [
                0,
                new Row([15,0,20],
                [
                    0,
                    new Layer(
                    [
                        new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0.4)", 16, 16),
                        user.tap?new FillPanel("rgba(255,125,0,0.4)"):0,
                        new Shrink(new MultiText(e), 30, 15),
                    ]),
                    0,
                ]),
                0,
            ]);

            a.draw(context, rect, lst, 0);
        }
    }
},
{
    name: "BOSS",
    draw: function (unused, rect, user, time)
    {
	}
},
];

let slicelst = [];
const SLICERADIUS = 130000;
for (let n = 499; n >= 1; n=n-1)
    slicelst.push({slices: n*3, delay: SLICERADIUS/n});

function resetboss()
{
    if (!photo.image ||
        !photo.image.complete ||
        !photo.image.naturalHeight)
        return;

    var canvas = _4cnv;
    var context = _4cnvctx;
    if (canvas.width != window.innerWidth ||
        canvas.height != window.innerheight)
    {
        window.headrect = new rectangle(0,0,window.innerWidth,ALIEXTENT);
        window.leftrect = new rectangle(0,0,window.innerWidth/2,window.innerHeight);
        window.rightrect = new rectangle(window.innerWidth/2,0,window.innerWidth/2,window.innerHeight);
        window.rect = new rectangle(0,0,window.innerWidth,window.innerHeight);
        window.landscape = function(){return window.rect.width > window.rect.height?1:0;}
        window.portrait = function(){return window.rect.width < window.rect.height?1:0;}
        heightobj.set(window.landscape());
        stretchobj.set(window.landscape());
        zoomobj.set(window.landscape());
        positxobj.set(window.landscape());
        posityobj.set(window.landscape());
        context.show(0,0,window.innerWidth,window.innerHeight);
    }

    var zoomax = galleryobj.zoomax ? galleryobj.zoomax : 92.00;
    var n = 0;
    for (; n < zoomax; ++n)
    {
        var zoom = (100-n)/100;
        var height = photo.image.height*zoom;
        var aspect = photo.image.width/height;
        var width = _4cnv.height * aspect;
        var j = width / window.innerWidth;
        if (window.portrait() && j > 2.0)
            break;
        else if (window.landscape() && j > 1.5)
            break;
    }

    var zoom = zoomobj.value()
    var str = `${n}-${zoomax}`;
    zoom.split(zoom.current(), str, 100);
    var z = zoom.value();
    var zoom = (100-z)/100;
    _4cnv.imageheight = photo.image.height*zoom;
    _4cnv.virtualheight = _4cnv.height;
    var imageaspect = photo.image.width/_4cnv.imageheight;
    _4cnv.virtualwidth = _4cnv.height * imageaspect;
    var y = Math.clamp(0,_4cnv.height-1,_4cnv.height*rowobj.berp());
    _4cnv.nuby = Math.nub(y, _4cnv.height, _4cnv.imageheight, photo.image.height);

    var slicewidth = slicewidthobj.value();

    var j = 0;
    for (; j < slicelst.length; ++j)
    {
        var k = slicelst[j];
        var fw = _4cnv.virtualwidth / k.slices;
        if (fw >= slicewidth)
            break;
    }

    var canvaslen = Math.ceil(_4cnv.virtualwidth/MAXVIRTUAL);
    var e = slicelst[j-1];
    var delay = e.delay;
    var slices = Math.ceil(e.slices/canvaslen);
    var delayinterval = delay/100000;
    var gwidth = photo.image.width/canvaslen;
    var bwidth = _4cnv.virtualwidth/canvaslen;
    _4cnv.colwidth = bwidth/slices;

    var slice = 0;
    _4cnv.sliceobj.data = []

    var j = 0;
    for (var n = 0; n < canvaslen; ++n)
    {
        var cnv = canvaslst[n];
        if (cnv.height != _4cnv.height)
            cnv.height = _4cnv.height;
        if (cnv.width != bwidth)
            cnv.width = bwidth;

        var ctx = cnv.getContext('2d');
        ctx.drawImage(photo.image,
            n*gwidth, _4cnv.nuby, gwidth, _4cnv.imageheight,
            0, 0, bwidth, cnv.height);

        var tb = new Array(slices).fill(0);
        var jb = gridToGridB(tb, bwidth);

        for (var e = 0; e < slices; ++e)
        {
            var k = {};
            k.x = e*_4cnv.colwidth;
            k.p = k.x/_4cnv.virtualwidth;
            k.slice = slice;
            k.time = j;
            k.canvas = cnv;
            slice++;
            _4cnv.sliceobj.data.push(k);
            j += delayinterval;
        }
    }

    var a = Array(_4cnv.sliceobj.length()).fill().map((_, index) => index);
    _4cnv.rotated = [...a,...a,...a];

    context.refresh();
}



_1ham.panel = new YollPanel();
_2ham.panel = new YollPanel();
_3ham.panel = new YollPanel();
_4ham.panel = new YollPanel();
_5ham.panel = new YollPanel();
_6ham.panel = new YollPanel();
_7ham.panel = new YollPanel();
_8ham.panel = new YollPanel();
_9ham.panel = new YollPanel();

let contextlst = [_1cnvctx,_2cnvctx,_3cnvctx,_4cnvctx,_5cnvctx,_6cnvctx,_7cnvctx,_8cnvctx,_9cnvctx];
let menulst = [0, _1cnvctx, _2cnvctx,_3cnvctx,_5cnvctx,_6cnvctx,_7cnvctx,_8cnvctx,_9cnvctx];
var menuobj = new circular_array("MENU", menulst);

menuobj.showindex = function(context)
{
    if (menuobj.value() != context)
    {
        menuobj.hide();
        menuobj.setindex(context);
        menuobj.show();
    }
    else
    {
        menuobj.toggle(context);
    }
}

menuobj.toggle = function(context)
{
    if (menuobj.value())
    {
        menuobj.hide()
    }
    else
    {
        menuobj.setindex(context);
        menuobj.show();
    }
}

menuobj.hide = function()
{
    var context = this.value();
    if (!context)
        return;
    context.hide();
    this.set(0);
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
}

menuobj.show = function()
{
    var context = this.value();
    if (!context)
        return;
    var canvas = context.canvas;
    if (canvas.width_ > window.innerWidth)
    {
        context.show(0, 0, window.innerWidth, window.innerHeight);
    }
    else if (window.innerWidth - canvas.width_ < 180)
    {
        var w = window.innerWidth-180;
        var l = Math.floor((window.innerWidth-w)/2);
        context.show(l, 0, w, window.innerHeight);
    }
    else
    {
        var w = canvas.width_;
        var l = Math.floor((window.innerWidth-w)/2);
        context.show(l, 0, w, window.innerHeight);
    }

    delete context.swipetype;
    clearInterval(globalobj.timeout);
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    context.refresh();
    function f() { context.refresh(); }
    setTimeout(function() { f(); }, 100);
    setTimeout(function() { f(); }, 500);
    setTimeout(function() { f(); }, 1000);
}

menuobj.draw = function()
{
    var context = this.value();
    if (!context)
        return;
    var canvas = context.canvas;
    var time = canvas.timeobj.value()/1000;
    var slices = context.canvas.sliceobj.data;
    if (!slices.length)
        return;
    const rect = context.rect();

    if (context.canvas.slideshow > 0)
    {
        var k = (context.swipetype == "swipeup")?-1:1;
        context.canvas.timeobj.rotate(k*context.canvas.slideshow);
        context.canvas.slideshow -= context.canvas.slidereduce
    }
    else
    {
        context.canvas.slideshow = 0;
        clearInterval(globalobj.swipetimeout);
        globalobj.swipetimeout = 0;
    }

    var len = context.canvas.sliceobj.length()
    var delayinterval = DELAYCENTER / len / 1000;
    context.canvas.virtualheight = len*canvas.buttonheight;
    context.clear();
    if (context == _8cnvctx)
    {
        var buttonobj = context.canvas.buttonobj;
        canvas.buttonheight = buttonobj.value();
        context.canvas.virtualheight = len*canvas.buttonheight*0.635;
        var a = new FillPanel("rgba(0,0,0,0.65)");
        a.draw(context, rect, 0, 0);
    }

    var size = Math.ceil(rect.height/canvas.buttonheight)+3;
    var current = Math.floor(
        Math.lerp(0,slices.length-1,1-context.canvas.timeobj.berp()));
    var slicegroup = getrotatedlist(context.canvas.rotated,slices.length,current,size);
    context.canvas.visibles = [];
    for (var m = 0; m < slicegroup.length; ++m)
    {
        var n = slicegroup[m];
        var slice = slices[n];
        slice.fitheight = 0;
        var t = time + n*delayinterval;
        var bos = Math.tan(t*VIRTCONST);
        var j = Math.berp(-1, 1, bos);
        var y = j * context.canvas.virtualheight;
        var e = (context.canvas.virtualheight-rect.height)/2;
        y -= e;
        var x = rect.width/2;
        context.canvas.visibles.push({slice, x, y, n});
    }

    offmenucnv.width = rect.width;
    offmenucnv.height = rect.height;
    var isvisiblecount = 0;
    for (var m = 0; m < context.canvas.visibles.length; ++m)
    {
        var j = context.canvas.visibles[m];
        var height = canvas.buttonheight;
        j.slice.center = {x: j.x, y: j.y};
        j.slice.fitwidth = rect.width;
        j.slice.fitheight = height;
        j.slice.rect = new rectangle(0,j.y,rect.width,height);
        j.slice.isvisible = j.y > -height && j.y<window.innerHeight;
        isvisiblecount += j.slice.isvisible?1:0;
        offmenuctx.canvas.scrollobj = context.canvas.scrollobj;
        offmenuctx.save();
        var r = new rectangle(0,0,rect.width,height);
        offmenuctx.translate(0, j.y);
        context.canvas.draw(offmenuctx, r, j.slice, j.n);
        offmenuctx.restore();
    }

    infobj.data[0] = `${context.canvas.visibles.length}`;
    infobj.data[1] = `${((context.canvas.visibles.length*canvas.buttonheight)/rect.height).toFixed(2)}`;
    infobj.data[2] = `${isvisiblecount} of ${context.canvas.visibles.length}`;

    context.drawImage(offmenucnv, 0, 0);
    context.canvas.bar.draw(context, rect, 0, 0);
    context.canvas.scroll.draw(context, rect, 0, 0);
}

var eventlst =
[
    {dblclick: "DEFAULT", mouse: "DEFAULT", thumb: "DEFAULT", tap: "DEFAULT", pan: "DEFAULT", swipe: "DEFAULT", button: "DEFAULT", wheel: "DEFAULT", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new Empty(), scroll: new ScrollMenuBar(), buttonheight: 0, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU",  drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar(), scroll: new ScrollMenuBar(), buttonheight: 50, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new SearchBar(), scroll: new ScrollMenuBar(), buttonheight: 90, width: 640},
    {dblclick: "BOSS", mouse: "DEFAULT", thumb: "BOSS",  tap: "BOSS", pan: "BOSS", swipe: "BOSS", button: "BOSS", wheel: "BOSS", drop: "GALLERY", key: "BOSS", press: "BOSS", pinch: "BOSS", bar: new Empty(), scroll: new DualPanel(), buttonheight: 30, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel:  "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar(), scroll: new DualPanel(), buttonheight: 90, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar(), scroll: new ScrollMenuBar(), buttonheight: 50, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar(), scroll: new ScrollMenuBar(), buttonheight: 90, width: 640},
    {dblclick: "GALLERY", mouse: "MENU", thumb: "DEFAULT", tap: "GALLERY", pan: "GALLERY", swipe: "GALLERY", button: "GALLERY", wheel: "GALLERY", drop: "GALLERY", key: "GALLERY", press: "GALLERY", pinch: "GALLERY", bar: new GalleryBar(), scroll: new DualPanel(), buttonheight: 320, width: 2160},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar("Image Browser"), scroll: new ScrollMenuBar(), buttonheight: 50, width: 640},
];

var contextobj = new circular_array("CTX", contextlst);
contextlst.forEach(function(context, n)
{
    var canvas = context.canvas;
    context.font = DEFAULTFONT;
    context.fillText("  ", 0, 0);
    canvas.autodirect = -1;
    canvas.slideshow = 0;
    canvas.slidereduce = 0;
    canvas.keyuptime = 0;
    canvas.slidestop = 0;
    canvas.lastime = 0;
    canvas.keyblock = 100;
    canvas.sliceobj = new circular_array("", []);
    canvas.timeobj = new circular_array("", TIMEOBJ);
    canvas.timeobj.set(TIMEOBJ/2);
    canvas.scrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);
    canvas.imagescrollobj = new circular_array("IMAGESCROLL", Math.floor(window.innerHeight/2));
    canvas.imagescrollobj.set(0.5*canvas.imagescrollobj.length());
    canvas.textscrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);

    var obj = eventlst[n];
    canvas.width_ = obj.width;
    canvas.bar = obj.bar;
    canvas.scroll = obj.scroll;
    canvas.buttonheight = obj.buttonheight;

    var k = pinchlst.findIndex(function (a) { return a.name == obj.pinch });
    k = pinchlst[k];
    canvas.pinch_ = k.pinch;
    canvas.pinchstart_ = k.pinchstart;
    canvas.pinchend_ = k.pinchend;

    var k = dblclicklst.findIndex(function (a) { return a.name == obj.dblclick });
    k = dblclicklst[k];
    canvas.dblclick_ = k.click;

    var k = droplst.findIndex(function (a) { return a.name == obj.drop });
    k = droplst[k];
    canvas.drop = k.drop;

    var k = keylst.findIndex(function (a) { return a.name == obj.key });
    k = keylst[k];
    canvas.keyup_ = k.keyup;
    canvas.keydown_ = k.keydown;

    var k = wheelst.findIndex(function (a) { return a.name == obj.wheel });
    k = wheelst[k];
    canvas.wheelup_ = k.up;
    canvas.wheeldown_ = k.down;
    canvas.wheeleft_ = k.left;
    canvas.wheelright_ = k.right;

    var k = mouselst.findIndex(function (a) {return a.name == obj.mouse});
    k = mouselst[k];
    canvas.mouse = k;

    var k = presslst.findIndex(function (a) {return a.name == obj.press});
    k = presslst[k];
    canvas.pressup_ = k.pressup;
    canvas.press_ = k.press;

    var k = swipelst.findIndex(function (a) {return a.name == obj.swipe});
    k = swipelst[k];
    canvas.swipeleftright_ = k.swipeleftright;
    canvas.swipeupdown_ = k.swipeupdown;

    var k = buttonlst.findIndex(function (a) {return a.name == obj.button});
    k = buttonlst[k];
    canvas.draw = k.draw;

    var k = taplst.findIndex(function (a) {return a.name == obj.tap});
    k = taplst[k];
    canvas.tap_ = k.tap;

    var k = panlst.findIndex(function (a) {return a.name == obj.pan});
    k = panlst[k];
    context.canvas.panstart_ = k.panstart;
    context.canvas.pan_ = k.pan;
    context.canvas.panupdown_ = k.updown;
    context.canvas.panleftright_ = k.leftright;
    context.canvas.panend_ = k.panend;
});

_8cnv.scrollobj = new circular_array("SCROLL", [_8cnvctx.canvas.imagescrollobj,_8cnvctx.canvas.textscrollobj]);

contextobj.reset = function ()
{
    var context = _4cnvctx;
    if (photo.image &&
        photo.image.complete &&
        photo.image.naturalHeight)
    {
        resetboss();
    }
    else
    {
        if (galleryobj.value().file)
        {
            var file = galleryobj.value().file;
            var path = URL.createObjectURL(file)
            photo.image = new Image();
            photo.image.src = path;
        }
        else
        {
            var id = galleryobj.value().id;
            var template = galleryobj.variant ? galleryobj.variant : "3840x3840";
            var path = `https://reportbase.com/image/${id}/${template}`;
            if (galleryobj.raw)
                path = `https://reportbase.com/image/${id}/blob`;
            else if (galleryobj.value().full)
                path = galleryobj.value().full;
            photo.image = new Image();
            photo.image.src = path;
        }

        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

        photo.image.onerror =
            photo.image.onabort = function(e)
        {
            console.log(e);
        }

        photo.image.onload = function()
        {
            this.aspect = this.width/this.height;
            this.size = ((this.width * this.height)/1000000).toFixed(1) + "MP";
            this.extent = `${this.width} x ${this.height}`;
            extentobj.data[0] = `${galleryobj.startimage+galleryobj.current()+1} of ${galleryobj.lastimage}`;
            extentobj.data[1] = this.extent;
            extentobj.data[2] = galleryobj.value().id?galleryobj.value().id:"Undefined";
            extentobj.data[3] = `${window.innerWidth} x ${window.innerHeight}`;
            var e = galleryobj.value();

            var j = "";
            if (url.searchParams.has(galleryobj.repos))
            {
                var k = url.searchParams.get(galleryobj.repos).split(".")[0].proper();
                j = `${k}.${galleryobj.current().pad(4)}`;
            }
            else
            {
                j = `${url.path}.${galleryobj.current().pad(4)}`;
            }

            traitobj.split(50, "0.1-1.0", traitobj.length());
            scapeobj.split(50, "0.1-1.0", scapeobj.length());

            document.title = `${j} (${photo.image.width}x${photo.image.height})`;
            rowobj.set(rowobj.length()/2);
            _4cnv.timeobj.set(TIMEOBJ/2);
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnv.autodirect = -_4cnv.movingpage;
            _4cnv.movingpage = 0;
            contextobj.reset()
            swipeobj.value().swipeleftright(context, context.rect(), 0, 0, 0)
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnvctx.refresh();
            setTimeout(function() { masterload(); }, 500);
        }
    }
}

function masterload()
{
    function func(direction, index)
    {
        galleryobj.rotate(direction);
        lst[n] = new Image();
        if (galleryobj.value().loaded)
           return;
        var id = galleryobj.value().id;
        var template = galleryobj.variant ? galleryobj.variant : "3840x3840";
        var path = `https://reportbase.com/image/${id}/${template}`;
        if (galleryobj.value().full)
            path = galleryobj.value().full;
        lst[n].src = path;
        lst[n].index = galleryobj.current();
        lst[n].onload = function()
        {
            galleryobj.data[this.index].loaded = 1;
        }
    }

    var lst = [];
    var k = galleryobj.current();
    var size = Math.min(5,galleryobj.length());
    galleryobj.value().loaded = 1;
    for (var n = 0; n < size; ++n) { func(1,n); }
    galleryobj.set(k);
    for (var n = size; n < size+2; ++n) { func(-1,n); }
    galleryobj.set(k);
}

function gridToRect(cols, rows, margin, width, height)
{
    var rects = [];
    var iheight = height + margin;
    var rwidth = width + margin;
    var ww = parseInt(rwidth / cols);
    var hh = parseInt(iheight / rows);
    var xadj = rwidth - (cols * ww);
    var yadj = iheight - (rows * hh);
    var y = 0;

    var n = 0;
    for (var row = 0; row < rows; ++row)
    {
        var h = hh - margin;
        if (yadj-- >= 1)
            h++;
        var x = 0;
        for (var col = 0; col < cols; ++col, ++n)
        {
            var w = ww - margin;
            if (col >= (cols - xadj))
                w++;
            rects[n] = new rectangle(x, y, w, h);
            rects[n].row = row;
            rects[n].col = col;
            x += w + margin;
        }

        y += h + margin;
    }

    return rects;
}

function gridToGridB(k, extent)
{
    var e = k.slice(0);
    var empty_slots = 0;
    var aextent = 0;
    for (var n = 0; n < e.length; ++n)
    {
        if (e[n] == -1)
            continue;
        if (e[n] < 1)
            e[n] = extent * Math.abs(e[n]);
        aextent += e[n];
        empty_slots += e[n] == 0 ? 1 : 0;
    }

    if (empty_slots == 0)
        return e;

    var balance = extent - aextent;
    if (balance <= 0)
        return e;

    var slot_extent = Math.floor(balance / empty_slots);
    var remainder = balance - (empty_slots * slot_extent);

    for (n = e.length - 1; n >= 0; --n)
    {
        if (e[n])
            continue;

        var d = slot_extent;
        if (remainder-- >= 1)
            d++;
        e[n] = d;
    }

    return e;
}

Array.prototype.sum = function ()
{
    return this.reduce(function (a, b) { return a + b; });
};

Array.prototype.hitest = function (x, y)
{
    var n = 0;
    for (; n < this.length; ++n)
    {
        var rect = this[n];
        if (!rect || !rect.hitest || !rect.hitest(x, y))
            continue;
        break;
    }

    return n==this.length?-1:n;
};

Math.getPans = function (size, extent, factor)
{
    var j = size < extent ? 1 : Math.lerp(0.01, size / extent, factor);
    if (size > 200)
        size = size / 2;
    size = Math.clamp(0, Math.max(size, 10), extent);
    var lst = [];
    for (var n = 0; n < extent; ++n)
    {
        var k = Math.lerp(0, size * j, n / extent);
        lst.push(Math.floor(k));
    }

    return lst;
};

var panhorz = function (obj, x)
{
    if (typeof obj.offset === "undefined")
    {
        obj.offset = obj.anchor() - x;
        return -1;
    }
    else
    {
        return x + obj.offset;
    }
};

var panvert = function (obj, y)
{
    if (typeof obj.offset === "undefined")
    {
        obj.offset = obj.anchor() - y;
        return -1;
    }
    else
    {
        return y + obj.offset;
    }
};

var Rectangle = function (r)
{
    this.draw = function (context, rect, user, time)
    {
        if (!r)
            r = user;
        r.x  = rect.x;
        r.y  = rect.y;
        r.width  = rect.width;
        r.height  = rect.height;
    }
}

var CirclePanel = function (color, scolor, width)
{
    this.draw = function (context, rect, user, time)
    {
	    context.save();
        var radius = rect.height / 2;
	    if (radius <= 0)
            return;
    	context.beginPath();
        context.arc(rect.x + rect.width / 2, rect.y + rect.height / 2, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.fill();
        if (width)
        {
		    context.strokeStyle = scolor;
            context.lineWidth = width;
			context.stroke();
        }

		context.restore();
    };
};

var RotatedText = function()
{
    this.draw = function (context, rect, user, time)
    {
        //https://erikonarheim.com/posts/canvas-text-metrics/
        const pos = [10, 100];
        const bounds =
        {
          top: pos[1] - metrics.actualBoundingBoxAscent,
          right: pos[0] + metrics.actualBoundingBoxRight,
          bottom: pos[1] + metrics.actualBoundingBoxDescent,
          left: pos[0] - metrics.actualBoundingBoxLeft
        };

        const center =
        [
          (bounds.left + bounds.right) / 2,
          (bounds.top + bounds.bottom) / 2
        ];

        context.save();
        context.translate(center[0], center[1]);
        context.scale(1, -1);
        context.rotate(Math.PI / 4);
        context.fillText(text, pos[0] - center[0], pos[1] - center[1]);
        context.restore();
    }
};

var Text = function (color,  align="center", baseline="middle",
    reverse=0, noclip=0, font=DEFAULTFONT)
{
    this.draw = function (context, rect, user, time)
    {
		if (typeof (user) !== "string")
            return;

        if (rect.width < 0)
            return;
        var n = user.length;
        if (n <= 0)
            return;

        if (reverse)
            user = user.split("").reverse().join("");

        context.save();
        context.textAlign = align;
        context.textBaseline = baseline;
        context.fillStyle = color;
        context.font = font;

        var metrics;
        var str;

        if (!noclip)
        {
            do
            {
                str = user.substr(0, n);
                metrics = context.measureText(str);
                n--;
            }
            while (n >= 0 && metrics.width > rect.width);
        }
        else
        {
            str = user;
        }

        var x = rect.x;
        if (align == "center")
            x = rect.x + rect.width / 2;
        else if (align == "right")
            x = rect.x + rect.width - 1;
        var y = rect.y + Math.floor(rect.height/2) + 1;

        if (reverse)
            str = str.split("").reverse().join("");
        context.fillText(str, x, y);
        context.restore();
    };
};

var Row = function (e, panel)
{
    this.draw = function (context, rect, user, time)
    {
        if (!e.length)
            e = new Array(panel.length).fill(0);
        var j = gridToGridB(e, rect.height);

        var y = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;

            var r = rect.get(0, y, rect.width, j[n]);
            y += j[n];
            if (typeof (panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user, time);
        }
    };
};

var Col = function (e, panel)
{
    this.draw = function (context, rect, user, time)
    {
        if (!e.length)
            e = new Array(panel.length).fill(0);
        var j = gridToGridB(e, rect.width);
        var x = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(x, 0, j[n], rect.height);
            x += j[n];
            if (typeof (panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user, time);
        }
    };
};

var RowA = function (e, panel)
{
    this.draw = function (context, rect, user, time)
    {
        var j = gridToGridB(e, rect.height);
        var y = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(0, y, rect.width, j[n]);
            y += j[n];
            if (typeof (panel[n]) != "object")
                continue;
            r.id = n;
            panel[n].draw(context, r, user[n], time);
        }
    };
};

var ColA = function (e, panel)
{
    this.draw = function (context, rect, user, time)
    {
        var j = gridToGridB(e, rect.width);
        var x = 0;
        for (var n = 0; n < panel.length; ++n)
        {
            if (j[n] == -1)
                continue;
            var r = rect.get(x, 0, j[n], rect.height);
            x += j[n];
            if (typeof (panel[n]) != "object")
                continue;
            panel[n].draw(context, r, user[n], time);
        }
    };
};

var Grid = function (cols, rows, margin, panel)
{
    this.draw = function (context, rect, user, time)
    {
        var rects = new gridToRect(cols, rows, margin, rect.width, rect.height);
        for (var n = 0; n < cols*rows; ++n)
        {
            var r = rect.get(rects[n].x, rects[n].y,
                rects[n].width, rects[n].height);
            panel.draw(context, r, user, time);
        }
    };
};

var GridA = function (cols, rows, margin, panel)
{
    this.draw = function (context, rect, user, time)
    {
        var rects = new gridToRect(cols, rows, margin, rect.width, rect.height);
        for (var n = 0; n < cols*rows; ++n)
        {
            var r = rect.get(rects[n].x, rects[n].y,
                rects[n].width, rects[n].height);
            panel.draw(context, r, user[n], time);
        }
    };
};

var Expand = function (panel, extentw, extenth)
{
    this.draw = function (context, rect, user, time)
    {
		return panel.draw(context, new rectangle(
			rect.x-extentw,
			rect.y-extenth,
			rect.width+extentw*2,
			rect.height+extenth*2),
				user, time);
    };
};

var ShadowPanel  = function (panel, x=1, y=1)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.shadowOffsetX = x;
        context.shadowOffsetY = y;
        context.shadowColor = x == 1 ? "black" : "white";
        panel.draw(context, rect, user, time);
        context.restore();
    };
};

var ShiftPanel = function (panel, x, y)
{
    this.draw = function (context, rect, user, time)
    {
        panel.draw(context, new rectangle(rect.x+x,rect.y+y,rect.width,rect.height), user, time);
    };
};

var Shadow = function (panel, x, y)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.shadowOffsetX = x;
        context.shadowOffsetY = y;
		context.strokeStyle = "white";
		context.shadowColor = "black";
        panel.draw(context, rect, user, time);
        context.restore()
    };
};


var Shrink = function (panel, extentw, extenth)
{
    this.draw = function (context, rect, user, time)
    {
		return panel.draw(context, new rectangle(
			rect.x+extentw,
			rect.y+extenth,
			rect.width-extentw*2,
			rect.height-extenth*2),
				user, time);
    };
};

var Rounded = function (color, linewidth, strokecolor, radiustop, radiusbot)
{
    this.draw = function (context, rect, user, time)
    {
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var height = rect.height;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x, y + radiustop);
        context.lineTo(x, y + height - radiusbot);
        context.arcTo(x, y + height, x + radiusbot, y + height, radiusbot);
        context.lineTo(x + width - radiusbot, y + height);
        context.arcTo(x + width, y + height, x + width, y + height - radiusbot, radiusbot);
        context.lineTo(x + width, y + radiustop);
        context.arcTo(x + width, y, x + width - radiustop, y, radiustop);
        context.lineTo(x + radiustop, y);
        context.arcTo(x, y, x, y + radiustop, radiustop);
        context.fill();
		if (linewidth)
		{
			context.lineWidth = linewidth;
			context.strokeStyle = strokecolor;
			context.stroke();
		}
    };
};

var Layer = function (panels)
{
    this.draw = function (context, rect, user, time)
    {
        for (var n = 0; n < panels.length; ++n)
        {
            if (typeof (panels[n]) == "object")
                panels[n].draw(context, rect, user, time);
        }
    };
};

var LayerA = function (panels)
{
    this.draw = function (context, rect, user, time)
    {
        for (var n = 0; n < panels.length; ++n)
        {
            if (typeof (panels[n]) == "object")
                panels[n].draw(context, rect, user[n], time);
        }
    };
};

var ImagePanel = function (shrink)
{
    this.draw = function (context, rect, user, time)
    {
        var w = user.width*(shrink?shrink:1)
        var h = user.height*(shrink?shrink:1);
        var x = Math.floor(rect.x + (rect.width - w) / 2);
        var y = Math.floor(rect.y + (rect.height - h) / 2);

        context.save();
        if (user.degrees)
        {
            context.translate(x+w/2, y+h/2);
            context.rotate(user.degrees*Math.PI/180.0);
            context.translate(-x-w/2, -y-h/2);
        }

        context.drawImage(user, x, y, w, h);
        context.restore();
	};
};

var AnchorHPanel = function (panel, extent)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
	    var anchor = user.anchor();
        var length = user.length();
        var nub = Math.nub(anchor, length, extent, rect.width);
        var r = new rectangle(rect.x + nub, rect.y, extent, rect.height);
        panel.draw(context, r, 0, time);
        context.restore();
    };
};

var CurrentHPanel = function (panel, extent)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
	    var current = user.current();
        var length = user.length();
        var nub = Math.nub(current, length, extent, rect.width);
        var r = new rectangle(rect.x + nub, rect.y, extent, rect.height);
        panel.draw(context, r, 0, time);
        context.restore();
    };
};

var CurrentVPanel = function (panel, extent, rev)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var k = rev ? user.length() - user.current() : user.current();
        var nub = Math.nub(k, user.length(), extent, rect.height);
        var r = new rectangle(rect.x, rect.y + nub, rect.width, extent);
        panel.draw(context, r, 0, time);
        context.restore();
    };
};

//Math.nub(99,100,100,1000) = 900
//Math.nub(0,100,100,1000) = 0
Math.nub = function (n, size, nubextent, extent)
{
    var b = Math.berp(0,size-1,n);
    var e = b*nubextent;
    var f = b*extent;
    return f - e;
};

function rotate(pointX, pointY, originX, originY, angle)
{
	angle = angle * Math.PI / 180.0;
	var k = {
		x: Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX,
		y: Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY
	};

	return k;
}

function resize()
{
    delete _4cnv.thumbcanvas;
    contextobj.reset()
    galleryobj.transparent = 0;
    var h = window.self !== window.top ? 0 : BEXTENT;
    headcnvctx.show(0,0,window.innerWidth,h);
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    menuobj.show();
    _4cnvctx.refresh();
}

function escape()
{
    if (dialog && dialog.open())
    {
        dialog.close();
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        return;
    }

    if (galleryobj.hideboss && menuobj.value() == _8cnvctx)
        return;

    overlayobj.set(0);
    slicewidthobj.debug = 0;
    menuobj.hide();
    headobj.set(3);
    bossobj.set(1);
    headham.panel = headobj.value();
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    delete _4cnv.thumbcanvas;
    galleryobj.transparent = 0;
    contextobj.reset();
}

window.addEventListener("focus", (evt) => { });
window.addEventListener("blur", (evt) => { });
window.addEventListener("resize", (evt) => { resize(); });
window.addEventListener("screenorientation", (evt) => { resize(); });

var headlst =
[
	new function ()
	{
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {pressobj.geturrent().press(_4cnvctx, rect, x, y)}
     	this.tap = function (context, rect, x, y) {tapobj.value().tap(_4cnvctx, rect, x, y)};
		this.draw = function (context, rect, user, time)
        {
            context.clear();
        };
	},
	new function ()
	{
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {pressobj.value().press(_4cnvctx, rect, x, y)}

     	this.tap = function (context, rect, x, y)
		{
            if (context.thumbpanel && context.thumbpanel.hitest(x,y))
            {
                galleryobj.hidebars = galleryobj.hidebars?0:1;
                _8cnvctx.refresh();
            }
            else if (context.canvas.searchrect && context.canvas.searchrect.hitest(x,y))
            {
                menuobj.showindex(_3cnvctx);
            }
            else if (context.fullrect && context.fullrect.hitest(x,y))
            {
                if (screenfull.isEnabled)
                {
                    if (screenfull.isFullscreen)
                        screenfull.exit();
                    else
                        screenfull.request();
                }
            }
            else if (context.canvas.optionrect && context.canvas.optionrect.hitest(x,y))
            {
                headobj.set(1);
                bossobj.set(0);
                headham.panel = headobj.value();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
                menuobj.showindex(_2cnvctx);
                _4cnvctx.refresh()
            }
            else if (context.canvas.helprect && context.canvas.helprect.hitest(x,y))
            {
                headobj.set(1);
                bossobj.set(0);
                headham.panel = headobj.value();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
                menuobj.showindex(_7cnvctx);
                _4cnvctx.refresh()
            }
            else
            {
     	        tapobj.value().tap(_4cnvctx, rect, x, y);
            }

            setTimeout(function()
            {
                _4cnvctx.refresh();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            }, 20);
		};

		this.draw = function (context, rect, user, time)
        {
            context.clear();
            var k = menuobj.value();
            var w = k?k.canvas.width:0;
            var b = window.innerWidth == w;
            var j = menuobj.value()&&b;
            context.save();
            var a = new Row([BEXTENT,0],
            [
               new Col( [MARGINBAR, ALIEXTENT,0, 50,50,50, 0,ALIEXTENT, MARGINBAR],
               [
                   0,
                   j?0:new OptionPanel(),
                   0,
                   k?0:new ShiftPanel(new FullPanel(),-10,0),
                   k?0:new SearchPanel(),
                   k?0:new ShiftPanel(new ThumbPanel(),10,0),
                   0,
                   j?0:new HelpPanel(),
                   0,
                ]),
               0,
            ]);

            a.draw(context, rect, 0, 0);
            context.restore();
        }
    },
	new function ()
	{
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {pressobj.value().press(_4cnvctx, rect, x, y)}
    	this.tap = function (context, rect, x, y) {tapobj.value().tap(_4cnvctx, rect, x, y);}
		this.draw = function (context, rect, user, time) { };
	},
	new function ()
	{
        this.pan = function (context, rect, x, y, type)
        {
            if (type == "panleft" || type == "panright")
            {
                var k = panhorz(context.canvas.scrollobj, rect.width-x);
                if (k == -1)
                    return;
                if (k == context.canvas.scrollobj.anchor())
                    return;
                context.canvas.scrollobj.set(k);
            }

            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }

        this.panend = function (context, rect, x, y)
        {
            delete context.canvas.scrollobj.offset;
        }

        this.panstart = function (context, rect, x, y)
        {
        }

        this.swipeleftright = function (context, rect, x, y, evt)
        {
        }

        this.swipeupdown = function (context, rect, x, y, evt)
        {
        }

    	this.press = function (context, rect, x, y)
        {
        }

    	this.tap = function (context, rect, x, y)
		{
            if (context.moveprev && context.moveprev.hitest(x,y))
            {
                _4cnvctx.movepage(-1);
            }
            else if (context.movenext && context.movenext.hitest(x,y))
            {
                _4cnvctx.movepage(1);
            }
            else if (context.prompt.hitest(x,y))
            {
                if (galleryobj.value().image_url)
                {
                    let a = document.createElement('a');
                    a.href = galleryobj.value().image_url;
                    a.click();
                }
                else
                {
                    var k = galleryobj.value();
                    if (k.prompt)
                        showprompt(k.prompt);
                    else if (k.description)
                        showdescribe(k.description);
                }
            }
            else
            {
                tapobj.value().tap(_4cnvctx, rect, x, y);
            }
		};

		this.draw = function (context, rect, user, time)
		{
            context.clear();
            var k = menuobj.value();
            context.save();
            context.shadowColor = "black";
            context.prompt = new rectangle()
           var w = rect.width;
            if (w > rect.width-BEXTENT*2)
                w = rect.width-BEXTENT*2;
            var e = context.canvas.scrollobj.berp();
            var a = new Col([5,60,0,60,5],
                    [
                        0,
                        new PrevPanel(),
                        k?0:new Row([10,0,10],
                        [
                            0,
                            new Col([0,w,0],
                            [
                                0,
                                new Layer(
                                [
                                    new Rectangle(context.prompt),
                                    new ShadowPanel(new MultiText(e)),
                                ]),
                                0,
                            ]),
                            0
                        ]),
                        new NextPanel(),
                        0,
                    ]);

            var st = [];
            var k = galleryobj.value();
            if (k.prompt)
            {
                st = k.prompt.split("\n");
            }
            else if (k.description)
            {
                st = k.description.split("\n");
                if (k.photographer)
                    st.unshift(k.photographer);
            }

            a.draw(context, rect, st, time);
            context.restore()
		};
	},
	new function ()
	{
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {pressobj.value().press(_4cnvctx, rect, x, y)}
        this.tap = function (context, rect, x, y)
        {
            menuobj.setindex(_3cnvctx);
            menuobj.show();
        };

		this.draw = function (context, rect, user, time)
		{
            context.save();
            context.clear();

            var a = new Layer(
            [
                    //new FillPanel("black"),
                    new Col([0,50,0],
                    [
                        0,
                        new SearchPanel(),
                        0
                    ])
               ]);

            a.draw(context, rect, user, time);
            context.restore()
		};
	},
	new function ()
	{
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
        this.tap = function (context, rect, x, y){ tapobj.value().tap(_4cnvctx, rect, x, y); }
    	this.press = function (context, rect, x, y)
        {
            headobj.set(bossobj.current() == 0?1:3);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }

		this.draw = function (context, rect, user, time)
		{
            context.save();
            context.clear();
            context.restore()
		};
	},
	new function ()
	{
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {pressobj.value().press(_4cnvctx, rect, x, y)}
        this.tap = function (context, rect, x, y){ tapobj.value().tap(_4cnvctx, rect, x, y); }
		this.draw = function (context, rect, user, time) { };
	},
];

var headobj = new circular_array("HEAD", headlst);
var metaobj = new circular_array("", 6);
var positxpobj = new circular_array("POSITIONX", 100);
var positypobj = new circular_array("POSITIONY", 100);
var positxlobj = new circular_array("POSITIONX", 100);
var positylobj = new circular_array("POSITIONY", 100);
var positxobj = new circular_array("POSITIONX", [positxpobj,positxlobj]);
var posityobj = new circular_array("POSITIONY", [positypobj,positylobj]);

var ClosePanel = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        var j = rect.width*size;
        var k = j/2;
        var e = new FillPanel(OPTIONFILL);
        var a = new Layer(
        [
            new Row( [0, rect.height*0.35, 0],
            [
                0,
                new Col ([0,j,k,j,k,j,0], [0,e,0,e,0,e,0,]),
                0,
            ]),
        ])

        a.draw(context, rect, user, time);
        context.restore()
    }
};

var OptionPanel = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.canvas.optionrect = new rectangle()
        var j = 5;
        var k = j/2;
        var e = new FillPanel(OPTIONFILL);
        var s = menuobj.value() == _2cnvctx;
        var a = new Layer(
        [
            new Rectangle(context.canvas.optionrect),
            s ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new Shrink(new CirclePanel(s?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
            new Row( [0, rect.height*0.20, 0],
            [
                0,
                new Col ([0,j,k,j,k,j,0], [0,e,0,e,0,e,0,]),
                0,
            ]),
        ])

        a.draw(context, rect, user, time);
        context.restore()
    }
};

var HelpPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.canvas.helprect = new rectangle()
        var j = 5;
        var k = j/2;
        var e = new FillPanel(OPTIONFILL);
        var s = menuobj.value() == _7cnvctx;
        var a = new Layer(
        [
            new Rectangle(context.canvas.helprect),
            s ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new Shrink(new CirclePanel(s?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
            new Col( [0,rect.height*0.20,0],
            [
                0,
                new Row( [0,j,k,j,k,j,0], [0,e,0,e,0,e,0]),
                0,
            ]),
        ]);

        a.draw(context, rect, user, time);
        context.restore()
    }
};

window.addEventListener("keyup", function (evt)
{
    var context = menuobj.value()?menuobj.value():_4cnvctx;
	return context.canvas.keyup_(evt);
});

window.addEventListener("keydown", function (evt)
{
    var context = menuobj.value()?menuobj.value():_4cnvctx;
    return context.canvas.keydown_(evt);
}, false);

window.onerror = function(message, source, lineno, colno, error)
{
    //window.alert( error+","+lineno+","+console.trace());
};

window.addEventListener("pagehide", (evt) => { });
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() { setfavicon(); });

function setfavicon()
{
    var element = document.querySelector("link[rel='icon']");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      element.setAttribute("href","light.svg");
    else
      element.setAttribute("href","dark.svg");
}

window.addEventListener("visibilitychange", (evt) =>
{
    if (document.visibilityState === 'visible')
    {
        drawboss();
    }
    else
    {
        savelocal("gallery",_8cnv.timeobj.current())
    }
});

window.addEventListener("load", async () =>
{
    userobj.load();
});

function wraptext(ctx, text, maxWidth)
{
    if (!text)
        return [];
    let words = text.split(' ');
    let line = '';
    let testLine = '';
    let lineArray = [];

    for(var n = 0; n < words.length; n++)
    {
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0)
        {
            lineArray.push(line);
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else
        {
            line += `${words[n]} `;
        }

        if (n === words.length - 1)
            lineArray.push(line);
    }

    return lineArray;
}

var galleryobj = new circular_array("", 0);
galleryobj.init = function (obj)
{
    galleryobj = Object.assign(galleryobj,obj);
    galleryobj.startimage = 0;
    galleryobj.lastimage = galleryobj.length();
    if (url.searchParams.has("r"))
    {
        var str = url.searchParams.get("r");
        var k = str.clean();
        var j = k.split("-");
        if (j.length == 2)
        {
            galleryobj.startimage = Number(j[0]);
            galleryobj.lastimage = Number(j[1]);
            galleryobj.data = galleryobj.data.slice(j[0],j[1]);
        }
    }

    galleryobj.set(url.project);
    setfavicon();
    pretchobj.split(60, "40-90", pretchobj.length());
    letchobj.split(60, "40-90", letchobj.length());
    positxpobj.set(50);
    positypobj.set(70);
    positxlobj.set(50);
    positylobj.set(70);
    var zoom = (typeof galleryobj.zoom === "undefined") ?25:galleryobj.zoom;
    poomobj.set(zoom);
    loomobj.set(zoom);
    slicewidthobj.set(galleryobj.slicewidth?galleryobj.slicewidth:40);

    buttonobjreset();

    var k = getlocalnumber("gallery",0);
    _8cnv.timeobj.set(k);

    if (!galleryobj.length())
    {
        headobj.set(4);
        menuobj.setindex(_3cnvctx);
        menuobj.show();
    }
    else
    {
        if (leftmenu && galleryobj.length())
        {
            headobj.set(1);
            bossobj.set(0);
            _8cnv.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
            menuobj.toggle(_8cnvctx);
            _4cnvctx.refresh();
        }
        else
        {
            headobj.set(3);
        }
    }

    var h = window.self !== window.top ? 0 : BEXTENT;
    headcnvctx.show(0,0,window.innerWidth,h);
    headham.panel = headobj.value();

    _2cnv.sliceobj.data =
    [
        {title:"Open", path: "OPEN", func: function()
        {
            menuobj.hide();
            explore().then(function(files) { dropfiles(files); })
        }},

        {title:"Download", path: "DOWNLOAD", func: function()
            {
                download();
                menuobj.hide();
            }},
        {title:"Screenshot", path: "SCREENSHOT", func: function()
            {
                try
                {
                    var k = document.createElement('canvas');
                    var link = document.createElement("a");
                    link.href = _4cnv.toDataURL();
                    link.download = galleryobj.value()[0] + ".jpg";
                    link.click();
                }
                catch (_)
                {
                }
            }},
        {title:"Full Screen", path: "FULLSCREEN", func: function()
            {
                if (screenfull.isEnabled)
                {
                    if (screenfull.isFullscreen)
                        screenfull.exit();
                    else
                        screenfull.request();
                }
            },
            enabled: function() { return screenfull.isFullscreen; }
        },
        {title:"Debug", path: "DEBUG", func: function()
            {
                menuobj.hide();
                slicewidthobj.debug = slicewidthobj.debug ? 0 : 1;
                overlayobj.set(overlayobj.current() == 0?1:0);
                _4cnvctx.refresh();
             },
            enabled: function() { return slicewidthobj.debug; }
        },
       {title:"Login", path: "LOGIN", func: function()
            {
                authClient.redirectToLoginPage();
            }
        },
        {title:"Logout", path: "LOGOUT", func: function()
            {
                authClient.logout(true)
            }
        },
        {title:"Account", path: "ACCOUNT", func: function()
            {
                authClient.redirectToAccountPage()
            }
        },
    ];

    var a = Array(_2cnv.sliceobj.length()).fill().map((_, index) => index);
    _2cnv.rotated = [...a,...a,...a];

    _3cnv.sliceobj.data =
    [
        {line:"Unsplash\nImage Search", func: function() { searchshow("unsplash"); }, enabled: function() {return false;} },
        {line:"Pexels\nImage Search", func: function() { searchshow("pexels"); }, enabled: function() {return false;} },
        {line:"Pixabay\nImage Search",func: function() { searchshow("pixabay"); }, enabled: function() {return false;} },
        {line:"Pexels Collection\nImage Search",func: function() { searchshow("pexels_collection"); }, enabled: function() {return false;} },
        {line:"Unsplash Collection\nImage Search",func: function() { searchshow("unsplash_collection"); }, enabled: function() {return false;} },
        {line:"Unsplash User Collection\nImage Search",func: function() { searchshow("unsplash_user"); }, enabled: function() {return false;} },
        {line:"Dalle Prompt", func: function()
            {
                menuobj.hide();
                var k = galleryobj.value();
                showprompt(k.prompt?k.prompt:"");
             },
            enabled: function() { return false }
        },
        {line:"Delete Image", func: function()
            {
                var id = "78c6f4e3-b7f1-4d98-4c85-bf46937dc800";//galleryobj.value().id;
                fetch(`https://reportbase.com/image/${id}`, { method: 'DELETE' })
                .then(res =>
                    {
                        location.reload();
                        return res.json()
                    })
                .then(data => console.log(data))
                .catch(error => { console.log("Error:", error); });
            },
            enabled: function() { return false }
        },

        {line:"Dalle json", func: function()
            {
                fetch(`https://bucket.reportbase5836.workers.dev/dalle.json`)
                .then((response) => jsonhandler(response))
                .then(function (json)
                {
                    fetch(`https://dalle.reportbase5836.workers.dev`,
                    {
                        method: 'POST',
                        body: JSON.stringify(json)
                    })
                    .then((response) => jsonhandler(response))
                    .then((json) =>
                        {
                            galleryobj.data.splice(0,0,...json);
                            _8cnv.timeobj.set(0);
                            menuobj.setindex(_8cnvctx);
                            menuobj.show()
                        })
                    .catch((error) => {});
                })
                .catch((error) => {});
             },
            enabled: function() { return false }
        },
       {line:"ulid", func: function()
            {
                fetch("https://uuid.rocks/ulid")
                .then(response => texthandler(response))
                .then(uuid =>
                {
                    var body = JSON.stringify(lst);
                    fetch(`https://bucket.reportbase5836.workers.dev/${uuid}`, { method: 'POST', body: body } )
                      .then(response => jsonhandler(response))
                      .then(json => console.log(json) )
                      .catch(error => console.log(error) );

                })
                .catch((error) => console.log(error) );
            },
            enabled: function() { return false }
        },
       {line:"user.json", func: function()
            {
                userobj.save();
            },
            enabled: function() { return false }
        },
       {line:"worker.js",  func: function()
            {
                var offcnv = new OffscreenCanvas(200, 200);
                const offworker = new Worker('worker.js');
                offworker.postMessage({msg: 'offscreen', canvas: offcnv}, [offcnv]);
                offworker.addEventListener('message', function(ev)
                {
                    if (ev.data.msg === 'render')
                    {
                        var canvas = document.createElement("canvas");
                        let context = canvas.getContext("bitmaprenderer");
                        context.transferFromImageBitmap(ev.data.bitmap);
                        headcnvctx.drawImage(canvas, 0, 0);
                    }
                });
            },
            enabled: function() { return false }
        },
       {line:"6cnvctx", func: function()
            {
                menuobj.showindex(_6cnvctx);
            },
            enabled: function() { return false }
        },
     ];

    var a = Array(_3cnv.sliceobj.length()).fill().map((_, index) => index);
    _3cnv.rotated = [...a,...a,...a];

    _5cnv.sliceobj.data =
    [
        {
            title: "xxxxxxx",
            func: function() {}
        },
        {
            title: "yyyyyyy",
            func: function() {}
        },
        {
            title: "zzzzzzz",
            func: function() {}
        }
    ];

    var a = Array(_5cnv.sliceobj.length()).fill().map((_, index) => index);
    _5cnv.rotated = [...a,...a,...a];

    _6cnv.sliceobj.data =
    [
        {
            title: "xxxxxxx",
            func: function() {}
        },
        {
            title: "yyyyyyy",
            func: function() {}
        },
        {
            title: "zzzzzzz",
            func: function() {}
        }
    ];

    var a = Array(_6cnv.sliceobj.length()).fill().map((_, index) => index);
    _6cnv.rotated = [...a,...a,...a];

    _7cnv.sliceobj.data =
    [
        {
            line: "Image Viewer\nhttps://reportbase.com\nimages@reportbase.com\nTom Brinkman",
            func: function() {}
        },
        {
            line: "High Resolution\n360° Panoramas\nImage Stetch\nImage Zooming",
            func: function() {}
        },
        {
            line: "Digital Art\nGraphic Novels\nDrone Photgraphy\nLandscapes",
            func: function() {}
        },
        {
            line: "Side Scroller\nWrap Around\nFull Screen\nWide Image",
            func: function() {}
        },
    ];

    var a = Array(_7cnv.sliceobj.length()).fill().map((_, index) => index);
    _7cnv.rotated = [...a,...a,...a];

    _8cnv.sliceobj.data = galleryobj.data;
    _8cnv.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
    var a = Array(galleryobj.length()).fill().map((_, index) => index);
    _8cnv.rotated = [...a,...a,...a];

    var slices = _9cnv.sliceobj;
    slices.data = [];
    contextobj.reset();
}

url.path = "home";
url.project = 0;
var leftmenu = 1;

if (url.searchParams.has("p"))
{
    var e = url.searchParams.get("p");
    let k = e.split(".");
    url.path = k[0];
    leftmenu = k.length == 1;
    if (k.length == 2)
        url.project = Number(k[1]);
    var path = url.path.toLowerCase();
    path = `res/${path}.json`;
    fetch(path)
    .then(function (response)
    {
        if (!response.ok)
            throw new Error('Network error');
        return response.json()
    })
    .then((obj) => galleryobj.init(obj))
    .catch((error) => { galleryobj.init([]) });
}
else if (url.searchParams.has("q"))
{
    var e = url.searchParams.get("q");
    let k = e.split(".");
    url.path = k[0];
    leftmenu = k.length == 1;
    if (k.length == 2)
        url.project = Number(k[1]);
    var path = url.path.toLowerCase();

    fetch(`https://bucket.reportbase5836.workers.dev/${path}.json`)
    .then(function (response)
    {
        if (!response.ok)
            throw new Error('Network error');
        return response.json()
    })
    .then((obj) => galleryobj.init(obj))
    .catch((error) => { galleryobj.init([]) });
}
else if (url.searchParams.has("s"))
{
    var path = url.searchParams.get("s");
    fetch(path)
    .then(function (response)
    {
        if (!response.ok)
            throw new Error('Network error');
        return response.json()
    })
    .then((obj) => galleryobj.init(obj))
    .catch((error) => { galleryobj.init([]) });
}
else
{
    var path = `https://bucket.reportbase5836.workers.dev/home.json`;
    for (var n = 0; n < searchobj.length(); ++n)
    {
        var j = searchobj.data[n];
        var e = url.searchParams.get(j)
        if (!e)
            continue;
        var k = e.split(".");
        url.project = 0;
        leftmenu = k.length == 1;
        if (k.length == 2)
            url.project = Number(k[1]);
        var search = k[0].toLowerCase();
        path = `https://${j}.reportbase5836.workers.dev/?search=${search}&page=${url.page}`;
    }

    fetch(path)
    .then(function (response)
    {
        if (!response.ok)
            throw new Error('Network error');
        return response.json()
    })
    .then((obj) => galleryobj.init(obj))
    .catch((error) => { galleryobj.init([]) });
}

function downloadtext(name, text)
{
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', name);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function downloadimage()
{
    var url = `https://reportbase.com/image/HOPE.0000/blob`;
    fetch(url)
    .then(response => response.blob())
    .then(blob =>
    {
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = 'image.jpg';
      anchor.click();
      URL.revokeObjectURL(anchor.href);
      anchor.remove();
    })
    .catch(error =>
    {
      console.error('Error downloading image:', error);
    });
}

function download()
{
    if (galleryobj.value().image_url)
    {
        window.open(galleryobj.value().image_url);
    }
    else if (galleryobj.value().original)
    {
        window.open(galleryobj.value().original);
    }
    else if (galleryobj.value().full)
    {
        window.open(galleryobj.value().full);
    }
    else
    {
        var id = galleryobj.value().id;
        window.open(`https://reportbase.com/image/${id}/blob`);
    }
}

function pageshow()
{
    var input = document.getElementById("page-goto-value");
    input.addEventListener("keyup", function(event)
    {
      if (event.keyCode === 13)
      {
        event.preventDefault();
        var page = document.getElementById('page-goto-value').value.clean();
        if (!page)
          return;
            page = Math.clamp(galleryobj.startimage,
                galleryobj.lastimage, page);
            page -= galleryobj.startimage;
            var k = page/galleryobj.length()
            var obj = _8cnv.timeobj;
            obj.setperc(1-k);
            contextobj.reset();
            dialog.close();
      }
    });

    globalobj.block = 1;
    dialog = document.getElementById("page-goto");
    dialog.addEventListener("click", function()
    {
        var rect = input.getBoundingClientRect();
        if (event.target.id == "page-ok")
        {
            var page = document.getElementById('page-goto-value').value.clean();
            if (!page)
              return;
            page = Math.clamp(galleryobj.startimage,
                galleryobj.lastimage, page);
            page -= galleryobj.startimage;
            var k = page/galleryobj.length()
            var obj = _8cnv.timeobj;
            obj.setperc(1-k);
            contextobj.reset();
            dialog.close();
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            if (globalobj.block)
                return;
            dialog.close();
        }
    });

    var current = Math.floor(
        Math.lerp(1,galleryobj.length(),1-_8cnv.timeobj.berp()));

   document.getElementById('page-goto-value').value = current +
        galleryobj.startimage;
    dialog.showModal();
    setTimeout(function() { globalobj.block = 0; }, 40);
}


function searchshow(repos)
{
    var input = document.getElementById("search-value");
    input.addEventListener("keyup", function(event)
    {
      if (event.keyCode === 13)
      {
        event.preventDefault();
        var search = document.getElementById('search-value').value.clean();
        if (!search)
          return;
        window.open(`${url.origin}?${repos}=${search}&page=${url.page}`);
      }
    });

    globalobj.block = 1;
    dialog = document.getElementById("search-overlay");
    dialog.addEventListener("click", function()
    {
        var rect = input.getBoundingClientRect();
        if (event.target.id == "search-ok")
        {
            var search = document.getElementById('search-value').value.clean();
            if (!search)
                return;
            window.open(`${url.origin}?${repos}=${search}&page=${url.page}`);
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            if (globalobj.block)
                return;
            dialog.close();
        }
    });

    var search = "";
    if (url.searchParams.has(galleryobj.repos))
    {
        var k = url.searchParams.get(galleryobj.repos);
        search = k.split(".")[0];
    }

    document.getElementById('search-value').value = search;
    dialog.showModal();
    setTimeout(function() { globalobj.block = 0; }, 40);
}

function showprompt(str)
{
    var button = document.getElementById ("prompt-ok");
    button.innerHTML = "Submiit";
    var textarea = document.getElementById ("prompt-value");
    var rows = (window.innerHeight*0.50)/25;
    textarea.rows = rows;
    textarea.readOnly = false;

    globalobj.block = 1;
    dialog = document.getElementById("prompt-overlay");
    dialog.addEventListener("click", function()
    {
        const rect = textarea.getBoundingClientRect();
        if (event.target.id == "prompt-ok")
        {
            fetch(`https://dalle.reportbase5836.workers.dev`,
            {
                method: 'POST',
                body: JSON.stringify({ 'prompt': textarea.value, 'n': 1, 'size': '1024x1024' })
            })
            .then((response) => jsonhandler(response))
            .then((json) =>
                {
                    galleryobj.data.splice(0,0,...json);
                    _8cnv.timeobj.set(0);
                    menuobj.setindex(_8cnvctx);
                    menuobj.show()
                })
            .catch((error) => {});
            dialog.close();
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            if (globalobj.block)
                return;
            dialog.close();
        }
    });

    textarea.value = str;
    dialog.showModal();
    textarea.setSelectionRange(0, 0);
    setTimeout(function() { globalobj.block = 0; }, 40);
}

function showdescribe(str)
{
    var button = document.getElementById ("prompt-ok");
    button.innerHTML = "Copy";
    var textarea = document.getElementById ("prompt-value");
    var rows = (window.innerHeight*0.50)/25;
    textarea.rows = rows;
    textarea.value = str?str:"";
    textarea.readOnly = true;

    globalobj.block = 1;
    const dialog = document.getElementById("prompt-overlay");
    dialog.addEventListener("click", function()
    {
        const rect = textarea.getBoundingClientRect();
        if (event.target.id == "prompt-ok")
        {
            copytext(textarea.value);
            dialog.close();
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            if (globalobj.block)
                return;
            dialog.close();
        }
    });

    dialog.showModal();
    textarea.setSelectionRange(0, 0);
    setTimeout(function() { globalobj.block = 0; }, 40);
}

async function copytext(text)
{
    if (navigatory.clipboard)
        navigator.clipboard.writeText(text)
          .then(() => { })
          .catch(() => { });
}

if (url.protocol == "https:")
{
    authClient = PropelAuth.createClient({authUrl: "https://auth.reportbase.com", enableBackgroundTokenRefresh: true})
    authClient.getAuthenticationInfoOrNull(false)
    .then(function(client)
    {
        globalobj.user = 0;
        if (!client)
            return;

        globalobj.user = client.user;
        var body = JSON.stringify({ accessToken: client.accessToken, data: {tom:"Brinkman"}});
        fetch(`https://propelauth.reportbase5836.workers.dev`, { method: "POST", body: body })
          .then(response => jsonhandler(response))
          .then(json => console.log(json) )
          .catch(error => console.log(error) );
    })
}

function jsonhandler(response)
{
    if (response.ok)
        return response.json()
    throw Error(response.statusText);
}

function texthandler(response)
{
    if (response.ok)
        return response.text()
    throw Error(response.statusText);
}

function MovingAverage()
{
  const windowSize = 10;
  const values = [];

  this.update = function (value)
  {
    values.push(value);
    if (values.length > windowSize)
      values.shift();
    let sum = 0;
    for (let i = 0; i < values.length; i++)
      sum += values[i];
    return sum / values.length;
  };
}

movingx = new MovingAverage();
movingy = new MovingAverage();

function buttonobjreset()
{
    var min = galleryobj.min?galleryobj.min:0;
    var max = galleryobj.max?galleryobj.max:0;
    if (min && max)
    {
        var lst = [];
        for (var n = min; n < max; ++n)
            lst.push(n);
        _8cnv.buttonobj = new circular_array("", lst);
    }
    else
    {
        var ww = galleryobj.width?galleryobj.width:1024;;
        var hh = galleryobj.height?galleryobj.height:1024;;
        var w = url.searchParams.has("w")?url.searchParams.get("w"):ww;
        var h = url.searchParams.has("h")?url.searchParams.get("h"):hh;
        var a = w/h;
        var height = Math.floor(window.innerWidth/a);
        var lst = [];
        var j = Math.max(180,Math.floor(height/2));
        var b = Math.min(180*20,Math.floor(height*3));
        for (var n = j; n < b; ++n)
            lst.push(n);
        var k = lst.findIndex(function(a){return a == height});
        _8cnv.buttonobj = new circular_array("", lst);
        _8cnv.buttonobj.set(k);
    }
}

function savelocal(key, value)
{
    try
    {
        localStorage.setItem(`${url.path}.${key}`,value);
    }
    catch(_)
    {
    }
}

function getlocalstring(key, def)
{
    try
    {
        var str = localStorage.getItem(`${url.path}.${key}`);
        if (typeof str == "undefined")
            return def;
        return str;
    }
    catch(_)
    {
    }
}

function getlocalnumber(key, def)
{
    try
    {
        var str = localStorage.getItem(`${url.path}.${key}`);
        if (typeof str == "undefined")
            return def;
        return Number(str);
    }
    catch(_)
    {
    }
}
