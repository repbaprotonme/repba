//https://obfuscator.io
//pvid.io

/* ++ += ==
Copyright 2017 Tom Brinkman
http://www.reportbase.com
*/

const FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const VIRTCONST = 0.8;
const MAXVIRTUAL = 5760*(SAFARI?3:10);
const MENUBARWIDTH = 12;
const THUMBORDER = 5;
const ALIEXTENT = 60;
const BEXTENT = 80;
const TIMEOBJ = 3927;
const DELAYCENTER = TIMEOBJ;
const MENUSELECT = "rgba(255,175,0,0.4)";
const MENUTAP = "rgba(255,125,0,0.7)";
const SELECTAP = "rgba(255,0,0.75,0.7)";
const SCROLLNAB = "rgba(0,0,0,0.3)";
const DARKNAB = "rgba(0,0,0,0.85)";
const BARFILL = "rgba(0,0,0,0.5)";
const MENUCOLOR = "rgba(0,0,0,0.5)";
const OPTIONFILL = "white";
const THUMBFILP = "rgba(0,0,0,0.4)";
const THUMBFILL = "rgba(0,0,0,0.4)";
const THUMBSTROKE = "rgba(255,255,255,0.4)";
const SEARCHFRAME = "rgba(255,255,255,0.5)";
const TRANSPARENT = "rgba(0,0,0,0)";
const ARROWFILL = "white";
const SCROLLBARWIDTH = 8;
const MARGINBAR = 5;
const SMALLFONT = "15px archivo black";
const DEFAULTFONT = "16px archivo black";
const LARGEFONT = "18px archivo black";
const HUGEFONT = "20px archivo black";
const DOTSFONT = "60px archivo black";
const SLICEWIDTH = 30;
const SLICEWIDTHSIZE = 256;
const ZOOMAX = 92;
const IMAGELSTSIZE = SAFARI?30:120;
const ROUND = 8;

var panel = {}
var global = {};
let photo = {};
let util = {};
photo.image = 0;

let url = new URL(window.location.href);

util.random_color = function()
{
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

util.numbersonly = function(str)
{
    return str.split('').filter(char => !isNaN(char)).join('');
}

util.initialize_array_range = function(start, end)
{
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => start + index);
}

util.generate_uid = function()
{
    let timestamp = Date.now().toString(36);
    let randomPart = Math.random().toString(36).substr(2, 5);
    return timestamp + randomPart;
}

util.random_value = function (min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

util.clamp = function (min, max, val)
{
    if (typeof val === "undefined" || Number.isNaN(val) || val == null)
        val = max;
    if (max < min)
        return min;
    return (val < min) ? min : (val > max) ? max : val;
};

util.istouch = function()
{
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

util.rotated_list = function (lst, size, start, width)
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
        return Array.isArray(this.data) ?
            this.data.length : Number(this.data);
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

    this.rotateanchored = function (index)
    {
        this.CURRENT=this.ANCHOR-index;
        if (this.CURRENT >= this.length())
            this.CURRENT = this.CURRENT-this.length();
        else if (this.CURRENT < 0)
            this.CURRENT = this.length()+this.CURRENT;
    };

    this.rotate = function (index)
    {
        this.CURRENT+=index;
        if (this.CURRENT >= this.length())
            this.CURRENT = this.CURRENT-this.length();
        else if (this.CURRENT < 0)
            this.CURRENT = this.length()+this.CURRENT;
        this.ANCHOR = this.CURRENT;
    };

    this.setanchor = function (index)
    {
        if (typeof index === "undefined" ||
            Number.isNaN(index) || index == null)
            index = 0;
        if (Array.isArray(this.data))
            this.ANCHOR = util.clamp(0, this.length() - 1, Math.floor(index));
        else
            this.ANCHOR = util.clamp(0, this.length(), index);
    };

    this.setcurrent = function (index)
    {
        if (typeof index === "undefined" ||
            Number.isNaN(index) || index == null)
            index = 0;
        if (Array.isArray(this.data))
            this.CURRENT = util.clamp(0, this.length() - 1, Math.floor(index));
        else
            this.CURRENT = util.clamp(0, this.length(), index);
    };

    this.setdata = function (data)
    {
        this.data = data;
        if (this.current() >= this.length())
            this.setcurrent(this.length()-1);
    };

    this.set = function (index)
    {
        this.setcurrent(index);
        this.setanchor(index);
    };

    this.add = function (index)
    {
        this.set(this.current()+index);
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
        this.set(k);
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
timemain.set(4);

panel.yoll = function ()
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
let _10cnv = document.getElementById("_10");
let _10cnvctx = _10cnv.getContext("2d", opts);
let _11cnv = document.getElementById("_11");
let _11cnvctx = _11cnv.getContext("2d", opts);
let _12cnv = document.getElementById("_12");
let _12cnvctx = _12cnv.getContext("2d", opts);
let _13cnv = document.getElementById("_13");
let _13cnvctx = _13cnv.getContext("2d", opts);
let _14cnv = document.getElementById("_14");
let _14cnvctx = _14cnv.getContext("2d", opts);
let _15cnv = document.getElementById("_15");
let _15cnvctx = _15cnv.getContext("2d", opts);
let headcnv = document.getElementById("head");
let headcnvctx = headcnv.getContext("2d", opts);

headcnvctx.canvas.scrollobj = new circular_array("TEXTSCROLL", window.innerWidth/4);
headcnvctx.font = DEFAULTFONT;
headcnvctx.fillText("  ", 0, 0);

var offmenucnv = new OffscreenCanvas(1, 1);
var offmenuctx = offmenucnv.getContext("2d");
offmenuctx.font = DEFAULTFONT;
offmenuctx.fillText("  ", 0, 0);
offmenuctx.imageSmoothingEnabled = false;
offmenuctx.imageSmoothingQuality = "low";

var offbosscnv = new OffscreenCanvas(1, 1);
var offbossctx = offbosscnv.getContext("2d");
offbossctx.font = DEFAULTFONT;
offbossctx.fillText("  ", 0, 0);
offbossctx.imageSmoothingEnabled = false;
offbossctx.imageSmoothingQuality = "low";

let canvaslst = [];
for (var n = 0; n < 6; ++n)
    canvaslst[n] = document.createElement("canvas");

let slicelst = [];
const SLICERADIUS = 131000;
for (let n = 499; n >= 1; n=n-1)
    slicelst.push({slices: n*3, delay: SLICERADIUS/n});

panel.empty = function()
{
    this.draw = function (context, rect, user, time)
    {
    }
};

panel.gallerybar = function ()
{
    this.draw = function (context, rect, user, time)
    {
        var canvas = context.canvas;
        canvas.buttonrect = new rectangle();
        canvas.hscrollrect = new rectangle();
        canvas.vscrollrect = new rectangle();
        canvas.showpagerect = new rectangle();
        context.chapterect = new rectangle();
        canvas.galleryrect = new rectangle();
        canvas.searchrect = new rectangle();
        canvas.optionsrect = new rectangle();

        var visib = 1;
        var w = Math.min(120,rect.width-100);
        var j = window.innerWidth - rect.width >= 180;
        var ch = _5cnv.sliceobj.length()>1?26:-1;
        var ck = _5cnv.sliceobj.length()>1?8:-1;
        var rounded = new panel.rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0.4)", 16, 16);
        var text = new panel.shadow(new panel.text("rgb(255,255,255)", "center", "middle",0, 0));
        context.save();
        var a = new panel.layerA(
        [
            new panel.col([0,SCROLLBARWIDTH,5],
            [
                0,
                new panel.row([5,0,5],
                [
                    0,
                    new Layer(
                    [
                        new panel.expand(new Rectangle(canvas.vscrollrect),10,0),
                        new panel.currentV(new panel.shadow(
                            new panel.fill("white")), 90, 1),
                    ]),
                    0,
                ]),
                0,
            ]),
            new panel.rowA([80,0,26,8,ch,ck,26,26,SCROLLBARWIDTH,5],
            [
                 visib?new panel.col(
                 [
                     12,
                     ALIEXTENT,
                     0,
                     ALIEXTENT,
                     ALIEXTENT,
                     ALIEXTENT,
                     0,
                     ALIEXTENT,
                     12,
                 ],
                 [
                    0,
                    new panel.help(),
                    0,
                    new panel.fullscreen(),
                    new panel.meta(),
                    new panel.fitwindow(),
                    0,
                    new panel.gallery(),
                    0,
                 ]):0,
                 0,
                 0?new panel.col([0,w,0],
                 [
                     0,
                     new Layer(
                     [
                        new Rectangle(canvas.optionsrect),
                         text,
                     ]),
                     0,
                ]):0,
                0,
                 (_5cnv.sliceobj.length()>1)?
                     new Layer(
                     [
                        new Rectangle(context.chapterect),
                        text,
                     ]):0,
                0,
                new panel.col([0,w,0],
                 [
                     0,
                     new Layer(
                     [
                        new Rectangle(canvas.showpagerect),
                         text,
                     ]),
                     0,
                ]),
                0,
                new panel.col([5,0,5],
                [
                    0,
                    new Layer(
                    [
                        new panel.expand(new Rectangle(canvas.hscrollrect),0,10),
                        new panel.currentH(new panel.shadow(new panel.fill("white")), 90, 1),
                    ]),
                    0,
                ]),
                0
            ]),
        ]);

        var buttonobj = canvas.buttonobj;
        a.draw(context, rect,
        [
            canvas.timeobj,
            [
                0, 0,

                "Options",
                0,
                _5cnv.sliceobj.length() > 1 ?
                    _5cnv.sliceobj.value().title : "",
                0,
                infobj.value(),
                0,
                canvas.scrollobj.value(),
                0,
            ],
        ], 0, 0);
        context.restore();
    }
};

panel.scrollbar = function ()
{
    this.draw = function (context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();
        canvas.vscrollrect = new rectangle();

        var a = new panel.col([0,SCROLLBARWIDTH,5],
            [
                0,
                new panel.row([5,0,5],
                [
                    0,
                    new Layer(
                    [
                        new panel.expand(new Rectangle(canvas.vscrollrect),10,0),
                        new panel.currentV(new panel.shadow(
                            new panel.fill("white")), 90, 1),
                    ]),
                    0,
                ]),
                0,
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

Math.berp = function (v0, v1, t)
{
    return (t - v0) / (v1 - v0);
};

Math.lerp = function (v0, v1, t)
{
    return (1 - t) * v0 + t * v1;
};

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

panel.pattern = function ()
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

panel.multitext = function (e)
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
                var a = new panel.text("white", "center", "middle", 0, 0, SMALLFONT);
                a.draw(context, rect, str, 0);
                rect.y += rowheight;
            }
        }
    };
};

panel.fill = function (color)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.fillStyle = color?color:user;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
    };
};

panel.fullscreen = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.fullrect = new rectangle()

        var a = new Layer(
        [
            new Rectangle(context.fullrect),
            screenfull.isFullscreen ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),19,20) : 0,
            new panel.shrink(new panel.circle(screenfull.isFullscreen ? TRANSPARENT : SCROLLNAB, SEARCHFRAME,4),15,15),
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

panel.open = function ()
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
                var a = new panel.arrow(ARROWFILL,180);
                a.draw(context, rect, user, time);
                var a = new panel.fill(ARROWFILL);
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
            new panel.shrink(new panel.circle(SCROLLNAB, SEARCHFRAME,4),15,15),
            new panel.shrink(new Panel(),16,34),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.upload = function ()
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
                var a = new panel.arrow(ARROWFILL,0);
                a.draw(context, rect, user, time);
                var a = new panel.fill(ARROWFILL);
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
            new panel.shrink(new panel.circle(SCROLLNAB, SEARCHFRAME,4),15,15),
            new panel.shrink(new Panel(),16,34),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.meta = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.canvas.metarect = new rectangle();

        var a = new Layer(
        [
            new Rectangle(context.canvas.metarect),
            _8cnv.scrollobj.current() ? 0 : new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),19,19),
            new panel.shrink(new panel.circle(_8cnv.scrollobj.current() ? SCROLLNAB:TRANSPARENT, SEARCHFRAME,4),15,15),
            new panel.shrink(new panel.row([0,4,0],
            [
                new panel.circle("white"),
                0,
                new panel.circle("white"),
            ]),22,30),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.thumb = function ()
{
    this.draw = function (context, rect, user, time)
    {
        var j = bossobj.current() == 0;
        context.save();
        context.thumbpanel = new rectangle()
        var a = new Layer(
        [
            new Rectangle(context.thumbpanel),
            j ? 0 :
                new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),19,19),
            new panel.shrink(new panel.circle(j?SCROLLNAB:TRANSPARENT,SEARCHFRAME,4),15,15),
            new panel.shrink(new panel.rounded(TRANSPARENT, 3, "white", 4, 4),16,30),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.fitwindow = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.canvas.fitwindowrect = new rectangle();
        var a = new Layer(
        [
            new Rectangle(context.canvas.fitwindowrect),
            global.hometap ? new panel.shrink(new panel.circle( MENUTAP,TRANSPARENT,4),19,19) : 0,
            new panel.shrink(new panel.circle(global.hometap?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),15,15),
            new panel.shrink(new panel.row([0,0],
            [
                new panel.arrow(ARROWFILL,0),
                new panel.arrow(ARROWFILL,180),
            ]),22,26),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.previous = function ()
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
            _4cnv.movingpage == -1 ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(_4cnv.movingpage == -1?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
            new panel.shrink(new panel.arrow(ARROWFILL,270),20,30),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.next = function ()
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
            _4cnv.movingpage == 1 ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(_4cnv.movingpage == 1?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
            new panel.shrink(new panel.arrow(ARROWFILL,90),20,30),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.search = function ()
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
                rect.x += 2;
                rect.y += 7;
                rect.width = 19;
                rect.height = 19;
                var a = new panel.circle(TRANSPARENT,"white",4,1);
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
            s ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),19,19) : 0,
            new panel.shrink(new panel.circle(s?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),15,15),
            new panel.shrink(new Panel(),15,20),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

panel.stroke = function (color, width)
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

panel.arrow = function (color, degrees)
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
    if (!k.blob && (_4cnv.movingpage || !k.loaded || galleryobj.length() == 1))
    {
        masterload();
        _4cnv.movingpage = 0;
        this.refresh();
        return;
    }

    _4cnv.slidestop = 0;
    clearInterval(global.swipetimeout);
    global.swipetimeout = 0;
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
    bossobj.draw()
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
        else if (evt.deltaY > 0)
        {
            if (typeof (ham.panel.wheeldown) == "function")
                ham.panel.wheeldown(context, x, y, evt.ctrlKey, evt.shiftKey, evt.altKey);
        }
        if (evt.deltaX < 0)
        {
            if (typeof (ham.panel.wheeleft) == "function")
                ham.panel.wheeleft(context, x, y, evt.ctrlKey, evt.shiftKey, evt.altKey);
        }
        else if (evt.deltaX > 0)
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
        var x = util.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panmove) == "function")
            ham.panel.panmove(context, rect, x, y);
    });

    ham.on("panend", function (evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = util.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panend) == "function")
            ham.panel.panend(context, rect, x, y);
    });

	ham.on("panstart", function (evt)
    {
        evt.preventDefault();
        ham.x = evt.center.x;
        ham.y = evt.center.y;
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = util.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panstart) == "function")
            ham.panel.panstart(context, rect, x, y);
	});

    ham.on("panleft panright", function (evt)
    {
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = util.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
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
        var x = util.clamp(0, ham.element.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = util.clamp(0, ham.element.height - 1, evt.center.y - evt.target.offsetTop);
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
var _10ham = makehammer(_10cnvctx,0.5,15);
var _11ham = makehammer(_11cnvctx,0.5,15);
var _12ham = makehammer(_12cnvctx,0.5,15);
var _13ham = makehammer(_13cnvctx,0.5,15);
var _14ham = makehammer(_14cnvctx,0.5,15);
var _15ham = makehammer(_15cnvctx,0.5,15);
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
        var canvas = context.canvas;
        if (ctrl)
        {
            var buttonobj = context.canvas.buttonobj;
            buttonobj.addperc(1.5/100);
            context.refresh();
        }
        else
        {
            clearTimeout(canvas.timeout);
            canvas.timeout = setTimeout(function()
            {
                var canvas = context.canvas;
                context.swipetype = "swipeup";
                var slidestop = 4;
                var slidereduce = 48;
                movingx = new MovingAverage();
                movingy = new MovingAverage();
                canvas.slideshow = (canvas.timeobj.length()/canvas.virtualheight)*slidestop;
                canvas.slidereduce = canvas.slideshow/slidereduce;
                clearInterval(global.swipetimeout);
                global.swipetimeout = setInterval(function ()
                    {
                        context.refresh();
                    }, timemain.value());
                context.refresh();
            }, 4);
        }
    },
 	down: function (context, x, y, ctrl, shift, alt)
    {
        var canvas = context.canvas;
        if (ctrl)
        {
            var buttonobj = canvas.buttonobj;
            buttonobj.addperc(-1.5/100);
            context.refresh();
        }
        else
        {
            clearTimeout(canvas.timeout);
            canvas.timeout = setTimeout(function()
            {
                var canvas = context.canvas;
                context.swipetype = "swipedown";
                var slidestop = 4;
                var slidereduce = 48;
                movingx = new MovingAverage();
                movingy = new MovingAverage();
                canvas.slideshow = (canvas.timeobj.length()/canvas.virtualheight)*slidestop;
                canvas.slidereduce = canvas.slideshow/slidereduce;
                clearInterval(global.swipetimeout);
                global.swipetimeout = setInterval(function ()
                    {
                        context.refresh();
                    }, timemain.value());
                context.refresh();
            }, 4);
        }
    },
 	left: function (context, x, y, ctrl, shift, alt)
    {
        var obj = context.canvas.scrollobj.value();
        obj.addperc(-0.01);
        context.refresh()
    },
 	right: function (context, x, y, ctrl, shift, alt)
    {
        var obj = context.canvas.scrollobj.value();
        obj.addperc(0.01);
        context.refresh()
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
            clearTimeout(context.canvas.timeout);
            context.canvas.timeout = setTimeout(function()
            {
                var canvas = context.canvas;
                context.swipetype = "swipeup";
                var slidestop = 2;
                var slidereduce = 48;
                movingx = new MovingAverage();
                movingy = new MovingAverage();
                canvas.slideshow = (canvas.timeobj.length()/canvas.virtualheight)*slidestop;
                canvas.slidereduce = canvas.slideshow/slidereduce;
                clearInterval(global.swipetimeout);
                global.swipetimeout = setInterval(function ()
                    {
                        context.refresh();
                    }, timemain.value());
                context.refresh();
            }, 4);
        }
    },
 	down: function (context, x, y, ctrl, shift, alt)
    {
        if (ctrl)
        {
        }
        else
        {
            clearTimeout(context.canvas.timeout);
            context.canvas.timeout = setTimeout(function()
            {
                var canvas = context.canvas;
                context.swipetype = "swipedown";
                var slidestop = 2;
                var slidereduce = 48;
                movingx = new MovingAverage();
                movingy = new MovingAverage();
                canvas.slideshow = (canvas.timeobj.length()/canvas.virtualheight)*slidestop;
                canvas.slidereduce = canvas.slideshow/slidereduce;
                clearInterval(global.swipetimeout);
                global.swipetimeout = setInterval(function ()
                    {
                        context.refresh();
                    }, timemain.value());
                context.refresh();
            }, 4);
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
                zoomobj.value().add(1);
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
                zoomobj.value().add(-1);
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
        context.canvas.autodirect = -1;
        swipeobj.value().swipeleftright(context, context.rect(), 0, 0, 0)
        context.refresh();
    },
 	right: function (context, x, y, ctrl, shift, alt)
    {
        context.canvas.autodirect = 1;
        swipeobj.value().swipeleftright(context, context.rect(), 0, 0, 0)
        context.refresh();
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
        var k = util.clamp(data[0], data[data.length-1], scale*context.canvas.savepinch);
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
        clearInterval(global.swipetimeout);
        global.swipetimeout = 0;
        clearInterval(global.timeauto);
        global.timeauto = 0;
    },
    pinchend: function (context)
    {
        clearTimeout(global.pinchtime);
        global.pinchtime = setTimeout(function()
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
        var k = util.clamp(data[0], data[data.length-1], scale*context.canvas.savepinch);
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
        clearInterval(global.timeout);
        global.timeout = 0;
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
        clearTimeout(global.pinchtime);
        global.pinchtime = setTimeout(function()
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

var slicewidthobj = new circular_array("SLICEWIDTH", SLICEWIDTHSIZE);
slicewidthobj.debug = 0;

var poomobj = new circular_array("PORTZOOM", 100);
var loomobj = new circular_array("LANDZOOM", 100);
var zoomobj = new circular_array("ZOOM", [poomobj,loomobj]);
var traitobj = new circular_array("TRAIT", 100);
var scapeobj = new circular_array("SCAPE", 100);
var heightobj = new circular_array("HEIGHT", [traitobj,scapeobj]);
var pinchobj = new circular_array("PINCH", [heightobj,zoomobj]);

var userobj = {}

userobj.save = function()
{
    if (url.protocol == "https:")
    {
        authClient = PropelAuth.createClient({authUrl: "https://auth.reportbase.com", enableBackgroundTokenRefresh: true})
        authClient.getAuthenticationInfoOrNull(false)
        .then(function(client)
        {
             fetch(`https://bucket.reportbase5836.workers.dev/${client.user.userId}.json`,
                {
                    method: 'POST',
                    body: JSON.stringify(userobj)
                })
              .then(response => jsonhandler(response))
              .then(json => console.log(json) )
              .catch(error => console.log(error) );
        })
    }
}

async function loadzip(path)
{
    galleryobj.data = [];
    galleryobj.all = [];
    galleryobj.min = 0;
    galleryobj.max = 0;
    galleryobj.width = 0;
    galleryobj.height = 0;
    delete galleryobj.repos;
    const {entries} = await unzipit.unzip(path);
    let keys = Object.keys(entries);
    for (var n = 0; n < keys.length; ++n)
    {
        var key = keys[n];
        var entry = entries[key];
        if (entry.isDirectory)
            continue;
        var ext = key.replace(/^.*\./, '');
        if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' ||
            ext == 'webp' || ext == 'avif' || ext == 'gif')
        {
            var k = {}
            k.blob = await entries[key].blob(`image/${ext}`);
            var lst = key.split("/");
            k.ext = ext;
            k.name = lst.pop();
            k.filter = lst.join("/");
            if (!k.title)
                k.title = k.filter;
            galleryobj.data.push(k);
            if (!galleryobj.width)
            {
                var image = new Image();
                image.src = URL.createObjectURL(k.blob);
                image.onload = function(file)
                {
                    galleryobj.width = this.width;
                    galleryobj.height = this.height;
                    buttonobjreset()
                    URL.revokeObjectURL(this.src);
                };
            }
        }
    }

    galleryobj.init(galleryobj)
    _8cnvctx.refresh();
    menuobj.setindex(_8cnvctx);
    menuobj.show()
}

async function loadjson(path)
{
}

async function dropfiles(blobs)
{
    menuobj.hide();
    galleryobj.data = [];
    galleryobj.all = [];
    galleryobj.min = 0;
    galleryobj.max = 0;
    galleryobj.width = 0;
    galleryobj.height = 0;
    delete galleryobj.repos;

    for (var i = 0; i < blobs.length; i++)
    {
        var name = blobs[i].name.toLowerCase();
        var ext = name.replace(/^.*\./, '');
        if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' ||
            ext == 'webp' || ext == 'avif' || ext == 'gif')
        {
            var k = {}
            k.ext = ext;
            k.blob = blobs[i];
            galleryobj.data.push(k);
            if (!galleryobj.width)
            {
                var image = new Image();
                image.src = URL.createObjectURL(k.blob);
                image.onload = function(file)
                {
                    galleryobj.width = this.width;
                    galleryobj.height = this.height;
                    buttonobjreset()
                    URL.revokeObjectURL(this.src);
                };
            }
       }
    }

    galleryobj.init(galleryobj)
    _8cnv.timeobj.set(0);
    _8cnvctx.refresh();
    menuobj.setindex(_8cnvctx);
    menuobj.show()
}

var droplst =
[
{
    name: "DEFAULT",
    drop: function (context, evt)
    {
        var files = evt.dataTransfer.files;
        if (files.length == 1 && files[0].name)
        {
            var ext = files[0].name.toLowerCase().replace(/^.*\./, '');
            if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' ||
                ext == 'webp' || ext == 'avif' || ext == 'gif')
            {
                dropfiles(files);
            }
            else if (ext == 'zip' || ext == 'cbz')
            {
                loadzip(files[0]);
            }
            else if (ext == 'json')
            {
                loadgalleryblob(files[0]);
            }
        }
        else
        {
            dropfiles(files);
        }
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
        var canvas = context.canvas;
        var obj = canvas.scrollobj.value();
        if (type == "panleft" || type == "panright")
        {
            if (canvas.type == "panup" ||
                canvas.type == "pandown")
               return;
            canvas.type = type;
            if (canvas.isbuttonrect)
            {
               var obj = canvas.buttonobj
               var k = (x - canvas.buttonrect.x) / canvas.buttonrect.width;
               obj.setperc(k);
               context.refresh()
            }
            else if (canvas.ishbarect)
            {
                var obj = canvas.scrollobj.value();
                var k = (x-canvas.hscrollrect.x)/canvas.hscrollrect.width;
                obj.setperc(k);
                context.refresh();
            }
            else
            {
                var obj = canvas.scrollobj.value();
                var j = (rect.width-x)*2;
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
            galleryobj.pantype = type;
            if (canvas.type == "panleft" ||
                canvas.type == "panright")
               return;
            canvas.type = type;
            if (canvas.isvbarect)
            {
                var obj = canvas.timeobj;
                var k = (y-canvas.vscrollrect.y)/canvas.vscrollrect.height;
                obj.setperc(1-k);
                context.refresh()
            }
            else
            {
                var e = canvas.starty-y;
                var jvalue = TIMEOBJ/canvas.virtualheight
                jvalue *= e;
                canvas.timeobj.rotateanchored(jvalue);
                context.refresh()
            }
        }
    },
	panstart: function (context, rect, x, y)
    {
        var canvas = context.canvas;
        canvas.panning = 0;
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        delete canvas.slideshow;
        clearInterval(global.timeauto);
        global.timeauto = 0;
        canvas.starty = y;
        canvas.timeobj.setanchor(canvas.timeobj.current());
        canvas.isbuttonrect = canvas.buttonrect && canvas.buttonrect.hitest(x,y);
        canvas.ishbarect = canvas.hscrollrect && canvas.hscrollrect.hitest(x,y);
        canvas.isvbarect = canvas.vscrollrect && canvas.vscrollrect.hitest(x,y);
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
            var canvas = context.canvas;
            if (canvas.isvbarect)
            {
                var obj = canvas.timeobj;
                var k = (y-canvas.vscrollrect.y)/canvas.vscrollrect.height;
                obj.setperc(1-k);
                context.refresh()
            }
            else
            {
                var e = canvas.starty-y;
                var jvalue = TIMEOBJ/canvas.virtualheight
                jvalue *= e;
                canvas.timeobj.rotateanchored(jvalue);
                context.refresh()
            }
        }
    },
	panstart: function (context, rect, x, y)
    {
        var canvas = context.canvas;
        delete canvas.slideshow;
        clearInterval(global.timeauto);
        global.timeauto = 0;
        canvas.starty = y;
        canvas.timeobj.setanchor(canvas.timeobj.current());
        canvas.isvbarect = canvas.vscrollrect && canvas.vscrollrect.hitest(x,y);
    },
	panend: function (context, rect, x, y)
    {
        var canvas = context.canvas;
        delete canvas.starty;
        delete context.startt;
        delete canvas.timeobj.offset;
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
                var e = context.canvas.startx-x;
                var jvalue = TIMEOBJ/context.canvas.virtualwidth;
                jvalue *= e;
                context.canvas.timeobj.rotateanchored(jvalue);
                context.refresh()
            }
        }
        else if (type == "panup" || type == "pandown")
        {
            galleryobj.pantype = type;
            context.refresh()
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
                bossobj.reset();
            }
        }
    },
	panstart: function (context, rect, x, y)
	{
        var canvas = context.canvas;
        clearInterval(global.timeout);
        clearInterval(global.swipetimeout)
        canvas.slidestop = 0;
        canvas.startx = x;
        canvas.starty = y;
        canvas.isthumb = canvas.thumbrect &&
            canvas.thumbrect.hitest(x,y);
        canvas.timeobj.setanchor(canvas.timeobj.current());
        canvas.islicewidth = context.slicewidthrect && context.slicewidthrect.hitest(x,y);
        canvas.istretch = context.stretchrect && context.stretchrect.hitest(x,y);
        canvas.iszoom = context.zoomrect && context.zoomrect.hitest(x,y);
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        contextobj.reset();
    },
    panend: function (context, rect, x, y)
	{
        var canvas = context.canvas;
        if (galleryobj.hidefocus)
            galleryobj.transparent = 0;
        galleryobj.hidefocus = 0;
        clearTimeout(context.timepan)
        canvas.isthumb = 0;
        canvas.iszoom = 0;
        canvas.istretch = 0;
        delete stretchobj.value().offset;
        delete zoomobj.value().offset;
        delete canvas.startx;
        delete canvas.starty;
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
        var a = new panel.row([0,60,0],
        [
            0,
            new panel.shadow(new panel.text("white", "center", "middle",0, 0)),
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
        var canvas = context.canvas;
        if (canvas.archiverect && canvas.archiverect.hitest(x,y))
            return;
        if (canvas.loginrect && canvas.loginrect.hitest(x,y))
            return;
        if (canvas.buttonrect && canvas.buttonrect.hitest(x,y))
            return;
        if (canvas.hscrollrect && canvas.hscrollrect.hitest(x,y))
            return;
        if (canvas.vscrollrect && canvas.vscrollrect.hitest(x,y))
            return;
        if (canvas.fitwindowrect && canvas.fitwindowrect.hitest(x,y))
            return;
        if (canvas.fullrect && canvas.fullrect.hitest(x,y))
            return;
        if (canvas.searchrect && canvas.searchrect.hitest(x,y))
            return;

        if (canvas.shiftKey &&
            canvas.showpagerect &&
            canvas.showpagerect.hitest(x,y))
            infobj.rotate(1);
        else
            galleryobj.pantype = galleryobj.pantype == "panup"?"pandown":"panup";
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
        if (context.canvas.shiftKey &&
            context.extentrect &&
            context.extentrect.hitest(x,y))
        {
            if (galleryobj.value().id)
                copytext(galleryobj.value().id);
            extentobj.rotate(1);
            context.refresh();
        }
        else
        {
            headobj.set(1);
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
        }

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
        var slidestop = 9;
        var slidereduce = 48;
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        canvas.slideshow = (canvas.timeobj.length()/canvas.virtualheight)*slidestop;
        canvas.slidereduce = canvas.slideshow/slidereduce;
        clearInterval(global.swipetimeout);
        global.swipetimeout = setInterval(function ()
            {
                context.refresh();
            }, timemain.value());
        context.refresh();
   },
},
{
    name: "MENU",
    swipeleftright: function (context, rect, x, y, evt)
    {
        menuobj.hide();
    },
    swipeupdown: function (context, rect, x, y, evt)
    {
        var canvas = context.canvas;
        context.swipetype = evt.type;
        var slidestop = 4;
        var slidereduce = 50;
        canvas.slideshow = (context.canvas.timeobj.length()/context.canvas.virtualheight)*slidestop;
        canvas.slidereduce = canvas.slideshow/slidereduce;
        clearInterval(global.swipetimeout);
        global.swipetimeout = setInterval(function ()
            {
                context.refresh();
            }, timemain.value());
        context.refresh();
    },
},
{
    name: "BOSS",
    swipeleftright: function (context, rect, x, y, evt)
    {
        var canvas = context.canvas;
        if (evt)
            canvas.autodirect = evt.type == "swipeleft"?-1:1;
        var slidestop = Number(galleryobj.slidestop?galleryobj.slidestop:2);
        var slidereduce = Number(galleryobj.slidereduce?galleryobj.slidereduce:60);
        canvas.slidestop += slidestop;
        canvas.slidestop = (window.innerWidth/context.canvas.virtualwidth)*canvas.slidestop;
        canvas.slidereduce = canvas.slidestop/slidereduce;
        clearInterval(global.swipetimeout);
        global.swipetimeout = setInterval(function ()
            {
                bossobj.draw()
            }, timemain.value());
        context.refresh();
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
        var keycode = evt.keyCode || evt.which;
        canvas.shiftKey = evt.shiftKey;
        canvas.ctrlKey = evt.ctrlKey;
        canvas.slideshow = 0;
        var obj = canvas.scrollobj.value();
        if (keycode>=48 && keycode<=57)
        {
            if (!canvas.keylst)
                canvas.keylst = []
            canvas.keylst.push(key);
            var page = canvas.keylst.join("");
            var k = Math.berp(1,galleryobj.length(),page);
            _8cnv.timeobj.setperc(1-k);
            _8cnvctx.refresh();
            clearTimeout(canvas.keylsttime);
            canvas.keylsttime = setTimeout(function()
                {
                   delete canvas.keylst;
                }, 1000)
        }
        else if (
            key == "pageup" ||
            (canvas.shiftKey && key == "enter") ||
            key == "arrowup" ||
            key == "w" ||
            key == "k")
        {
            galleryobj.pantype = "pandown";
            _4cnvctx.refresh();
            var e = {type:"swipedown"}
            swipelst[1].swipeupdown (context, context.rect, 0, 0, e)
            evt.preventDefault();
        }
        else if (
            key == "arrowdown" ||
            key == "enter" ||
            key == "pagedown" ||
            key == "s" ||
            key == "j")
        {
            galleryobj.pantype = "panup";
            _4cnvctx.refresh();
            var e = {type:"swipeup"}
            swipelst[1].swipeupdown (context, context.rect, 0, 0, e)
            evt.preventDefault();
        }
        else if (key == "g")
        {
            pagedialog();
        }
        else if (key == "-" || key == "[")
        {
            var obj = canvas.buttonobj;
            obj.addperc(-1.5/100);
            context.refresh()
        }
        else if (key == "+" || key == "]" || key == "=")
        {
            var obj = canvas.buttonobj;
            obj.addperc(1.5/100);
            context.refresh()
        }
        else if (
            key == "arrowleft" ||
            key == "a" ||
            key == "h")
		{
            if (canvas.ctrlKey)
                obj.set(0);
            else
                obj.rotateperc(-2.5);
            context.refresh()
            evt.preventDefault();
        }
        else if (
            key == "arrowright" ||
            key == "d" ||
            key == "l")
		{
            if (canvas.ctrlKey)
                obj.set(obj.length()-1);
            else
                obj.rotateperc(2.5);
            context.refresh()
            evt.preventDefault();
        }
        else if (key == "tab")
        {
            if (canvas.shiftKey)
            {
                obj.set(obj.length()-1);
                var e = {type:"swipedown"}
                swipelst[1].swipeupdown (context, context.rect, 0, 0, e)
                evt.preventDefault();
            }
            else
            {
                obj.set(0);
                var e = {type:"swipeup"}
                swipelst[1].swipeupdown (context, context.rect, 0, 0, e)
                evt.preventDefault();
            }

            evt.preventDefault();
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
        else if (key == " ")
        {
            bossobj.set(1);
            headobj.set(1);
            headham.panel = headobj.value();
            menuobj.hide();
            _4cnvctx.refresh();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
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
        if (key == "pageup" ||
            key == "arrowup" ||
            evt.key == "w" ||
            evt.key == "j")
		{
            var e = {type:"swipeup"}
            swipelst[2].swipeupdown (context, context.rect, 0, 0, e)
        }
        else if (
            key == "pagedown" ||
            key == "arrowdown" ||
            evt.key == "s" ||
            evt.key == "k")
		{
            var e = {type:"swipedown"}
            swipelst[2].swipeupdown (context, context.rect, 0, 0, e)
        }
        else if (key == "\\" || key == "/")
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
        var key = evt.key.toLowerCase();
        if (
            (canvas.ctrlKey && key == "arrowleft") ||
            (canvas.ctrlKey && key == "h") ||
            (canvas.shiftKey && key == "enter") ||
            key == "pageup")
        {
            context.movepage(-1);
            evt.preventDefault();
        }
        else if (
            (canvas.ctrlKey && key == "arrowright") ||
            (canvas.ctrlKey && key == "l") ||
            key == "enter" ||
            key == "pagedown")
        {
            context.movepage(1);
            evt.preventDefault();
        }
	},
	keydown: function (evt)
	{
        if (dialog && dialog.open)
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

        if (key == "control" ||
            key == "shift")
            return;

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
        else if (
            (canvas.shiftKey && key == "tab") ||
            key == "arrowleft" ||
            key == "a" ||
            key == "h")
        {
            canvas.block = 1;
            setTimeout(function() { canvas.block = 0; }, canvas.keyblock);
            canvas.keyblock = util.clamp(50,200,canvas.keyblock-5);
            canvas.autodirect = 1;
            swipeobj.value().swipeleftright(context, context.rect(), 0, 0, 0)
            evt.preventDefault();
        }
        else if (
            key == "tab" ||
            key == "arrowright" ||
            key == "d" ||
            key == "l")
        {
            canvas.block = 1;
            setTimeout(function() { canvas.block = 0; }, canvas.keyblock);
            canvas.keyblock = util.clamp(50,200,canvas.keyblock-5);
            canvas.autodirect = -1;
            swipeobj.value().swipeleftright(context, context.rect(), 0, 0, 0)
            evt.preventDefault();
        }
        else if (
            key == "arrowup" ||
            key == "w" ||
            key == "k")
        {
            rowobj.addperc(-5/100);
            contextobj.reset();
        }
        else if (key == "g")
        {
            pagedialog();
        }
        else if (key == " ")
        {
            delete galleryobj.pantype;
            menuobj.toggle(_8cnvctx);
        }
        else if (key == "arrowdown" ||
            key == "s" ||
            key == "j" )
        {
            rowobj.addperc(5/100);
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
        clearInterval(global.timeout);
        global.timeout = 0;
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

        if (context.canvas.thumbrect && context.canvas.thumbrect.hitest(x,y))
        {
            headobj.set(1);
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
        else if (context.helprect && context.helprect.hitest(x,y))
        {
            delete galleryobj.pantype;
            menuobj.toggle(_8cnvctx);
        }
        else if (context.optionsrect && context.optionsrect.hitest(x,y))
        {
            headobj.set(1);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            menuobj.showindex(_2cnvctx);
            context.refresh();
        }
        else if (context.chapterect && context.chapterect.hitest(x,y))
        {
            _5cnv.timeobj.set(0);
            menuobj.showindex(_5cnvctx);
        }
        else if (context.extentrect && context.extentrect.hitest(x,y))
        {
            _5cnv.timeobj.set(0);
            menuobj.showindex(_5cnvctx);
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
    }
},
{
    name: "MENU",
    tap: function (context, rect, x, y)
    {
        var canvas = context.canvas;
        var obj = canvas.scrollobj;
        if (context.thumbpanel && context.thumbpanel.hitest(x,y))
        {
            bossobj.set(0);
            _8cnvctx.refresh();
        }
        else if (canvas.searchrect && canvas.searchrect.hitest(x,y))
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
        else if (canvas.galleryrect && canvas.galleryrect.hitest(x,y))
        {
            headobj.set(1);
            bossobj.set(1);
            headham.panel = headobj.value();
            menuobj.showindex(_2cnvctx);
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            context.refresh();
        }
        else if ( canvas.searchrect && canvas.searchrect.hitest(x,y) )
        {
            menuobj.showindex(_3cnvctx);
        }
        else if (x > rect.width - (MENUBARWIDTH*2) )
        {
            var j = y/rect.height;
            var k = TIMEOBJ*(1-j);
            canvas.timeobj.set(k);
            context.refresh();
        }
        else
        {
            var k = getfrompoint(context, x, y);
            var slice = canvas.sliceobj.data[k];
            if (!slice)
                return;

            slice.tap = 1;
            context.refresh();
            setTimeout(function ()
            {
                slice.tap = 0;
                slice.func(k)
                context.refresh();
            }, 200);
        }
    },
},
{
    name: "GALLERY",
    tap: function (context, rect, x, y)
    {
        var canvas = context.canvas;
        canvas.slideshow = 0;
        var timeauto = global.timeauto;
        clearInterval(global.timeauto);
        clearInterval(global.timeout);
        global.timeauto = 0;
        global.timeout = 0;
        var obj = canvas.scrollobj.value();
        context.refresh();

        if (canvas.hscrollrect && canvas.hscrollrect.hitest(x,y))
        {
            var obj = canvas.scrollobj.value();
            var k = (x-canvas.hscrollrect.x)/canvas.hscrollrect.width;
            obj.setperc(k);
            context.refresh();
        }
        else if (canvas.searchrect && canvas.searchrect.hitest(x,y))
        {
            showsearch("pexels");
        }
        else if (canvas.vscrollrect && canvas.vscrollrect.hitest(x,y))
        {
            var obj = canvas.timeobj;
            var k = (y-canvas.vscrollrect.y)/canvas.vscrollrect.height;
            obj.setperc(1-k);
            context.refresh();
        }
        else if (context.fullrect && context.fullrect.hitest(x,y))
        {
            context.refresh();
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }
        }
        else if (context.canvas.galleryrect && context.canvas.galleryrect.hitest(x,y))
        {
            headobj.set(1);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            bossobj.set(1);
            menuobj.showindex(_2cnvctx);
           _4cnvctx.refresh()
        }
        else if (canvas.loginrect && canvas.loginrect.hitest(x,y))
        {
            authClient.redirectToLoginPage();
        }
        else if (canvas.buttonrect && canvas.buttonrect.hitest(x,y))
        {
            var obj = canvas.buttonobj;
            var k = (x-canvas.buttonrect.x)/canvas.buttonrect.width;
            obj.setperc(k);
            context.refresh();
        }
        else if (canvas.optionsrect && canvas.optionsrect.hitest(x,y))
        {
            menuobj.showindex(_2cnvctx);
            context.refresh();
        }
        else if (canvas.showpagerect && canvas.showpagerect.hitest(x,y))
        {
            _5cnv.timeobj.set(0);
            menuobj.showindex(_5cnvctx);
        }
        else if (context.chapterect && context.chapterect.hitest(x,y))
        {
            _5cnv.timeobj.set(0);
            menuobj.showindex(_5cnvctx);
        }
        else if (canvas.galleryrect && canvas.galleryrect.hitest(x,y))
        {
            headobj.set(1);
            bossobj.set(1);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            menuobj.showindex(_2cnvctx);
            _4cnvctx.refresh();
            context.refresh();
        }
        else if (canvas.helprect && canvas.helprect.hitest(x,y))
        {
            headobj.set(1);
            bossobj.set(1);
            headham.panel = headobj.value();
            menuobj.hide();
            _4cnvctx.refresh()
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (canvas.metarect && canvas.metarect.hitest(x,y))
        {
            clearInterval(global.timeout);
            clearInterval(global.timeauto);
            global.timeauto = 0;
            global.timeout = 0;
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            canvas.scrollobj.rotate(1);
            context.refresh();
        }
        else if (canvas.fitwindowrect && canvas.fitwindowrect.hitest(x,y))
        {
            clearTimeout(global.hometap)
            global.hometap = setTimeout(function()
                {
                    buttonobjreset();
                    global.hometap = 0;
                    context.refresh();
                }, 400);
            context.refresh();
        }
        else
        {
            var visibles = canvas.visibles;

            var k;
            for (k = 0; k < visibles.length; k++)
            {
                var j = visibles[k];
                if (!j.slice || !j.slice.rect)
                    continue;
                if (j.slice.rect.hitest(x,y))
                    break;
            }

            if (k == visibles.length)
                return;
            if (canvas.showpagerect && canvas.showpagerect.hitest(x,y))
                return;
            if (canvas.archiverect && canvas.archiverect.hitest(x,y))
                return;
            if (canvas.loginrect && canvas.loginrect.hitest(x,y))
                return;
            if (canvas.buttonrect && canvas.buttonrect.hitest(x,y))
                return;
            if (canvas.hscrollrect && canvas.hscrollrect.hitest(x,y))
                return;
            if (canvas.vscrollrect && canvas.vscrollrect.hitest(x,y))
                return;
            if (canvas.fitwindowrect && canvas.fitwindowrect.hitest(x,y))
                return;
            if (canvas.fullrect && canvas.fullrect.hitest(x,y))
                return;
            if (canvas.searchrect && canvas.searchrect.hitest(x,y))
                return;

            var n = visibles[k].n;
            var slice = galleryobj.data[n];
            delete galleryobj.pantype;
            galleryobj.set(n);
            clearInterval(global.swipetimeout);
            global.swipetimeout = 0;
            headobj.set(1);
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
            }, 400);
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
        }
    },
    new function ()
	{
    	this.draw = function (context, r, user, time)
        {
           if (menuobj.value())
                return;
           if (
                !photo.image ||
                !photo.image.complete ||
                !photo.image.naturalHeight)
                return;

            var canvas = context.canvas;
            context.extentrect = new rectangle();
            context.chapterect = new rectangle();
            context.optionsrect = new rectangle();
            var visib = (!galleryobj.pantype ||
                galleryobj.pantype == "pandown") ? 1 : 0;
            var ch = _5cnv.sliceobj.length()>1?26:-1;
            var ck = _5cnv.sliceobj.length()>1?8:-1;
            var w = Math.min(120,rect.width-100);
            var a = new panel.rowA([0,26,8,ch,ck,26,26,SCROLLBARWIDTH,MARGINBAR],
            [
                 0,
                 0?new panel.col([0,w,0],
                 [
                    0,
                     new Layer(
                     [
                        new Rectangle(context.optionsrect),
                        new panel.shadow(new panel.text("rgb(255,255,255)", "center", "middle",0, 0)),
                     ]),
                     0
                 ]):0,
                0,
                     new Layer(
                     [
                        new Rectangle(context.chapterect),
                        new panel.shadow(new panel.text("rgb(255,255,255)", "center", "middle",0, 0)),
                     ]),
                0,
                 new panel.col([0,w,0],
                 [
                    0,
                    new Layer(
                    [
                        new panel.shrink(new Rectangle(context.extentrect),4,0),
                        new panel.shadow(new panel.text("rgb(255,255,255)", "center", "middle",0, 0)),
                    ]),
                    0,
                ]),
                0,
                0,
                0
            ]);

            a.draw(context, rect,
                [
                    0,
                    "Options",
                    0,
                    _5cnv.sliceobj.length() > 1 ?
                        _5cnv.sliceobj.value().title : "",
                    0,
                    extentobj.value(),
                    0,
                    0,
                    0,
                ]);

            var he = heightobj.value();
            var b = Math.berp(0,he.length()-1,he.current());
            var height = Math.max(60,Math.lerp(0, rect.height, b));
            var width = Math.max(60,Math.lerp(0, rect.width, b));
            var r = calculateAspectRatioFit(photo.image.width, photo.image.height, width, height);
            var h = r.height;
            var w = r.width;
            var positx = positxobj.value();
            var posity = posityobj.value();
            var x = Math.floor(Math.nub(positx.value(), positx.length(), w, rect.width));
            var y = Math.floor(Math.nub(posity.value(), posity.length(), h, rect.height));
            canvas.thumbrect = new rectangle(x,y,w,h);
            var r = canvas.thumbrect;

            context.save();
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            if (galleryobj.transparent)
            {
                var blackfill = new panel.fill(THUMBFILP);
                blackfill.draw(context, canvas.thumbrect, 0, 0);
            }
            else
            {
                if (!canvas.thumbcanvas)
                {
                    canvas.thumbcanvas = document.createElement('canvas');
                    canvas.thumbcanvas.width = w;
                    canvas.thumbcanvas.height = h;
                    var thumbcontext = canvas.thumbcanvas.getContext('2d');
                    thumbcontext.drawImage(photo.image,0,0,w,h);
                }

                context.drawImage(canvas.thumbcanvas, x, y, w, h);
            }

            var whitestroke = new panel.stroke(THUMBSTROKE,THUMBORDER);
            whitestroke.draw(context, r, 0, 0);
            var region = new Path2D();
            region.rect(x,y,w,h);
            context.clip(region);

            var ww = Math.max(30,(rect.width/canvas.virtualwidth)*w);
            var stretch = stretchobj.value();
            if (stretch < 50)
                stretch = (50-stretch.value())/100;
            else
                stretch = (stretch.value()-50)/100;
            stretch = 1-stretch;
            ww *= stretch;

            var b = Math.berp(0,photo.image.height,canvas.imageheight);
            var hh = Math.lerp(0,h,b);
            var b = Math.berp(0,photo.image.height,_4cnv.nuby);
            var yy = y+Math.lerp(0,h,b);
            var jj = canvas.timeobj.berp();
            var bb = w*(1-jj);
            var xx = x+bb-ww/2;
            context.lineWidth = THUMBORDER;
            var r = new rectangle(xx,yy,ww,hh);
            canvas.selectrect = []
            canvas.selectrect.push(r);
            if (!galleryobj.hidefocus)
            {
                var blackfill = new panel.fill(THUMBFILL);
                blackfill.draw(context, r, 0, 0);
                whitestroke.draw(context, r, 0, 0);
                if (xx > x)//leftside
                {
                    var r = new rectangle(xx-w,yy,ww,hh);
                    canvas.selectrect.push(r);
                    blackfill.draw(context, r, 0, 0);
                    whitestroke.draw(context, r, 0, 0);
                }
                else if (xx < x)//right side
                {
                    var r = new rectangle(w+xx,yy,ww,hh);
                    canvas.selectrect.push(r);
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
bossobj.draw = function()
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

    if (global.swipetimeout)
    {
        canvas.slidestop -= canvas.slidereduce;
        if (canvas.slidestop > 0)
        {
            var j = _4cnv.autodirect*(TIMEOBJ/1000)
            canvas.timeobj.rotate(j*canvas.slidestop);
        }
        else
        {
            clearInterval(global.swipetimeout);
            global.timeout = 0;
        }
    }

    var stretch = stretchobj.value();
    var virtualpinch = _4cnv.virtualwidth*(stretch.value()/100);
    var colwidth = _4cnv.colwidth;
    var virtualeft = (virtualpinch-rect.width)/2;
    var j = (colwidth/(colwidth+_4cnv.virtualwidth))*TIMEOBJ;
    var time = (canvas.timeobj.value()+j)/1000;

    var slices = _4cnv.sliceobj.data;
    var slice = slices[0];
    if (!slice)
        return;
    context.save();
    if (slicewidthobj.debug)
        context.clear();
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    for (var m = 0; m < slices.length; ++m)
        slices[m].stretchwidth = 0;

    offbosscnv.width = rect.width;
    offbosscnv.height = rect.height;
    for (var m = slices.length; m < slices.length*2; ++m)
    {
        var n = _4cnv.rotated[m];
        var slice = slices[n];
        var j = time + slice.time;
        var b = Math.tan(j*VIRTCONST);
        var x = Math.berp(-1, 1, b) * virtualpinch - virtualeft;

        var n2 = _4cnv.rotated[m+1];
        var slice2 = slices[n2];
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
            new rectangle(x,0,w,rect.height), `${n+1}of${slices.length}`, 0);
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
        var a = bossobj.value()
        a.draw(context, rect, 0, 0);
    }
}

bossobj.reset = function()
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

    var zoomax = galleryobj.zoomax ? galleryobj.zoomax : ZOOMAX;
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
    var y = util.clamp(0,_4cnv.height-1,_4cnv.height*rowobj.berp());
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

var getfrompoint = function (context, x, y)
{
	var slices = context.canvas.sliceobj.data;

    var k;
    for (k = 0; k < slices.length; k++)
    {
        var slice = slices[k];
        if (!slice.rect)
            continue;
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
        var a = new panel.col([20,0,20],
        [
            0,
            new Layer(
            [
                new panel.expand(new panel.rounded(clr, 4, SEARCHFRAME, 8, 8), 0, 20),
                new panel.shrink(new panel.multitext(e), 20, 0),
            ]),
            0,
        ]);

        a.draw(context, rect, user.line.split("\n"), time);
        context.restore();
    }
},
{
    name: "SELECT",
    draw: function (context, rect, user, time)
    {
        context.save()
        var clr = SCROLLNAB;
        if (user.tap)
            clr = MENUTAP;
        else if (context.canvas.sliceobj.current() == time)
          clr = MENUSELECT;

        var a = new panel.col([20,0,20],
        [
            0,
            new Layer(
            [
                new panel.expand(new panel.rounded(clr, 4, SEARCHFRAME, 8, 8), 0, 10),
                new panel.shrink(new panel.text("white", "center", "middle",0, 0), 20, 0),
            ]),
            0,
        ]);

        a.draw(context, rect, user.title, time);
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

        var a = new panel.col([20,0,20],
        [
            0,
            new Layer(
            [
                new panel.expand(new panel.rounded(clr, 4, SEARCHFRAME, 8, 8), 0, 10),
                new panel.shrink(new panel.text("white", "center", "middle",0, 0), 20, 0),
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
        var index = time%IMAGELSTSIZE;
        var view = Math.floor(time/IMAGELSTSIZE)
        user.thumbimg = thumbimglst[index]
        if (context.canvas.scrollobj.current() == 0 &&
            user.thumbimg.time != time)
        {
            user.thumbimg.time = time;
            try
            {
                const variant = "2160x2160";
                user.thumbimg.src = `https://reportbase.com/image/${user.id}/${variant}`;
                if (Number.isInteger(user.id))
                    user.thumbimg.src = `https://images.pexels.com/photos/${user.id}/pexels-photo-${user.id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=2160&w=1080`;
                else if (user.full)
                    user.thumbimg.src = user.full;
                else if (user.blob)
                {
                    URL.revokeObjectURL(user.thumbimg.src);
                    user.thumbimg.src = URL.createObjectURL(user.blob);
                }
                else if (!user.id && user.url)
                    user.thumbimg.src = user.url;

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
        else if (
            context.canvas.scrollobj.current() == 0 &&
            user.thumbimg && user.thumbimg.width)
        {
            var obj = context.canvas.scrollobj.value();
            var b = user.thumbimg.width/user.thumbimg.height;
            var b2 = rect.width/rect.height;
            user.thumbfitted = thumbfittedlst[index];
            if (user.thumbfitted.time != time)
            {
                user.thumbfitted.time = time;
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

                        if (user.photographer)
                        {
                            var a = new panel.rowA([22,22,22,0],
                                [
                                    0,
                                    new panel.shadow(new panel.text("rgb(255,255,255)", "center", "middle",0,0)),
                                    new panel.shadow(new panel.text("rgb(255,255,255)", "center", "middle",0,0)),
                                    0,
                                ]);

                            a.draw(context, rect,
                                [
                                    0,
                                    user.photographer,
                                    `${galleryobj.repos}.com`,
                                    0,
                                ], 0, 0);
                        }
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
                    else
                    {
                        delete user.thumbimg;
                    }

                    if (user.isvisible)
                    {
                        var y = Math.nub(obj.value(), obj.length(),
                            rect.height, user.thumbfitted.height);
                        context.drawImage(user.thumbfitted,
                            0, y, rect.width, rect.height,
                            0, 0, rect.width, rect.height);

                        if (user.photographer)
                        {
                            var a = new panel.rowA([22,22,22,0],
                                [
                                    0,
                                    new panel.shadow(new panel.text("rgb(255,255,255)", "center", "middle",0,0)),
                                    new panel.shadow(new panel.text("rgb(255,255,255)", "center", "middle",0,0)),
                                    0,
                                ]);

                            a.draw(context, rect,
                                [
                                    0,
                                    user.photographer,
                                    `${galleryobj.repos}.com`,
                                    0,
                                ], 0, 0);
                        }
                    }
                }
            }

            if (user.tap)
            {
                var a = new panel.fill("rgba(0,0,0,0.35)");
                a.draw(context, rect, 0, 0);
            }
        }
        else
        {
            var lst = [];
            lst[0] = `${time+1} of ${galleryobj.length()}`;
            let keys = Object.keys(user);
            for (var n = 0; n < keys.length; ++n)
            {
                var key = keys[n];
                var value = user[key]
                if (value && value.length && typeof value === 'string')
                    lst.push(value);
            }

            var e = _8cnv.textscrollobj.berp();
            var a = new panel.col([25,0,25],
            [
                0,
                new panel.row([15,0,20],
                [
                    0,
                    new Layer(
                    [
                        new panel.rounded("rgba(0,0,0,0.3)", 4, "rgba(255,255,255,0.4)", 16, 16),
                        user.tap?new panel.fill("rgba(255,125,0,0.4)"):0,
                        new panel.shrink(new panel.multitext(e), 30, 15),
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

_1ham.panel = new panel.yoll();
_2ham.panel = new panel.yoll();
_3ham.panel = new panel.yoll();
_4ham.panel = new panel.yoll();
_5ham.panel = new panel.yoll();
_6ham.panel = new panel.yoll();
_7ham.panel = new panel.yoll();
_8ham.panel = new panel.yoll();
_9ham.panel = new panel.yoll();
_10ham.panel = new panel.yoll();
_11ham.panel = new panel.yoll();
_12ham.panel = new panel.yoll();
_13ham.panel = new panel.yoll();
_14ham.panel = new panel.yoll();
_15ham.panel = new panel.yoll();

let contextlst = [_1cnvctx,_2cnvctx,_3cnvctx,_4cnvctx,_5cnvctx,_6cnvctx,_7cnvctx,_8cnvctx,_9cnvctx,_10cnvctx,_11cnvctx,_12cnvctx,_13cnvctx,_14cnvctx,_15cnvctx];
let menulst = [0, _1cnvctx, _2cnvctx,_3cnvctx,_5cnvctx,_6cnvctx,_7cnvctx,_8cnvctx,_9cnvctx,_10cnvctx,_11cnvctx,_12cnvctx,_13cnvctx,_14cnvctx,_15cnvctx];
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
    clearInterval(global.timeout);
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
        clearInterval(global.swipetimeout);
        global.swipetimeout = 0;
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
    }

    var a = new panel.fill("rgba(0,0,0,0.4)");
    a.draw(context, rect, 0, 0);
    var size = Math.ceil(rect.height/canvas.buttonheight)+3;
    var current = Math.floor(
        Math.lerp(0,slices.length-1,1-context.canvas.timeobj.berp()));
    var slicegroup = util.rotated_list(context.canvas.rotated,slices.length,current,size);
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
        offmenuctx.canvas.sliceobj = context.canvas.sliceobj;
        offmenuctx.canvas.scrollobj = context.canvas.scrollobj;
        offmenuctx.save();
        var r = new rectangle(0,0,rect.width,height);
        offmenuctx.translate(0, j.y);
        context.canvas.draw(offmenuctx, r, j.slice, j.n);
        offmenuctx.restore();
    }

    var visibles = canvas.visibles;

    var k;
    for (k = 0; k < visibles.length; k++)
    {
        var j = visibles[k];
        if (!j.slice || !j.slice.rect)
            continue;
        if (j.slice.rect.hitest(x,y))
            break;
    }

    var n = visibles[k].n;
    infobj.data[0] = `${n+1} of ${galleryobj.length()}`;
    infobj.data[1] = `${context.canvas.timeobj.ANCHOR.toFixed(6)}`;
    infobj.data[2] = `${context.canvas.timeobj.CURRENT.toFixed(6)}`;
    infobj.data[3] = `${context.canvas.visibles.length}`;
    infobj.data[4] = `${isvisiblecount} of ${context.canvas.visibles.length}`;
    infobj.data[5] = `${((context.canvas.visibles.length*canvas.buttonheight)/rect.height).toFixed(2)}`;

    context.drawImage(offmenucnv, 0, 0);
    context.canvas.bar.draw(context, rect, 0, 0);
    context.canvas.scroll.draw(context, rect, 0, 0);
}

var eventlst =
[
    {dblclick: "DEFAULT", mouse: "DEFAULT", thumb: "DEFAULT", tap: "DEFAULT", pan: "DEFAULT", swipe: "DEFAULT", button: "DEFAULT", wheel: "DEFAULT", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 0, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU",  drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {dblclick: "BOSS", mouse: "DEFAULT", thumb: "BOSS",  tap: "BOSS", pan: "BOSS", swipe: "BOSS", button: "BOSS", wheel: "BOSS", drop: "DEFAULT", key: "BOSS", press: "BOSS", pinch: "BOSS", bar: new panel.empty(), scroll: new panel.empty(), buttonheight: 30, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "SELECT", wheel:  "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 120, width: 640},
    {dblclick: "GALLERY", mouse: "MENU", thumb: "DEFAULT", tap: "GALLERY", pan: "GALLERY", swipe: "GALLERY", button: "GALLERY", wheel: "GALLERY", drop: "DEFAULT", key: "GALLERY", press: "GALLERY", pinch: "GALLERY", bar: new panel.gallerybar(), scroll: new panel.empty(), buttonheight: 320, width: 5160},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
];

var contextobj = new circular_array("CTX", contextlst);
contextlst.forEach(function(context, n)
{
    var canvas = context.canvas;
    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "low";
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
    canvas.imagescrollobj = new circular_array("IMAGESCROLL", Math.floor(window.innerWidth));
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
        bossobj.reset();
    }
    else
    {
        if (galleryobj.value().blob)
        {
            photo.image = new Image();
            URL.revokeObjectURL(photo.image.blob );
            photo.image.blob = URL.createObjectURL(galleryobj.value().blob)
            photo.image.src = photo.image.blob;
        }
        else
        {
            var id = galleryobj.value().id;
            var template = galleryobj.variant ? galleryobj.variant : "3840x3840";
            var path = `https://reportbase.com/image/${id}/${template}`;
            if (galleryobj.raw)
                path = `https://reportbase.com/image/${id}/blob`;
            else if (Number.isInteger(id))
                path = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=2160&w=1080`;
            else if (galleryobj.value().full)
                path = galleryobj.value().full;
            else if (!id && galleryobj.value().url)
                path = galleryobj.value().url;
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
            extentobj.data[0] = `${galleryobj.current()+1} of ${galleryobj.length()}`;
            extentobj.data[1] = this.extent;
            extentobj.data[2] = galleryobj.value().id?galleryobj.value().id:"Undefined";
            extentobj.data[3] = `${window.innerWidth} x ${window.innerHeight}`;
            var e = galleryobj.value();

            var j = "";
            if (url.searchParams.has(galleryobj.repos))
                j = url.searchParams.get(galleryobj.repos).split(".")[0].proper();
            else
                j = url.path;
            document.title = `${j} (${photo.image.width}x${photo.image.height})`;
            rowobj.set(rowobj.length()/2);
            _4cnv.timeobj.set(TIMEOBJ/2);
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnv.autodirect = -_4cnv.movingpage;
            _4cnv.movingpage = 0;
            contextobj.reset()
            if (!galleryobj.noautopan)
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
        if (Number.isInteger(id))
            path = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=2160&w=1080`;
        else if (galleryobj.value().full)
            path = galleryobj.value().full;
        else if (!id && galleryobj.value().url)
            path = galleryobj.value().url;
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
    size = util.clamp(0, Math.max(size, 10), extent);
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

panel.circle = function (color, scolor, width)
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

panel.rotated_text = function()
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

panel.text = function (color,  align="center", baseline="middle",
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

panel.row = function (e, panel)
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

panel.col = function (e, panel)
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

panel.rowA = function (e, panel)
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

panel.colA = function (e, panel)
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

panel.grid = function (cols, rows, margin, panel)
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

panel.gridA = function (cols, rows, margin, panel)
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

panel.expand = function (p, extentw, extenth)
{
    this.draw = function (context, rect, user, time)
    {
		return p.draw(context, new rectangle(
			rect.x-extentw,
			rect.y-extenth,
			rect.width+extentw*2,
			rect.height+extenth*2),
				user, time);
    };
};

panel.shadow  = function (p, x=1, y=1)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.shadowOffsetX = x;
        context.shadowOffsetY = y;
        context.shadowColor = x == 1 ? "black" : "white";
        p.draw(context, rect, user, time);
        context.restore();
    };
};

panel.shift = function (p, x, y)
{
    this.draw = function (context, rect, user, time)
    {
        p.draw(context, new rectangle(rect.x+x,rect.y+y,rect.width,rect.height), user, time);
    };
};

panel.shrink = function (p, extentw, extenth)
{
    this.draw = function (context, rect, user, time)
    {
		return p.draw(context, new rectangle(
			rect.x+extentw,
			rect.y+extenth,
			rect.width-extentw*2,
			rect.height-extenth*2),
				user, time);
    };
};

panel.rounded = function (color, linewidth, strokecolor, radiustop, radiusbot)
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

panel.layerA = function (panels)
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

panel.image = function (shrink)
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

panel.currentH = function (panel, extent)
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

panel.currentV = function (panel, extent, rev)
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
    if (dialog && dialog.open)
        dialog.close();
    menuobj.hide();

    headobj.set(1);
    bossobj.set(1);
    headham.panel = headobj.value();
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

    overlayobj.set(0);
    slicewidthobj.debug = 0;
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
    	this.press = function (context, rect, x, y)
        {
            if (context.canvas.searchrect && context.canvas.searchrect.hitest(x,y))
            {
                menuobj.showindex(_3cnvctx);
            }
        }

     	this.tap = function (context, rect, x, y)
		{
            if (context.thumbpanel && context.thumbpanel.hitest(x,y))
            {
                bossobj.set(bossobj.current()?0:1)
                _8cnvctx.refresh();
            }
            else if (context.moveprev && context.moveprev.hitest(x,y))
            {
                _4cnvctx.movepage(-1);
            }
            else if (context.movenext && context.movenext.hitest(x,y))
            {
                _4cnvctx.movepage(1);
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
            else if (context.canvas.galleryrect && context.canvas.galleryrect.hitest(x,y))
            {
                headobj.set(1);
                bossobj.set(1);
                headham.panel = headobj.value();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
                menuobj.showindex(_2cnvctx);
                _4cnvctx.refresh()
            }
            else if (context.canvas.helprect && context.canvas.helprect.hitest(x,y))
            {
                headobj.set(1);
                bossobj.set(1);
                headham.panel = headobj.value();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
                menuobj.showindex(_8cnvctx);
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
            if (menuobj.value() == _8cnvctx)
                return;
            var k = menuobj.value();
            var w = k?k.canvas.width:0;
            var b = window.innerWidth == w;
            var j = menuobj.value() && b;
            var m = j || _5cnv.sliceobj.length() < 2;
            context.save();
            var a = new panel.row([BEXTENT,0],
            [
               new panel.col( [12, ALIEXTENT,0,ALIEXTENT,ALIEXTENT,0,ALIEXTENT, 12],
               [
                   0,
                   new panel.help(),
                   0,

                   new panel.previous(),
                   new panel.next(),

                   0,
                   new panel.gallery(),
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
            if (menuobj.value() == _8cnvctx)
                return;
            var k = menuobj.value();
            context.save();
            context.shadowColor = "black";
            context.prompt = new rectangle()
            var w = rect.width;
            if (w > rect.width-BEXTENT*2)
                w = rect.width-BEXTENT*2;
            var e = context.canvas.scrollobj.berp();
            var a = new panel.col([12,60,10,0,10,60,12],
                    [
                        0,
                        new panel.previous(),
                        0,
                        k?0:new panel.row([10,0,10],
                        [
                            0,
                            new panel.col([0,w,0],
                            [
                                0,
                                new Layer(
                                [
                                    new Rectangle(context.prompt),
                                    new panel.shadow(new panel.multitext(e)),
                                ]),
                                0,
                            ]),
                            0
                        ]),
                        0,
                        new panel.next(),
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
    	this.press = function (context, rect, x, y)
        {
            menuobj.setindex(_3cnvctx);
            menuobj.show();
        }

        this.tap = function (context, rect, x, y)
        {
            showsearch("pexels");
        };

		this.draw = function (context, rect, user, time)
		{
            context.save();
            context.clear();
            if (menuobj.value() == _8cnvctx)
                return;

            var a = new Layer(
            [
                    new panel.col([0,50,0],
                    [
                        0,
                        new panel.search(),
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
            headobj.set(1);
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
        var e = new panel.fill(OPTIONFILL);
        var a = new Layer(
        [
            new panel.row( [0, rect.height*0.35, 0],
            [
                0,
                new panel.col ([0,j,k,j,k,j,0], [0,e,0,e,0,e,0,]),
                0,
            ]),
        ])

        a.draw(context, rect, user, time);
        context.restore()
    }
};

panel.gallery = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.canvas.galleryrect = new rectangle()
        var j = 5;
        var k = j/2;
        var e = new panel.fill(OPTIONFILL);
        var s = menuobj.value() == _2cnvctx;
        var a = new Layer(
        [
            new Rectangle(context.canvas.galleryrect),
            s ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(s?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
            new panel.row( [0, rect.height*0.20, 0],
            [
                0,
                new panel.col ([0,j,k,j,k,j,0], [0,e,0,e,0,e,0,]),
                0,
            ]),
        ])

        a.draw(context, rect, user, time);
        context.restore()
    }
};

panel.help = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.canvas.helprect = new rectangle()
        var j = 5;
        var k = j/2;
        var e = new panel.fill(OPTIONFILL);
        var s = menuobj.value() == _8cnvctx;
        var a = new Layer(
        [
            new Rectangle(context.canvas.helprect),
            s ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(s?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
            new panel.col( [0,rect.height*0.20,0],
            [
                0,
                new panel.row( [0,j,k,j,k,j,0], [0,e,0,e,0,e,0]),
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

function localsave()
{
}

window.addEventListener("visibilitychange", (evt) =>
{
    if (document.visibilityState === 'visible')
    {
        bossobj.draw();
    }
    else
    {
        localobj.filter = _5cnv.sliceobj.length() > 1 ?
                    _5cnv.sliceobj.value().filter : "";
        localobj.gallery = _8cnv.timeobj.current();
        try
        {
            localStorage.setItem(url.path,JSON.stringify(localobj));
        }
        catch(_)
        {
        }
    }
});

window.addEventListener("load", async () =>
{
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

let thumbfittedlst = [];
let thumbimglst = [];
var galleryobj = new circular_array("", 0);

galleryobj.init = function (obj)
{
    if (obj)
    {
        Object.assign(galleryobj, obj);
        galleryobj.all = [];
        for (var n = 0; n < galleryobj.length(); ++n)
            galleryobj.all.push(galleryobj.data[n]);
    }

    delete _4cnv.thumbcanvas;
    delete photo.image;

    for (var n = 0; n < IMAGELSTSIZE; ++n)
    {
        thumbfittedlst[n] = document.createElement("canvas");
        thumbimglst[n] = new Image();
    }

    var filter = url.filter?url.filter:localobj.filter;
    var filterlst = galleryobj.all.filter(function(a)
    {
        return filter && a.filter &&
            a.filter.toLowerCase() == filter.toLowerCase();
    });

    if (filterlst.length)
        galleryobj.data = filterlst;

    setfavicon();
    pretchobj.split(60, "40-90", pretchobj.length());
    letchobj.split(60, "40-90", letchobj.length());
    traitobj.split(50, "0.1-1.0", traitobj.length());
    scapeobj.split(50, "0.1-1.0", scapeobj.length());
    positxpobj.set(50);
    positypobj.set(50);
    positxlobj.set(50);
    positylobj.set(50);

    var zoom = (typeof galleryobj.zoom === "undefined") ?25:galleryobj.zoom;
    poomobj.set(zoom);
    loomobj.set(zoom);

    slicewidthobj.set(galleryobj.slicewidth?galleryobj.slicewidth:SLICEWIDTH);

    var h = window.self !== window.top ? 0 : BEXTENT;
    headcnvctx.show(0,0,window.innerWidth,h);
    headham.panel = headobj.value();

    _2cnv.sliceobj.data =
    [
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
        {title:"Folders", path: "FOLDERS", func: function()
            {
                _5cnv.timeobj.set(0);
                menuobj.showindex(_5cnvctx);
             },
            enabled: function() { return slicewidthobj.debug; }
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
        {title:"About", path: "ABOUT", func: function()
            {
                menuobj.showindex(_7cnvctx);
            }
        },
        {title:"Search", path: "SEARCH", func: function()
            {
                menuobj.showindex(_6cnvctx);
            }
        },
        {title:"Login", path: "LOGIN", func: function()
            {
                menuobj.showindex(_9cnvctx);
            }
        },
        {title:"Load", path: "LOAD", func: function()
            {
                menuobj.showindex(_11cnvctx);
            }
        },
         {title:"Advanced", path: "ADVANCED", func: function()
            {
                menuobj.showindex(_3cnvctx);
            }
        },
    ];

    var a = Array(_2cnv.sliceobj.length()).fill().map((_, index) => index);
    _2cnv.rotated = [...a,...a,...a];

    _3cnv.sliceobj.data =
    [
        {line:"Pexels Collection\nImage Search",func: function() { showsearch("pexels_collection"); }, enabled: function() {return false;} },
        {line:"Unsplash Collection\nImage Search",func: function() { showsearch("unsplash_collection"); }, enabled: function() {return false;} },
        {line:"Unsplash User Collection\nImage Search",func: function() { showsearch("unsplash_user"); }, enabled: function() {return false;} },
        {line:"Dalle Prompt", func: function()
            {
                menuobj.hide();
                promptdialog();
             },
            enabled: function() { return false }
        },
        {line:"Propelauth", func: function()
            {
                authClient = PropelAuth.createClient({authUrl: "https://auth.reportbase.com", enableBackgroundTokenRefresh: true})
                authClient.getAuthenticationInfoOrNull(false)
                .then(function(client)
                {
                    fetch(`https://bucket.reportbase5836.workers.dev/${client.user.userId}.json`)
                    .then((response) => jsonhandler(response))
                    .then(function (json) { })
                    .catch((error) => {});
                })
            },
            enabled: function() { return false }
        },
        {line:"Delete Image", func: function()
            {
                var id = galleryobj.value().id;
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
       {line:"offscreen.js",  func: function()
            {
                var offcnv = new OffscreenCanvas(200, 200);
                const offworker = new Worker('js/offscreen.js');
                offworker.postMessage({msg: 'offscreen', canvas: offcnv}, [offcnv]);
                offworker.addEventListener('message', function(ev)
                {
                    if (ev.data.msg === 'render')
                    {
                        var canvas = document.createElement("canvas");
                        let context = canvas.getContext("bitmaprenderer");
                        context.transferFromImageBitmap(ev.data.bitmap);
                        _4cnvctx.drawImage(canvas, 0, 0);
                    }
                });
            },
            enabled: function() { return false }
        },
       {line: "6cnvctx", func: function()
            {
                menuobj.showindex(_6cnvctx);
            },
            enabled: function() { return false }
        },
     ];

    var a = Array(_3cnv.sliceobj.length()).fill().map((_, index) => index);
    _3cnv.rotated = [...a,...a,...a];

    _5cnv.sliceobj.data = [];
    var j = 0;
    for (var n = 0; n < galleryobj.all.length; ++n)
    {
        var k = galleryobj.all[n];
        if (!k.filter)
            continue;
        k.func = function()
        {
            localobj.filter = this.filter;
            galleryobj.init();
        }

        var j = _5cnv.sliceobj.data.findIndex(function(a) { return a.filter == k.filter; });
        if (j == -1)
            _5cnv.sliceobj.data.push(galleryobj.all[n]);
    };

    _5cnv.sliceobj.data.sort((a, b) =>
    {
          if (a.title < b.title)
            return -1
          return a.tile > b.title ? 1 : 0
    })

    var k = {}
    k.title = "All Images";
    _5cnv.sliceobj.data.unshift(k);
    k.func = function()
    {
        _5cnv.sliceobj.set(this.index);
        galleryobj.init();
    }

    for (var n = 0; n < _5cnv.sliceobj.length(); ++n)
        _5cnv.sliceobj.data[n].index = n;

    _5cnv.sliceobj.set(0);
    var j = _5cnv.sliceobj.data.findIndex(function(a) { return a.filter == filter; });
    if (j >= 0)
        _5cnv.sliceobj.set(j);

    var a = Array(_5cnv.sliceobj.length()).fill().map((_, index) => index);
    _5cnv.rotated = [...a,...a,...a];

    _6cnv.sliceobj.data =
    [
        {line:"Unsplash\nImage Search", func: function() { showsearch("unsplash"); }, enabled: function() {return false;} },
        {line:"Pexels\nImage Search", func: function() { showsearch("pexels"); }, enabled: function() {return false;} },
        {line:"Pixabay\nImage Search",func: function() { showsearch("pixabay"); }, enabled: function() {return false;} },
    ];

    var a = Array(_6cnv.sliceobj.length()).fill().map((_, index) => index);
    _6cnv.rotated = [...a,...a,...a];

    _7cnv.sliceobj.data =
    [
        {
            line: "PDIV\nPanoramic Digital Image Viewer\nhttps://pdiv.io\nimages@pdiv.io",
            func: function() {}
        },
        {
            line: "© Tom Brinkman\nAll Rights Reserved",
            func: function() {}
        },
        {
            line: "PDIV is a digital image viewer for ultra-wide and panoramic images. Images are drawn onto the interior of a cylinder for 360-degree full-screen viewing experience.",
            func: function() {}
        },
    ];

    var a = Array(_7cnv.sliceobj.length()).fill().map((_, index) => index);
    _7cnv.rotated = [...a,...a,...a];

    _8cnv.sliceobj.data = galleryobj.data;
    var a = Array(galleryobj.length()).fill().map((_, index) => index);
    _8cnv.rotated = [...a,...a,...a];

    _9cnv.sliceobj.data =
    [
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

    var a = Array(_9cnv.sliceobj.length()).fill().map((_, index) => index);
    _9cnv.rotated = [...a,...a,...a];

    _11cnv.sliceobj.data =
    [
        {line:"Load Images\njpg png webp avif gif", path: "LOADIMAGES", func: function()
        {
            menuobj.hide();
            var input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.accept = ".png,.jpeg,.jpg,.webp,.gif,.avif";
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
                    return dropfiles(files[0]);
                };

                input.click();
            });
        }},

        {line:"Load Gallery\njson", path: "LOADGALLERY", func: function()
        {
            menuobj.hide();
            var input = document.createElement("input");
            input.type = "file";
            input.multiple = false;
            input.accept = ".json";
            return new Promise(function(resolve)
            {
                input.onchange = function()
                {
                    var files = Array.from(input.files);
                    loadgalleryblob(files[0]);
                    return true;
                };

                input.click();
            });
        }},

        {line:"Load Archive\nzip cbz", path: "LOADARCHIVE", func: function()
        {
            menuobj.hide();
            var input = document.createElement("input");
            input.type = "file";
            input.multiple = false;
            input.accept = ".zip,.cbz";
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
                    return loadzip(files[0]);
                };

                input.click();
            });
        }},
    ];

    var a = Array(_11cnv.sliceobj.length()).fill().map((_, index) => index);
    _11cnv.rotated = [...a,...a,...a];

    var j = Number(localobj.gallery);
    if (j >= 0 && j < TIMEOBJ)
        _8cnv.timeobj.set(j);
    else
        _8cnv.timeobj.set(TIMEOBJ - TIMEOBJ/galleryobj.length()/2);
    contextobj.reset();
    if (galleryobj.length())
    {
        headobj.set(1);
        bossobj.set(1);
        menuobj.hide();
        buttonobjreset()
        menuobj.toggle(_8cnvctx);
        _4cnvctx.refresh();
    }
    else
    {
        showsearch("pexels");
    }
 }

function loadgallery(path)
{
    fetch(path)
    .then(function (response)
    {
        if (!response.ok)
            throw new Error('Network error');
        return response.json()
    })
    .then((obj) => galleryobj.init(obj))
    .catch((error) => { });
}

url.path = "home";
url.filter = url.searchParams.get("f");

if (url.searchParams.has("z"))
{
    loadzip(url.searchParams.get("z"));
}
else if (url.searchParams.has("p"))
{
    url.path = url.searchParams.get("p");
    loadgallery(`res/${url.path}.json`)
}
else if (url.searchParams.has("q"))
{
    url.path = url.searchParams.get("q");
    loadgallery(`https://bucket.reportbase5836.workers.dev/${url.path}.json`);
}
else if (url.searchParams.has("s"))
{
    var path = url.searchParams.get("s");
    loadgallery(path);
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
        var search = e.toLowerCase();
        path = `https://${j}.reportbase5836.workers.dev/?search=${search}&page=1`;
    }

    loadgallery(path);
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

function pagedialog()
{
    function go(page)
    {
        if (menuobj.value() == _8cnvctx)
        {
            var k = page/galleryobj.length();
            _8cnv.timeobj.setperc(1-k);
            _8cnvctx.refresh();
        }
        else
        {
            galleryobj.set(page);
            delete _4cnv.thumbcanvas;
            delete photo.image;
            contextobj.reset();
        }

        dialog.close();
    }

    var input = document.getElementById("page-input");
    dialog = document.getElementById("page-dialog");
    input.addEventListener("keyup", function(event)
    {
      if (event.keyCode === 13)
      {
        event.preventDefault();
        var page = input.value.clean();
        if (page)
          go(page);
      }
    });

    dialog.classList.add('dialog');
    dialog.style.width = window.innerWidth*0.85;
    dialog.addEventListener("click", function()
    {
        var rect = input.getBoundingClientRect();
        if (event.target.id == "page-ok")
        {
            var page = input.value.clean();
            if (page)
              go(page);
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            dialog.close();
        }
    });

    if (menuobj.value() == _8cnvctx)
    {
        var current = Math.floor(
            Math.lerp(1,galleryobj.length(),1-_8cnv.timeobj.berp()));
        input.value = current;
    }
    else
    {
        input.value = galleryobj.current()
    }

    dialog.showModal();
}

function showsearch(repos)
{
    var input = document.getElementById("search-input");
    dialog = document.getElementById("search-dialog");
    input.addEventListener("keyup", function(event)
    {
        if (event.keyCode === 13)
        {
            event.preventDefault();
            var search = input.value.clean();
            if (!search)
                return;
            window.open(`${url.origin}?${repos}=${search}&page=1`,"_self");
        }
    });

    dialog.addEventListener("click", function()
    {
        var rect = input.getBoundingClientRect();
        if (event.target.id == "search-ok")
        {
            var search = input.value.clean();
            if (!search)
                return;
            window.open(`${url.origin}?${repos}=${search}&page=1`,"_self");
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            if (!galleryobj.length())
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

    input.value = search;
    dialog.showModal();
}

function promptdialog(str)
{
    var button = document.getElementById ("prompt-ok");
    button.innerHTML = "Submiit";
    var textarea = document.getElementById ("prompt-dialog");
    var rows = (window.innerHeight*0.50)/25;
    textarea.rows = rows;
    textarea.readOnly = false;

    dialog = document.getElementById("prompt-dialog");
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
            dialog.close();
        }
    });

    textarea.value = str;
    dialog.showModal();
    textarea.setSelectionRange(0, 0);
}

async function copytext(text)
{
    if (navigator.clipboard)
        navigator.clipboard.writeText(text)
}

/*
if (url.protocol == "https:")
{
}
*/

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
        var ww = galleryobj.width?galleryobj.width:1024;
        var hh = galleryobj.height?galleryobj.height:1024;
        var w = galleryobj.data[0].width?galleryobj.data[0].width:ww;
        var h = galleryobj.data[0].height?galleryobj.data[0].height:hh;
        var a = w/h;
        var height = Math.floor(window.innerWidth/a);
        var lst = [];
        var j = 120;
        var b = Math.min(180*20,Math.floor(height*3));
        for (var n = j; n < b; ++n)
            lst.push(n);
        var k = lst.findIndex(function(a){return a == height});
        _8cnv.buttonobj = new circular_array("", lst);
        _8cnv.buttonobj.set(k);
    }
}

async function loadgalleryblob(blob)
{
    try
    {
        galleryobj.min = 0;
        galleryobj.max = 0;
        galleryobj.width = 0;
        galleryobj.height = 0;
        var str = await blob.text();
        var json = JSON.parse(str);
        galleryobj.init(json);
    }
    catch(_)
    {

    }
}

var localobj = {};
localobj.filter = "";
localobj.gallery = "";

try
{
    var k = localStorage.getItem(url.path);
    if (k)
        localobj = JSON.parse(k);
}
catch(_)
{
}


