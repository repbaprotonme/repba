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
const DELAY = 10000000;
const ALIEXTENT = 60;
const BEXTENT = 80;
const TIMEOBJ = 3927;
const DELAYCENTER = TIMEOBJ;
const MENUSELECT = "rgba(255,175,0,0.7)";
const MENUTAP = "rgba(255,125,0,0.7)";
const MENUTAG = "rgba(200,0,0,0.9)";
const SELECTAP = "rgba(255,0,0.75,0.7)";
const SCROLLNAB = "rgba(0,0,0,0.35)";
const BARFILL = "rgba(0,0,0,0.5)";
const MENUCOLOR = "rgba(0,0,0,0.5)";
const OPTIONFILL = "white";
const THUMBFILP = "rgba(0,0,0,0.4)";
const THUMBFILL = "rgba(0,0,0,0.4)";
const THUMBSTROKE = "rgba(255,255,255,0.4)";
const SEARCHFRAME = "rgba(255,255,255,0.5)";
const TRANSPARENT = "rgba(0,0,0,0)";
const ARROWFILL = "white";
const SCROLLBARWIDTH = 7;
const MARGINBAR = 5;
const DEFAULTFONT = "italic bold 18px arial";
globalobj = {};
let photo = {};
photo.image = 0;

function randomNumber(min, max) { return Math.floor(Math.random() * (max - min) + min); }
function numberRange (start, end) {return new Array(end - start).fill().map((d, i) => i + start); }

let url = new URL(window.location.href);
url.page = url.searchParams.has("page") ? Number(url.searchParams.get("page")) : 0;

var colorlst = [];
while (colorlst.length < 100)
{
    do
    {
        var color = Math.floor((Math.random()*1000000)+1);
    } while (colorlst.indexOf(color) >= 0);
    colorlst.push("#" + ("000000" + color.toString(16)).slice(-6));
}

Math.clamp = function (min, max, val)
{
    if (typeof val === "undefined" || Number.isNaN(val) || val == null)
        val = max;
    if (max < min)
        return min;
    return (val < min) ? min : (val > max) ? max : val;
};

let circular_array = function (title, data)
{
    this.title = title;
    this.ANCHOR = 0;
    this.CURRENT = 0;
    this.data = data;
    this.length = function () { return Array.isArray(this.data) ? this.data.length : Number(this.data); };

    this.value = function ()
    {
        if (this.CURRENT < this.length() && Array.isArray(this.data))
            return this.data[this.CURRENT];
        return this.CURRENT;
    };

    this.get = function (index)
    {
        index += this.CURRENT;
        if (index >= this.length())
            index = 0;
        else if (index < 0)
            index = this.length()-1;
        return Array.isArray(this.data) ? this.data[index] : index;
    };

    this.anchor = function () { return this.ANCHOR; };
    this.current = function () { return this.CURRENT; };

    this.print = function()
    {
        return (this.current()+1).toFixed(0)  +"-"+ this.length().toFixed(0)
    };

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
        if (this.length() == 1)
            return 0;
        return Math.berp(0,this.length()-1,this.current());
    };

    this.lerp = function ()
    {
        if (this.length() == 1)
            return 0;
        return Math.lerp(0,this.length()-1,this.current()/this.length());
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

    this.setperc = function (perc)
    {
        var k = Math.floor(perc*this.length());
        this.set(k);
    };

    this.findindex = function (k)
    {
        return this.data.findIndex(function(a){return a == k;})
    }
};

function random_color()
{
    return "#" + (Math.round(Math.random() * 0XFFFFFF)).toString(16);
}

var timemain = new circular_array("TIMEMAIN", 30);
timemain.set(0);
var speedyobj = new circular_array("SPEEDY", 100);
var colobj = new circular_array("COLUMNS", [0,10,20,30,40,50,60,70,80,90].reverse());
var channelobj = new circular_array("CHANNELS", [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]);

function drawslices()
{
    if (photo.image &&
        photo.image.complete &&
        photo.image.naturalHeight)
    {
        for (var n = 0; n < 1; n++)
        {
            var context = _4cnvctx;
            var rect = context.rect();
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";

            if (!context.timemain && context.lastime == context.timeobj.current())
                continue;
            else
                context.lastime = context.timeobj.current();

            if (context.timemain)
            {
                context.slidestop -= context.slidereduce;
                if (context.slidestop > 0)
                {
                    var j = context.autodirect*(TIMEOBJ/1000)
                    context.timeobj.rotate(j*context.slidestop);
                }
                else
                {
                    clearInterval(context.timemain);
                    context.timemain = 0;
                }
            }

            var stretch = stretchobj.value();
            context.virtualpinch = context.virtualwidth*stretch.value()/100;
            var colwidth = context.colwidth;
            context.virtualeft = (context.virtualpinch-rect.width)/2-colwidth;
            var j = (colwidth/(colwidth+context.virtualwidth))*TIMEOBJ;
            var time = (context.timeobj.value()+j)/1000;
            var slicelst = context.sliceobj.data;
            var slice = slicelst[0];
            if (!slice)
                break;
            context.save();
            if (galleryobj.value().ispng || slicewidthobj.debug)
                context.clear();
            context.translate(-colwidth, 0);
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            var j = time+slice.time;
            var b = Math.tan(j*VIRTCONST);
            var bx = Math.berp(-1, 1, b) * context.virtualpinch - context.virtualeft;
            var extra = colwidth;
            var width = rect.width+extra;
            var x1,xn,s1,sn;
            for (var m = 0; m < slicelst.length; ++m)
            {
                slicelst[m].visible = 0;
                slicelst[m].stretchwidth = 0;
            }

            for (var m = 1; m < slicelst.length; ++m)
            {
                var slice = slicelst[m];
                var j = time + slice.time;
                var b = Math.tan(j*VIRTCONST);
                var bx2 = Math.berp(-1, 1, b) * context.virtualpinch - context.virtualeft;
                var stretchwidth = bx2-bx;
                slice.stretchwidth = stretchwidth;
                slice.bx = bx;
                if (m == 1)
                {
                    x1 = slice.bx;
                    s1 = stretchwidth;
                }
                else if (m == slicelst.length-1)
                {
                    xn = slice.bx;
                    sn = stretchwidth-2;
                }

                if (bx >= rect.width+colwidth || bx2 < colwidth)
                {
                    bx = bx2;
                    continue;
                }

                slice.visible = 1;
                slice.strechwidth = stretchwidth;
                var bx = slice.bx;
                var wid = slicewidthobj.debug ? context.colwidth : stretchwidth;
                wid = Math.ceil(bx+wid)-bx;
                context.drawImage(slice.canvas,
                    slice.x, 0, context.colwidth, rect.height,
                    bx, 0, wid, rect.height);
                bx = bx2;
            }

            var x = xn+sn;
            var w = x1-x;
            if (x+w > colwidth && x < rect.width+colwidth)
            {
                var slice = slicelst[0];
                slice.visible = 1;
                slice.strechwidth = w;
                var wid = slicewidthobj.debug ? context.colwidth : w;
                wid = Math.ceil(x+wid)-x;
                context.drawImage(slice.canvas,
                    0, 0, context.colwidth, rect.height,
                    x, 0, wid, rect.height);
            }

            context.restore();
            delete context.selectrect;
            delete context.thumbrect;
            delete context.extentrect;
            delete context.slicerect;
            delete context.slicewidthrect;
            delete context.stretchrect;
            delete context.zoomrect;

            if (!getmenu())
                thumbobj.value().draw(context, rect, 0, 0);
         }
    }

    var lst = [_8cnvctx, _1cnvctx, _2cnvctx, _3cnvctx,  _5cnvctx, _6cnvctx, _7cnvctx, _9cnvctx,];
    for (var n = 0; n < lst.length; n++)
    {
        var context = lst[n];

        if (!context.enabled)
            continue;
        if (!context.canvas.height)
            continue;
        var time = context.timeobj.value()/1000;
        if ((offctx.lastime && offctx.lastime.toFixed(8) == time.toFixed(8)))
            continue;
        else
            offctx.lastime = Number(time.toFixed(8));

        if (context.slideshow > 0)
        {
            var k = (context.swipetype == "swipeup")?-1:1;
            context.timeobj.rotate(k*context.slideshow);
            context.slideshow -= context.slidereduce
        }
        else
        {
            context.slideshow = 0;
            clearInterval(context.timemain);
            context.timemain = 0;
        }

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        var slices = context.sliceobj.data;
        const rect = context.rect();
        context.fillStyle = MENUCOLOR;
        context.clear();
        context.fillRect(0, 0, rect.width, rect.height);
        var visibles = [];

        if (context == _8cnvctx)
        {
            var len = context.sliceobj.length()
            context.buttonheight = context.buttonobj.value();
            context.delayinterval = DELAYCENTER / len / 1000;
            context.virtualheight = len*context.buttonheight * 0.65;
        }
        else
        {
            var len = context.sliceobj.length()
            context.delayinterval = DELAYCENTER / len / 1000;
            context.virtualheight = len*context.buttonheight;
        }

        context.lastrect = 0;
        for (var m = 0; m < slices.length; ++m)
        {
            var slice = slices[m];
            var t = time + m*context.delayinterval;
            var bos = Math.tan(t*VIRTCONST);
            let y = Math.berp(-1, 1, bos) * context.virtualheight;
            var e = (context.virtualheight-rect.height)/2;
            y -= e;
            var x = rect.width/2;
            if (y < -window.innerHeight*2 || y >= window.innerHeight*3)
            {
                delete slice.thumbcanvas;
                continue;
            }

            visibles.push({slice, x, y, m});
        }

        offcnv.width = rect.width;
        offcnv.height = rect.height;

        for (var m = 0; m < visibles.length; ++m)
        {
            var j = visibles[m];
            var height = context.buttonheight;
            if (context == _8cnvctx)
            {
                if (m < visibles.length-1)
                {
                    var j2 = visibles[m+1];
                    height = j2.y-j.y;
                }
                else
                {
                    var j2 = visibles[0];
                    height = j2.y-j.y;
                }
            }

            j.slice.center = {x: j.x, y: j.y};
            j.slice.isvisible = j.y > -height &&
                j.y<(window.innerHeight+height)
            offctx.isright = context.isright;
            offctx.scrollobj = context.scrollobj;
            offctx.save();
            offctx.translate(0, j.y-height/2);
            var r = new rectangle(0,0,rect.width,height);
            context.draw(offctx, r, j.slice, j.m);
            offctx.restore();
        }

        context.drawImage(offcnv, 0, 0);
        context.bar.draw(context, rect, 0, 0);
        context.scroll.draw(context, rect, 0, 0);
        break;
    }
}

var YollPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
    };

	this.tap = function (context, rect, x, y, shift, ctrl)
    {
        if (context.tap_)
    		context.tap_(context, rect, x, y, shift, ctrl);
	};

    this.wheelright = function (context, x, y, ctrl, shift, alt)
    {
		if (context.wheelright_)
      		context.wheelright_(context, x, y, ctrl, shift, alt);
   	};

    this.wheeleft = function (context, x, y, ctrl, shift, alt)
    {
		if (context.wheeleft_)
      		context.wheeleft_(context, x, y, ctrl, shift, alt);
   	};

    this.wheeldown = function (context, x, y, ctrl, shift, alt)
    {
		if (context.wheeldown_)
      		context.wheeldown_(context, x, y, ctrl, shift, alt);
   	};

    this.wheelup = function (context, x, y, ctrl, shift, alt)
    {
		if (context.wheelup_)
      		context.wheelup_(context, x, y, ctrl, shift, alt);
   	};

    this.drop = function (context, evt)
    {
		if (context.drop)
      		context.drop(context, evt);
   	};

    this.mouseout = function (context, evt)
    {
		if (context.mouse && context.mouse.out)
      		context.mouse.out(context, evt);
   	};

    this.mouseenter = function (context, evt)
    {
		if (context.mouse && context.mouse.enter)
      		context.mouse.enter(evt);
   	};

    this.mousemove = function (context, rect, x, y)
    {
		if (context.mouse && context.mouse.move)
      		context.mouse.move(context, rect, x, y);
   	};

    this.dblclick = function (context, rect, x, y)
    {
		if (context.dblclick_)
      		context.dblclick_(context, rect, x, y);
   	};

	this.pan = function (context, rect, x, y, type)
	{
		context.pan_(context, rect, x, y, type);
	};

	this.panend = function (context, rect, x, y)
    {
      	context.panend_(context, rect, x, y);
   	};

	this.panleftright = function (context, rect, x, y, type)
    {
       	context.panleftright_(context, rect, x, y, type);
    };

	this.panupdown = function (context, rect, x, y, type)
    {
   		context.panupdown_(context, rect, x, y, type);
    };

	this.panstart = function (context, rect, x, y)
    {
       	context.panstart_(context, rect, x, y);
	};

    this.swipeleftright = function (context, rect, x, y, type)
    {
   		if (context.swipeleftright_)
        	context.swipeleftright_(context, rect, x, y, type);
	};

    this.swipeupdown = function (context, rect, x, y, type)
    {
   		if (context.swipeupdown_)
        	context.swipeupdown_(context, rect, x, y, type);
	};

    this.pinch = function (context, x, y, scale)
    {
   		if (context.pinch_)
        	context.pinch_(context, x, y, scale);
	};

    this.pinchend = function(context)
	{
   		if (context.pinchend_)
        	context.pinchend_(context);
	}

    this.pinchstart = function(context, rect, x, y)
	{
   		if (context.pinchstart_)
        	context.pinchstart_(context, rect, x, y);
	}

	this.pressup = function(context)
	{
   		if (context.pressup_)
        	context.pressup_(context);
	}

	this.press = function(context, rect, x, y, shift, ctrl)
	{
		if (context.press_)
        	context.press_(context, rect, x, y, shift, ctrl);
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
let _6cnvctx = _6cnv.getContext("2d", opts);
let _7cnv = document.getElementById("_7");
let _7cnvctx = _7cnv.getContext("2d", opts);
let _8cnv = document.getElementById("_8");
let _8cnvctx = _8cnv.getContext("2d", opts);
let _9cnv = document.getElementById("_9");
let _9cnvctx = _9cnv.getContext("2d", opts);
let headcnv = document.getElementById("head");
let headcnvctx = headcnv.getContext("2d", opts);

headcnvctx.scrollobj = new circular_array("TEXTSCROLL", window.innerWidth/4);
headcnvctx.font = DEFAULTFONT;
headcnvctx.fillText("  ", 0, 0);

var offcnv = new OffscreenCanvas(1, 1);
var offctx = offcnv.getContext("2d");
offctx.font = DEFAULTFONT;
offctx.fillText("  ", 0, 0);

let canvaslst = [];
canvaslst[0] = document.createElement("canvas");
canvaslst[1] = document.createElement("canvas");
canvaslst[2] = document.createElement("canvas");
canvaslst[3] = document.createElement("canvas");
canvaslst[4] = document.createElement("canvas");
canvaslst[5] = document.createElement("canvas");

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
        context.footer = new rectangle();
        context.header = new rectangle();
        var a = new Row([80,0,80],
        [
            new Layer(
            [
                new Col([0,60,20],
                [
                    0,
                    new Rectangle(context.header),
                    0,
                ]),

                new ColA([MARGINBAR,60,0,50,50,50,0,60,MARGINBAR],
                [
                    0,
                   new GalleryPanel(),
                    0,
                   new ShiftPanel(new OpenPanel(),-10,0),
                   new SearchPanel(),
                   new ShiftPanel(new UploadPanel(),10,0),
                    0,
                   new OptionsPanel(),
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
        if (context.swipetype == "swipeup")
            return;

        var w = Math.min(360,rect.width-100);
        var j = rect.width >= context.width;
        context.save();
        context.headerect = new rectangle();
        context.footerect = new rectangle();
        context.buttonrect = new rectangle();
        var a = new Row([80,0,35,30],
        [
            new Layer(
            [
                new Col([20,60,0],
                [
                    0,
                    new Rectangle(context.headerect),
                    0,
                ]),
                new ColA([MARGINBAR,60,0,50,50,50,0,60,MARGINBAR],
                [
                    0,
                   j?0:new GalleryPanel(),
                    0,
                    new ShiftPanel(new ScrollPanel(),-10,0),
                    new HomePanel(),
                    new ShiftPanel(new AutoPanel(),10,0),
                    0,
                   j?0:new OptionsPanel(),
                    0,
                ]),
            ]),
            0,
             context.timeauto?0:new Col([0,w,0],
             [
                 0,
                new Layer(
                [
                    new Shrink(new Rectangle(context.buttonrect),4,0),
                    new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0)", 16, 16),
                    new CurrentHPanel(new Shrink(new CirclePanel("white"),8,8), 30, 1)
                ]),
                 0,
            ]),
            0,
        ]);

        a.draw(context, rect, context.buttonobj, 0);
        context.restore();
    }
};

var DualPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        var k = rect.width < rect.width;
        var j = k?"rgba(0,0,0,0.3)":"rgba(0,0,0,0.4)";
        var a = new LayerA(
        [
            new Row([0,SCROLLBARWIDTH],
            [
                0,
                new Layer(
                [
                    new FillPanel(j),
                    new CurrentHPanel(new FillPanel("white"), 90, 1),
                ])
            ]),
            new Col([0,SCROLLBARWIDTH],
            [
                0,
                new Layer(
                [
                    new FillPanel(j),
                    new CurrentVPanel(new FillPanel("white"), 90, 1),
                ])
            ])
        ]);


        a.draw(context, rect,
        [
            context == _8cnvctx ?
                context.scrollobj.value(): context.scrollobj,
            context.timeobj
        ],
        0);
    }
};

var ScrollMenuBar = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();

        var a = new Col([SCROLLBARWIDTH,0,SCROLLBARWIDTH],
        [
            0,
            0,
            new CurrentVPanel(new FillPanel("rgba(255,255,255,0.75)"), 90, 1),
        ]);

        a.draw(context, rect, context.timeobj, 0);
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
        context.font = DEFAULTFONT;
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
                var a = new Text("white", "center", "middle", 0, 0);
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
        context.fullpanel = new rectangle()

        var a = new Layer(
        [
            new Rectangle(context.fullpanel),
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
        context.openrect = new rectangle();

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
            new Rectangle(context.openrect),
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
        context.uploadrect = new rectangle();

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
            new Rectangle(context.uploadrect),
            new Shrink(new CirclePanel(SCROLLNAB, SEARCHFRAME,4),15,15),
            new Shrink(new Panel(),16,34),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

var HomePanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
		context.strokeStyle = "white";
        context.lineWidth = 8;
        context.homerect = new rectangle();

        var panel = function ()
        {
            this.draw = function (context, rect, user, time)
            {
                context.save();
                var w = rect.width;
                var h = rect.height;
                context.translate(rect.x+rect.width/2-w/2, rect.y+rect.height/2-h/2+h/4);
	            var path = new Path2D();
                path.lineTo(0, h);
                path.lineTo(w, h);
                path.lineTo(w, 0);
                path.lineTo(0, 0);
		        context.fillStyle = "white";
		        context.fill(path);
	            var path = new Path2D();
                path.lineTo(0, 0);
                path.lineTo(w/2, -h);
                path.lineTo(w, 0);
		        context.fill(path);
                context.translate(w/2-w/4, h/4);
                var w = w/2;
                var h = h;
	            var path = new Path2D();
                path.lineTo(0, 0);
                path.lineTo(0, h);
                path.lineTo(w, h);
                path.lineTo(w, 0);
		        context.fillStyle = "rgba(0,0,0,0.5)";
		        context.fill(path);
                context.restore();
            }
        };

        var a = new Layer(
        [
            new Rectangle(context.homerect),
            globalobj.timetap ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),17,17):0,
            new Shrink(new CirclePanel(globalobj.timetap?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),13,13),//tod
            new Shrink(new panel(),14,34),
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
        context.gallerymoderect = new rectangle();

        var a = new Layer(
        [
            new Rectangle(context.gallerymoderect),
            _8cnvctx.scrollobj.current() ? 0 : new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),19,19),
            new Shrink(new CirclePanel(_8cnvctx.scrollobj.current() ? SCROLLNAB:TRANSPARENT, SEARCHFRAME,4),15,15),
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

var AutoPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.autorect = new rectangle();
        var a = new Layer(
        [
            new Rectangle(context.autorect),
            context.timeauto ? new Shrink(new CirclePanel( MENUTAP,TRANSPARENT,4),19,19) : 0,
            new Shrink(new CirclePanel(context.timeauto?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),15,15),
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
            _4cnvctx.movingpage == -1 ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new Shrink(new CirclePanel(_4cnvctx.movingpage == -1?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
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
            _4cnvctx.movingpage == 1 ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),22,22) : 0,
            new Shrink(new CirclePanel(_4cnvctx.movingpage == 1?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),17,17),
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
        context.searchrect = new rectangle();
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

        var a = new Layer(
        [
            new Rectangle(context.searchrect),
            _3cnvctx.enabled ? new Shrink(new CirclePanel(MENUTAP,TRANSPARENT,4),17,17) : 0,
            new Shrink(new CirclePanel(_3cnvctx.enabled?TRANSPARENT:SCROLLNAB,SEARCHFRAME,4),13,13),
            new Shrink(new Panel(),15,20),
        ]);

        a.draw(context, rect, user, time);
        context.restore();
    }
};

function searchcancel()
{
    hiderefresh();
    setTimeout(function()
    {
        const dialog = document.getElementById("search-overlay");
        dialog.close()
        hiderefresh();
    }, 200)
}

function pagecancel()
{
}

var Stroke = function (color, width)
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

var addressobj = {}

addressobj.full = function (k)
{
    var zoom = zoomobj.value();
    let surl = new URL(window.location.href);
    var j = "";
    var e = galleryobj.current().pad(4);
    if (url.searchParams.has(galleryobj.repos))
    {
        var k = url.searchParams.get(galleryobj.repos);
        k = k.split(".")[0];
        j = `?${galleryobj.repos}=${k}.${e}`;
    }
    else
    {
        j = `?p=${url.path}.${e}`;
    }

    out =
        url.origin +
        url.pathname +
        j +
        "&b="+url.page;
        "&page="+url.page;

    return out;
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
    if (_4cnvctx.movingpage || !k.loaded || galleryobj.length() == 1)
    {
        masterload();
        _4cnvctx.movingpage = 0;
        this.refresh();
        return;
    }

    _4cnvctx.movingpage = j;
    galleryobj.rotate(j);
    _4cnvctx.refresh();
    _8cnvctx.refresh();
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    headcnvctx.scrollobj.set(0);
    delete _4cnvctx.thumbcanvas;
    delete photo.image;
    contextobj.reset();
}

CanvasRenderingContext2D.prototype.hide = function ()
{
    if (this.canvas.height == 0 && !this.enable)
        return;
    this.canvas.height = 0;
    this.enabled = 0;
};

CanvasRenderingContext2D.prototype.swipe = function ()
{
    var context = this;
    var slidestop = 10;
    var slidereduce = 50;
    context.slideshow = (context.timeobj.length()/context.virtualheight)*slidestop;
    context.slidereduce = context.slideshow/slidereduce;
    clearInterval(context.timemain);
    context.timemain = setInterval(function () { context.refresh(); }, timemain.value());
}

CanvasRenderingContext2D.prototype.tab = function ()
{
    var context = this;
    var slidestop = Number(galleryobj.slidestop?galleryobj.slidestop:2.5);
    var slidereduce = Number(galleryobj.slidereduce?galleryobj.slidereduce:100);
    context.slidestop += slidestop;
    context.slidestop = (window.innerWidth/context.virtualwidth)*context.slidestop;
    context.slidereduce = context.slidestop/slidereduce;
    clearInterval(context.timemain);
    context.timemain = setInterval(function () { drawslices() }, timemain.value());
}

CanvasRenderingContext2D.prototype.refresh = function ()
{
    this.lastime = -0.0000000000101010101;
    offctx.lastime = -0.0000000000101010101;
    drawslices()
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
	context.ham = ham;
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

		context.pinchblock = 1;
		clearTimeout(globalobj.pinch);
		globalobj.pinch = setTimeout(function() { context.pinchblock = 0; }, 400);
	});

	ham.on("pinchend", function (evt)
	{
		evt.preventDefault();
		if (typeof (ham.panel.pinchend) == "function")
			ham.panel.pinchend(context);
	});

	ham.on("pinchstart", function (evt)
	{
		context.pinchblock = 1;
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
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panmove) == "function")
            ham.panel.panmove(context, rect, x, y);
    });

    ham.on("panend", function (evt)
    {
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
        evt.preventDefault();
        var rect = new rectangle(0, 0, ham.element.width, ham.element.height);
        var x = Math.clamp(0, context.canvas.width - 1, evt.center.x - evt.target.offsetLeft);
        var y = Math.clamp(0, context.canvas.height - 1, evt.center.y - evt.target.offsetTop);
        if (typeof (ham.panel.panend) == "function")
            ham.panel.panend(context, rect, x, y);
    });

	ham.on("panstart", function (evt)
    {
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
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
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
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
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
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
   		if (ham.pinchblock || evt.pointers.length >= 2)
			return;
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

	var panel = new function () { this.draw = function () {}; }();
    ham.panel = panel;
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
            context.buttonobj.addperc(1.5/100);
            context.refresh();
        }
        else
        {
            var k = 20*(window.innerHeight/context.virtualheight);
            context.timeobj.rotate(k);
            context.refresh()
        }
    },
 	down: function (context, x, y, ctrl, shift, alt)
    {
        if (ctrl)
        {
            context.buttonobj.addperc(-1.5/100);
            context.refresh();
        }
        else
        {
            var k = 20*(window.innerHeight/context.virtualheight);
            context.timeobj.rotate(-k);
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
            var k = 20*(window.innerHeight/context.virtualheight);
            context.timeobj.rotate(k);
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
            var k = 20*(window.innerHeight/context.virtualheight);
            context.timeobj.rotate(-k);
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
        if (ctrl && shift)
        {
            pinchobj.set(0);
            var obj = heightobj.value();
            delete context.thumbcanvas;
            obj.add(1);
            context.refresh();
        }
        else if (ctrl)
        {
            zoomobj.value().add(-1);
            contextobj.reset()
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
        if (ctrl && shift)
        {
            pinchobj.set(0);
            var obj = heightobj.value();
            delete context.thumbcanvas;
            obj.add(-1);
            context.refresh();
        }
        else if (ctrl)
        {
            zoomobj.value().add(1);
            contextobj.reset()
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
    name: "BOSS",
    click: function (context, rect, x, y)
    {
        headobj.set(1);
        headham.panel = headobj.value();
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        _8cnvctx.scrollobj.set(0);
        menutoggle(_8cnvctx)
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
        var obj = context.buttonobj;
        var data = obj.data;
        var k = Math.clamp(data[0], data[data.length-1], scale*context.savepinch);
        var j = Math.berp(data[0], data[data.length-1], k);
        var e = Math.lerp(0,obj.length(),j)/obj.length();
        var f = Math.floor(obj.length()*e);
        if (scale >= 1 && obj.current() < (obj.length()*0.15))
        {
            obj.set(f+1);
            context.savepinch = obj.value();
        }
        else if (scale <= 1 && obj.current() < (obj.length()*0.15))
        {
            obj.set(f-1);
            context.savepinch = obj.value();
        }
        else
        {
            obj.set(f);
        }
        context.refresh();
    },
    pinchstart: function (context, rect, x, y)
    {
        clearInterval(context.timemain);
        context.timemain = 0;
        context.pinching = 1;
        context.savepinch = context.buttonobj.value()
    },
    pinchend: function (context)
    {
        clearTimeout(context.pinchtime);
        context.pinchtime = setTimeout(function()
        {
            context.pinching = 0;
            context.refresh();
        }, 40);
    },
},
{
    name: "BOSS",
    pinch: function (context, x, y, scale)
    {
        var obj = context.obj;
        var data = obj.data;
        var k = Math.clamp(data[0], data[data.length-1], scale*context.savepinch);
        var j = Math.berp(data[0], data[data.length-1], k);
        var e = Math.lerp(0,obj.length(),j)/obj.length();
        var f = Math.floor(obj.length()*e);
        if (scale >= 1 && obj.current() < (obj.length()*0.15))
        {
            obj.set(f+1);
            context.savepinch = obj.value();
        }
        else if (scale <= 1 && obj.current() < (obj.length()*0.15))
        {
            obj.set(f-1);
            context.savepinch = obj.value();
        }
        else
        {
            obj.set(f);
        }

        if (pinchobj.current() == 0)
        {
            delete _4cnvctx.thumbcanvas;
            context.refresh();
        }
        else if (pinchobj.current() == 1)
        {
            contextobj.reset();
        }
    },
    pinchstart: function (context, rect, x, y)
    {
        clearInterval(context.timemain);
        context.timemain = 0;
        context.pinching = 1;
        menuhide();
        context.clearpoints();
        context.isthumb = context.thumbrect && context.thumbrect.expand &&
            context.thumbrect.expand(40,40).hitest(x,y);
        pinchobj.set(context.isthumb?0:1)
        context.obj = pinchobj.value().value();
        context.savepinch = context.obj.value()
    },
    pinchend: function (context)
    {
        clearTimeout(context.pinchtime);
        context.pinchtime = setTimeout(function()
        {
            context.pinching = 0;
            context.isthumb = 0;
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

var lst = [];
for (var n = 5; n < window.innerWidth; n+=(window.innerWidth/100))
    lst.push(Math.floor(n));
var slicewidthobj = new circular_array("SLICEWIDTH", lst);

var poomobj = new circular_array("PORTZOOM", 100);
var loomobj = new circular_array("LANDZOOM", 100);
var zoomobj = new circular_array("ZOOM", [poomobj,loomobj]);
var traitobj = new circular_array("TRAIT", 100);
var scapeobj = new circular_array("SCAPE", 100);
var heightobj = new circular_array("HEIGHT", [traitobj,scapeobj]);
var pinchobj = new circular_array("PINCH", [heightobj,zoomobj]);

var userlst = []
var userobj = new circular_array("USer", userlst);
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
    showdata(lst)
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
    enabled : function() { return 1; },
	panend: function (context, rect, x, y) { }
},
{
    name: "MENU",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) {},

	pan: function (context, rect, x, y, type)
    {
        var obj = context.scrollobj;
        if (context == _8cnvctx)
            obj = context.scrollobj.value();
        if (context.isright)
        {
            clearInterval(context.timemain);
            var obj = context.timeobj;
            var m = y/rect.height;
            m = Math.floor((1-m)*obj.length());
            obj.set(m);
            context.refresh()
        }
        else if (context.isbuttonbar)
        {
            var j = context.buttonobj.current()
            var k = (x - context.buttonrect.x) / context.buttonrect.width;
            context.variantobj.setperc(k);
            context.buttonobj.setperc(k);
            context.refresh();
        }
        else if (obj && (type == "panleft" || type == "panright"))
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
            var k = context.timeobj.length();
            var jvalue = (k/(context.virtualheight)*(context.starty-y));
            var j = context.startt - jvalue;
            var len = context.timeobj.length();
            if (j < 0)
                 j = len+j-1;
            else if (j >= len)
                 j = j-len-1;
            j = j % context.timeobj.length();
            context.timeobj.set(j);
            context.refresh()
        }
    },
	panstart: function (context, rect, x, y)
    {
        clearInterval(context.timemain);
        clearInterval(context.timeauto);
        context.timeauto = 0;
        context.type = 0;
        context.isright = x > rect.width-MENUPANWIDTH;
        context.starty = y;
        context.startt = context.timeobj.current();
        context.isbuttonbar = context.buttonrect && context.buttonrect.hitest(x,y);
    },
	panend: function (context, rect, x, y)
    {
        delete context.starty;
        delete context.startt;
        delete context.timeobj.offset;
        context.isright = 0;
        context.isode = 0;
        context.issearch = 0;
        var obj = context.scrollobj;
        if (context == _8cnvctx)
            obj = context.scrollobj.value();
        if (obj)
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
        if (context.pinching)
            return;

        if (galleryobj.hidefocus)
        {
            var positx = positxobj.value();
            var posity = posityobj.value();
            positx.set((x/rect.width)*100);
            posity.set((y/rect.height)*100);
            context.refresh();
        }
        else if (context.isthumb)
        {
            var pt = context.getweightedpoint(x,y);
            x = pt?pt.x:x;
            y = pt?pt.y:y;
            context.hithumb(x,y);
            if (!zoomobj.value().value())
                context.refresh();
            else if (y != context.lasty)
                contextobj.reset()
            else
                context.refresh();
            context.lasty = y;
        }
        else if (context.iszoom)
        {
            var k = (x - context.zoomrect.x) / context.zoomrect.width;
            zoomobj.value().setperc(k);
            contextobj.reset();
        }
        else if (context.islicewidth)
        {
            var k = (x - context.slicewidthrect.x) / context.slicewidthrect.width;
            slicewidthobj.setperc(k);
            contextobj.reset();
        }
        else if (context.istretch)
        {
            var k = (x - context.stretchrect.x) / context.stretchrect.width;
            stretchobj.value().setperc(k);
            context.refresh();
        }
        else if (type == "panleft" || type == "panright")
        {
            context.autodirect = (type == "panleft")?-1:1;
            var len = context.timeobj.length();
            var diff = context.startx-x;
            var jvalue = ((len/context.virtualwidth))*diff;
            var j = context.startt - jvalue;
            if (j < 0)
                j = len+j-1;
            else if (j >= len)
                j = j-len-1;
            if (Number.isNaN(j))
                return;
            context.timeobj.set(j);
            context.refresh()
        }
        else if (type == "panup" || type == "pandown")
        {
            var zoom = zoomobj.value()
            if (Number(zoom.value()))
            {
                var h = (rect.height*(1-zoom.value()/100))*2;
                y = ((y/rect.height)*speedyobj.value())*h;
                var k = panvert(rowobj, h-y);
                if (k == -1)
                    return;
                if (k == rowobj.anchor())
                    return;
                rowobj.set(k);
                resetcanvas();
            }
        }
    },
	panstart: function (context, rect, x, y)
	{
        clearInterval(context.timemain);
        context.timemain = 0;
        context.startx = x;
        context.starty = y;
        context.pantype = 0;
        context.startt = context.timeobj.current();
        context.isthumb = context.thumbrect && context.thumbrect.hitest(x,y);
        context.islicewidth = context.slicewidthrect && context.slicewidthrect.hitest(x,y);
        context.istretch = context.stretchrect && context.stretchrect.hitest(x,y);
        context.iszoom = context.zoomrect && context.zoomrect.hitest(x,y);
        context.clearpoints();
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    },
    panend: function (context, rect, x, y)
	{
        if (galleryobj.hidefocus)
            galleryobj.transparent = 0;
        galleryobj.hidefocus = 0;
        clearTimeout(context.timepan)
        context.isthumb = 0;
        context.iszoomr = 0;
        context.istretch = 0;
        delete context.startx;
        delete context.starty;
        delete context.startt;
        delete rowobj.offset;
        context.refresh();
    }
},
];

var panobj = new circular_array("PAN", panlst);
panobj.set(2);

CanvasRenderingContext2D.prototype.clearpoints = function()
{
    this.x1 = this.x2 = this.x3 =
    this.x4 = this.x5 = this.x6 = this.x7 =
    this.x8 = this.x9 = this.x10 =
    this.x11 = this.x12 = this.x9 = this.x10 = this.x11 =
    this.x12 = this.x13 = this.x14 =
    this.x15 = this.x16 = this.x17 =
    this.x18 = this.x19 = this.x20 =
    this.x21 = this.x22 = this.x23 =
    this.x24 = this.x25 = this.x26 =
    this.x27 = this.x28 = this.x29 = this.x30 =
    this.y1 = this.y2 = this.y3 = this.y4 =
    this.y5 = this.y6 = this.y7 =
    this.y8 = this.y9 = this.y10 =
    this.y11 = this.y12 = this.y13 =
    this.y14 = this.y15 = this.y16 =
    this.y17 = this.y18 = this.y19 =
    this.y20 = this.y21 = this.y22 =
    this.y23 = this.y24 = this.y25 =
    this.y26 = this.y27 = this.y28 =
    this.y29 = this.y30 =
    0;
}

CanvasRenderingContext2D.prototype.getweightedpoint = function(x,y)
{
    this.x30 = this.x29;
    this.x29 = this.x28;
    this.x28 = this.x27;
    this.x27 = this.x26;
    this.x26 = this.x25;
    this.x25 = this.x24;
    this.x24 = this.x23;
    this.x23 = this.x22;
    this.x22 = this.x21;
    this.x21 = this.x20;
    this.x20 = this.x19;
    this.x19 = this.x18;
    this.x18 = this.x17;
    this.x17 = this.x16;
    this.x16 = this.x15;
    this.x15 = this.x14;
    this.x14 = this.x13;
    this.x13 = this.x12;
    this.x12 = this.x11;
    this.x11 = this.x10;
    this.x10 = this.x9;
    this.x9 = this.x8;
    this.x8 = this.x7;
    this.x7 = this.x6;
    this.x6 = this.x5;
    this.x5 = this.x4;
    this.x4 = this.x3;
    this.x3 = this.x2;
    this.x2 = this.x1;
    this.x1 = x;
    this.y30 = this.y29;
    this.y29 = this.y28;
    this.y28 = this.y27;
    this.y27 = this.y26;
    this.y26 = this.y25;
    this.y25 = this.y24;
    this.y24 = this.y23;
    this.y23 = this.y22;
    this.y22 = this.y21;
    this.y21 = this.y20;
    this.y20 = this.y19;
    this.y19 = this.y18;
    this.y18 = this.y17;
    this.y17 = this.y16
    this.y16 = this.y15;
    this.y15 = this.y14;
    this.y14 = this.y14;
    this.y13 = this.y12;
    this.y12 = this.y11;
    this.y11 = this.y10;
    this.y10 = this.y9;
    this.y9 = this.y8;
    this.y8 = this.y7;
    this.y7 = this.y6;
    this.y6 = this.y5;
    this.y5 = this.y4;
    this.y4 = this.y3;
    this.y3 = this.y2;
    this.y2 = this.y1;
    this.y1 = y;

    var x,y;
    if (this.x25)
    {
        x = (this.x25+this.x24+this.x23+this.x22+this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/25;
        y = (this.y25+this.y24+this.y23+this.y22+this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/25;
    }
    else if (this.x24)
    {
        x = (this.x24+this.x23+this.x22+this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/24;
        y = (this.y24+this.y23+this.y22+this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/24;
    }
    else if (this.x23)
    {
        x = (this.x23+this.x22+this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/23;
        y = (this.y23+this.y22+this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/23;
    }
    else if (this.x22)
    {
        x = (this.x22+this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/22;
        y = (this.y22+this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/22;
    }
    else if (this.x21)
    {
        x = (this.x21+this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/21;
        y = (this.y21+this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/21;
    }
    else if (this.x20)
    {
        x = (this.x20+this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/20;
        y = (this.y20+this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/20;
    }
    else if (this.x19)
    {
        x = (this.x19+this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/19;
        y = (this.y19+this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/19;
    }
    else if (this.x18)
    {
        x = (this.x18+this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/18;
        y = (this.y18+this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/18;
    }
    else if (this.x17)
    {
        x = (this.x17+this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/17;
        y = (this.y17+this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/17;
    }
    else if (this.x16)
    {
        x = (this.x16+this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/16;
        y = (this.y16+this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/16;
    }
    else if (this.x15)
    {
        x = (this.x15+this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/15;
        y = (this.y15+this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/15;
    }
    else if (this.x14)
    {
        x = (this.x14+this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/14;
        y = (this.y14+this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/14;
    }
    else if (this.x13)
    {
        x = (this.x13+this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/13;
        y = (this.y13+this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/13;
    }
    else if (this.x12)
    {
        x = (this.x12+this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/12;
        y = (this.y12+this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/12;
     }
    else if (this.x11)
     {
        x = (this.x11+this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/11;
        y = (this.y11+this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/11;
     }
    else if (this.x10)
     {
        x = (this.x10+this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/10;
        y = (this.y10+this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/10;
     }
    else if (this.x9)
     {
        x = (this.x9+this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/9;
        y = (this.y9+this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/9;
     }
    else if (this.x8)
     {
        x = (this.x8+this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/8;
        y = (this.y8+this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/8;
     }
    if (this.x7)
     {
        x = (this.x7+this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/7;
        y = (this.y7+this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/7;
     }
    else if (this.x6)
     {
        x = (this.x6+this.x5+this.x4+this.x3+this.x2+this.x1)/6;
        y = (this.y6+this.y5+this.y4+this.y3+this.y2+this.y1)/6;
     }
    else if (this.x5)
     {
        x = (this.x5+this.x4+this.x3+this.x2+this.x1)/5;
        y = (this.y5+this.y4+this.y3+this.y2+this.y1)/5;
     }
    else if (this.x4)
     {
        x = (this.x4+this.x3+this.x2+this.x1)/4;
        y = (this.y4+this.y3+this.y2+this.y1)/4;
     }
    else if (this.x3)
     {
        x = (this.x3+this.x2+this.x1)/3;
        y = (this.y3+this.y2+this.y1)/3;
     }
    else if (this.x2)
     {
        x = (this.x2+this.x1)/2;
        y = (this.y2+this.y1)/2;
     }
    else if (this.x1)
     {
        x = (this.x1)/1;
        y = (this.y1)/1;
     }

    return {x,y}
}

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
        if (context.zoomrect && context.zoomrect.hitest(x,y))
            return;
        if (context.stretchrect && context.stretchrect.hitest(x,y))
            return;
        if (thumbobj.current() == 1)
            galleryobj.hidefocus = galleryobj.hidefocus?0:1;
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
    swipeleftright: function (context, rect, x, y, evt)
    {
    },
    swipeupdown: function (context, rect, x, y, evt)
    {
        context.swipetype = evt.type;
        context.swipe();
    },
},
{
    name: "MENU",
    swipeleftright: function (context, rect, x, y, evt)
    {
    },
    swipeupdown: function (context, rect, x, y, evt)
    {
        context.swipetype = evt.type;
        context.swipe();
    },
},
{
    name: "BOSS",
    swipeleftright: function (context, rect, x, y, evt)
    {
        context.autodirect = evt.type == "swipeleft"?-1:1;
        context.tab();
    },

    swipeupdown: function (context, rect, x, y, evt)
    {
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
   		var context =
            _5cnvctx.enabled ? _5cnvctx :
            _6cnvctx.enabled ? _6cnvctx :
            _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx :
            _9cnvctx.enabled ? _9cnvctx :
		    _4cnv.height ? _4cnvctx : _1cnvctx;
        context.keyblock = 100;
    },
	keydown: function (evt)
	{
        if (globalobj.prompt)
            return;
		var context =
            _5cnvctx.enabled ? _5cnvctx :
            _6cnvctx.enabled ? _6cnvctx :
            _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx :
            _9cnvctx.enabled ? _9cnvctx :
		    _4cnv.height ? _4cnvctx : _1cnvctx;
        var obj = context.scrollobj;
        if (context == _8cnvctx)
            obj = context.scrollobj.value();
        var key = evt.key.toLowerCase();
        clearInterval(_8cnvctx.timeauto);
        _8cnvctx.timeauto = 0;
        context.shiftKey = evt.shiftKey;
        context.ctrlKey = evt.ctrlKey;
        if (key == "pagedown" || key == "arrowdown" || key == "j" || key == "enter")
		{
            if (context.block)
                return;
            context.block = 1;
            setTimeout(function() { context.block = 0; }, context.keyblock);
            context.keyblock = Math.clamp(25,100,context.keyblock-5);
            var obj = context.scrollobj.value();
            obj.set(0);
            evt.preventDefault();

            if (context.ctrlKey)
            {
                context.swipetype = "swipeup";
                context.swipe();
            }
            else
            {
                context.timeobj.rotate(-TIMEOBJ/context.sliceobj.length());
            }

            context.refresh()
        }
        else if (key == "pageup" || key == "arrowup" || key == "k")
		{
            if (context.block)
                return;
            context.block = 1;
            setTimeout(function() { context.block = 0; }, context.keyblock);
            context.keyblock = Math.clamp(25,100,context.keyblock-5);
            var obj = context.scrollobj.value();
            obj.set(0);
            evt.preventDefault();
            if (context.ctrlKey)
            {
                context.swipetype = "swipedown";
                context.swipe();
            }
            else
            {
                context.timeobj.rotate(TIMEOBJ/context.sliceobj.length());
            }

            context.refresh()
        }
        else if (key == "-" || key == "[")
        {
            context.buttonobj.addperc(-1.5/100);
            context.refresh()
        }
        else if (key == "+" || key == "]" || key == "=")
        {
            context.buttonobj.addperc(1.5/100);
            context.refresh()
        }
        else if (obj && (key == "arrowleft" || key == "h"))
		{
            obj.rotateperc(-2.5);
            context.refresh()
        }
        else if (obj && (key == "arrowright" || key == "l"))
		{
            obj.rotateperc(2.5);
            context.refresh()
        }
        else if (key == " " || key == "\\" || key == "/")
        {
            menuhide();
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
 	}
},
{
	name: "MENU",
	keyup: function (evt)
    {
		var context =
            _5cnvctx.enabled ? _5cnvctx :
            _6cnvctx.enabled ? _6cnvctx :
            _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx :
            _9cnvctx.enabled ? _9cnvctx :
		    _4cnv.height ? _4cnvctx : _1cnvctx;
        context.keyblock = 100;
    },
	keydown: function (evt)
	{
        if (globalobj.prompt)
            return;
		var context =
            _2cnvctx.enabled ? _2cnvctx :
            _3cnvctx.enabled ? _3cnvctx :
            _5cnvctx.enabled ? _5cnvctx :
            _6cnvctx.enabled ? _6cnvctx :
            _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx :
            _9cnvctx.enabled ? _9cnvctx :
            _4cnvctx;
        context.shiftKey = evt.shiftKey;
        context.ctrlKey = evt.ctrlKey;

        var key = evt.key.toLowerCase();
        if (key == "pageup" || key == "arrowup" || evt.key == "j")
		{
            if (!context.shiftKey && context.block)
                return;
            context.block = 1;
            setTimeout(function() { context.block = 0; }, context.keyblock);
            context.keyblock = Math.clamp(25,100,context.keyblock-5);
            evt.preventDefault();
            if (context.ctrlKey)
            {
                context.swipetype = "swipeup";
                context.swipe()
            }
            else
            {
                var k = (20/context.virtualheight)*context.timeobj.length();
                context.timeobj.rotate(-k);
                context.refresh()
            }
        }
        else if (key == "pagedown" || key == "arrowdown" || evt.key == "k")
		{
            if (!context.shiftKey && context.block)
                return;
            context.block = 1;
            setTimeout(function() { context.block = 0; }, context.keyblock);
            context.keyblock = Math.clamp(25,100,context.keyblock-5);
            evt.preventDefault();

            if (context.ctrlKey)
            {
                context.swipetype = "swipedown";
                context.swipe()
            }
            else
            {
                var k = (20/context.virtualheight)*context.timeobj.length();
                context.timeobj.rotate(k);
                context.refresh()
            }
        }
        else if (key == " " || key == "\\" || key == "/")
        {
            menuhide();
        }
        else if (key == "enter")
        {
            evt.preventDefault();
            _4cnvctx.movepage(evt.shiftKey?-1:1);
            _8cnvctx.scrollobj.set(0);
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
  	}
},
{
	name: "BOSS",
	keyup: function (evt)
	{
		var context = _4cnvctx;
        context.keyup = 0;
        context.keyblock = 100;
        context.keydown = 0;
        context.refresh();
	},
	keydown: function (evt)
	{
        if (globalobj.prompt)
            return;
		var context = _4cnvctx;
		var rect = context.rect();
        context.keydown = 1;
        context.ctrlKey = evt.ctrlKey;
        context.shiftKey = evt.shiftKey;

        context.refresh();
        var key = evt.key.toLowerCase();

        if (!context.shiftKey && context.block)
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
            context.block = 1;
            setTimeout(function() { context.block = 0; }, context.keyblock);
            context.keyblock = Math.clamp(50,200,context.keyblock-5);

            context.autodirect = 1;
            context.tab();
        }
        else if (key == "arrowright" || key == "l")
        {
            context.block = 1;
            setTimeout(function() { context.block = 0; }, context.keyblock);
            context.keyblock = Math.clamp(50,200,context.keyblock-5);

            context.autodirect = -1;
            context.tab();
        }
        else if (key == " ")
        {
            _8cnvctx.scrollobj.set(0);
            menutoggle(_8cnvctx)
        }
        else if (key == "tab")
        {
            evt.preventDefault();
            context.autodirect = evt.shiftKey?1:-1;
            context.tab();
        }
        else if (key == "arrowup" || key == "k")
        {
            var k = rowobj.length()/100;
            context.keyup += 1;
            rowobj.add(-k-context.keyup);
            contextobj.reset();
        }
        else if (key == "arrowdown" || key == "j" )
        {
            var k = rowobj.length()/100;
            context.keyup += 0.5;
            rowobj.add(k+context.keyup);
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
            evt.preventDefault();
            context.movepage(evt.shiftKey?-1:1);
        }
        else if (key == "pageup")
        {
            if (!galleryobj.length())
                return;
            evt.preventDefault();
            context.movepage(-1);
        }
        else if (key == "pagedown")
        {
            if (!galleryobj.length())
                return;
            evt.preventDefault();
            context.movepage(1);
        }
	}
},

];

CanvasRenderingContext2D.prototype.hithumb = function(x,y)
{
    if (typeof x !== "undefined")
    {
        var rect = this.thumbrect;
        var c = (x-rect.x) % rect.width;
        var b = c/rect.width;
        var e = this.sliceobj.length();
        var m = (1-b)*e;
        var j = DELAYCENTER/e;
        var time = j*m;
        var k = time % DELAYCENTER;
        var e = this.timeobj.length()*(k/DELAYCENTER);
        this.timeobj.set(e);
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
        clearInterval(context.timemain);
        context.timemain = 0;
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

        if (context.thumbrect && context.thumbrect.hitest(x,y))
        {
            headobj.set(3);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

            if (context.selectrect && context.selectrect.hitest(x,y)>=0)
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
            if (galleryobj.value().id)
                copytext(galleryobj.value().id);
            extentobj.rotate(1);
            context.refresh();
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
            var k = (x - context.stretchrect.x) / context.stretchrect.width;
            stretchobj.value().setperc(k);
            context.refresh();
        }
        else
        {
            var obj = new circular_array("", [1,3]);
            obj.set(obj.findindex(headobj.current()));
            obj.rotate(1);
            headobj.set(obj.value());
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            thumbobj.set(headobj.current()==1?0:1);
            galleryobj.transparent = 0;
            galleryobj.hidefocus = 0;
            context.refresh();
            menuhide();
        }
    }
},
{
    name: "MENU",
    tap: function (context, rect, x, y)
    {
        var obj = context.scrollobj;
        if (context.thumbpanel && context.thumbpanel.hitest(x,y))
        {
            galleryobj.hidebars = galleryobj.hidebars?0:1;
            _8cnvctx.refresh();
        }
        else if (context.searchrect && context.searchrect.hitest(x,y))
        {
            menutoggle(_3cnvctx);
        }
        else if (context.fullpanel && context.fullpanel.hitest(x,y))
        {
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }
        }
        else if (context.pagerect && context.pagerect.hitest(x,y))
        {
            headobj.set(1);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            _8cnvctx.scrollobj.set(0);
            menutoggle(_8cnvctx)
        }
        else if (context.openrect && context.openrect.hitest(x,y))
        {
            explore().then(function(files) { dropfiles(files); })
        }
        else if (context.optionsrect && context.optionsrect.hitest(x,y))
        {
            headobj.set(1);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            clearTimeout(context.menutime);
            context.refresh();
            menutoggle(_2cnvctx)
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if ( context.searchrect && context.searchrect.hitest(x,y) )
        {
            menushow(_3cnvctx);
        }
        else if (x > rect.width - (MENUBARWIDTH*2) )
        {
            var j = y/rect.height;
            var k = TIMEOBJ*(1-j);
            context.timeobj.set(k);
            context.refresh();
        }
        else
        {
            var k = getfrompoint(context, x, y);
            var slice = context.sliceobj.data[k];
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
        clearInterval(context.timemain);
        context.timemain = 0;
        var obj = context.scrollobj.value();

        if (context.homerect && context.homerect.hitest(x,y))
        {
            clearTimeout(globalobj.timetap)
            globalobj.timetap = setTimeout(function()
                {
                    globalobj.timetap = 0;
                    context.refresh();
                }, 400);
            context.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
            context.refresh();
        }
        else if (context.buttonrect && context.buttonrect.hitest(x,y))
        {
            var k = (x-context.buttonrect.x)/context.buttonrect.width;
            context.buttonobj.setperc(k);
            context.variantobj.setperc(k);
            context.refresh();
        }
        else if (context.upload && context.upload.hitest(x,y))
        {
            showupload();
        }
        else if (context.searchrect && context.searchrect.hitest(x,y))
        {
            menushow(_3cnvctx)
        }
        else if (context.pagerect && context.pagerect.hitest(x,y))
        {
            _8cnvctx.scrollobj.rotate(1);
            headobj.set(1);
            thumbobj.set(0);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            _8cnvctx.scrollobj.set(0);
            menutoggle(_8cnvctx)
        }
        else if (context.optionsrect && context.optionsrect.hitest(x,y))
        {
            headobj.set(1);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            clearTimeout(context.menutime);
            context.refresh();
            menutoggle(_2cnvctx)
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }
        else if (context.gallerymoderect && context.gallerymoderect.hitest(x,y))
        {
            clearInterval(context.timemain);
            clearInterval(context.timeauto);
            context.timeauto = 0;
            context.timemain = 0;
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            context.scrollobj.rotate(1);
            context.refresh();
        }
        else if (context.autorect && context.autorect.hitest(x,y))
        {
            var context = _8cnvctx;
            clearInterval(context.timemain);
            if (context.timeauto)
            {
                clearInterval(context.timeauto);
                context.timeauto = 0;
                context.refresh()
            }
            else
            {
                context.timeauto = 1;
                context.refresh()
                clearInterval(context.timeauto);
                context.timeauto = setInterval(function()
                {
                    if (!getmenu())
                    {
                        clearInterval(context.timeauto);
                        context.timeauto = 0;
                    }
                    context.timeobj.rotate(-TIMEOBJ/context.sliceobj.length());
                    context.refresh()
                }, 500);
            }
        }
        else if (x < MENUBARWIDTH*2)
        {
            var j = y/rect.height;
            var k = obj.length()*j;
            obj.set(k);
            context.refresh();
        }
        else if (x > rect.width - (MENUBARWIDTH*2) )
        {
            var j = y/rect.height;
            var k = TIMEOBJ*(1-j);
            context.timeobj.set(k);
            context.refresh();
        }
        else
        {
            var k = getfrompoint(context, x, y);
            var slice = context.sliceobj.data[k];
            if (!slice)
                return;

            var image = slice.image_url;
            slice.tap = 1;
            context.refresh();
            headobj.set(3);
            thumbobj.set(3);
            headham.panel = headobj.value();
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            setTimeout(function ()
            {
                slice.tap = 0;
                context.refresh();
                if (k != galleryobj.current())
                {
                    galleryobj.set(k);
                    delete _4cnvctx.thumbcanvas;
                    delete photo.image;
                    if (slice.func && slice.func.exec)
                        slice.func.exec()
                    else
                        contextobj.reset();
                    context.refresh();
                }

                menuhide();
            }, JULIETIME*2);
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

var thumblst =
[
    new function ()
	{
    	this.draw = function (context, rect, user, time)
        {
            if (galleryobj.hidebars)
                return;
            if (getmenu())
                return;
            context.zoomrect = new rectangle();
            context.slicewidthrect = new rectangle();
            context.stretchrect = new rectangle();
            context.extentrect = new rectangle();
            var w = Math.min(360,rect.width-100);
             var a = new RowA([60,0,35,8,35,8,35,50],
             [
                 0,
                 0,
                 slicewidthobj.debug?new Col([0,w,0],
                 [
                     0,
                    new Layer(
                    [
                        new Shrink(new Rectangle(context.slicewidthrect),4,0),
                        new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0)", 16, 16),
                        new CurrentHPanel(new Shrink(new CirclePanel("white"),8,8), 30, 1)
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
                        new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0)", 16, 16),
                        new CurrentHPanel(new Shrink(new CirclePanel("white"),8,8), 30, 1)
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
                        new Rounded("rgba(0,0,0,0.4)", 4, "rgba(255,255,255,0)", 16, 16),
                        new CurrentHPanel(new Shrink(new CirclePanel("white"),8,8), 30, 1)
                    ]),
                    0,
                ]),
                0,
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
                    0,
                ], 0);

            var a = new Row([0,60],
                [
                    0,
                    new Layer(
                    [
                        new Rectangle(context.extentrect),
                        new Text("rgba(255,255,255,0.5)", "center", "middle",0, 0),
                    ])
                ]);

            a.draw(context, rect, extentobj.value(), 0);
            context.restore();
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

            var panel = function ()
            {
                this.draw = function (context, rect, user, time)
                {
                    var x = context.thumbrect.x;
                    var y = context.thumbrect.y;
                    var w = context.thumbrect.width;
                    var h = context.thumbrect.height;
                    var hh = context.selectrect[0].height;
                    var ww = context.selectrect[0].width;
                    context.lineWidth = THUMBORDER;
                    user = _4cnvctx.timeobj;
                    var percent = (ww/w)*100;
                    context.percentrect = percent;
                    let centerX = rect.x + rect.width / 2;
                    let centerY = rect.y + rect.height / 2;
                    let radius = rect.height/2;

                    let startAngle = 1.5 * Math.PI;
                    let unitValue = (Math.PI - 0.5 * Math.PI) / 25;
                    var f = (1-user.berp())*100;
                    let endAngle = startAngle + (f * unitValue);
                    var a = endAngle - (percent/2 * unitValue);
                    var b = endAngle + (percent/2 * unitValue);

                    context.beginPath();
                    context.moveTo(centerX, centerY);
                    context.arc(centerX, centerY, radius, a, b, false);
                    context.closePath();
                    context.fillStyle = "rgba(255,0,0,0.33)";
                    context.fill();
                }
            }

            var rect = new rectangle(r.x, r.y, r.width, r.height);
            rect.shrink(THUMBSELECT, THUMBSELECT);

            var he = heightobj.value();
            var b = Math.berp(0,he.length()-1,he.current());
            var height = Math.max(60,Math.lerp(0, rect.height, b));
            var width = Math.max(60,Math.lerp(0, rect.width, b));
            var r = calculateAspectRatioFit(photo.image.width, photo.image.height, width, height);
            var h = Math.floor(r.height);
            var w = Math.floor(r.width);

            var jp = 0;
            if (h < 20)
            {
                h = 20;
                jp
            }

            var positx = positxobj.value();
            var posity = posityobj.value();
            var x = Math.floor(Math.nub(positx.value(), positx.length(), w, rect.width))+THUMBSELECT;
            var y = Math.floor(Math.nub(posity.value(), posity.length(), h, rect.height))+THUMBSELECT;
            context.thumbrect = new rectangle(x,y,w,h);

            context.save();
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            if ( (context.isthumb && jp) ||
                galleryobj.transparent)
            {
                var blackfill = new FillPanel(THUMBFILP);
                blackfill.draw(context, context.thumbrect, 0, 0);
            }
            else
            {
                if (!context.thumbcanvas)
                {
                    context.thumbcanvas = document.createElement('canvas');
                    context.thumbcanvas.width = w;
                    context.thumbcanvas.height = h;
                    var thumbcontext = context.thumbcanvas.getContext('2d');
                    thumbcontext.drawImage(photo.image,0,0,w,h);
                }

                context.drawImage(context.thumbcanvas, x, y, w, h);
            }

            var r = new rectangle(x,y,w,h);
            var whitestroke = new Stroke(THUMBSTROKE,THUMBORDER);
            whitestroke.draw(context, r, 0, 0);
            var region = new Path2D();
            region.rect(x,y,w,h);
            context.clip(region);

            var ww = Math.max(30,(rect.width/context.virtualwidth)*w);
            var stretch = stretchobj.value();
            if (stretch < 50)
                stretch = (50-stretch.value())/100;
            else
                stretch = (stretch.value()-50)/100;
            stretch = 1-stretch;
            ww *= stretch;

            var b = Math.berp(0,photo.image.height,context.imageheight);
            var hh = Math.lerp(0,h,b);
            var b = Math.berp(0,photo.image.height,context.nuby);
            var yy = y+Math.lerp(0,h,b);
            var jj = context.timeobj.berp();
            var bb = w*(1-jj);
            var xx = x+bb-ww/2;
            context.lineWidth = THUMBORDER;
            var r = new rectangle(xx,yy,ww,hh);
            context.selectrect = []
            context.selectrect.push(r);
            if (!galleryobj.hidefocus)
            {
                var blackfill = new FillPanel(THUMBFILL);
                blackfill.draw(context, r, 0, 0);
            }

            if (slicewidthobj.debug)
            {
                if (context.thumbrect.width > context.thumbrect.height)
                {
                    var j = context.thumbrect.height*0.15;
                    var a = new Row([j,0,j],
                        [
                            0,
                            new Layer(
                            [
                                new CirclePanel("rgba(255,255,255,0.25)", 0, 0),
                                new panel(),
                            ]),
                            0,
                        ]);

                    a.draw(context, context.thumbrect, 0, 0);
                }
                else
                {
                    var j = context.thumbrect.width*0.70;
                    var a = new Row([0,j,0],
                        [
                            0,
                            new Layer(
                            [
                                new CirclePanel("rgba(255,255,255,0.25)", 0, 0),
                                new panel(),
                            ]),
                            0,
                        ]);

                    a.draw(context, context.thumbrect, 0, 0);
                }
            }

            if (!galleryobj.hidefocus)
            {
                whitestroke.draw(context, r, 0, 0);
                if (xx > x)//leftside
                {
                    var r = new rectangle(xx-w,yy,ww,hh);
                    context.selectrect.push(r);
                    blackfill.draw(context, r, 0, 0);
                    whitestroke.draw(context, r, 0, 0);
                }
                else if (xx < x)//right side
                {
                    var r = new rectangle(w+xx,yy,ww,hh);
                    context.selectrect.push(r);
                    blackfill.draw(context, r, 0, 0);
                    whitestroke.draw(context, r, 0, 0);
                }
            }

            context.restore();
        }
    },
 ];

var thumbobj = new circular_array("THUMB", thumblst);
thumbobj.set(1);

var getfrompoint = function (context, x, y)
{
	var slices = context.sliceobj.data;

	var k;
    for (k = 0; k < slices.length; k++)
    {
		var slice = slices[k];
		if (!slice.fitwidth || !slice.fitheight)
			continue;
		var w = slice.fitwidth;
		var h = slice.fitheight;
		var x1 = slice.center.x - w / 2;
		var y1 = slice.center.y - h / 2;
		var x2 = x1 + w;
		var y2 = y1 + h;
		if (x >= x1 && x < x2 &&
			y >= y1 && y < y2)
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
        user.fitwidth = rect.width;
        user.fitheight = rect.height;
        var clr = SCROLLNAB;
        if (user.tap)
            clr = MENUTAP;
        var e = context.scrollobj.berp();
        var a = new Col([20,0,20],
        [
            0,
            new Layer(
            [
                new Expand(new Rounded(clr, 3, SEARCHFRAME, 8, 8), 0, 20),
                new Shrink(new MultiText(e), 20, 0),
            ]),
            0,
        ]);

        a.draw(context, rect, user.line.split("\n"), time);
    }
},
{
    name: "MENU",
    draw: function (context, rect, user, time)
    {
        user.fitwidth = rect.width;
        user.fitheight = rect.height;
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
                new Expand(new Rounded(clr, 3, SEARCHFRAME, 8, 8), 0, 10),
                new Shrink(new Text("white", "center", "middle",0, 0), 20, 0),
            ]),
            0,
        ]);

        a.draw(context, rect, user.title, time);
    }
},
{
    name: "GALLERY",
    draw: function (context, rect, user, time)
    {
        user.fitwidth = rect.width;
        user.fitheight = rect.height;

        if (!user.lst)
        {
            var lst = [];
            var index = `${time+1} of ${galleryobj.length()}`
            lst.push(index);
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

            user.lst = lst;
        }

        if (!context.isright && !user.thumbcanvas)
        {
            try
            {
                const thumbimg = new Image();
                user.thumbcanvas = document.createElement('canvas');
                user.thumbcanvas.width = 0;
                user.thumbcanvas.height = 0;
                if (user.full)
                    thumbimg.src = user.full;
                else if (user.file)
                    thumbimg.src = URL.createObjectURL(user.file);
                else
                {
                    const variant = _8cnvctx.variantobj.value();
                    thumbimg.src = `https://reportbase.com/image/${user.id}/${variant}`;
                }

                thumbimg.onload = function()
                {
                    if (!user.thumbcanvas)
                        return;
                    const ctx = user.thumbcanvas.getContext("2d");
                    const a = this.width/this.height;
                    user.thumbcanvas.width = rect.width;
                    user.thumbcanvas.height = rect.width/a;
                    ctx.drawImage(this, 0, 0, this.width, this.height,
                        0, 0, user.thumbcanvas.width,
                        user.thumbcanvas.height);
                    context.refresh();
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

        if (user.isvisible && context.scrollobj.current() == 0 &&
            user.thumbcanvas && user.thumbcanvas.width)
        {
            var obj = context.scrollobj.value();
            var h2 = rect.height;
            var w2 = rect.width;
            var b2 = w2/h2;
            var b = user.thumbcanvas.width/user.thumbcanvas.height;
            if (b > b2)
            {
                var h1 = user.thumbcanvas.height;
                var w1 = h1*b2;
                var x1 = Math.nub(obj.value(), obj.length(), w1, user.thumbcanvas.width);
                context.drawImage(user.thumbcanvas, x1, 0, w1, h1, 0, 0, w2, h2);
            }
            else
            {
                var w1 = user.thumbcanvas.width;
                var h1 = w1/b2;
                var y1 = Math.nub(obj.value(), obj.length(), h1, user.thumbcanvas.height);
                context.drawImage(user.thumbcanvas, 0, y1, w1, h1, 0, 0, w2, h2);
            }

            var r = new rectangle(0,0,w2,h2);
            if (user.tap)
            {
                var a = new FillPanel("rgba(255,125,0,0.4)");
                a.draw(context, r, 0, 0);
            }

            var a = new RowA([20,20,0,20,20,20],
                [
                    0,//new ShadowPanel(new Text("white", "center", "middle",0,0),1,1),
                    0,
                    0,
                    0,
                    0,
                    0,//new ShadowPanel(new Text("white", "center", "middle",0,0),1,1),
                ]);
            a.draw(context,
                new rectangle(20,10,rect.width-40,rect.height-20),
            [
                `${time+1} of ${galleryobj.length()}`,
                0,
                0,
                0,
                0,
                0,
            ], 0);
        }
        else if (context.scrollobj.current() == 0)
        {
            var h2 = rect.height;
            var w2 = rect.width;
            var b2 = w2/h2;
            var r = new rectangle(20,10,rect.width-40,rect.height-20);

             var a =
                new Layer(
                    [
                        user.tap ? new FillPanel("rgba(255,125,0,0.4)") : 0,
                        new ShadowPanel(
                            new Text("rgba(255,255,255,0.7)", "center", "middle",0,0, "italic bold 24px arial"),1,1),
                    ])
            a.draw(context, r,  `${time+1}`, 0);
        }
        else if (context.scrollobj.current() == 1)
        {
            var e = _8cnvctx.textscrollobj.berp();
            var a = new Layer(
                [
                    user.tap?new FillPanel("rgba(255,125,0,0.4)"):0,
                    new Shrink(new MultiText(e), 15, 15),
                ]);

            var r = new rectangle(20,10,rect.width-40,rect.height-20);
            a.draw(context, r, user.lst, 0);
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

function resetcanvas(leftright=1)
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
        window.footrect = new rectangle(0,window.innerHeight-ALIEXTENT,window.innerWidth,ALIEXTENT);
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
        var width = context.canvas.height * aspect;
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
    context.imageheight = photo.image.height*zoom;
    context.virtualheight = context.canvas.height;
    var imageaspect = photo.image.width/context.imageheight;
    context.virtualwidth = context.canvas.height * imageaspect;
    context.virtualfactor = context.virtualwidth/window.innerWidth;
    context.virtualwindow = window.innerWidth/context.virtualwidth;
    context.virtualaspect = context.virtualwidth / context.canvas.height;
    context.virtualextent = context.virtualwidth.toFixed(0) + "x" + context.canvas.height;
    context.virtualsize = ((context.virtualwidth * context.canvas.height)/1000000).toFixed(1) + "MP";
    var y = Math.clamp(0,context.canvas.height-1,context.canvas.height*rowobj.berp());
    context.nuby = Math.nub(y, context.canvas.height, context.imageheight, photo.image.height);

    var slicewidth = slicewidthobj.value();

    var j = 0;
    for (; j < slicelst.length; ++j)
    {
        var k = slicelst[j];
        var fw = context.virtualwidth / k.slices;
        if (fw >= slicewidth)
            break;
    }

    var canvaslen = Math.ceil(context.virtualwidth/MAXVIRTUAL);
    var e = slicelst[j-1];
    var delay = e.delay;
    var slices = Math.ceil(e.slices/canvaslen);
    var delayinterval = delay/100000;
    context.delay = e;
    var gwidth = photo.image.width/canvaslen;
    var bwidth = context.virtualwidth/canvaslen;
    context.colwidth = bwidth/slices;

    var slice = 0;
    context.sliceobj.data = []

    var j = 0;
    for (var n = 0; n < canvaslen; ++n)
    {
        var cnv = canvaslst[n];
        if (cnv.height != context.canvas.height)
            cnv.height = context.canvas.height;
        if (cnv.width != bwidth)
            cnv.width = bwidth;

        var ctx = cnv.getContext('2d');
        ctx.drawImage(photo.image,
            n*gwidth, context.nuby, gwidth, context.imageheight,
            0, 0, bwidth, cnv.height);

        var tb = new Array(slices).fill(0);
        var jb = gridToGridB(tb, bwidth);

        for (var e = 0; e < slices; ++e)
        {
            var k = {};
            k.x = e*context.colwidth;
            k.p = k.x/context.virtualwidth;
            k.slice = slice;
            k.time = j;
            k.canvas = cnv;
            slice++;
            context.sliceobj.data.push(k);
            j += delayinterval;
        }
    }

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

var eventlst =
[
    {dblclick: "DEFAULT", mouse: "DEFAULT", thumb: "DEFAULT", tap: "DEFAULT", pan: "DEFAULT", swipe: "DEFAULT", button: "DEFAULT", wheel: "DEFAULT", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT", bar: new Empty(), scroll: new ScrollMenuBar(), buttonheight: 0, width: 640, keyblock: 100, backcolor: MENUCOLOR},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU",  drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar(), scroll: new ScrollMenuBar(), buttonheight: 50, width: 640, keyblock: 100, backcolor: MENUCOLOR},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new SearchBar(), scroll: new DualPanel(), buttonheight: 90, width: 640, keyblock: 100, backcolor: MENUCOLOR},
    {dblclick: "BOSS", mouse: "DEFAULT", thumb: "BOSS",  tap: "BOSS", pan: "BOSS", swipe: "BOSS", button: "BOSS", wheel: "BOSS", drop: "GALLERY", key: "BOSS", press: "BOSS", pinch: "BOSS", bar: new Empty(), scroll: new DualPanel(), buttonheight: 30, width: 640, keyblock: 100, backcolor: MENUCOLOR},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel:  "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar(), scroll: new DualPanel(), buttonheight: 90, width: 640, keyblock: 100, backcolor: MENUCOLOR},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar(), scroll: new ScrollMenuBar(), buttonheight: 50, width: 640, keyblock: 100, backcolor: MENUCOLOR},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "OPTION", wheel: "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar(), scroll: new DualPanel(), buttonheight: 90, width: 640, keyblock: 100, backcolor: MENUCOLOR},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "GALLERY", pan: "MENU", swipe: "GALLERY", button: "GALLERY", wheel: "GALLERY", drop: "GALLERY", key: "GALLERY", press: "GALLERY", pinch: "GALLERY", bar: new GalleryBar(), scroll: new DualPanel(), buttonheight: 320, width: 1080, keyblock: 100, backcolor: "black"},
    {dblclick: "DEFAULT", mouse: "MENU", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", button: "MENU", wheel: "MENU", drop: "GALLERY", key: "MENU", press: "MENU", pinch: "DEFAULT", bar: new MenuBar("Image Browser"), scroll: new ScrollMenuBar(), buttonheight: 50, width: 640, keyblock: 100, backcolor: MENUCOLOR},
];

let contextlst = [_1cnvctx,_2cnvctx,_3cnvctx,_4cnvctx,_5cnvctx,_6cnvctx,_7cnvctx,_8cnvctx,_9cnvctx];
let menulst = [_2cnvctx,_3cnvctx,_5cnvctx,_6cnvctx,_7cnvctx,_8cnvctx,_9cnvctx];
var contextobj = new circular_array("CTX", contextlst);
contextlst.forEach(function(context, n)
{
    context.enabled = 0;
    context.canvas.width = 1;
    context.canvas.height = 1;
    context.autodirect = -1;
    context.font = DEFAULTFONT;
    context.fillText("  ", 0, 0);
    context.slideshow = 0;
    context.lastime = 0;
    context.slidereduce = 0;
    context.keyup = 0;
    context.updowntime = 0;
    context.slidestop = 0;
    context.sliceobj = new circular_array("", []);
    context.timeobj = new circular_array("", TIMEOBJ);
    context.timeobj.set(TIMEOBJ/2);
    context.scrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);
    context.imagescrollobj = new circular_array("IMAGESCROLL", Math.floor(window.innerHeight/2));
    context.imagescrollobj.set(context.imagescrollobj.length()/2);
    context.textscrollobj = new circular_array("TEXTSCROLL", window.innerHeight/2);

    var obj = eventlst[n];
    context.backcolor = obj.backcolor;
    context.keyblock = obj.keyblock;
    context.width = obj.width;
    context.bar = obj.bar;
    context.scroll = obj.scroll;
    context.buttonheight = obj.buttonheight;

    var k = pinchlst.findIndex(function (a) { return a.name == obj.pinch });
    k = pinchlst[k];
    context.pinch_ = k.pinch;
    context.pinchstart_ = k.pinchstart;
    context.pinchend_ = k.pinchend;

    var k = dblclicklst.findIndex(function (a) { return a.name == obj.dblclick });
    k = dblclicklst[k];
    context.dblclick_ = k.click;

    var k = droplst.findIndex(function (a) { return a.name == obj.drop });
    k = droplst[k];
    context.drop = k.drop;

    var k = keylst.findIndex(function (a) { return a.name == obj.key });
    k = keylst[k];
    context.keyup_ = k.keyup;
    context.keydown_ = k.keydown;

    var k = wheelst.findIndex(function (a) { return a.name == obj.wheel });
    k = wheelst[k];
    context.wheelup_ = k.up;
    context.wheeldown_ = k.down;
    context.wheeleft_ = k.left;
    context.wheelright_ = k.right;

    var k = mouselst.findIndex(function (a) {return a.name == obj.mouse});
    k = mouselst[k];
    context.mouse = k;

    var k = presslst.findIndex(function (a) {return a.name == obj.press});
    k = presslst[k];
    context.pressup_ = k.pressup;
    context.press_ = k.press;

    var k = swipelst.findIndex(function (a) {return a.name == obj.swipe});
    k = swipelst[k];
    context.swipeleftright_ = k.swipeleftright;
    context.swipeupdown_ = k.swipeupdown;

    var k = buttonlst.findIndex(function (a) {return a.name == obj.button});
    k = buttonlst[k];
    context.draw = k.draw;

    var k = taplst.findIndex(function (a) {return a.name == obj.tap});
    k = taplst[k];
    context.tap_ = k.tap;

    var k = panlst.findIndex(function (a) {return a.name == obj.pan});
    k = panlst[k];
    context.panstart_ = k.panstart;
    context.pan_ = k.pan;
    context.panupdown_ = k.updown;
    context.panleftright_ = k.leftright;
    context.panend_ = k.panend;
});

_8cnvctx.scrollobj = new circular_array("SCROLL", [_8cnvctx.imagescrollobj,_8cnvctx.textscrollobj]);

contextobj.reset = function (leftright)
{
    var context = _4cnvctx;
    if (photo.image &&
        photo.image.complete &&
        photo.image.naturalHeight)
    {
        resetcanvas(leftright);
    }
    else
    {
        var template = galleryobj.variant ? galleryobj.variant : "3840x3840";
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
            var path = `https://reportbase.com/image/${id}/${template}`;
            if (galleryobj.value().full)
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
            extentobj.data[0] = this.extent;
            extentobj.data[1] = galleryobj.value().id?galleryobj.value().id:"Undefined";
            extentobj.data[2] = `${galleryobj.current()+1} of ${galleryobj.length()}`;
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

            document.title = `${j} (${photo.image.width}x${photo.image.height})`;
            _4cnvctx.timeobj.set(TIMEOBJ/2);
            rowobj.set(rowobj.length()/2);
            _4cnvctx.movingpage = 0;
            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            contextobj.reset()
            context.tab();
            clearTimeout(context.mastertime);
            context.mastertime = setTimeout(function() { masterload(); }, 500);
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
        var template = galleryobj.template ? galleryobj.template : "medium";
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

var ShadowPanel  = function (panel, x, y)
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

function getmenu()
{
    if (_2cnvctx.enabled)
        return _2cnvctx;
    else if (_3cnvctx.enabled)
        return _3cnvctx;
    else if (_4cnvctx.enabled)
        return _4cnvctx;
    else if (_5cnvctx.enabled)
        return _5cnvctx;
    else if (_6cnvctx.enabled)
        return _6cnvctx;
    else if (_7cnvctx.enabled)
        return _7cnvctx;
    else if (_8cnvctx.enabled)
        return _8cnvctx;
    else if (_9cnvctx.enabled)
        return _9cnvctx;
    return 0;
}

function menuhide()
{
    menulst.forEach(function(context)
        {
            context.enabled = 0;
            context.hide();
        });

    _4cnvctx.refresh();
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    return k;
}

function resize()
{
    _8cnvctx.sliceobj.data.forEach(function(slice)
    {
        if (slice.thumbcanvas)
            delete slice.thumbcanvas;
    });

    delete _4cnvctx.thumbcanvas;
    contextobj.reset()
    galleryobj.transparent = 0;
    var h = window.self !== window.top ? 0 : BEXTENT;
    headcnvctx.show(0,0,window.innerWidth,h);
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    menuhide();
    _4cnvctx.refresh();
}

function escape()
{
    if (globalobj.prompt)
    {
        globalobj.prompt.close();
        globalobj.prompt = 0;
        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        return;
    }

    _4cnvctx.panhide  = 0
    headobj.set(3);
    thumbobj.set(1);
    headham.panel = headobj.value();
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    delete _4cnvctx.thumbcanvas;
    galleryobj.transparent = 0;
    menuhide();
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
        this.pan = function (context, rect, x, y, type) { panobj.value().pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panobj.value().panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panobj.value().panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {pressobj.geturrent().press(_4cnvctx, rect, x, y)}
     	this.tap = function (context, rect, x, y) {tapobj.value().tap(_4cnvctx, rect, x, y)};
		this.draw = function (context, rect, user, time) {};
	},
	new function ()
	{
        this.pan = function (context, rect, x, y, type) { panobj.value().pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panobj.value().panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panobj.value().panstart(_4cnvctx, rect, x, y); }
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
            else if (context.searchrect && context.searchrect.hitest(x,y))
            {
                menushow(_3cnvctx);
            }
            else if (context.fullpanel && context.fullpanel.hitest(x,y))
            {
                if (screenfull.isEnabled)
                {
                    if (screenfull.isFullscreen)
                        screenfull.exit();
                    else
                        screenfull.request();
                }
            }
            else if (context.pagerect && context.pagerect.hitest(x,y))
            {
                _8cnvctx.scrollobj.set(0);
                menutoggle(_8cnvctx)
            }
            else if (context.optionsrect && context.optionsrect.hitest(x,y))
            {
                menutoggle(_2cnvctx)
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
            if (getmenu())
                return;
            context.save();
            var a = new Row([BEXTENT,0],
            [
               new Col( [MARGINBAR, 60,0, 50,50,50, 0,60, MARGINBAR],
               [
                   0,
                   new GalleryPanel(),
                   0,
                   new ShiftPanel(new FullPanel(),-10,0),
                   new SearchPanel(),
                   new ShiftPanel(new ThumbPanel(),10,0),
                   0,
                   new OptionsPanel(),
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
        this.pan = function (context, rect, x, y, type) { panobj.value().pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panobj.value().panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panobj.value().panstart(_4cnvctx, rect, x, y); }
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
                var k = panhorz(context.scrollobj, rect.width-x);
                if (k == -1)
                    return;
                if (k == context.scrollobj.anchor())
                    return;
                context.scrollobj.set(k);
            }

            headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
        }

        this.panend = function (context, rect, x, y)
        {
            delete context.scrollobj.offset;
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
                _8cnvctx.scrollobj.set(0);
                _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
                _8cnvctx.refresh();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
            }
            else if (context.movenext && context.movenext.hitest(x,y))
            {
                _4cnvctx.movepage(1);
                _8cnvctx.scrollobj.set(0);
                _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
                _8cnvctx.refresh();
                headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
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
            if (getmenu())
                return;
            context.save();
            context.shadowColor = "black";
            context.prompt = new rectangle()
            delete context.pagepanel;
            delete context.optionpanel;
           var w = rect.width;
            if (w > rect.width-BEXTENT*2)
                w = rect.width-BEXTENT*2;
            var e = context.scrollobj.berp();
            var a = new Col([5,60,0,60,5],
                    [
                        0,
                        new PrevPanel(),
                        getmenu()?0:new Row([10,0,10],
                        [
                            0,
                            new Col([0,w,0],
                            [
                                0,
                                new Layer(
                                [
                                    new Rectangle(context.prompt),
                                    new ShadowPanel(new MultiText(e),1,1),
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
        this.pan = function (context, rect, x, y, type) { panobj.value().pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panobj.value().panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panobj.value().panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
    	this.press = function (context, rect, x, y) {pressobj.value().press(_4cnvctx, rect, x, y)}
        this.tap = function (context, rect, x, y) { menushow(_3cnvctx) ; };

		this.draw = function (context, rect, user, time)
		{
            context.save();
            context.clear();

            var a = new Layer(
            [
                    new FillPanel("black"),
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
        this.pan = function (context, rect, x, y, type) { panobj.value().pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panobj.value().panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panobj.value().panstart(_4cnvctx, rect, x, y); }
        this.swipeleftright = function (context, rect, x, y, evt) { swipeobj.value().swipeleftright(_4cnvctx, rect, x, y, evt); }
        this.swipeupdown = function (context, rect, x, y, evt) { swipeobj.value().swipeupdown(_4cnvctx, rect, x, y, evt); }
        this.tap = function (context, rect, x, y){ tapobj.value().tap(_4cnvctx, rect, x, y); }
    	this.press = function (context, rect, x, y)
        {
            headobj.set(thumbobj.current() == 0?1:3);
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
        this.pan = function (context, rect, x, y, type) { panobj.value().pan(_4cnvctx, rect, x, y, type); }
        this.panend = function (context, rect, x, y) { panobj.value().panend(_4cnvctx, rect, x, y); }
        this.panstart = function (context, rect, x, y) { panobj.value().panstart(_4cnvctx, rect, x, y); }
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

function menushow(context)
{
    menuhide();

    if (context == _8cnvctx)
    {
        context.show(0, 0, window.innerWidth, window.innerHeight);
    }
    else
    {
        var w = Math.min(context.width, window.innerWidth);
        var l = Math.floor((window.innerWidth-w)/2);
        context.show(l, 0, w, window.innerHeight);
    }

    context.enabled = 1;
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);

    context.refresh();
    function f() { context.refresh(); }
    setTimeout(function() { f(); }, 100);
    setTimeout(function() { f(); }, 500);
    setTimeout(function() { f(); }, 1000);
    setTimeout(function() { f(); }, 1500);
    setTimeout(function() { f(); }, 2000);
}

function menutoggle(context)
{
    var menu = getmenu();
    if (context == menu)
    {
        context.enabled = 0;
        menuhide();
        return;
    }

    menuhide();
    _4cnvctx.slideshow = 0;
    context.enabled = 1;
    var w = Math.min(context.width, window.innerWidth);
    var l = Math.floor((window.innerWidth-w)/2);
    context.show(l, 0, w, window.innerHeight);

    context.refresh();
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    _4cnvctx.refresh();
    function f() { context.refresh(); }
    setTimeout(function() { f(); }, 100);
    setTimeout(function() { f(); }, 500);
    setTimeout(function() { f(); }, 1000);
}

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

var GalleryPanel = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.pagerect = new rectangle()
        var j = 5;
        var k = j/2;
        var e = new FillPanel(OPTIONFILL);
        var s = context.tapped == 1 || _8cnvctx.enabled;
        var a = new Layer(
        [
            new Rectangle(context.pagerect),
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

var OptionsPanel = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        context.optionsrect = new rectangle()
        var j = 5;
        var k = j/2;
        var e = new FillPanel(OPTIONFILL);
        var s = context.tapped == 2 ||
                _2cnvctx.enabled ||
                _3cnvctx.enabled ||
                _5cnvctx.enabled ||
                _6cnvctx.enabled ||
                _7cnvctx.enabled ||
                _9cnvctx.enabled;

        var a = new Layer(
        [
            new Rectangle(context.optionsrect),
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
	if (evt.key == "Escape")
	{
        escape();
        evt.preventDefault();
        return true;
	}
	else
	{
		var context = _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx : _9cnvctx.enabled ? _9cnvctx :
				_4cnv.height ? _4cnvctx : _1cnvctx;
		if (context.keyup_)
			return context.keyup_(evt);
	}
});

window.addEventListener("keydown", function (evt)
{
    var context =
        _2cnvctx.enabled ? _2cnvctx :
        _3cnvctx.enabled ? _3cnvctx :
        _5cnvctx.enabled ? _5cnvctx :
        _6cnvctx.enabled ? _6cnvctx :
        _7cnvctx.enabled ? _7cnvctx :
        _8cnvctx.enabled ? _8cnvctx :
        _9cnvctx.enabled ? _9cnvctx :
        _4cnvctx;
    if (context.keydown_)
        return context.keydown_(evt);
}, false);

window.onerror = function(message, source, lineno, colno, error)
{
    //window.alert( error+","+lineno+","+console.trace());
};

window.addEventListener("beforeunload", (evt) => { });
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

var galleryobj = new circular_array("", 0);
galleryobj.init = function (obj)
{
    galleryobj = Object.assign(galleryobj,obj);
    galleryobj.set(url.project);
    setfavicon();
    pretchobj.split(60, "40-90", pretchobj.length());
    letchobj.split(60, "40-90", letchobj.length());
    speedyobj.split(1.25, "1-20", speedyobj.length());
    positxpobj.set(50);
    positypobj.set(90);
    positxlobj.set(50);
    positylobj.set(90);
    traitobj.split(60, "0.1-1.0", traitobj.length());
    scapeobj.split(60, "0.1-1.0", scapeobj.length());
    var zoom = galleryobj.zoom?galleryobj.zoom:25;
    poomobj.set(zoom);
    loomobj.set(zoom);
    slicewidthobj.set(galleryobj.slicewidth?galleryobj.slicewidth:10);

    var lst = [];
    var lst1 = [];
    for (var n = 180; n < 720; n += 1)
    {
        lst.push(n);
        lst1.push("2160x2160");
    }
    _8cnvctx.buttonobj = new circular_array("", lst);
    _8cnvctx.variantobj = new circular_array("", lst1);
    var k = galleryobj.buttonstart?galleryobj.buttonstart:100;
    _8cnvctx.buttonobj.set(Number(k));
    _8cnvctx.variantobj.set(Number(k));

    if (!galleryobj.length())
    {
        headobj.set(4);
        menushow(_3cnvctx)
    }
    else
    {
        if (leftmenu && galleryobj.length())
        {
            headobj.set(1);
            _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
            menutoggle(_8cnvctx)
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

    //_2cnv
    _2cnvctx.sliceobj.data =
    [
        {title:"About", path: "ABOUT", func: function()
        {
            menutoggle(_7cnvctx);
        }},

        {title:"Open", path: "OPEN", func: function()
        {
            menuhide();
            explore().then(function(files) { dropfiles(files); })
        }},

        {title: "Search", path: "SEARCH", func: function()
            {
                searchshow("pexels")
            }},
        {title:"Download", path: "DOWNLOAD", func: function()
            {
                download();
                menuhide();
            }},
        {title:"Screenshot", path: "SCREENSHOT", func: function()
            {
                try
                {
                    var k = document.createElement('canvas');
                    var link = document.createElement("a");
                    link.href = _4cnvctx.canvas.toDataURL();
                    link.download = galleryobj.value()[0] + ".jpg";
                    link.click();
                }
                catch (_)
                {
                }
            }},
        {title:"Copy Link", path: "COPYLINK", func: function()
            {
                copytext(addressobj.full());
                menuhide();
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
                menuhide();
                slicewidthobj.debug = slicewidthobj.debug ? 0 : 1;
                _4cnvctx.refresh();
             },
            enabled: function() { return slicewidthobj.debug; }
        },
       {title:"dalle.json", path: "", func: function()
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
                    .then((json) => showdata(json))
                    .catch((error) => {});
                })
                .catch((error) => {});
            }
        },
       {title:"ulid", path: "", func: function()
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

            }
        },
       {title:"user.json", path: "", func: function()
            {
                userobj.save();
            }
        },


        {title:"Login", path: "LOGIN", func: function() { authClient.redirectToLoginPage(); }},
        {title:"Logout", path: "LOGOUT", func: function() { authClient.logout(true) }},
        {title:"Account", path: "ACCOUNT", func: function() { authClient.redirectToAccountPage() }},
    ];

    //_3cnv
    _3cnvctx.sliceobj.data =
    [
        {line:"Unsplash\nImage Search", func: function() { searchshow("unsplash"); }, enabled: function() {return false;} },
        {line:"Pexels\nImage Search", func: function() { searchshow("pexels"); }, enabled: function() {return false;} },
        {line:"Pixabay\nImage Search",func: function() { searchshow("pixabay"); }, enabled: function() {return false;} },
        {line:"Pexels Collection\nImage Search",func: function() { searchshow("pexels_collection"); }, enabled: function() {return false;} },
        {line:"Unsplash Collection\nImage Search",func: function() { searchshow("unsplash_collection"); }, enabled: function() {return false;} },
        {line:"Unsplash User Collection\nImage Search",func: function() { searchshow("unsplash_user"); }, enabled: function() {return false;} },
        {line:"Dalle Prompt", func: function()
            {
                menuhide();
                var k = galleryobj.value();
                showprompt(k.prompt?k.prompt:"");
             },
            enabled: function() { return false }
        },
    ];

    _6cnvctx.sliceobj.data =
    [
    ];

    //7
    _7cnvctx.sliceobj.data =
    [
        {
            line: "Image Viewer\nhttps://reportbase.com\nimages@reportbase.com\nTom Brinkman",
            func: function() {menuhide(); }
        },
        {
            line: "High Resolution\n360° Panoramas\nImage Stetch\nImage Zooming",
            func: function() {menuhide(); }
        },
        {
            line: "Digital Art\nGraphic Novels\nDrone Photgraphy\nLandscapes",
            func: function() {menuhide(); }
        },
        {
            line: "Side Scroller\nWrap Around\nFull Screen\nWide Image",
            func: function() {menuhide(); }
        },
    ];

    for (var n = 0; n < galleryobj.data.length; ++n)
    {
        var k = galleryobj.data[n];
        k.func = new function ()
        {
            this.exec = function()
            {
                window.open(addressobj.full(), "_html");
            }
        }
    }

    _8cnvctx.sliceobj.data = galleryobj.data;
    _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);

    //9
    var slices = _9cnvctx.sliceobj;
    slices.data = [];
    contextobj.reset();
    _4cnvctx.refresh();

    fetch(`https://bucket.reportbase5836.workers.dev/user.json`)
    .then((response) => jsonhandler(response))
    .then(function (json)
    {
        userobj = Object.assign(userobj,json);
    })
    .catch((error) => {});
}

url.path = "reci";
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
else
{
    var path = `https://bucket.reportbase5836.workers.dev/reci.json`;
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

function download()
{
    if (galleryobj.value().image_url)
    {
        window.open(galleryobj.value().image_url, "_html");
    }
    else if (galleryobj.value().original)
    {
        window.open(galleryobj.value().original, "_html");
    }
    else if (galleryobj.value().full)
    {
        window.open(galleryobj.value().full, "_html");
    }
    else
    {
        var id = galleryobj.value().id;
        var path = `https://reportbase.com/image/${id}/blob`;
        window.open(path, "_html");
    }
}

function deleteimage()
{
    var id = galleryobj.value().id;
    fetch(`https://reportbase.com/image/${id}`, { method: 'DELETE' })
    .then(res =>
        {
            location.reload();
            return res.json()
        })
    .then(data => console.log(data))
    .catch((error) =>
    {
        console.log("Error:", error);
    });
}

function showupload(repos)
{
    const dialog = document.getElementById("upload-overlay");
    globalobj.prompt = dialog;
    dialog.addEventListener("click", function()
    {
        var rect = input.getBoundingClientRect();
        if (event.target.id == "upload-ok")
        {
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            if (globalobj.block)
                return;
            dialog.close();
            globalobj.prompt = 0;
            hiderefresh();
        }
    });

    dialog.showModal();
    setTimeout(function() { globalobj.block = 0; }, 40);
    hiderefresh();
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
        var s = `${url.origin}?${repos}=${search}&page=${url.page}`;
        window.open(s, "_html");
      }
    });

    globalobj.block = 1;
    const dialog = document.getElementById("search-overlay");
    globalobj.prompt = dialog;
    dialog.addEventListener("click", function()
    {
        var rect = input.getBoundingClientRect();
        if (event.target.id == "search-ok")
        {
            var search = document.getElementById('search-value').value.clean();
            if (!search)
                return;
            globalobj.prompt = 0;
            var s = `${url.origin}?${repos}=${search}&page=${url.page}`;
            window.open(s, "_html");
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            if (globalobj.block)
                return;
            dialog.close();
            globalobj.prompt = 0;
            hiderefresh();
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
    hiderefresh();
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
    const dialog = document.getElementById("prompt-overlay");
    globalobj.prompt = dialog;
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
            .then((json) => showdata(json))
            .catch((error) => {});
            dialog.close();
        }
        else if (event.clientY < rect.top || event.clientY > rect.bottom ||
            event.clientX < rect.left || event.clientX > rect.right)
        {
            if (globalobj.block)
                return;
            dialog.close();
            globalobj.prompt = 0;
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
    globalobj.prompt = dialog;
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
            globalobj.prompt = 0;
        }
    });

    dialog.showModal();
    textarea.setSelectionRange(0, 0);
    setTimeout(function() { globalobj.block = 0; }, 40);
}

function hiderefresh()
{
    function func()
    {
        var lst = [_8cnvctx, _1cnvctx, _2cnvctx, _3cnvctx,  _5cnvctx, _6cnvctx, _7cnvctx, _9cnvctx,];
        for (var n = 0; n < lst.length; ++n)
        {
            if (!lst[n].enabled)
                continue;
            lst[n].refresh();
            break;
        }

        headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    }

    func();
    setTimeout(function() {func()}, 500);
    setTimeout(function() {func()}, 100);
    setTimeout(function() {func()}, 200);
    setTimeout(function() {func()}, 400);
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
          .then(function(response)
              {
                    if (!response.ok)
                        throw new Error('Network error');
                    return response.json();
              })
          .then(function(json)
              {
                    console.log(json);
              })
          .catch(function(err)
              {
                    console.log(err);
              });
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

function showdata(data)
{
    galleryobj.data.splice(0,0,...data);
    _8cnvctx.sliceobj.data = galleryobj.data;
    var slices = _8cnvctx.sliceobj;
    _8cnvctx.virtualheight = slices.length()*_8cnvctx.buttonheight;
    _8cnvctx.scrollobj.set(0);
    galleryobj.set(0);
    delete _4cnvctx.thumbcanvas;
    delete photo.image;
    galleryobj.transparent = 0;
    _4cnvctx.isthumb = 0;
    headobj.set(3);
    headham.panel = headobj.value();
    headobj.value().draw(headcnvctx, headcnvctx.rect(), 0);
    contextobj.reset();
    _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
    _8cnvctx.refresh();
    menushow(_8cnvctx)
}
