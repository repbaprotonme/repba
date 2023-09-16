//http://obfuscator.io
//https://ipfsexplorer.online/

/* 
Copyright 2017 Tom Brinkman
https://zip-view.com
https://ipfs-view.com
*/

function iOS()
{
    return
    [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
    ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

const SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const VIRTCONST = 0.8;
const MAXVIRTUAL = 5760*(iOS()?3:10);
const THUMBORDER = 5;
const BUTTONMARGIN = 30;
const ALIEXTENT = 60;
const BEXTENT = 80;
const TIMEOBJ = 3927;
const SCROLLMARGIN = 8;
const MENUSELECT = "rgba(255,175,0,0.4)";
const MENUTAP = "rgba(255,125,0,0.7)";
const SCROLLNAB = "rgba(0,0,0,0.3)";
const MENUCOLOR = "rgba(0,0,0,0.5)";
const OPTIONFILL = "white";
const THUMBFILP = "rgba(0,0,0,0.4)";
const THUMBFILL = "rgba(0,0,0,0.4)";
const THUMBSTROKE = "rgba(255,255,255,0.4)";
const SEARCHFRAME = "rgba(255,255,255,0.5)";
const TRANSPARENT = "rgba(0,0,0,0)";
const FILLBAR = "rgba(0,0,0,0.3)";
const NUBAR = "rgba(255,255,255,0.8)";
const FILLMENU = "rgba(0,0,0,0.6)";
const ARROWFILL = "white";
const SCROLLBARWIDTH = 7;
const SMALLFONT = "16px archivo black";
const DEFAULTFONT = "18px archivo black";
const LARGEFONT = "20px archivo black";
const HUGEFONT = "22px archivo black";
const DOTSFONT = "60px archivo black";
const SLICEWIDTH = 36;
const SLICEWIDTHSIZE = 36*20;
const ZOOMAX = 92;
const IMAGELSTSIZE = iOS()?30:120;
const BOSS = 0;
const GALLERY = 1;
const MENU = 2;
const TIMEMAIN = 4;
const TIMESECOND = 8;
const GALLERYMIN = 6;

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

//sleep(2000).then(() => console.log('world!'))
function pause(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sleep(milliseconds)
{
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

util.istouch = function()
{
    return ( 'ontouchstart' in window ) ||
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}

util.rotated_list = function (lst, size, start, width)
{
    var v = lst[start]
    width = Math.min(size, width);
    start += size - width;
    var k = lst.slice(start,start+width*2.0);
    var j = k.findIndex(function(a){return a == v;});
    var e = k.slice(j).concat(k.slice(0,j));
    return e;
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
        if(Array.isArray(this.data))
            return Math.berp(0,this.length()-1,this.current());
        else
            return Math.berp(0,this.length(),this.current());
    };

    this.lerp = function (berp)
    {
        console.assert(Array.isArray(this.data));
        return Math.floor(Math.lerp(0,this.length(),berp));
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
        var k = this.current()+index;
        this.set(k);
    };

    this.addperc = function (g)
    {
        var k = this.length()*g;
        this.add(k);
    };

    this.setperc = function (p)
    {
        p = util.clamp(0,1,p);
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

    this.wheeleftright = function (context, x, y, delta, ctrl, shift, alt, type)
    {
		if (context.canvas.wheeleftright_)
      		context.canvas.wheeleftright_(context, x, y, delta, ctrl, shift, alt, type);
   	};

    this.wheelupdown = function (context, x, y, delta, ctrl, shift, alt, type)
    {
		if (context.canvas.wheelupdown_)
      		context.canvas.wheelupdown_(context, x, y, delta, ctrl, shift, alt, type);
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

var offbosscnv = new OffscreenCanvas(1, 1);
var offbossctx = offbosscnv.getContext("2d");
offbossctx.font = DEFAULTFONT;
offbossctx.fillText("  ", 0, 0);
offbossctx.imageSmoothingEnabled = false;
offbossctx.imageSmoothingQuality = "high";

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
        canvas.speedrect = new rectangle();
        canvas.reducerect = new rectangle();
        canvas.bscrollrect = new rectangle();
        canvas.hscrollrect = new rectangle();
        canvas.vscrollrect = new rectangle();
        context.chapterect = new rectangle();
        canvas.galleryrect = new rectangle();
        if (headcnv.height == 0)
            return;
        var w = Math.min(360,rect.width-100);
        var j = window.innerWidth - rect.width >= 180;
        var rows = infobj.data.length;
        var s = canvas.scrollobj.current() == 1;
        var rh = 26;
        var bh = 180;
        var cw = rect.width-30;
        context.save();
        var a = new panel.layerA(
        [
            new panel.colA([SCROLLMARGIN,SCROLLBARWIDTH,0,SCROLLBARWIDTH,
			    SCROLLMARGIN,SCROLLBARWIDTH,SCROLLMARGIN],
            [
                0,
                new panel.row([0,bh,0],
                [
                    0,
                    galleryobj.advanced?new Layer(
                    [
                        new panel.expand(new panel.fill(THUMBFILL),3,3),
                        new panel.expand(new panel.rectangle(canvas.speedrect),10,0),
                        new panel.currentV(new panel.fill(NUBAR), bh/6, 0),
                    ]):0,
                    0,
                ]),
                0,
                new panel.row([0,bh,0],
                [
                    0,
                    galleryobj.advanced?new Layer(
                    [
                        new panel.expand(new panel.fill(THUMBFILL),3,3),
                        new panel.expand(new panel.rectangle(canvas.reducerect),10,0),
                        new panel.currentV(new panel.fill(NUBAR), bh/6, 0),
                    ]):0,
                    0,
                ]),
		0,
                0,
		0,
            ]),
            new panel.rowA([80,0,rows*rh,8,SCROLLBARWIDTH,4],
            [
                0,
                0,
                new panel.col([0,w,0],
                [
                  0,
                  s?0:new Layer(
                  [
                    new panel.rectangle(context.chapterect),
                    new panel.gridA(1, rows, 1,
                        new panel.shadow(new panel.text(
                            NUBAR,
                            "center", "middle",0, 0))),
                  ]),
                  0,
                ]),
                0,
                new panel.col([0,cw,0],
                [
                    0,
                    1?0:new Layer(
                    [
                        new panel.expand(new panel.rectangle(canvas.hscrollrect),0,10),
                        new panel.currentH(new panel.fill(NUBAR), bh/5, 1),
                    ]),
                    0,
                ]),
                0
            ]),
        ]);

        a.draw(context, rect,
        [
            [
                0,
                canvas.speedobj,
                0,
                canvas.reduceobj,
                0,
            ],
            [
                0,
                0,
                infobj.data,
                0,
                canvas.scrollobj.value(),
                0,
            ],
        ], 0, 0);
        context.restore();
    }
};

panel.galleryscroll = function ()
{
    this.draw = function (context, rect, user, time)
    {
        var canvas = context.canvas;
        context.save();
	    canvas.vscrollrect = new rectangle();
	    canvas.hscrollrect = new rectangle();
	var obj = context.canvas.scrollobj.value();       
        var a = new panel.col([0,SCROLLBARWIDTH,2],
            [
                0,
                new panel.row([5,0,5],
                [
                    0,
			new Layer(
			[
        	    		new panel.expand(new panel.rectangle(canvas.vscrollrect),10,0),
				new panel.currentV(new panel.shadow(new panel.fill("white")), 90, 1),
			]),
                    0,
                ]),
                0,
            ]);

        a.draw(context, rect, context.canvas.timeobj, 0);
	    
        var a = new panel.row([0,SCROLLBARWIDTH,2],
            [
                0,
                new panel.col([5,0,5],
                [
                    0,
		    new Layer(
		    [
        	    	new panel.expand(new panel.rectangle(canvas.hscrollrect),0,10),
			    new panel.currentH(new panel.shadow(new panel.fill("white")), 90, 1),
		    ]),
                    0,
                ]),
                0,
            ]);

        a.draw(context, rect, obj, 0);
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
                        new panel.expand(new panel.rectangle(canvas.vscrollrect),10,0),
                        new panel.currentV(new panel.shadow(new panel.fill("white")), 90, 1),
                    ]),
                    0,
                ]),
                0,
            ]);

        a.draw(context, rect, context.canvas.timeobj, 0);
        context.restore();
    }
};

var buttonobj = new circular_array("", []);

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

String.prototype.ext = function()
{
    return this.replace(/^.*\./, '');
}

String.prototype.isjson = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['json'];
    var k = lst.findIndex(function(a) {return a == ext;})
    return k >= 0;
}

String.prototype.iszip = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['zip','cbz'];
    var k = lst.findIndex(function(a) {return a == ext;})
    return k >= 0;
}

String.prototype.isimage = function()
{
    var ext = this.ext();
    ext = ext.toLowerCase();
    var lst = ['png','jpg','jpeg','webp','avif','gif'];
    var k = lst.findIndex(function(a) {return a == ext;})
    return k >= 0;
}

String.prototype.proper = function()
{
    if (!this.length)
        return this;
    return this.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

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

panel.randomfill = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.fillStyle = util.random_color();
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
            new panel.rectangle(context.fullrect),
            window.innerHeight === screen.height ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(window.innerHeight === screen.height ? TRANSPARENT : SCROLLNAB, SEARCHFRAME,4),17,17),
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
            new panel.rectangle(context.canvas.openrect),
            new panel.shrink(new panel.circle(SCROLLNAB, SEARCHFRAME,4),15,15),
            new panel.shrink(new Panel(),20,34),
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
            new panel.rectangle(context.canvas.uploadrect),
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
        var s = _8cnv.scrollobj.current() == 0;

        var a = new Layer(
        [
            new panel.rectangle(context.canvas.metarect),
            s ? 0 : new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22),
            new panel.shrink(new panel.circle(s ? SCROLLNAB:TRANSPARENT, SEARCHFRAME,4),17,17),
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
        var j = 0;
        context.save();
        context.thumbpanel = new rectangle()
        var a = new Layer(
        [
            new panel.rectangle(context.thumbpanel),
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
        var s = menuobj.value() == _5cnvctx;
        var j = 5;
        var k = j/2;
        var e = new panel.fill(OPTIONFILL);
        var a = new Layer(
        [
            new panel.rectangle(context.canvas.fitwindowrect),
            s ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(s?TRANSPARENT:FILLBAR,SEARCHFRAME,4),17,17),
            new panel.row( [0, rect.height*0.20, 0],
            [
                0,
                new panel.col ([0,j,k,j,k,j,0], [0,e,0,e,0,e,0,]),
                0,
            ]),
        ])

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
            new panel.rectangle(context.moveprev),
            _4cnv.movingpage == -1 ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(_4cnv.movingpage == -1?TRANSPARENT:FILLBAR,SEARCHFRAME,4),17,17),
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
            new panel.rectangle(context.movenext),
            _4cnv.movingpage == 1 ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(_4cnv.movingpage == 1?TRANSPARENT:FILLBAR,SEARCHFRAME,4),17,17),
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

        var s = menuobj.value() == _3cnvctx ||
            menuobj.value() == _7cnvctx;
        var a = new Layer(
        [
            new panel.rectangle(context.canvas.searchrect),
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
    if (x && x.width)
    {
        this.x = x.x;
        this.y = x.y;
        this.width = x.width;
        this.height = x.height;
        this.right = x.right;
        this.left = x.left;
        this.top = x.top;
        this.bottom = x.bottom;
    }
    else
    {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.right = x+w;
        this.left = x;
        this.top = y;
        this.bottom = y+h;
    }
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
        _4cnv.movingpage = 0;
        this.refresh();
        return;
    }

    _4cnv.slidestop = 0;
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
    var context = this;
    clearInterval(global.swipetimeout);
    global.swipetimeout = setInterval(function ()
    {
        context.canvas.lastime = -0.0000000000101010101;
        menuobj.draw();
        bossobj.draw()
    }, TIMEMAIN);
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
    CanvasRenderingContext2D.prototype.clear || function ()
    {
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

var makehammer = function (context, v, t)
{
    var canvas = context.canvas;
    var ham = new Hammer(canvas, { domEvents: true });
    ham.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    ham.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    ham.get('swipe').set({ velocity: 0.6});//0.40
	ham.get('swipe').set({ threshold: 20});//10
	ham.get('press').set({ time: 500 });//251

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

    ham.element.addEventListener("wheel", function (evt)
    {
        const { deltaY } = evt;
        var trackpad = deltaY && !Number.isInteger(deltaY);

        var x = evt.offsetX;
        var y = evt.offsetY;
        evt.preventDefault();

        if (typeof (ham.panel.wheeleftright) == "function")
            ham.panel.wheeleftright(context, x, y, evt.deltaX, evt.ctrlKey, evt.shiftKey, evt.altKey, evt.deltaX<0?"wheeleft":"wheelright");
        if (typeof (ham.panel.wheelupdown) == "function")
            ham.panel.wheelupdown(context, x, y, evt.deltaY, evt.ctrlKey, evt.shiftKey, evt.altKey, evt.deltaY<0?"wheelup":"wheeldown");
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
    updown: function (context, x, y, delta, ctrl, shift, alt, type) { },
 	leftright: function (context, x, y, delta, ctrl, shift, alt, type) { },
},
{
    name: "GALLERY",
    updown: function (context, x, y, delta, ctrl, shift, alt, type)
    {
        var canvas = context.canvas;
        context.canvas.slideshow = 0;
        if (ctrl)
        {
            context.canvas.pinching = 1;
            var k = delta<0?1:-1;
            buttonobj.addperc(k*0.04);
            context.canvas.lastime = -0.0000000000101010101;
            menuobj.draw();
            context.canvas.pinching = 0;
        }
        else
        {
            clearInterval(context.canvas.leftright)
            menuobj.updown(context, delta)
		if (global.swipetimeout)
			return;
		global.swipetimeout = setInterval(function ()
		{
		    context.canvas.lastime = -0.0000000000101010101;
		    menuobj.draw();
		}, TIMEMAIN);
        }
    },
    leftright: function (context, x, y, delta, ctrl, shift, alt, type)
    {
        menuobj.leftright(context, delta);
    },
},
{
    name: "MENU",
    updown: function (context, x, y, delta, ctrl, shift, alt, type)
    {
        menuobj.updown(context, delta);
        context.refresh();
    },
    leftright: function (context, x, y, delta, ctrl, shift, alt)
    {
    },
},
{
    name: "BOSS",
    updown: function (context, x, y, delta, ctrl, shift, alt, type)
    {
        var canvas = context.canvas;
        if (ctrl)
        {
            var isthumb = context.canvas.thumbrect &&
                   context.canvas.thumbrect.hitest(x,y);
            if (isthumb)
            {
                pinchobj.set(0);
                var obj = heightobj.value();
                delete context.canvas.thumbcanvas;
                obj.addperc(type=="wheelup"?0.02:-0.02);
                context.refresh();
            }
            else
            {
                zoomobj.value().addperc(type=="wheelup"?0.02:-0.02);
                contextobj.reset()
            }
        }
        else
        {
            bossobj.updown(delta);
        }
	},
    leftright: function (context, x, y, delta, ctrl, shift, alt, type)
    {
        bossobj.leftright(delta);
        context.refresh();
    },
},
];

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
        var j = Math.lerp(0.005,0.02,buttonobj.berp());
        var k = scale<context.canvas.scale?-1:1;
        buttonobj.addperc(k*j);
        context.canvas.scale = scale;
        context.refresh();
    },
    pinchstart: function (context, rect, x, y)
    {
        context.canvas.start = buttonobj.current();
        context.canvas.slideshow = 0;
        context.canvas.pinching = 1;
    },
    pinchend: function (context)
    {
        setTimeout(function() 
	{ 
		context.canvas.pinching = 0; 
		menuobj.draw();
	}, 100);
    },
},
{
    name: "BOSS",
    pinch: function (context, x, y, scale)
    {
        var obj = context.obj;
        obj.add(scale<context.canvas.scale?-1:1);
        contextobj.reset();
        context.canvas.scale = scale;
    },
    pinchstart: function (context, rect, x, y)
    {
        context.canvas.pinching = 1;
        menuobj.hide();
        context.canvas.isthumb = context.canvas.thumbrect && context.canvas.thumbrect.expand &&
            context.canvas.thumbrect.expand(40,40).hitest(x,y);
        pinchobj.set(context.canvas.isthumb?0:1)
        context.obj = pinchobj.value().value();
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
infobj.reset = function(index)
{
    if (!galleryobj.infohide)
    {
        var value = galleryobj.data[index];
        if (value && value.folder)
            infobj.data = value.folder.split("/");

	if (galleryobj.advanced)
	{
		infobj.data.push(value.name?value.name:value.id);
		if (menuobj.value())
		{
	        	var k = index%IMAGELSTSIZE;
	        	var img = thumbimglst[k];
			infobj.data.push(`${img.width}x${img.height}`);
		}
		else if (photo.image)
		{
			infobj.data.push(photo.image.extent);
		}
	}
	    
        var k = galleryobj.data[index];
        if (k && k.photographer)
	{
            infobj.data.push(k.photographer);
            infobj.data.push(galleryobj.repos);
	}
	    
        if (url.searchParams.has(galleryobj.repos))
            infobj.data.push(url.searchParams.get(galleryobj.repos));
    }

    if (galleryobj.length() > 1)
        infobj.data.push(`${index+1} of ${galleryobj.length()}`);
}

var slicewidthobj = new circular_array("SLICEWIDTH", SLICEWIDTHSIZE);

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
        authClient = PropelAuth.createClient({authUrl: "https://auth.ipfs-view.com", enableBackgroundTokenRefresh: true})
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

async function loadipfs(json, folder)
{
    for (var n = 0; n < json.length; ++n)
    {
        var k = json[n];
        var j = {}
        j.id = k.Hash;
        j.name = k.Name;
        if (k.Type != 2)
            continue;
        if (j.name.isimage())
        {
            j.folder = folder;
            galleryobj.data.push(j);
        }
        else if (j.name.isjson())
        {
             //url.path = url.searchParams.get("z");
             //var path = `https://dweb.link/ipfs/${j.id}`;
	     var path3 = `https://ipfs.filebase.io/ipfs/${j.id}`;
	     var path2 = `https://cloudflare-ipfs.com/ipfs/${j.id}`;
            fetch(path2)
            .then((response) => jsonhandler(response))
            .then(function (json) { Object.assign(galleryobj, json); })
            .catch((error) => { });
        }
    }

    for (var n = 0; n < json.length; ++n)
    {
        var k = json[n];
        if (k.Type != 1)
            continue;
	var path2 = `https://ipfs.filebase.io/ipfs/${j.id}?filename=${j.name}`;
        var path1 = `https://cloudflare-ipfs.com/ipf/${j.id}?filename=${j.name}`;
        var path = `https://dweb.link/api/v0/ls?arg=${folder}/${k.Name}`;
	var path3 = `https://ipfs.filebase.io/api/v0/ls?arg=${folder}/${k.Name}`;    
	var path4 = `https://gateway.ipfs.io/api/v0/ls?arg=${folder}/${k.Name}`;
        var response = await fetch(path);
        if (!response.ok)
            continue;
        var f = await response.json()
        var e = f.Objects[0];
        var b = `${folder}/${k.Name}`
        loadipfs(e.Links, b);
        galleryobj.init()
    }
}

async function loadzip(path)
{
    const {entries} = await unzipit.unzip(path);
    let keys = Object.keys(entries);
    keys.sort();
    var count = 0;
    galleryobj.title = "";
    for (var n = 0; n < keys.length; ++n)
    {
        var key = keys[n];
        if (iOS() && key.charAt(0) == '_')
            continue;
        if (!key.isimage())
            continue;
        count += 1;
    }

    if (!count)
        return;

    galleryobj.data = [];
    galleryobj.width = 0;
    galleryobj.height = 0;
    localobj.time = 0;
    delete galleryobj.repos;
    for (var n = 0; n < keys.length; ++n)
    {
        var key = keys[n];
        var k = Array.from(key);
        if (iOS() && k.charAt(0) == '_')
            continue;
        var entry = entries[key];
        if (entry.isDirectory)
            continue;
        if (key.isimage())
        {
            var k = {}
            k.ext = key.ext();
            k.blob = await entry.blob(`image/${k.ext}`);
            var lst = key.split("/");
            k.name = lst.pop();
            k.folder = lst.join("/");
            galleryobj.data.push(k);
        }
        else if (key.isjson())
        {
            var blob = await entry.blob(`image/text`);
            var text = await blob.text();
            Object.assign(galleryobj, JSON.parse(text));
        }
    }

    galleryobj.init(galleryobj)
}

async function loadblob(blob)
{
    menuobj.hide();
    galleryobj.data = [];
    galleryobj.width = 0;
    galleryobj.height = 0;
    localobj.time = 0;
    delete galleryobj.repos;
    galleryobj.set(0);

    var k = {}
    k.blob = blob;
    galleryobj.data.push(k);
    var image = new Image();
    image.src = URL.createObjectURL(blob);
    image.onload = function(file)
    {
        galleryobj.width = this.width;
        galleryobj.height = this.height;
        URL.revokeObjectURL(this.src);
        buttonobj.reset()
        galleryobj.init(galleryobj)
    };
}

async function loadimages(blobs)
{
    var count = 0;
    for (var i = 0; i < blobs.length; i++)
    {
        var name = blobs[i].name.toLowerCase();
        if (name.isimage())
            count += 1;
    }

    if (!count)
        return;

    menuobj.hide();
    galleryobj.data = [];
    galleryobj.width = 0;
    galleryobj.height = 0;
    localobj.time = 0;
    delete galleryobj.repos;

    for (var i = 0; i < blobs.length; i++)
    {
        var blob = blobs[i];
        var name = blob.name;
        if (name.isimage())
        {
            var k = {}
            k.name = name;
            k.blob = blob;
            galleryobj.data.push(k);
        }
        else if (name.isjson())
        {
            var text = await blob.text();
            Object.assign(galleryobj, JSON.parse(text));
        }
    }

    galleryobj.init(galleryobj)
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
            if (files[0].name.isimage())
            {
                loadimages(files);
            }
            else if (files[0].name.iszip())
            {
                var blob = files[0];
                loadzip(blob);
            }
            else if (files[0].name.isjson())
            {
                var blob = files[0];
                loadjson(blob);
            }
        }
        else
        {
            loadimages(files);
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
    updown: function (context, rect, x, y, type) {},
 	leftright: function (context, rect, x, y, type) {},

	pan: function (context, rect, x, y, type)
    {
        var canvas = context.canvas;
        if (canvas.pinching)
            return;
        var obj = canvas.scrollobj.value();
        if (type == "panleft" || type == "panright")
        {
            var k = type == "panleft" ? 1 : -1;
            menuobj.leftright(context, k*context.canvas.speedobj.value()/5);
        }
        else if (type == "panup" || type == "pandown")
        {
            if (canvas.isspeedrect)
            {
                var k = (y-canvas.speedrect.y)/canvas.speedrect.height;
                canvas.speedobj.setperc(k);
                context.canvas.lastime = -0.0000000000101010101;
                menuobj.updown(context, canvas.speedobj.value());
                if (!global.swipetimeout)
                {
                    global.swipetimeout = setInterval(function ()
                    {
                        context.refresh()
                    }, TIMEMAIN);
                }
            }
            else if (canvas.isreducerect)
            {
                var k = (y-canvas.reducerect.y)/canvas.reducerect.height;
                canvas.reduceobj.setperc(k);
                context.canvas.lastime = -0.0000000000101010101;
                menuobj.updown(context, canvas.speedobj.value());
                if (!global.swipetimeout)
                {
                    global.swipetimeout = setInterval(function ()
                    {
                        context.refresh()
                    }, TIMEMAIN);
                }
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
        canvas.panning = 1;
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        delete canvas.slideshow;
        clearInterval(context.canvas.leftright)
        clearInterval(global.timeauto);
        global.timeauto = 0;
        canvas.startx = x;
        canvas.starty = y;
        canvas.timeobj.setanchor(canvas.timeobj.current());
        canvas.isspeedrect = canvas.speedrect  && canvas.speedrect.hitest(x,y);
        canvas.isreducerect = canvas.reducerect && canvas.reducerect.hitest(x,y);
    },
	panend: function (context, rect, x, y)
    {
        delete context.canvas.type;
        delete context.canvas.panning;
        delete context.canvas.starty;
        delete context.startt;
        delete context.canvas.timeobj.offset;
        delete buttonobj.offset;
        delete context.canvas.isvbarect;
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
        if (context.canvas.isthumb)
        {
            context.hithumb(x,y);
            //if (!zoomobj.value().value())
            //    context.refresh();
            if (y != context.canvas.lasty)
                contextobj.reset()
            else
                context.refresh();
            context.canvas.lasty = y;
        }
        else if (type == "panleft" || type == "panright")
        {
            var k = type == "panleft"?-1:1;
            bossobj.leftright(k*context.canvas.speedobj.value());
        }		
        else if (type == "panup" || type == "pandown")
        {
 		var zoom = zoomobj.value()
	 	context.refresh()
            if (context.islicewidthrect)
            {
                var k = (y-context.slicewidthrect.y)/context.slicewidthrect.height;
                if (galleryobj.debug)
                {
                    slicewidthobj.setperc(k);
                    contextobj.reset()
                }
                else
                {
	                var k = (y-context.slicewidthrect.y)/context.slicewidthrect.height;
		    	var zoom = zoomobj.value();
		    	zoom.setperc(k);
		    	contextobj.reset()
                }
            }
            else if (context.isstretchrect)
            {
                var k = (y-context.stretchrect.y)/context.stretchrect.height;
	    	var stretch = stretchobj.value();
	    	stretch.setperc(k);
	    	contextobj.reset()
            }	
        }
    },
	panstart: function (context, rect, x, y)
	{
        var canvas = context.canvas;
        canvas.slidestop = 0;
        canvas.startx = x;
        canvas.starty = y;
        galleryobj.hidefocus = 0;
        canvas.isthumb = canvas.thumbrect &&
            canvas.thumbrect.hitest(x,y);
        canvas.timeobj.setanchor(canvas.timeobj.current());
        movingx = new MovingAverage();
        movingy = new MovingAverage();
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        context.isstretchrect = context.stretchrect && context.stretchrect.hitest(x,y);
        context.islicewidthrect = context.slicewidthrect && context.slicewidthrect.hitest(x,y);
        contextobj.reset();
    },
    panend: function (context, rect, x, y)
	{
        var canvas = context.canvas;
        clearTimeout(context.timepan)
        canvas.slidestop = 0;
        canvas.isthumb = 0;
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
{
    name: "BOSS",
    down: function (evt) { },
 	out: function (evt) { },
    enter: function (evt) { },
    up: function (evt) { },
	move: function (context, rect, x, y)
    {
    },
},
{
    name: "GALLERY",
    down: function (evt) { },
 	out: function (evt) { },
    enter: function (evt) { },
    up: function (evt) { },
	move: function (context, rect, x, y)
    {
    },
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
        if (context.canvas.speedrect && context.canvas.speedrect.hitest(x,y))
        {
        }
        else if (context.canvas.reducerect && context.canvas.reducerect.hitest(x,y))
        {
        }
        else if (screenfull.isEnabled)
        {
            var h = headcnv.height?0:BEXTENT;
            headcnvctx.show(0,0,window.innerWidth,h);
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            context.refresh()
        }
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
    },
    press: function (context, rect, x, y)
    {
        if (context.canvas.thumbrect &&
            context.canvas.thumbrect.hitest(x,y))
        {
        }
        else if (context.cnavas.slicewidthrect &&
            context.canvas.slicewidthrect.hitest(x,y))
        {
        }
        else
        {
            headobj.set(GALLERY);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
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

function home()
{
	var k = TIMEOBJ - TIMEOBJ/galleryobj.length()/2; 
	//_8cnv.timeobj.set(k);
	menuobj.draw();

	var e = buttonobj.value()/100;
	var j = e/_8cnv.virtualheight;
	
	var b = galleryobj.length()-1;
	var data = _8cnv.sliceobj.data;
	var count = 0;
	if (data[b].isvisible)
	{
		while (data[b].isvisible)
		{
			if (++count > galleryobj.length())
				break;
			_8cnv.timeobj.add(-TIMEOBJ*j);
			menuobj.draw();
		}
	}
	else
	{
		while (!data[b].isvisible)
		{
			if (++count > galleryobj.length())
				break;
			_8cnv.timeobj.add(TIMEOBJ*j);
			menuobj.draw();
		}
	}
		console.log(count);
	
}

var swipelst =
[
{
    name: "BOSS",
    swipeleftright: function (context, rect, x, y, evt)
    {
        setTimeout(function()
        {
            var k = evt.type == "swipeleft"?-1:1;
            bossobj.leftright(k*context.canvas.speedobj.value());
            context.refresh();
        }, TIMEMAIN);
     },

    swipeupdown: function (context, rect, x, y, evt)
    {
        var k = evt.type == "swipeup"?-1:1;
        bossobj.updown(k*context.canvas.speedobj.value());
    },
},
{
    name: "GALLERY",
    swipeleftright: function (context, rect, x, y, evt)
    {
        var k = evt.type == "swipeleft"?1:-1;
        menuobj.leftright (context, k*context.canvas.speedobj.value());
    },
    swipeupdown: function (context, rect, x, y, evt)
    {
        var k = evt.type == "swipeup"?1:-1;
        menuobj.updown(context,  k*context.canvas.speedobj.value());
        if (!global.swipetimeout)
        {
            global.swipetimeout = setInterval(function ()
            {
                context.canvas.lastime = -0.0000000000101010101;
                menuobj.draw();
            }, TIMEMAIN);
        }
   },
},
{
    name: "MENU",
    swipeleftright: function (context, rect, x, y, evt)
    {
    },
    swipeupdown: function (context, rect, x, y, evt)
    {
        var k = evt.type == "swipeup"?1:-1;
        menuobj.updown(context, k*context.canvas.speedobj.value());
    },
},
];

var swipeobj = new circular_array("SWIPE", swipelst);
swipeobj.set(3);

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
        canvas.shiftKey = 0;
        canvas.ctrlKey = 0;
        canvas.keydown = 0;
    },
	keydown: function (evt)
	{
   		var context = menuobj.value()
        var canvas = context.canvas;
        var key = evt.key.toLowerCase();
        var keycode = evt.keyCode || evt.which;
        canvas.shiftKey = evt.shiftKey;
        canvas.ctrlKey = evt.ctrlKey;
        canvas.slideshow = 0;
        canvas.keydown = (typeof canvas.keydown == "undefined") ? 1 : canvas.keydown+1;
        clearTimeout(canvas.keydowntime);
        canvas.keydowntime = setTimeout(function()
        {
            canvas.keydown = 0;
        }, 40);

        clearInterval(context.canvas.leftright);
        if (
            key == "arrowup" ||
            key == "pageup" ||
	    key == "backspace" ||
            (canvas.shiftKey && key == "enter") ||
            (canvas.shiftKey && key == " ") ||
            key == "k")
        {
            menuobj.updown(context, -canvas.speedobj.value()/3);
            if (!global.swipetimeout)
            {
                global.swipetimeout = setInterval(function ()
                {
                    context.canvas.lastime = -0.0000000000101010101;
                    menuobj.draw();
                }, TIMEMAIN);
            }

            evt.preventDefault();
        }
        else if (
            key == "arrowdown" ||
            key == "pagedown" ||
            key == "enter" ||
            key == " " ||
            key == "j")
        {
            menuobj.updown(context, canvas.speedobj.value()/3);
            if (!global.swipetimeout)
            {
                global.swipetimeout = setInterval(function ()
                {
                    context.canvas.lastime = -0.0000000000101010101;
                    menuobj.draw();
                }, TIMEMAIN);
            }

            evt.preventDefault();
        }
	else if (key == "0" && canvas.ctrlKey)
	{
		evt.preventDefault();
			buttonobj.reset()
			menuobj.draw();
	}
        else if (key == "g" && canvas.ctrlKey && canvas.shiftKey)
        {
		evt.preventDefault();
            gotodialog();
        }		
        else if (key == "s" && canvas.ctrlKey && canvas.shiftKey)
        {
		evt.preventDefault();
            showsearch();
        }		
	else if (key == "home" || (key == "h" && canvas.ctrlKey && canvas.shiftKey))
	{
		home();
		evt.preventDefault();
	}
	else if (key == "\\")
        {
            var h = headcnv.height?0:BEXTENT;
            headcnvctx.show(0,0,window.innerWidth,h);
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            context.refresh()
        	evt.preventDefault();
	}
        else if (key == "-" || key == "[")
        {
            buttonobj.addperc(-1.0/100);
            context.refresh()
        	evt.preventDefault();
	}
        else if (key == "+" || key == "]" || key == "=")
        {
            buttonobj.addperc(1.0/100);
            context.refresh()
        	evt.preventDefault();
	}	
        else if (
            (canvas.shiftKey && key == "tab") ||
            key == "arrowleft" ||
            key == "h")
	{
		evt.preventDefault();
            menuobj.leftright (context, -canvas.speedobj.value()/3)
        }
        else if (
            (!canvas.shiftKey && key == "tab") ||
            key == "arrowright" ||
            key == "l")
	{
		evt.preventDefault();
            menuobj.leftright (context, canvas.speedobj.value()/3)
        }
        else if (key == "f")
        {
		evt.preventDefault();	
            if (screenfull.isEnabled)
            {
                if (window.innerHeight === screen.height)
                    screenfull.exit();
                else
                    screenfull.request();
            }

            context.refresh();
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
    },
	keydown: function (evt)
	{
   		var context = menuobj.value()
        var canvas = context.canvas;

        canvas.shiftKey = evt.shiftKey;
        canvas.ctrlKey = evt.ctrlKey;
        canvas.slideshow = 0;

        var key = evt.key.toLowerCase();
        if (key == "pageup" ||
            key == "arrowup" ||
            (canvas.shiftKey && evt.key == "enter") ||
            (canvas.shiftKey && evt.key == " ") ||
            evt.key == "w" ||
            evt.key == "j")
		{
            menuobj.updown(context, canvas.speedobj.value());
            context.refresh();
        }
        else if (
            key == "pagedown" ||
            key == "arrowdown" ||
            evt.key == "enter" ||
            evt.key == " " ||
            evt.key == "s" ||
            evt.key == "k")
		{
            menuobj.updown(context, -canvas.speedobj.value());
            context.refresh();
        }
        else if (key == "f")
        {
            if (screenfull.isEnabled)
            {
                if (window.innerHeight === screen.height)
                    screenfull.exit();
                else
                    screenfull.request();
            }

            context.refresh();
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
		var canvas = _4cnv;
		var context = _4cnvctx;
		var rect = context.rect();
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
                if (window.innerHeight === screen.height)
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
            bossobj.leftright(context.canvas.speedobj.value());
            context.refresh();
        }
        else if (
            key == "tab" ||
            key == "arrowright" ||
            key == "d" ||
            key == "l")
        {
            bossobj.leftright(-context.canvas.speedobj.value());
            context.refresh();
        }
        else if (key == "/" || key == "\\")
        {
            var h = headcnv.height?0:BEXTENT;
            headcnvctx.show(0,0,window.innerWidth,h);
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            context.refresh()
        }
        else if (
            key == "arrowup" ||
            key == "w" ||
            key == "k")
        {
            bossobj.updown(-context.canvas.speedobj.value());
        }
        else if (key == "arrowdown" ||
            key == "s" ||
            key == "j" )
        {
            bossobj.updown(context.canvas.speedobj.value());
        }
        else if (key == "g")
        {
            gotodialog();
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
	}
},

];

CanvasRenderingContext2D.prototype.hithumb = function(x,y)
{    
        var rect = this.canvas.thumbrect;
	var select = this.canvas.selectrect[0];
	var b = (x-rect.x)/rect.width;
	var e = (1-b)*TIMEOBJ;
        this.canvas.timeobj.set(e);
    
        var b = (y-rect.y)/rect.height;
        var e = b*rowobj.length();
        rowobj.set(e);
}

var taplst =
[
{
	name: "BOSS",
	tap: function (context, rect, x, y, shift, ctrl)
	{
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

        if (context.canvas.thumbrect && context.canvas.thumbrect.hitest(x,y))
        {
            headobj.set(BOSS);
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
        else if (context.slicewidthrect &&
            context.slicewidthrect.hitest(x,y))
        {
            var k = (y-context.slicewidthrect.y)/context.slicewidthrect.height;
            if (galleryobj.debug)
            {
                slicewidthobj.setperc(k);
                contextobj.reset()
            }
            else
            {
                context.canvas.speedobj.setperc(k);
                bossobj.leftright(-1*context.canvas.speedobj.value());
            }
        }
        else if (context.stretchrect &&
            context.stretchrect.hitest(x,y))
        {
            var k = (y-context.stretchrect.y)/context.stretchrect.height;
            if (galleryobj.debug)
            {
                var stretch = stretchobj.value();
                stretch.setperc(k);
                contextobj.reset()
            }
            else
            {
                context.canvas.reduceobj.setperc(k);
                bossobj.leftright(-1*context.canvas.speedobj.value());
            }
        }
    	else if (galleryobj.repos && context.extentrect && context.extentrect.hitest(x,y))
        {
            window.open(galleryobj.photographer_url,galleryobj.repos);
        }
        else if (galleryobj.length() > 1)
        {
            menuobj.setindex(_8cnvctx);
            menuobj.show();
            headobj.set(GALLERY);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }

        _4cnvctx.refresh();
    }
},
{
    name: "GALLERY",
    tap: function (context, rect, x, y)
    {
        clearInterval(context.canvas.leftright)
        var canvas = context.canvas;
        canvas.slideshow = 0;
        var timeauto = global.timeauto;
        clearInterval(global.timeauto);
        global.timeauto = 0;
        var obj = canvas.scrollobj.value();
        context.refresh();
        if (
            galleryobj.repos &&
            context.chapterect &&
            context.chapterect.hitest(x,y))
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
	    var j = visibles[k].slice;
            window.open(j.photographer_url,galleryobj.repos);
        }
	else if (canvas.vscrollrect  && canvas.vscrollrect.hitest(x,y))
        {	
            var k = (y-canvas.vscrollrect.y)/canvas.vscrollrect.height;
                canvas.timeobj.setperc(1-k);
            context.refresh()
        }		
       else if (canvas.hscrollrect  && canvas.hscrollrect.hitest(x,y))
        {
            var k = (x-canvas.hscrollrect.x)/canvas.hscrollrect.width;
     	    var obj = context.canvas.scrollobj.value();
	    obj.setperc(k);
            context.refresh()
        }		
        else if (canvas.speedrect  && canvas.speedrect.hitest(x,y))
        {
            var k = (y-canvas.speedrect.y)/canvas.speedrect.height;
            canvas.speedobj.setperc(k);
            context.canvas.lastime = -0.0000000000101010101;
            menuobj.updown(context,canvas.speedobj.value());
            context.refresh()
        }
        else if (canvas.reducerect && canvas.reducerect.hitest(x,y))
        {
            var k = (y-canvas.reducerect.y)/canvas.reducerect.height;
            canvas.reduceobj.setperc(k);
            context.canvas.lastime = -0.0000000000101010101;
            menuobj.updown(context,canvas.speedobj.value());
            context.refresh()
        }
        else if (menuobj.value() && menuobj.value() != _8cnvctx)
        {
            menuobj.hide();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }
	else if (galleryobj.showboss || canvas.shiftKey)
        {
            clearInterval(global.swipetimeout);
            global.swipetimeout = 0;

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
            {
                menuobj.hide();
                headcnv.height = BEXTENT;
                headobj.set(BOSS);
                headham.panel = headobj.value();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
                contextobj.reset();
                return;
            }

            var n = visibles[k].n;
            var slice = galleryobj.data[n];
            headcnv.height = BEXTENT;
            headobj.set(BOSS);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            galleryobj.set(n);
            delete _4cnv.thumbcanvas;
            delete photo.image;
            menuobj.toggle(_8cnvctx);
            contextobj.reset();
        }
    },
},
{
    name: "MENU",
    tap: function (context, rect, x, y)
    {
        var canvas = context.canvas;
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

        var n = visibles[k].n;
        var slice = canvas.sliceobj.data[n];
        if (!slice)
            return;

        slice.tap = 1;
        context.refresh();
        setTimeout(function ()
        {
            menuobj.hide();
            delete slice.tap;
            slice.func(k)
            context.refresh();
            _4cnvctx.refresh();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }, 200);
    },
},
];

var tapobj = new circular_array("TAP", taplst);

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
    	this.draw = function (context, r, user, time)
        {
            var canvas = context.canvas;
            context.extentrect = new rectangle();
            context.zoomrect = new rectangle();
            context.stretchrect = new rectangle();
            context.slicewidthrect = new rectangle();
            context.chapterect = new rectangle();
            context.heightrect = new rectangle();
		if (menuobj.value())
			return;
            if (headcnv.height == 0)
                return;
            if (
                !photo.image ||
                !photo.image.complete ||
                !photo.image.naturalHeight)
                return;

            var w = Math.min(360,r.width-100);
            var j = window.innerWidth - r.width >= 180;

            infobj.data = [];
            infobj.reset(galleryobj.current());
            var lst = infobj.data;

            var rows = lst.length;
            var rh = 26;
            var bh = rect.height/4;
            var cw = rect.width-30;
        var a = new panel.layerA(
        [
            new panel.colA([SCROLLMARGIN,SCROLLBARWIDTH,0,SCROLLBARWIDTH,SCROLLMARGIN],
            [
                0,
                new panel.row([0,bh,0],
                [
                    0,
                    new Layer(
                    [
                        new panel.expand(new panel.fill(THUMBFILL),3,3),
                        new panel.expand(new panel.rectangle(context.slicewidthrect),10,1),
                        new panel.currentV(new panel.fill(NUBAR), bh/6, 0),
                    ]),
                    0,
                ]),
                0,
                new panel.row([0,bh,0],
                [
                    0,
                    new Layer(
                    [
                        new panel.expand(new panel.fill(THUMBFILL),3,3),
                        new panel.expand(new panel.rectangle(context.stretchrect),10,0),
                        new panel.currentV(new panel.fill(NUBAR), bh/6, 0),
                    ]),
                    0,
                ]),
                0,
            ]),
            new panel.rowA([0,rows*rh,8,SCROLLBARWIDTH,SCROLLMARGIN],
            [
                0,
                new panel.col([0,w,0],
                [
                  0,
                  new Layer(
                  [
                    new panel.rectangle(context.chapterect),
                    new panel.gridA(1, rows, 1,
                        new panel.shadow(new panel.text(
                            NUBAR, "center", "middle",0, 0))),
                  ]),
                  0,
                ]),
                0,
                new panel.col([0,cw,0],
                [
                    0,
                    1?0:new Layer(
                    [
                        new panel.expand(new panel.rectangle(context.heightrect),0,10),
                        new panel.currentH(new panel.fill(NUBAR), bh/5, 1),
                    ]),
                    0,
                ]),
                0,
            ])
        ]);

            a.draw(context, rect,
                [
                    [
                        0,
                        galleryobj.debug?
                            slicewidthobj:
                            zoomobj.value(),
                        0,
                       stretchobj.value(),
                        0,
                    ],
                    [
                        0,
                        lst,
                        0,
                        heightobj.value(),
                        0,
                    ]
                ]);
            var he = heightobj.value();
            var b = Math.berp(0,he.length()-1,he.current());
            var height = Math.lerp(90, rect.height-180, b);
            var width = Math.lerp(90, rect.width-80, b);
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

            context.restore();
        }
    },
 ];

var bossobj = new circular_array("", bosslst);
bossobj.draw = function(skip=1)
{
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
        if (!context.canvas.keydown && !context.canvas.panning)
            canvas.slidestop -= canvas.slidereduce;
        if (canvas.slidestop > 0)
        {
            var j = canvas.autodirect*(TIMEOBJ/1000)
            canvas.timeobj.rotate(j*canvas.slidestop);
        }
        else
        {
            clearInterval(global.swipetimeout);
            global.swipetimeout = 0;
            canvas.lastdelta = -1;
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
    if (galleryobj.debug)
    {
        var a = new panel.fill("gray");
        a.draw(context, rect, 0, 0);
    }
    else if (galleryobj.value() && galleryobj.value().ispng)
    {
        context.clear();
    }

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
        var w = galleryobj.debug ? colwidth : g;
        w = Math.ceil(x+w)-x;

        if (x < -w || x >= rect.width)
            continue;
        offbossctx.drawImage(slice.canvas,
            slice.x, 0, colwidth, rect.height,
            x, 0, w, rect.height);

        if (galleryobj.debug)
        {
//            overlayobj.value().draw(offbossctx,
 //              new rectangle(x,0,w,rect.height),
  //                  `${n+1}of${slices.length}`, 0);
        }
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

    if (menuobj.value())
    {
        var a = new panel.fill("rgba(0,0,0,0.6)");
        a.draw(context, new rectangle(0,0,window.innerWidth,window.innerHeight), 0, 0);
    }
    else
    {
        var a = bossobj.value()
        a.draw(context, rect, 0, 0);
    }
}

bossobj.updown = function(delta)
{
return;
    var context = _4cnvctx;
    var canvas = _4cnv;
    context.canvas.startupdown = 0.05;
    var j = delta<0?-1:1;
    if (context.canvas.updowntype == j)
        return;
    context.canvas.updowntype = j;
    clearInterval(context.canvas.updown);
    context.canvas.updown = setInterval(function()
    {
        rowobj.addperc(
            j == -1?
            context.canvas.startupdown:
            -context.canvas.startupdown);
        context.canvas.startupdown -= 0.000025;
        if (context.canvas.startupdown < 0)
        {
            clearInterval(context.canvas.updown);
            context.canvas.startupdown = 0;
            delete context.canvas.updowntype;
        }

        contextobj.reset();
    }, TIMESECOND);
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
        var clr = FILLBAR;
        if (user.tap)
        {
            clr = MENUTAP;
        }
        else if (user.enabled)
        {
            if (user.enabled())
              clr = MENUSELECT;
        }

        var e = context.canvas.scrollobj.berp();
        var a = new panel.col([BUTTONMARGIN,0,BUTTONMARGIN],
        [
            0,
            new Layer(
            [
                new panel.expand(new panel.rounded(clr, 4, SEARCHFRAME, 8, 8), 10, 20),
                new panel.shrink(new panel.multitext(e), 20, 0),
            ]),
            0,
        ]);

        var k = user.title;
        var d = "\n";
        if (!k)
        {
            k = user.folder;
            d = "/";
        }

        a.draw(context, rect, k?k.split(d):"", time);
        context.restore();
    }
},
{
    name: "MENU",
    draw: function (context, rect, user, time)
    {
        context.save()
        var clr = FILLBAR;
        if (user.tap)
        {
            clr = MENUTAP;
        }
        else if (user.enabled)
        {
            if (user.enabled())
              clr = MENUSELECT;
        }

        var a = new panel.col([BUTTONMARGIN,0,BUTTONMARGIN],
        [
            0,
            new Layer(
            [
                new panel.expand(new panel.rounded(clr, 4, SEARCHFRAME, 8, 8), 10, 10),
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
        var view = Math.floor(time/IMAGELSTSIZE);
        var thumbimg = thumbimglst[index];
        var thumbfitted = thumbfittedlst[index];

        if (context.canvas.scrollobj.current() == 0 &&
            thumbimg && thumbimg.width)
        {
            var obj = context.canvas.scrollobj.value();
            var b = thumbimg.width/thumbimg.height;
            var b2 = rect.width/rect.height;
            if (thumbfitted.view != view)
            {
                thumbfitted.view = view;
            }
            else
            {
                if (b > b2)
                {
                    if (thumbfitted.height != Math.floor(rect.height) ||
                        thumbimg.count < 1)
                    {
                        var thumbfittedctx = thumbfitted.getContext("2d");
                        thumbfitted.height = Math.floor(rect.height);
                        thumbfitted.width = Math.floor(rect.height*b);
                        thumbfittedctx.drawImage(
                            thumbimg,0,0,thumbimg.width,thumbimg.height,
                            0,0,thumbfitted.width,thumbfitted.height);
                        thumbimg.count = 1;
                    }

	            var hh = Math.floor(rect.height);
		    var ww = Math.floor(rect.width);
                    var x = Math.nub(obj.value(), obj.length(),
                        ww, thumbfitted.width);
                    context.drawImage(thumbfitted,
                        Math.floor(x), 0, ww, hh,
                        0, 0, ww, hh);
                }
                else
                {
                    if (thumbfitted.width != Math.floor(rect.width) ||
                        thumbimg.count < 1)
                    {
                        var thumbfittedctx = thumbfitted.getContext("2d");
                        thumbfitted.width = Math.floor(rect.width);
                        thumbfitted.height = Math.floor(rect.width/b);
                        thumbfittedctx.drawImage(
                            thumbimg,0,0,thumbimg.width,thumbimg.height,
                            0,0,thumbfitted.width,thumbfitted.height);
                        thumbimg.count = 1;
                    }

             		var hh = Math.floor(rect.height);
		    var ww = Math.floor(rect.width);
                           var y = Math.nub(obj.value(), obj.length(),
                        hh, thumbfitted.height);
                    context.drawImage(thumbfitted,
                        0, Math.floor(y), ww, hh,
                        0, 0, ww, hh);
                }
            }
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
    if (menuobj.value() == context)
    {
        context.hide();
        menuobj.set(0);
    }
    else
    {
        menuobj.setindex(context);
        menuobj.show();
    }

    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
}

menuobj.hide = function()
{
    var context = this.value();
    if (!context)
        return;
    context.hide();
    this.setindex(_8cnv.height?_8cnvctx:0);
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

    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

    function f()
    {
        context.canvas.lastime = -0.0000000000101010101;
        menuobj.draw();
    }

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
    const rect = context.rect();
    if (!rect.width || !rect.height)
        return;

    if (context.canvas.slideshow > 0)
    {
        var k = canvas.autodirect;
        context.canvas.timeobj.rotate(k*context.canvas.slideshow);
        if (!context.canvas.keydown)
            context.canvas.slideshow -= context.canvas.slidereduce
    }
    else if (global.swipetimeout)
    {
        clearInterval(global.swipetimeout)
        global.swipetimeout = 0;
	context.canvas.slideshow = 0;    
    }

    var len = context.canvas.sliceobj.length()
    var delayinterval = TIMEOBJ / len / 1000;
    context.canvas.virtualheight = len*canvas.buttonheight;
    context.clear();
    if (context == _8cnvctx)
    {
        canvas.buttonheight = buttonobj.value();
        context.canvas.virtualheight = len*canvas.buttonheight*0.635;
    }
    else
    {
        var a = new panel.fill(FILLMENU);
        a.draw(context, new rectangle(0,0,canvas.width,canvas.height), 0, 0);
    }

    var current = context.canvas.sliceobj.lerp(
        1-context.canvas.timeobj.berp());
    if (canvas.lastcurrent != current)
    {
        canvas.lastcurrent = current;
        var size = Math.ceil(rect.height/canvas.buttonheight)+4;
        canvas.normal = util.rotated_list(canvas.rotated,slices.length,current,size);
    }

    context.canvas.visibles = [];
    var ctx = context;
    var isvisiblecount = 0;
    context.canvas.centered = 0;
    var r = new rectangle(0,0,rect.width,canvas.buttonheight);
    for (var m = 0; m < canvas.normal.length; ++m)
    {
        var n = canvas.normal[m];
        var slice = slices[n];
        var index = n%IMAGELSTSIZE;
        var view = Math.floor(n/IMAGELSTSIZE);
        var thumbimg = thumbimglst[index];
        var thumbfitted = thumbfittedlst[index];
        if (!canvas.pinching && thumbimg.view != view)
        {
            thumbimg.view = view;

            try
            {
                thumbimg.src = imagepath(slice);
                thumbimg.onload = function()
                {
                    this.count = 0;
                    if (!canvas.panning && !canvas.slideshow)
                        menuobj.draw();
                }

                thumbimg.onerror =
                    thumbimg.onabort = function(error)
                {
                    console.log(error);
                }
            }
            catch (error)
            {
                console.log(error);
            }
        }
        else
        {
            var t = time + n*delayinterval;
            var bos = Math.tan(t*VIRTCONST);
            var j = Math.berp(-1, 1, bos);
            var y = j * context.canvas.virtualheight;
            var e = (canvas.virtualheight-rect.height)/2;
            y -= e;
            var x = rect.width/2;
            var j = {slice, x, y, n};
            slice.rect = new rectangle(0,y,rect.width,canvas.buttonheight);
            slice.isvisible = y > -canvas.buttonheight && y < window.innerHeight;
            if (slice.isvisible || (!canvas.pinching && !canvas.panning && !canvas.slideshow))
            {
                if (j.slice.rect.hitest(window.innerWidth/2,window.innerHeight/2))
                    context.canvas.centered = j.n;
                isvisiblecount += j.slice.isvisible?1:0;
                if (slice.isvisible)
                    context.canvas.visibles.push(j);
                ctx.translate(0, j.y);
                context.canvas.draw(ctx, r, j.slice, j.n);
                ctx.translate(0, -j.y);
             }
        }
    }

    infobj.data = [];
    if (headcnv.height)
    {
        infobj.reset(context.canvas.centered);
        context.canvas.bar.draw(context, rect, 0, 0);
        context.canvas.scroll.draw(context, rect, 0, 0);
    }
}

var eventlst =
[
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "DEFAULT", swipe: "MENU", button: "DEFAULT", wheel: "DEFAULT", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 0, width: 640},
    {speed: 60, reduce: 10, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU",  drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {speed: 40, reduce: 40, updownmax: 60, mouse: "BOSS", thumb: "BOSS",  tap: "BOSS", pan: "BOSS", swipe: "BOSS", button: "BOSS", wheel: "BOSS", drop: "DEFAULT", key: "BOSS", press: "BOSS", pinch: "BOSS", bar: new panel.empty(), scroll: new panel.empty(), buttonheight: 30, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel:  "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 150, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty(), scroll: new panel.scrollbar(), buttonheight: 120, width: 640},
    {speed: 50, reduce: 10, updownmax: 60, mouse: "GALLERY", thumb: "DEFAULT", tap: "GALLERY", pan: "GALLERY", swipe: "GALLERY", button: "GALLERY", wheel: "GALLERY", drop: "DEFAULT", key: "GALLERY", press: "GALLERY", pinch: "GALLERY", bar: new panel.gallerybar(), scroll: new panel.galleryscroll(), buttonheight: 320, width: iOS()?720:5160},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 90, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
    {speed: 60, reduce: 5, updownmax: 60, mouse: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new panel.empty("Image Browser"), scroll: new panel.scrollbar(), buttonheight: 50, width: 640},
];

var contextobj = new circular_array("CTX", contextlst);
contextlst.forEach(function(context, n)
{
    var obj = eventlst[n];
    var canvas = context.canvas;
    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "high";
    context.font = DEFAULTFONT;
    context.fillText("  ", 0, 0);
    canvas.autodirect = -1;
    canvas.slideshow = 0;
    canvas.slidereduce = 0;
    canvas.slidestop = 0;
    canvas.lastime = 0;
    canvas.sliceobj = new circular_array("", []);
    canvas.timeobj = new circular_array("", TIMEOBJ);
    canvas.timeobj.set(TIMEOBJ/2);
    canvas.scrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);
    canvas.imagescrollobj = new circular_array("IMAGESCROLL", window.innerWidth);
    canvas.imagescrollobj.set(0.5*canvas.imagescrollobj.length());
    canvas.textscrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);
    canvas.speedobj = new circular_array("SPEED", 120);
    canvas.speedobj.set(obj.speed);
    canvas.reduceobj = new circular_array("REDUCE", 100);
    canvas.reduceobj.set(obj.reduce);
    canvas.autodirect = -1;
    canvas.modulo = obj.modulo;
    canvas.width_ = obj.width;
    canvas.bar = obj.bar;
    canvas.scroll = obj.scroll;
    canvas.buttonheight = obj.buttonheight;

    var k = pinchlst.findIndex(function (a) { return a.name == obj.pinch });
    k = pinchlst[k];
    canvas.pinch_ = k.pinch;
    canvas.pinchstart_ = k.pinchstart;
    canvas.pinchend_ = k.pinchend;

    var k = droplst.findIndex(function (a) { return a.name == obj.drop });
    k = droplst[k];
    canvas.drop = k.drop;

    var k = keylst.findIndex(function (a) { return a.name == obj.key });
    k = keylst[k];
    canvas.keyup_ = k.keyup;
    canvas.keydown_ = k.keydown;

    var k = wheelst.findIndex(function (a) { return a.name == obj.wheel });
    k = wheelst[k];
    canvas.wheelupdown_ = k.updown;
    canvas.wheeleftright_ = k.leftright;

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

    var k = taplst.findIndex(function (a) {return a.name.toLowerCase() == obj.tap.toLowerCase()});
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
            photo.image = new Image();
            var id = galleryobj.current();
            photo.image.src = galleryobj.getpath(id);
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
            this.extent = `${this.width}x${this.height}`;
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
            document.title = j;
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnv.autodirect = -_4cnv.movingpage;
            _4cnv.movingpage = 0;
            contextobj.reset()

            if (galleryobj.autopan)
                bossobj.leftright(-1*context.canvas.speedobj.value());

            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            _4cnvctx.refresh();

            var rotated = util.rotated_list(
                _8cnv.rotated,galleryobj.length(),
                galleryobj.current()+1,9);

		if (1)//!menuobj.value())
		{	
	            for (var m = 0; m < rotated.length; ++m)
	            {
	                var n = rotated[m];
	                if (galleryobj.data[n].loaded)
	                    continue;
	                var img = new Image();
	                img.src = galleryobj.getpath(n);
	                img.index = n;
	                img.onload = function()
	                {
	                    galleryobj.data[this.index].loaded = 1;
	                }
	            }
		}
        }
    }
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

panel.rectangle = function (r)
{
    this.draw = function (context, rect, user, time)
    {
        if (!r)
            r = user;
        Object.assign(r, rect);
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
    var h = _8cnv.height;
    menuobj.hide();
    if (h)
    {
        menuobj.setindex(_8cnvctx);
        menuobj.show();
    }

    delete _4cnv.thumbcanvas;
    headcnvctx.show(0,0,window.innerWidth,
        window.innerHeight === screen.height?0:BEXTENT);
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    buttonobj.reset()
    contextobj.reset();
    menuobj.show();
    _4cnvctx.refresh();
}

window.addEventListener("focus", (evt) => { });
window.addEventListener("blur", (evt) => { });
window.addEventListener("resize", (evt) => { resize(); });
window.addEventListener("screenorientation", (evt) => { resize(); });

var headlst =
[
	new function ()
	{
        this.wheeleftright = function (context, x, y, ctrl, shift, alt, type)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
      		k.canvas.wheeleftright_(k, x, y, ctrl, shift, alt, type);
        };

        this.wheelupdown = function (context, x, y, delta, ctrl, shift, alt, type)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
      		k.canvas.wheelupdown_(k, x, y, delta, ctrl, shift, alt, type);
        };

        this.swipeleftright = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
            k.canvas.swipeleftright_(k, rect, x, y, type);
        };

        this.swipeupdown = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
            k.canvas.swipeupdown_(k, rect, x, y, type);
        };

        this.pan = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
            k.canvas.pan_(k, rect, x, y, type);
        };

        this.panend = function (context, rect, x, y)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
            k.canvas.panend_(k, rect, x, y);
        };

        this.panleftright = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
            k.canvas.panleftright_(k, rect, x, y, type);
        };

        this.panupdown = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
            k.canvas.panupdown_(k, rect, x, y, type);
        };

        this.panstart = function (context, rect, x, y)
        {
            var k = menuobj.value()?menuobj.value():_4cnvctx;
            k.canvas.panstart_(k, rect, x, y);
        };

        this.pressup = function (context, rect, x, y)
        {
		var k = menuobj.value()?menuobj.value():_4cnvctx;
		k.canvas.pressup_(k, rect, x, y);
	};

     	this.tap = function (context, rect, x, y)
		{
            if (context.canvas.helprect && context.canvas.helprect.hitest(x,y))
            {
                _5cnvctx.hide()
                var menu = _7cnvctx;
                if (menuobj.value() == menu)
                {
                    menu.hide();
                    menuobj.setindex(0);
                    menuobj.draw();
                }
                else
                {
                    menuobj.setindex(menu);
                    menuobj.show();
                }

                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            }
            else if (context.moveprev && context.moveprev.hitest(x,y))
            {
                _4cnvctx.movepage(-1);
            }
            else if (context.movenext && context.movenext.hitest(x,y))
            {
                _4cnvctx.movepage(1);
            }
            else if (
                context.canvas.fitwindowrect &&
                context.canvas.fitwindowrect.hitest(x,y))
            {
                _7cnvctx.hide()
                if (menuobj.value() == _5cnvctx)
                {
                    _5cnvctx.hide();
                    menuobj.setindex(0);
                    menuobj.draw();
                }
                else
                {
                    menuobj.setindex(_5cnvctx);
                    menuobj.show();
                }

                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            }
            else
            {
                var k = menuobj.value()?MENU:BOSS;
                var j = menuobj.value()?menuobj.value():_4cnvctx;
                tapobj.data[k].tap(j, rect, x, y)
            }
		};

		this.draw = function (context, rect, user, time)
        {
            context.canvas.helprect = new rectangle()
            context.canvas.fitwindowrect = new rectangle()
            context.clear();
            var b = 0;
            var k = menuobj.value();
            var w = k?k.canvas.width:0;
            var b = window.innerWidth == w;
            var e = _5cnv.sliceobj.length() <= 1;
            var s = galleryobj.length() == 1 ||
                menuobj.value() == _5cnvctx ||
                 menuobj.value() == _7cnvctx;
            context.save();
            var a = new panel.row([BEXTENT,0],
            [
               new panel.col( [30, ALIEXTENT,0,ALIEXTENT,ALIEXTENT,0,ALIEXTENT, 30],
               [
                   0,
                   0,
                   0,

                   new panel.previous(),
                   new panel.next(),

                   0,
                   0,
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
        this.wheeleftright = function (context, x, y, ctrl, shift, alt, type)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
      		k.canvas.wheeleftright_(k, x, y, ctrl, shift, alt, type);
        };

        this.wheelupdown = function (context, x, y, delta, ctrl, shift, alt, type)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
      		k.canvas.wheelupdown_(k, x, y, delta, ctrl, shift, alt, type);
        };

        this.swipeleftright = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
            k.canvas.swipeleftright_(k, rect, x, y, type);
        };

        this.swipeupdown = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
            k.canvas.swipeupdown_(k, rect, x, y, type);
        };

        this.pan = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
            k.canvas.pan_(k, rect, x, y, type);
        };

        this.panend = function (context, rect, x, y)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
            k.canvas.panend_(k, rect, x, y);
        };

        this.panleftright = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
            k.canvas.panleftright_(k, rect, x, y, type);
        };

        this.panupdown = function (context, rect, x, y, type)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
            k.canvas.panupdown_(k, rect, x, y, type);
        };

        this.panstart = function (context, rect, x, y)
        {
            var k = menuobj.value()?menuobj.value():_8cnvctx;
            k.canvas.panstart_(k, rect, x, y);
        };

        this.pressup = function (context, rect, x, y)
        {
 		var k = menuobj.value()?menuobj.value():_8cnvctx;
            k.canvas.pressup_(k, rect, x, y);		
        };

     	this.tap = function (context, rect, x, y)
		{
            var canvas = context.canvas;
            canvas.slideshow = 0;
            var timeauto = global.timeauto;
            clearInterval(global.timeauto);
            global.timeauto = 0;
            var obj = canvas.scrollobj.value();
            context.refresh();

            if (context.fullrect && context.fullrect.hitest(x,y))
            {
                if (screenfull.isEnabled)
                {
                    if (window.innerHeight == screen.height)
                        screenfull.exit();
                    else
                        screenfull.request();
                }
            }
            else if (canvas.helprect && canvas.helprect.hitest(x,y))
            {
                _5cnvctx.hide()
                if (menuobj.value() == _7cnvctx)
                {
                    _7cnvctx.hide();
                    menuobj.setindex(_8cnvctx);
                    menuobj.draw();
                }
                else
                {
                    menuobj.setindex(_7cnvctx);
                    menuobj.show();
                }

                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            }
            else if (
                context.canvas.fitwindowrect &&
                context.canvas.fitwindowrect.hitest(x,y))
            {
                _7cnvctx.hide()
                if (menuobj.value() == _5cnvctx)
                {
                    _5cnvctx.hide();
                    menuobj.setindex(_8cnvctx);
                    menuobj.draw();
                }
                else
                {
                    menuobj.setindex(_5cnvctx);
                    menuobj.show();
                }

                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            }
            else
            {
                if (menuobj.value()==_8cnvctx)
                    tapobj.data[GALLERY].tap(menuobj.value(), rect, x, y)
                else
                    tapobj.data[MENU].tap(menuobj.value(), rect, x, y)
            }
 		};

		this.draw = function (context, rect, user, time)
        {
            context.clear();
            context.save();
            var w = Math.min(360,rect.width-100);
            var rows = infobj.data.length;
            var rh = 26;
            var e = _5cnv.sliceobj.length() <= 1;
            var a = new panel.col(
                 [ 30, ALIEXTENT, 0, ALIEXTENT, ALIEXTENT, 0, ALIEXTENT, 30 ],
                 [
                    0,
                    new panel.help(),
                    0,
                    0,
                    0,
                    0,
                    e?0:new panel.fitwindow(),
                    0,
                 ]);

            a.draw(context, rect, 0, 0);
            context.restore();
        }
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
            new panel.rectangle(context.canvas.galleryrect),
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
        var s = menuobj.value() == _3cnvctx ||
            menuobj.value() == _7cnvctx;
        var a = new Layer(
        [
            new panel.rectangle(context.canvas.helprect),
            s ? new panel.shrink(new panel.circle(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new panel.shrink(new panel.circle(s?TRANSPARENT:FILLBAR,SEARCHFRAME,4),17,17),
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

var dialog = 0;
window.addEventListener("keyup", function (evt)
{
    if (dialog && dialog.open)
        return;
    var context = menuobj.value()?menuobj.value():_4cnvctx;
	return context.canvas.keyup_(evt);
});

window.addEventListener("keydown", function (evt)
{
    if (dialog && dialog.open)
        return;
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
        menuobj.draw();
        bossobj.draw();
    }
    else
    {
        localobj.time = _8cnv.timeobj.current();
        localStorage.setItem(url.path,JSON.stringify(localobj));
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
galleryobj.getrawpath = function()
{
    var id = galleryobj.value().id;
    var path = `https://ipfs-view.pages.dev/image/${id}/blob`;
    if (galleryobj.value().full)
        path = galleryobj.value().full;
    else if (!id && galleryobj.value().url)
       path = galleryobj.value().url;
    return path;
}

function imagepath(user)
{
    var src;
    if (user.id && user.id.length >= 5 &&
	  ((user.id.charAt(user.id.length-5) == '.') ||
	    user.id.charAt(8) == '-'))
    {
	var template = galleryobj.gallerytemplate?galleryobj.gallerytemplate:"1080x1080";    
        src = `https://image.reportbase5836.workers.dev/image/${user.id}/${template}`;
    }
    else if (user.id && user.id.length > 1 &&
        ((user.id.charAt(0) == 'Q' && user.id.charAt(1) == 'm') ||
        (user.id.charAt(0) == 'b')))
    {
        //thumbimg.src = `https://ipfs.io/ipfs/${user.id}`;
        //thumbimg.src = `https://cloudflare-ipfs.com/ipfs/${user.id}`;
        //thumbimg.src = `https://ipfs.filebase.io/ipfs/${user.id}`;
        src = `https://cloudflare-ipfs.com/ipfs/${user.folder}/${user.name}`;
    }

    else if (user.full)
    {
        src = user.full;
    }
    else if (user.url)
    {
        src = user.url;
    }
    else if (user.blob)
    {
        src = URL.createObjectURL(user.blob);
    }

    return src;
}

galleryobj.getpath = function(index)
{
    var gallery = this.data[index];
    var id = gallery.id;
   if (galleryobj.raw)
    {
        path = `https://image.reportbase5836.workers.dev/image/${id}/blob`;
    }	
    else if (id && id.length >= 5 &&
        ((id.charAt(id.length-5) == '.') ||
	    id.charAt(8) == '-'))
    {
	var template = galleryobj.bosstemplate?galleryobj.bosstemplate:"3840x3840";    
        path = `https://image.reportbase5836.workers.dev/image/${id}/${template}`;
    }
    else if (id && id.length > 1 &&
        ((id.charAt(0) == 'Q' && id.charAt(1) == 'm') ||
        (id.charAt(0) == 'b')))
    {
        //path = `https://ipfs.io/ipfs/${id}`;
        path = `https://cloudflare-ipfs.com/ipfs/${id}`;
       // path = `https://ipfs.filebase.io/ipfs/${id}`;
        //path = `https://${url.path}.ipfs.dweb.link/`;
    }
    
    
    else if (gallery.full)
    {
        path = gallery.full;
    }
    else if (gallery.url)
    {
        path = gallery.url;
    }

    return path;
}

async function loadjson (blob)
{
    try
    {
        var text = await blob.text();
        var json = JSON.parse(text);
        galleryobj.init(json)
    }
    catch(_)
    {
    }
}

galleryobj.init = function (obj)
{
    if (obj)
        Object.assign(galleryobj, obj);

    delete _4cnv.thumbcanvas;
    delete photo.image;

    for (var n = 0; n < IMAGELSTSIZE; ++n)
    {
        thumbfittedlst[n] = document.createElement("canvas");
        thumbimglst[n] = new Image();
    }

    setfavicon();
    pretchobj.split(60, "40-90", pretchobj.length());
    letchobj.split(60, "40-90", letchobj.length());
    traitobj.split(60, "0.1-1.0", traitobj.length());
    scapeobj.split(60, "0.1-1.0", scapeobj.length());
    positxpobj.set(50);
    positypobj.set(50);
    positxlobj.set(50);
    positylobj.set(50);

    var zoom = (typeof galleryobj.zoom === "undefined") ?25:galleryobj.zoom;
    poomobj.set(zoom);
    loomobj.set(zoom);

    slicewidthobj.set(galleryobj.slicewidth?galleryobj.slicewidth:SLICEWIDTH);

    var h = galleryobj.hideheader?0:BEXTENT;
    headcnvctx.show(0,0,window.innerWidth,h);
    headham.panel = headobj.value();

    _2cnv.sliceobj.data =
    [
        {title:"About", path: "ABOUT", func: function()
            {
            menuobj.setindex(_7cnvctx);
            menuobj.show();
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
        {title:"propelauth", func: function()
            {
                authclient = propelauth.createclient({authurl: "https://auth.ipfs-view.pages.dev", enablebackgroundtokenrefresh: true})
                authclient.getauthenticationinfoornull(false)
                .then(function(client)
                {
                    fetch(`https://bucket.reportbase5836.workers.dev/${client.user.userid}.json`)
                    .then((response) => jsonhandler(response))
                    .then(function (json) { })
                    .catch((error) => {});
                })
            },
            enabled: function() { return false }
        },
        {title:"delete image", func: function()
            {
                var id = galleryobj.value().id;
                fetch(`https://ipfs-view.pages.dev/image/${id}`, { method: 'delete' })
                .then(res =>
                    {
                        location.reload();
                        return res.json()
                    })
                .then(data => console.log(data))
                .catch(error => { console.log("error:", error); });
            },
            enabled: function() { return false }
        },

        {title:"dalle json", func: function()
            {
                fetch(`https://bucket.reportbase5836.workers.dev/dalle.json`)
                .then((response) => jsonhandler(response))
                .then(function (json)
                {
                    fetch(`https://dalle.reportbase5836.workers.dev`,
                    {
                        method: 'post',
                        body: json.stringify(json)
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
       {title:"ulid", func: function()
            {
                fetch("https://uuid.rocks/ulid")
                .then(response => texthandler(response))
                .then(uuid =>
                {
                    var body = json.stringify(lst);
                    fetch(`https://bucket.reportbase5836.workers.dev/${uuid}`, { method: 'post', body: body } )
                      .then(response => jsonhandler(response))
                      .then(json => console.log(json) )
                      .catch(error => console.log(error) );

                })
                .catch((error) => console.log(error) );
            },
            enabled: function() { return false }
        },
       {title:"offscreen.js",  func: function()
            {
                var offcnv = new offscreencanvas(200, 200);
                const offworker = new worker('js/offscreen.js');
                offworker.postmessage({msg: 'offscreen', canvas: offcnv}, [offcnv]);
                offworker.addeventlistener('message', function(ev)
                {
                    if (ev.data.msg === 'render')
                    {
                        var canvas = document.createelement("canvas");
                        let context = canvas.getcontext("bitmaprenderer");
                        context.transferfromimagebitmap(ev.data.bitmap);
                        _4cnvctx.drawimage(canvas, 0, 0);
                    }
                });
            },
            enabled: function() { return false }
        }
     ];

    var a = Array(_3cnv.sliceobj.length()).fill().map((_, index) => index);
    _3cnv.rotated = [...a,...a,...a];

    _5cnv.sliceobj.data = [];
    var j = 0;
    for (var n = 0; n < galleryobj.data.length; ++n)
    {
        var k = galleryobj.data[n];
        k.func = selectfolder;
        var j = _5cnv.sliceobj.data.findIndex(function(a) { return a.folder == k.folder; });
        if (j == -1)
            _5cnv.sliceobj.data.push(k);
    };

    var a = Array(_5cnv.sliceobj.length()).fill().map((_, index) => index);
    _5cnv.rotated = [...a,...a,...a];

    _6cnv.sliceobj.data =
    [
     
    ];

    var a = Array(_6cnv.sliceobj.length()).fill().map((_, index) => index);
    _6cnv.rotated = [...a,...a,...a];

    _7cnv.sliceobj.data =
    [
       {title:"Goto\nctrl+shift+g", func: function()
            {
                gotodialog();
            }
        },

    {title:"Search\nctrl+shift+s", func: function()
            {
                showsearch();
            }
        },
	    
     {title:"File Explorer", func: function()
            {
                importdialog();
            }
        },
	    
        {
            title: "ipfs-view\nImage Viewer\nhttps://ipfs-view\nimages@ipfs-view.com",
            func: function() {}
        },
        {
            title: "Tom Brinkman\nAll Rights Reserved",
            func: function() {}
        },
        {
            title: "Image viewer for webp, jpg, avif, gif, png, zip, cbz and ipfs. Continuous top-down image viewing, for a distraction free, full-screen experience.",
            func: function() {}
        },

        {title:"Advanced", func: function()
            {
                galleryobj.advanced = galleryobj.advanced?0:1;
                contextobj.reset();
              },
            enabled: function() { return galleryobj.advanced; }
        },
	    
        {title:"Debug", func: function()
            {
                galleryobj.debug = galleryobj.debug ? 0 : 1;
                overlayobj.set(overlayobj.current() == 0?1:0);
                menuobj.hide();
                headcnv.height = BEXTENT;
                headobj.set(BOSS);
                headham.panel = headobj.value();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
                contextobj.reset();
              },
            enabled: function() { return galleryobj.debug; }
        },
	    
        {title:"Fit Width\nctrl+0", path: "", func: function()
            {
                buttonobj.reset();
		    menuobj.draw();
            },
            enabled: function() { return 0; }
        },
	
	{title:"Home\nctrl+shift+h", func: function()
            {
                home();
            },
            enabled: function() { return 0; }
        },    
	   
	{title:"Full Screen\nctrl+f", func: function()
            {
                if (screenfull.isEnabled)
                {
                    if (window.innerHeight == screen.height)
                        screenfull.exit();
                    else
                        screenfull.request();
                }
            },
            enabled: function() { return window.innerHeight == screen.height; }
        },
    ];

    var a = Array(_7cnv.sliceobj.length()).fill().map((_, index) => index);
    _7cnv.rotated = [...a,...a,...a];

    _8cnv.sliceobj.data = galleryobj.data;
    var a = Array(galleryobj.length()).fill().map((_, index) => index);
    _8cnv.rotated = [...a,...a,...a];

    _9cnv.sliceobj.data =
    [
       {title:"login", path: "login", func: function()
            {
                authclient.redirecttologinpage();
            }
        },
        {title:"logout", path: "logout", func: function()
            {
                authclient.logout(true)
            }
        },
        {title:"account", path: "account", func: function()
            {
                authclient.redirecttoaccountpage()
            }
        },
    ];

    var a = Array(_9cnv.sliceobj.length()).fill().map((_, index) => index);
    _9cnv.rotated = [...a,...a,...a];

    _11cnv.sliceobj.data =
    [
        {title:"", path: "", func: function()
        {
        }},
    ];

    var a = Array(_11cnv.sliceobj.length()).fill().map((_, index) => index);
    _11cnv.rotated = [...a,...a,...a];

    if (galleryobj.width)
    {
        buttonobj.reset();
   	initime();
    }
    else
    {
        var image = new Image();
        var current = galleryobj.lerp(1-_8cnv.timeobj.berp());
        image.src = imagepath(galleryobj.data[current]);
        image.onload = function()
        {
            galleryobj.width = this.width;
            galleryobj.height = this.height;
		buttonobj.reset();
		initime();
	};
    }   
}

function initime()
{
	menuobj.set(_8cnvctx);
	contextobj.reset();
	if (galleryobj.length() > GALLERYMIN)
	    menuobj.toggle(_8cnvctx);
	
    var j = Number(localobj.time);
    if (j > 0 && j < TIMEOBJ)
    {
        _8cnv.timeobj.set(j);
    }
    else if (galleryobj.length()==1)
    {
        _8cnv.timeobj.set(2700);
	menuobj.draw();    
    }
    else
    {
	home();
    }

	if (galleryobj.length()<=GALLERYMIN)
	    galleryobj.showboss = 1;
	_4cnvctx.refresh();
	headobj.set(galleryobj.length()>6?GALLERY:BOSS);
	headham.panel = headobj.value();
	headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);  	
}

url.path = "home";
if (url.searchParams.has("p"))
{
    url.path = url.searchParams.get("p");
    if ((url.path.charAt(0) == 'Q' && url.path.charAt(1) == 'm') ||
        (url.path.charAt(0) == 'b'))
    {
        var path2 = `https://dweb.link/ipfs/${url.path}`;
        var path1 = `https://ipfs.filebase.io/ipfs/${url.path}`;
	var path3 = `https://dweb.link/api/v0/ls?arg=${url.path}`
	var path4 = `https://gateway.ipfs.io/api/v0/ls?arg=${url.path}`;
        fetch(path3)
        .then(response => jsonhandler(response))
        .then(function (json)
        {
            var k = json.Objects[0];
            if (k.Links.length == 0)
            {
                fetch(`https://cloudflare-ipfs.com/ipfs/${url.path}`)
                .then((response) => blobhandler(response))
                .then(function (blob) { loadblob(blob); })
                .catch((error) => { });
            }
            else
            {
                galleryobj.data = [];
                var k = json.Objects[0];
                loadipfs(k.Links,url.path);
            }
        })
        .catch((error) => { });
    }
    else if (url.path.isjson())
    {
        fetch(url.path)
        .then(response => jsonhandler(response))
        .then((obj) => galleryobj.init(obj))
        .catch((error) => { });
    }
    else
    {
        loadzip(url.path)
    }
}
else
{
	var path = "https://ipfs-view.pages.dev/res/reci.json";
    for (var n = 0; n < searchobj.length(); ++n)
    {
        var j = searchobj.data[n];
        var e = url.searchParams.get(j)
        if (!e)
            continue;
        var search = e.toLowerCase();
        path = `https://${j}.reportbase5836.workers.dev/?search=${search}&page=1`;
	break;
    }

	fetch(path)
        .then(response => jsonhandler(response))
        .then((obj) => galleryobj.init(obj))
        .catch((error) => { });
}

var localobj = {};
localobj.time = 0;

try
{
    var k = localStorage.getItem(url.path);
    if (k)
      	localobj = JSON.parse(k);
}
catch(_)
{
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

function gotodialog()
{
    function go(page)
    {
        if (menuobj.value() == _8cnvctx)
        {
            var k = (page-1)/galleryobj.length();
            _8cnv.timeobj.setperc(1-k);
            _8cnvctx.refresh();
        }
        else
        {
            galleryobj.set(page-1);
            delete _4cnv.thumbcanvas;
            delete photo.image;
            contextobj.reset();
        }
    }

    var input = document.getElementById("goto-input");
    dialog = document.getElementById("goto-dialog");
    input.addEventListener("keyup", function(event)
    {
	event.preventDefault();    
      if (event.keyCode === 13)
      {
        var page = input.value.clean();
        go(Number(page));
        dialog.close();
      }
    });

    dialog.classList.add('dialog');
    dialog.style.width = window.innerWidth*0.85;
    dialog.addEventListener("click", function(event)
    {
        var rect = new rectangle(dialog.getBoundingClientRect());
        if (event.target.id == "page-ok")
        {
            var page = input.value.clean();
            go(Number(page));
            dialog.close();
        }
        else if (!rect.hitest(event.x,event.y))
        {
            dialog.close();
        }
    });

    if (menuobj.value() == _8cnvctx)
    {
        var current = Math.floor(
            Math.lerp(1,galleryobj.length(),1-_8cnv.timeobj.berp()));
        input.value = current+1;
    }
    else
    {
        input.value = galleryobj.current()+1
    }

    dialog.showModal();
}

function showsearch()
{
    var input = document.getElementById("search-input");
    dialog = document.getElementById("search-dialog");
    input.addEventListener("keyup", function(event)
    {
	event.preventDefault();    
        if (event.keyCode === 13)
        {
            var search = input.value.clean();
            if (!search)
                return;
            //todo
        }
    });

    dialog.addEventListener("click", function(event)
    {
        var rect = new rectangle(input.getBoundingClientRect());
        if (event.target.id == "search-ok")
        {
            var search = input.value.clean();
            if (!search)
                return;
            //todo
        }
        else if (!rect.hitest(event.x, event.y))
        {
            if (!galleryobj.length())
                return;
            dialog.close();
        }
    });
    
    dialog.showModal();
}

async function copytext(text)
{
    if (navigator.clipboard)
        navigator.clipboard.writeText(text)
}

function blobhandler(response)
{
    if (response.ok)
        return response.blob()
    throw Error(response.statusText);
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

function importdialog()
{
    var input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = ".zip,.cbz,.json,.png,.jpeg,.jpg,.webp,.gif,.avif";
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
            if (files.length == 1 && files[0].name)
            {
                var name = files[0].name;
                if (name.isimage())
                {
                    loadimages(files);
                }
                else if (name.iszip())
                {
                    var blob = files[0];
                    loadzip(blob);
                }
                else if (name.isjson())
                {
                    var blob = files[0];
                    loadjson(blob);
                }
            }
            else
            {
                loadimages(files);
            }
        };

        input.click();
    });
}

menuobj.updown = function(context, delta)
{
    var canvas = context.canvas;
    canvas.autodirect = delta<0?1:-1;
    var f = Math.abs(delta)/canvas.speedobj.length();
    var g = Math.lerp(0.01,2160,canvas.reduceobj.berp());
    var lst = [1.5,1.75,2.0,2.25,2.5,3.0,3.5,4.0];
    var j = util.clamp(0,lst.length-1,canvas.sliceobj.length());
    var k = lst[j]*f*2;
    canvas.slideshow = (TIMEOBJ/canvas.virtualheight)*k;
    canvas.slidereduce = canvas.slideshow/g;
}

function selectfolder()
{
    for (var m = 0; m < galleryobj.data.length; ++m)
    {
        var e = galleryobj.data[m];
        if (e.folder != this.folder)
            continue;
        var j = (1-(m/galleryobj.length()))*TIMEOBJ;
        var e = (1/galleryobj.length())*TIMEOBJ;
        var k = j - e/2;
        _8cnv.timeobj.set(k);
        localobj.time = _8cnv.timeobj.current();
        galleryobj.width = 0;
        galleryobj.height = 0;
        galleryobj.init();
        break;
    }
}

menuobj.leftright = function (context, delta)
{
    //clearInterval(global.swipetimeout);
    //global.swipetimeout = 0;
	if (!delta)
	    return;
    
    if (delta != context.canvas.leftrighttype)
    {
        clearInterval(context.canvas.leftrightime);
        context.canvas.leftrightime = 0;
        context.canvas.leftrighttype = delta;
    }

    var j = context.canvas.centered;
    var index = j%IMAGELSTSIZE;
    var w = thumbfittedlst[index].width;
    var h = thumbfittedlst[index].height;
    if (w != window.innerWidth)
        context.canvas.startleftright = (window.innerWidth/w)*Math.abs(delta/2);
    else
        context.canvas.startleftright = (window.innerHeight/h)*Math.abs(delta/2);
    var e = context.canvas.startleftright/100;
    var obj = context.canvas.scrollobj.value();
    clearInterval(context.canvas.leftrightime);
    context.canvas.leftrightime = setInterval(function()
    {
        obj.add(delta < 0 ? -context.canvas.startleftright :
            context.canvas.startleftright);
        context.canvas.startleftright -= e;
        if (context.canvas.startleftright < 0)
        {
            clearInterval(context.canvas.leftrightime);
            context.canvas.leftrightime = 0;
            return;
        }

        menuobj.draw();
    }, TIMEMAIN);
}

bossobj.leftright = function(delta)
{
	return;
    var context = _4cnvctx;
    var canvas = _4cnv;
    canvas.lastdelta = delta;
    canvas.autodirect = delta<0?-1:1;
    var slidestop = Math.abs(delta)/10;
    var slidereduce = Math.lerp(1,240,canvas.reduceobj.berp());
    canvas.slidestop = (window.innerWidth/context.canvas.virtualwidth)*slidestop;
    canvas.slidereduce = canvas.slidestop/slidereduce;
}

buttonobj.reset = function()
{
    var w = galleryobj.width?galleryobj.width:1024;
    var h = galleryobj.height?galleryobj.height:1024;
    var a = w/h;
    var gheight = Math.floor(galleryobj.minheight?
        h*galleryobj.minheight:
        window.innerWidth/a);
    var bheight = Math.floor(Math.min(4800,
        h*(galleryobj.maxheight?galleryobj.maxheight:3)));
    buttonobj.data = [];
    for (var n = gheight; n < bheight; ++n)
        buttonobj.data.push(n);
    buttonobj.set(0);
}
	
function download()
{
	menuobj.hide();
	if (galleryobj.value().blob)
	{
	      const anchor = document.createElement('a');
	      anchor.href = URL.createObjectURL(galleryobj.value().blob);
	      anchor.download = galleryobj.value().name;
	      anchor.click();
	      URL.revokeObjectURL(anchor.href);
	      anchor.remove();
	}
	else
	{
	    fetch(galleryobj.getrawpath())
	    .then(response => response.blob())
	    .then(blob =>
	    {
	      const anchor = document.createElement('a');
	      anchor.href = URL.createObjectURL(blob);
	      anchor.download = galleryobj.value().id?galleryobj.value().id:'image';
	      anchor.click();
	      URL.revokeObjectURL(anchor.href);
	      anchor.remove();
	    })
	    .catch(error =>
	    {
	      console.error('Error downloading image:', error);
	    });
	}
}
