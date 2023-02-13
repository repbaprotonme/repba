//todo: https://obfuscator.io
//todo: safari max size

/* ++ += ==
Copyright 2017 Tom Brinkman
http://www.reportbase.com
*/

const ISMOBILE = window.matchMedia("only screen and (max-width: 760px)").matches;
const FIREFOX = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const VIRTCONST = 0.8;
const MAXVIRTUAL = 5760*2;
const SWIPETIME = 20;
const THUMBORDER = 2;
const JULIETIME = 100;
const DELAY = 10000000;
const HNUB = 10;
const ALIEXTENT = 60;
const ARROWBORES = 22;
const DELAYCENTER = 3.926;
const SLICERADIUS = 130900;
const TIMEOBJ = 3926;
const TIMEMID = TIMEOBJ/2;
const MENUSELECT = "rgba(0,0,100,0.85)";
const MENUTAP = "rgba(255,0,0,0.5)";
const PROGRESSFILL = "white";
const PROGRESSFALL = "black";
const SCROLLNAB = "rgba(0,0,0,0.35)";
const HEADBACK = "rgba(0,0,0,0.20)";
const MENUCOLOR = "rgba(0,0,0,0.40)";
const BUTTONBACK = "rgba(0,0,0,0.25)";
const OPTIONFILL = "rgb(255,255,255)";
const THUMBFILL = "rgba(0,0,0,0.35)";
const THUMBSTROKE = "rgba(255,255,255,0.75)";
const ARROWFILL = "white";
const REDUCEFACTOR = 40000;
const MAXMEGAPIX = 6000000;
const SMALLFOOT = 70;
const LARGEFOOT = 90;
const SLIDETOP = 32;
const SLIDEFACTOR = 18;

globalobj = {};
let photo = {}
photo.image = 0;

function randomNumber(min, max) { return Math.floor(Math.random() * (max - min) + min); }
function numberRange (start, end) {return new Array(end - start).fill().map((d, i) => i + start); }

let url = new URL(window.location.href);
url.errors = url.searchParams.has("errors") ? Number(url.searchParams.get("errors")) : 0;

Math.clamp = function (min, max, val)
{
    if (typeof val === "undefined" || Number.isNaN(val) || val == null)
        val = max;
    if (max < min)
        return min;
    return (val < min) ? min : (val > max) ? max : val;
};

let Data = function (title, data)
{
    this.title = title.toLowerCase().replace(/\./g, "");
    this.fulltitle = title;
    this.ANCHOR = 0;
    this.CURRENT = 0;
    this.data = data;
    this.length = function () { return Array.isArray(this.data) ? this.data.length : Number(this.data); };
    this.getanchor = function () { return (this.ANCHOR < this.length() &&
		Array.isArray(this.data)) ? this.data[this.ANCHOR] : this.anchor(); };

    this.getcurrent = function ()
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
        var L = this.length()
        let k = this.CURRENT+index;
        if (k >= L)
            k = k-L;
        else if (k < 0)
            k = L+k;
        this.CURRENT = Math.clamp(0,this.length()-1, k);
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

    this.find = function (k)
    {
        let j = this.data.findIndex(function(a){return a == k;})
        if (j == -1)
            return 0;
        return this.data[j];
    }
};

var guidelst =
[
    {
        draw: function (context, rect, user, time)
        {
        },

        pan: function (context, rect, x, y, type)
        {
            var zoom = zoomobj.getcurrent()
            context.hithumb(x,y);
            var b = zoom.current() || Number(zoom.getcurrent());
            if (b)
                contextobj.reset()
            else
                context.refresh();
        }
    },
    {
        draw: function (context, rect, user, time)
        {
            context.beginPath();
            context.save();
            for (var n = 0; n < channelobj.length(); n++)
            {
                var k = channelobj.data[n];
                context.strokeStyle = THUMBSTROKE;
                context.lineWidth = 3;
                var j = rect.y + (k/100)*rect.height;
                context.moveTo(rect.x, j);
                context.lineTo(rect.x+rect.width, j);
            }
            context.stroke();
            context.restore();
        },

        pan: function (context, rect, x, y, type)
        {
            var isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
            if (!isthumbrect)
                return;
            var index = Math.floor(((y-context.thumbrect.y)/context.thumbrect.height)
                    *channelobj.data.length);
            var row = (channelobj.data[index]/100)*rowobj.length();
            if (rowobj.current() != row)
            {
                context.hithumb(x);
                rowobj.set(row);
                contextobj.reset()
            }
            else if (type == "panleft" || type == "panright")
            {
                context.hithumb(x,y);
                context.refresh();
            }
        }
    },
    {
        draw: function (context, rect, user, time)
        {
            context.beginPath();
            context.save();

            for (var n = 0; n < colobj.length(); n++)
            {
                var k = colobj.data[n];
                context.strokeStyle = THUMBSTROKE;
                context.lineWidth = 3;
                var j = rect.x + (k/100)*rect.width;
                context.moveTo(j, rect.y);
                context.lineTo(j, rect.y+rect.height);
            }

            context.stroke();
            context.restore();
        },

        pan: function (context, rect, x, y, type)
        {
            var isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
            if (!isthumbrect)
                return;
            var b = (y-context.thumbrect.y)/context.thumbrect.height;
            var e = Math.floor(b*rowobj.length());
            if (e != rowobj.current() && (type == "panup" || type == "pandown"))
            {
                rowobj.set(e);
                contextobj.reset();
            }

            var col = Math.floor(((x-context.thumbrect.x)/context.thumbrect.width)*colobj.length());
            if (colobj.current() != col)
            {
                colobj.set(col);
                var time = (colobj.getcurrent()/100)*context.timeobj.length();
                context.timeobj.set(time);
                context.refresh();
            }
        }
    },
    {
        draw: function (context, rect, user, time)
        {
            context.beginPath();
            context.save();

            for (var n = 0; n < colobj.length(); n++)
            {
                var k = colobj.data[n];
                context.strokeStyle = THUMBSTROKE;
                context.lineWidth = 3;
                var j = rect.x + (k/100)*rect.width;
                context.moveTo(j, rect.y);
                context.lineTo(j, rect.y+rect.height);
            }

            for (var n = 0; n < channelobj.length(); n++)
            {
                var k = channelobj.data[n];
                context.strokeStyle = THUMBSTROKE;
                context.lineWidth = 3;
                var j = rect.y + (k/100)*rect.height;
                context.moveTo(rect.x, j);
                context.lineTo(rect.x+rect.width, j);
            }

            context.stroke();
            context.restore();
        },

        pan: function (context, rect, x, y, type)
        {
            var isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
            if (!isthumbrect)
                return;

            var index = Math.floor(((y-context.thumbrect.y)/context.thumbrect.height)
                    *channelobj.data.length);
            var row = (channelobj.data[index]/100)*rowobj.length();
            if (rowobj.current() != row)
            {
                context.hithumb(x);
                rowobj.set(row);
                contextobj.reset()
            }

            var col = Math.floor(((x-context.thumbrect.x)/context.thumbrect.width)*colobj.length());
            if (colobj.current() != col)
            {
                colobj.set(col);
                var time = (colobj.getcurrent()/100)*context.timeobj.length();
                context.timeobj.set(time);
                context.refresh();
            }
        }
    },
]

var colorlst =
    [
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF',
    ];

var colorobj = new Data("COLOR", colorlst);

var speedobj = new Data("SPEED", 100);
speedobj.set(30);

var timemain = new Data("TIMEMAIN", 30);
timemain.set(12);

var speedxobj = new Data("SPEEDX", 100);
var speedyobj = new Data("SPEEDY", 100);
var guideobj = new Data("GUIDE", guidelst);
var colobj = new Data("COLUMNS", [0,10,20,30,40,50,60,70,80,90].reverse());
var channelobj = new Data("CHANNELS", [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]);

var rotateobj = new Data("ROTATEOBJ", []);

function drawslices()
{
    if (!photo.image ||
        !photo.image.complete ||
        photo.image.naturalHeight == 0)
        return;

    for (var n = 0; n < 1; n++)
    {
        var context = _4cnvctx;
        var rect = context.rect();
        if (rect.width == 1)
            continue;

        if (!context.timemain && context.lastime == context.timeobj.current())
            continue;
        else
            context.lastime = context.timeobj.current();

        if (!menuenabled() && !context.panning && context.timemain)
        {
            context.slidestop -= context.slidereduce;
            context.slidestop = Math.max(context.virtualspeed, context.slidestop);
            if (context.slidestop > 0)
            {
                if (rotateobj.enabled)
                {
                    rotateobj.rotate(1);
                    context.timeobj.set(rotateobj.getcurrent());
                }
                else
                {
                    context.timeobj.rotate(context.autodirect*context.slidestop);
                }
            }
            else
            {
                clearInterval(context.timemain);
                context.timemain = 0;
                rotateobj.enabled = 0;
            }
        }

        var stretch = stretchobj.getcurrent();
        context.virtualpinch = context.virtualwidth*stretch.getcurrent()/100;
        context.virtualeft = (context.virtualpinch-rect.width)/2-context.colwidth;
        var j = (context.colwidth/(context.colwidth+context.virtualwidth))*TIMEOBJ;
        var time = (context.timeobj.getcurrent()+j)/1000;
        var slicelst = context.sliceobj.data;
        var slice = slicelst[0];
        if (!slice)
            break;
        context.save();
        if (colorobj.enabled)
            context.clear();
        context.translate(-context.colwidth, 0);
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        var j = time+slice.time;
        var b = Math.tan(j*VIRTCONST);
        var bx = Math.berp(-1, 1, b) * context.virtualpinch - context.virtualeft;
        var extra = context.colwidth;
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
            var stretchwidth = bx2-bx+1;
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
                sn = stretchwidth;
            }

            if (bx >= rect.width+context.colwidth || bx2 < context.colwidth)
            {
                bx = bx2;
                continue;
            }

            slice.visible = 1;
            slice.strechwidth = stretchwidth;
            var wid = colorobj.enabled ? context.colwidth : stretchwidth;
            context.drawImage(slice.canvas, slice.x, 0, context.colwidth, rect.height,
              slice.bx, 0, wid, rect.height);
            bx = bx2;
        }

        var x = xn+sn;
        var w = x1-x;
        if (x+w > context.colwidth && x < rect.width+context.colwidth)
        {
            var slice = slicelst[0];
            slice.visible = 1;
            slice.strechwidth = w;
            var wid = colorobj.enabled ? context.colwidth : w;
            context.drawImage(slice.canvas, 0, 0, context.colwidth, rect.height,
                  x, 0, wid, rect.height);
        }

        context.restore();
        delete context.selectrect;
        delete context.moveprev;
        delete context.movenext;
        delete context.ignores;
        delete context.menuup;
        delete context.menuhome;
        delete context.menudown;
        delete context.thumbrect;
        delete context.stretchctrl;
        delete context.zoomctrl;
        delete context.slicectrl;
        delete context.speedctrl;
        delete context.progresscircle;
        delete context.timemainctrl;

        if (galleryobj.hidedisplay)
        {
            headcnvctx.clear();
            footcnvctx.clear();
        }
        else if (context.setcolumncomplete)
        {
            if (headobj.enabled)
                headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
            if (footobj.enabled)
                footobj.getcurrent().draw(footcnvctx, footcnvctx.rect(), 0);
            bodyobj.set(0)
            if (bodyobj.enabled)
            {
                bodyobj.set(bodyobj.enabled)
            }
            else if (!headobj.enabled && thumbobj.enabled)
            {
                thumbobj.getcurrent().draw(context, rect, 0, 0);
                bodyobj.set(1)
            }
            else
            {
                bodyobj.set(3)
            }

            bodyobj.getcurrent().draw(context, rect, 0, 0);
        }

        context.setcolumncomplete = 1;
    }

    var data = [_3cnvctx,  _5cnvctx, _6cnvctx, _7cnvctx, _8cnvctx, _9cnvctx, ];
    for (var n = 0; n < data.length; n++)
    {
        var context = data[n];
        if (!context.enabled)
            continue;
        if (!context.canvas.height)
            continue;
        var time = context.timeobj.getcurrent()/1000;
        if ((context.lastime.toFixed(8) == time.toFixed(8)))
            continue;
        else
            context.lastime = Number(time.toFixed(8));

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

        var slices =  context.sliceobj.data;
        var r = context.rect();
        var w = r.width;
        var h = r.height;
        context.fillStyle = MENUCOLOR;
        context.clear();
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.visibles = [];

        for (var m = 0; m < slices.length; ++m)
        {
            var slice = slices[m];
            slice.fitwidth = 0;
            slice.fitheight = 0;
        }

        for (var m = 0; m < slices.length; ++m)
        {
            var slice = slices[m];
            slice.time = time + (m*context.delayinterval);
            var e = (context.virtualheight-r.height)/2;
            var bos = Math.tan(slice.time *VIRTCONST);
            let y = Math.berp(-1, 1, bos) * context.virtualheight;
            y -= e;
            var x = w/2;
            var j = context.buttonheight;
            if (y < -j || y >= window.innerHeight+j)
                continue;
            context.visibles.push({slice, x, y, m});
        }

        for (var m = 0; m < context.visibles.length; ++m)
        {
            var j = context.visibles[m];
            j.slice.center = {x: j.x, y: j.y};
            j.slice.fitwidth = 0;
            j.slice.fitheight = 0;
            context.save();
            context.translate(j.x, j.y);
            context.draw(context, context.rect(), j.slice, j.m);
            context.restore();
        }

        var a = new CurrentVPanel(new Fill("white"), 90, 1);
        var w = context.canvas.width;
        a.draw(context, new rectangle(w-12,0,7,rect.height), context.timeobj, 0);
    }
}

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
let footcnv = document.getElementById("foot");
let footcnvctx = footcnv.getContext("2d", opts);

let contextlst = [_1cnvctx,_2cnvctx,_3cnvctx,_4cnvctx,_5cnvctx,_6cnvctx,_7cnvctx,_8cnvctx,_9cnvctx];
let canvaslst = [];
var eventlst =
[
    {name: "_1cnvctx", mouse: "DEFAULT", guide: "DEFAULT", thumb: "DEFAULT", tap: "DEFAULT", pan: "DEFAULT", swipe: "DEFAULT", draw: "DEFAULT", wheel: "DEFAULT", drop: "DEFAULT", key: "DEFAULT", press: "DEFAULT", pinch: "DEFAULT"},
    {name: "_2cnvctx", mouse: "MENU", guide: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", draw: "MENU", wheel: "MENU",  drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT"},
    {name: "_3cnvctx", mouse: "MENU", guide: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", draw: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT"},
    {name: "_4cnvctx", mouse: "BOSS", guide: "GUIDE", thumb: "BOSS",  tap: "BOSS", pan: "BOSS", swipe: "BOSS", draw: "BOSS", wheel: "BOSS", drop: "BOSS", key: "BOSS", press: "BOSS", pinch: "BOSS"},
    {name: "_5cnvctx", mouse: "MENU", guide: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", draw: "MENU", wheel:  "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT"},
    {name: "_6cnvctx", mouse: "MENU", guide: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", draw: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT"},
    {name: "_7cnvctx", mouse: "MENU", guide: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", draw: "EMENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT"},
    {name: "_8cnvctx", mouse: "MENU", guide: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", draw: "GMENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT"},
    {name: "_9cnvctx", mouse: "MENU", guide: "DEFAULT", thumb: "DEFAULT", tap: "MENU", pan: "MENU", swipe: "MENU", draw: "MENU", wheel: "MENU", drop: "DEFAULT", key: "MENU", press: "DEFAULT", pinch: "DEFAULT"},
];

function seteventspanel(panel)
{
    _1ham.panel = panel;
    _2ham.panel = panel;
    _3ham.panel = panel;
    _4ham.panel = panel;
    _5ham.panel = panel;
    _6ham.panel = panel;
    _7ham.panel = panel;
    _8ham.panel = panel;
    _9ham.panel = panel;
}

function setevents(context, obj)
{
    var k = pinchlst.findIndex(function (a) { return a.name == obj.pinch });
    k = pinchlst[k];
    context.pinch_ = k.pinch;
    context.pinchstart_ = k.pinchstart;
    context.pinchend_ = k.pinchend;

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

    var k = menulst.findIndex(function (a) {return a.name == obj.draw});
    k = menulst[k];
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
}


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

Math.berp = function (v0, v1, t) { return (t - v0) / (v1 - v0); };
Math.lerp = function (v0, v1, t) { return (1 - t) * v0 + t * v1; };

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

var Empty = function()
{
    this.draw = function (context, rect, user, time)
    {
    }
};

var MultiText = function (width, height, func)
{
    this.draw = function (context, rect, user, time)
    {
        rect.x = 20;
        rect.width -= 40;
        var lst = [];
        for (var n = 0; n < user.length; n++)
        {
            var str = user[n].clean();
            if (!str.length)
                continue;
            lst = lst.concat(wraptext(context, str, Math.min(640,rect.width)));
        }

        var len = Math.min(lst.length,Math.floor(rect.height/20));
        lst.length = len;
        rect.y = (rect.height-lst.length*20)/2
        rect.y -= rect.height/2
        rect.y += 10;
        for (var n = 0; n < lst.length; n++)
        {
            var lines = wraptext(context, lst[n], Math.min(640,rect.width));
            for (var m = 0; m < lines.length; m++)
            {
                var str = lines[m].clean();
                if (!str.length)
                    continue;
                var a = new Text("white", "center", "middle", 0, 0, 1);
                a.draw(context, rect, str, 0);
                rect.y += 20;
            }
        }
    };
};

var Centered = function (width, height, func)
{
    this.draw = function (context, rect, user, time)
    {
        var a = new Col([0,width,0],
            [
                0,
                new Row([headcnv.height?headcnv.height:-1,0,height,0,footcnv.height?footcnv.height:-1],
                [
                    0,
                    0,
                    func,
                    0,
                    0,
                ]),
                0,
            ]);
        a.draw(context, rect, user, time);
    };
};

var Fill = function (color)
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
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
		context.strokeStyle = "white";
		context.shadowColor = "black";

        var e = screenfull.isFullscreen?8:6;
        var j = 28;
        var k = 20;
        var r = new rectangle(rect.x+k,rect.y+j,rect.width,rect.height);
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
        x -= e;
        path.lineTo(x,y);
        context.stroke(path);

        var x = r.x+e*3;
        var y = r.y;
        var path = new Path2D();
        y += e*2;
        path.moveTo(x,y);
        y += e;
        path.lineTo(x,y);
        x -= e;
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

var ProgressCircle = function ()
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        var percent = (1-user.berp())*100;
        let centerX = rect.x + rect.width / 2;
        let centerY = rect.y + rect.height / 2;
        let radius = rect.height/2-16;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowColor = "black"
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.closePath();
        context.fillStyle = PROGRESSFILL;
        context.fill();

        let startAngle = 1.5 * Math.PI;
        let unitValue = (Math.PI - 0.5 * Math.PI) / 25;
        if (percent >= 0 && percent <= 25)
            endAngle = startAngle + (percent * unitValue);
        else if (percent > 25 && percent <= 50)
            endAngle = startAngle + (percent * unitValue);
        else if (percent > 50 && percent <= 75)
            endAngle = startAngle + (percent * unitValue);
        else if (percent > 75 && percent <= 100)
            endAngle = startAngle + (percent * unitValue);

        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, startAngle, endAngle, false);
        context.closePath();
        context.fillStyle = PROGRESSFALL;
        context.fill();
        context.restore();
    };
};

var Stroke = function (color,width)
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

var Plus = function (color)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.translate(rect.width/2-8,rect.height/2-6);
	    var w = rect.width
        var h = rect.height
        var x = rect.x;
        var y = rect.y;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
		context.fillStyle = color;
	    var path = new Path2D();
        x += 6;
        y -= 3;
		path.moveTo(x,y);
        x += 5;
		path.lineTo(x,y);
        y += 22;
		path.lineTo(x,y);
        x += -5;
		path.lineTo(x,y);
        y += 22;
		path.lineTo(x,y);
		context.fill(path);

        var x = rect.x-3;
        var y = rect.y+5;
		path.moveTo(x,y);
        x += 22;
		path.lineTo(x,y);
        y += 5;
		path.lineTo(x,y);
        x += -22;
		path.lineTo(x,y);
        y += 5;
		path.lineTo(x,y);
		context.fill(path);

        context.restore();
    };
};

var Minus = function (color)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.translate(rect.width/2-8,rect.height/2-5);
	    var w = rect.width
        var h = rect.height
        var x = rect.x;
        var y = rect.y;
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
	    var path = new Path2D();
        var x = rect.x-3;
        var y = rect.y+5;
		path.moveTo(x,y);
        x += 21;
		path.lineTo(x,y);
        y += 5;
		path.lineTo(x,y);
        x += -21;
		path.lineTo(x,y);
        y += 5;
		path.lineTo(x,y);
		context.fillStyle = color;
		context.fill(path);

        context.restore();
    };
};

var Arrow = function (color, degrees)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
	    var w = rect.width
        var h = rect.height
        var x = rect.x
        var y = rect.y
        var k = degrees == 270 ? 0 : 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.translate(x+w/2-k, y+h/2);
        context.rotate(degrees*Math.PI/180.0);
        context.translate(-x-w/2, -y-h/2);
	    var path = new Path2D();
		path.moveTo(rect.x+rect.width/2,rect.y);
		path.lineTo(rect.x+rect.width,rect.y+rect.height-3);
		path.lineTo(rect.x,rect.y+rect.height-3);
		context.fillStyle = color;
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

addressobj.full = function ()
{
    var zoom = zoomobj.getcurrent();
    var out = url.origin;
    out += url.pathname;
    var p = url.path +"."+galleryobj.current().pad(4);
    if (url.searchParams.has("unsplash.user"))
        out += "?unsplash.user="+p;
    else if (url.searchParams.has("unsplash.collection"))
        out += "?unsplash.collection="+p;
    else if (url.searchParams.has("pexels.curated"))
        out += "?pexels.curated="+galleryobj.current().pad(4);
    else
        out += "?p="+p;

    out +=
        "&h="+headobj.enabled+
        "&r="+(100*rowobj.berp()).toFixed()+
        "&t="+_4cnvctx.timeobj.current().toFixed(4);

    if (url.errors)
        out += "$errors=" + url.errors;

    return out;
};

addressobj.update = function()
{
    try
    {
        clearTimeout(globalobj.addresstime);
        globalobj.addresstime = setTimeout(function()
        {
            history.replaceState(null, document.title, addressobj.full());
        }, 100);
    }
    catch(e)
    {

    }
}

history.pushState(null, null, document.URL);

CanvasRenderingContext2D.prototype.moveup = function()
{
    var k = rowobj.length()/channelobj.length()
    rowobj.add(-k);
}

CanvasRenderingContext2D.prototype.movedown = function()
{
    var k = rowobj.length()/channelobj.length()
    rowobj.add(k);
}

CanvasRenderingContext2D.prototype.movepage = function(j)
{
    if (globalobj.promptedfile)
        return;
    if (!_4cnvctx.setcolumncomplete)
        return;
    var e = galleryobj.current();
    galleryobj.rotate(j);
    var k = galleryobj.getcurrent();
    galleryobj.set(e);

    if (_4cnvctx.movingpage || !k.loaded || galleryobj.length() == 1)
    {
        _4cnvctx.movingpage = 0;
        this.refresh();
        return;
    }

    _4cnvctx.movingpage = j;
    this.refresh();
    clearTimeout(globalobj.move);
    globalobj.move = setTimeout(function()
    {
        delete _4cnvctx.thumbcanvas;
        delete photo.image;
        _4cnvctx.setcolumncomplete = 0;

        galleryobj.rotate(j);
        headobj.getcurrent().draw(headcnvctx, headcnvctx.rect(), 0);
        contextobj.reset();
        addressobj.update();
        setTimeout(function(){ _4cnvctx.movingpage = 0; _4cnvctx.refresh(); }, 200);
    }, 500);
}

CanvasRenderingContext2D.prototype.hide = function ()
{
    if (this.canvas.height == 0 && !this.enable)
        return;
    this.canvas.height = 0;
    this.enabled = 0;
};

CanvasRenderingContext2D.prototype.tab = function ()
{
    var context = this;
    context.slidestart = context.timeobj.current();
    context.slidestop = (context.timeobj.length()/context.virtualwidth)*SLIDETOP;
    context.slidereduce = context.slidestop/SLIDEFACTOR;
    if (rotateobj.enabled)
        context.slidereduce = context.slidestop/REDUCEFACTOR;

    clearInterval(context.timemain);
    context.timemain = setInterval(function () { drawslices() }, timemain.getcurrent());
}

CanvasRenderingContext2D.prototype.refresh = function ()
{
    this.lastime = -0.0000000000101010101;
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
		if (typeof (ham.panel.pinch) == "function")
			ham.panel.pinch(context, evt.scale);

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

    ham.element.addEventListener("auxclick", function (evt)
    {
   	    evt.preventDefault();
        var x = evt.offsetX;
        var y = evt.offsetY;
        if (typeof (ham.panel.auxclick) == "function")
            ham.panel.auxclick(context, new rectangle(0, 0, ham.element.width, ham.element.height), x, y);
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
        var xj = parseInt(canvas.style.left, 10);
        var x = evt.offsetX;
        var y = evt.offsetY;
        if (typeof (ham.panel.mousemove) !== "function")
            return;
        ham.panel.mousemove(context, context.rect(), x, y);
    });

    ham.element.addEventListener("wheel", function (evt)
    {
        var xj = parseInt(canvas.style.left, 10);
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
		ham.context = 0;
        evt.preventDefault();
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
var footham = makehammer(footcnvctx,0.5,15);
_4ham.get('pinch').set({ enable: true });

var wheelst =
[
{
    name: "DEFAULT",
    up: function (context, ctrl, shift, alt) { },
 	down: function (context, ctrl, shift, alt) { },
},
{
    name: "MENU",
    up: function (context, ctrl, shift, alt)
    {
        var k = (8/context.virtualheight)*context.timeobj.length();
        context.timeobj.rotate(-k);
        context.refresh()
    },
 	down: function (context, ctrl, shift, alt)
    {
        var k = (8/context.virtualheight)*context.timeobj.length();
        context.timeobj.rotate(k);
        context.refresh()
    },
},
{
    name: "BOSS",
    up: function (context, x, y, ctrl, shift, alt)
    {
        if ((context.stretchctrl && context.stretchctrl.hitest(x,y)) || alt)
        {
            var stretch = stretchobj.getcurrent()
            stretch.add(stretch.length()*0.02);
            contextobj.reset();
        }
        else if (shift)
        {
            rowobj.add(-rowobj.length()*0.05);
            contextobj.reset();
        }
        else if (context.thumbrect && context.thumbrect.hitest(x,y))
        {
            var obj = heightobj.getcurrent();
            var h = obj.getcurrent()*window.innerHeight;
            delete context.thumbcanvas;
            obj.add(5);
            context.refresh();
        }
        else
        {
            _4cnvctx.timeobj.rotate(TIMEOBJ*0.01);
            context.refresh();
        }
	},
 	down: function (context, x, y, ctrl, shift, alt)
    {
        if ((context.stretchctrl && context.stretchctrl.hitest(x,y)) || alt)
        {
            var stretch = stretchobj.getcurrent()
            stretch.add(-stretch.length()*0.02);
            contextobj.reset();
        }
        else if (shift)
        {
            rowobj.add(rowobj.length()*0.05);
            contextobj.reset();
        }
        else if (context.thumbrect && context.thumbrect.hitest(x,y))
        {
            var obj = heightobj.getcurrent();
            var h = obj.getcurrent()*window.innerHeight;
            if (h-5 <= ALIEXTENT)
                return;
            delete context.thumbcanvas;
            obj.add(-5);
            context.refresh();
        }
        else
        {
            _4cnvctx.timeobj.rotate(-TIMEOBJ*0.01);
            context.refresh();
        }
	},
},
];

var pinchlst =
[
{
    name: "DEFAULT",
    pinch: function (context, scale) { },
    pinchend: function (context) { },
    pinchstart: function (context, rect, x, y) { },
},
{
    name: "BOSS",
    pinch: function (context, scale)
    {
        var obj = context.obj;
        var data = obj.data;
        var k = Math.clamp(data[0], data[data.length-1], scale*context.savepinch);
        var j = Math.berp(data[0], data[data.length-1], k);
        var e = Math.lerp(0,obj.length(),j)/obj.length();

        if (context.isthumbrect)
        {
            context.pinching = 1;
            delete context.thumbcanvas;
            var f = Math.floor(obj.length()*e);
            obj.set(f);
            context.refresh();
        }
        else
        {
            var f = Math.floor(obj.length()*e);
            scale = parseFloat(scale).toFixed(2);
            if (scale >= 1 && obj.current() < (obj.length()*0.15))
            {
                obj.set(f+2);
                context.savepinch = obj.getcurrent();
            }
            else if (scale <= 1 && obj.current() < (obj.length()*0.15))
            {
                obj.set(f-2);
                context.savepinch = obj.getcurrent();
            }
            else
            {
                obj.set(f);
            }

            contextobj.reset();
        }
    },
    pinchstart: function (context, rect, x, y)
    {
        clearInterval(context.timemain);
        context.timemain = 0;
        rotateobj.enabled = 0;
        context.clearpoints();
        context.isthumbrect = context.thumbrect && context.thumbrect.expand &&
            context.thumbrect.expand(40,40).hitest(x,y);
        if (context.isthumbrect)
            context.obj = heightobj.getcurrent();
        else
            context.obj = zoomobj.getcurrent();
        context.savepinch = context.obj.getcurrent()
    },
    pinchend: function (context)
    {
        clearTimeout(context.pinchtime);
        context.pinchtime = setTimeout(function()
        {
            context.isthumbrect = 0;
            context.pinching = 0;
            context.refresh();
            addressobj.update();
        }, 40);
    },
},
];

var rowobj = new Data("ROW", window.innerHeight);
rowobj.set(Math.floor(0.5*window.innerHeight));

var pretchobj = new Data("PORTSTRETCH", 100);
var letchobj = new Data("LANDSTRETCH", 100);
var stretchobj = new Data("STRETCH", [pretchobj,letchobj]);

var poomobj = new Data("PORTZOOM", 100);
var loomobj = new Data("LANDZOOM", 100);
var zoomobj = new Data("ZOOM", [poomobj,loomobj]);

var traitobj = new Data("TRAIT", 100);
var scapeobj = new Data("SCAPE", 100);
var heightobj = new Data("HEIGHT", [traitobj,scapeobj]);

var pinchobj = new Data("PINCH", [zoomobj,stretchobj]);

function promptFile()
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

function dropfiles(files)
{
    if (!files || !files.length)
        return;
    delete _4cnvctx.thumbcanvas;
    delete photo.image;
    colorobj.enabled = 0;
    _4cnvctx.tapping = 0;
    _4cnvctx.isthumbrect = 0;
    thumbobj.enabled = 1;
    headobj.enabled = 0;
    footobj.enabled = 0;
    pageresize();
    _4cnvctx.setcolumncomplete = 0;
    globalobj.promptedfile = URL.createObjectURL(files[0]);
    contextobj.reset();
}

var droplst =
[
{
    name: "DEFAULT",
    drop: function (context, evt) { },
},
{
    name: "BOSS",
    drop: function (context, evt) { dropfiles(evt.dataTransfer.files); },
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
 	leftright: function (context, rect, x, y, type) { },
	pan: function (context, rect, x, y, type)
    {
        if (context.rightside)
        {
            var obj = context.timeobj;
            var m = y/rect.height;
            m = Math.floor((1-m)*obj.length());
            obj.set(m);
            context.refresh()
        }
        else
        {
            var jvalue = ((context.timeobj.length()/context.virtualheight)*(context.starty-y));
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
        context.rightside = x > rect.width-40;
        context.starty = y;
        context.startt = context.timeobj.current();
    },
	panend: function (context, rect, x, y)
    {
        delete context.starty;
        delete context.startt;
    }
},
{
    name: "BOSS",
    updown: function (context, rect, x, y, type) { },
 	leftright: function (context, rect, x, y, type) { },
	pan: function (context, rect, x, y, type)
	{
        if ( context.pinching )
             return;

        if (context.pressed)
        {
            var positx = positxobj.getcurrent();
            var posity = posityobj.getcurrent();
            positx.set((x/rect.width)*100);
            posity.set((y/rect.height)*100);
            context.refresh();
        }
        else if (context.isstretchctrl)
        {
            pinchobj.set(1)
            var stretch = stretchobj.getcurrent()
            var m = (y - context.stretchctrl.y)/context.stretchctrl.height;
            m = Math.floor((1-m)*stretch.length());
            if (window.landscape())
            {
                m = (x - context.stretchctrl.x)/context.stretchctrl.width;
                m = Math.floor(m*stretch.length());
            }

            stretch.set(m);
            context.refresh();
        }
        else if (context.isthumbrect)
        {
            var pt = context.getweightedpoint(x,y);
            x = pt?pt.x:x;
            y = pt?pt.y:y;
            var k = guideobj.getcurrent();
            k.pan(context, rect, x, y, type);
        }
        else if (context.pantype != 2 && (type == "panleft" || type == "panright"))
        {
            context.pantype = 1
            context.autodirect = (type == "panleft")?-1:1;
            var len = context.timeobj.length();
            var diff = context.startx-x;
            var jvalue = ((len/context.virtualwidth)*speedxobj.getcurrent())*diff;
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
        else if (context.pantype != 1 && (type == "panup" || type == "pandown"))
        {
            context.pantype = 2
            var zoom = zoomobj.getcurrent()
            if (Number(zoom.getcurrent()))
            {
                var h = (rect.height*(1-zoom.getcurrent()/100))*2;
                y = ((y/rect.height)*speedyobj.getcurrent())*h;
                var k = panvert(rowobj, h-y);
                if (k == -1)
                    return;
                if (k == rowobj.anchor())
                    return;
                rowobj.set(k);
                contextobj.reset();
            }
        }
    },
	panstart: function (context, rect, x, y)
	{
        rotateobj.enabled = 0;
        clearInterval(footcnvctx.timefooter);
        context.startx = x;
        context.starty = y;
        context.pantype = 0;
        context.startt = context.timeobj.current();
        context.isstretchctrl = context.stretchctrl && context.stretchctrl.hitest(x,y);
        context.istimemainctrl = context.timemainctrl && context.timemainctrl.hitest(x,y);
        context.isspeedctrl = context.speedctrl && context.speedctrl.hitest(x,y);
        context.iszoomctrl = context.zoomctrl && context.zoomctrl.hitest(x,y);
        context.isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
        var zoom = zoomobj.getcurrent()
        if (context.isthumbrect)
            context.panning = 1;
        context.clearpoints();
    },
    panend: function (context, rect, x, y)
	{
        setTimeout(function()
        {
            context.pressed = 0;
            context.panning = 0;
            context.isthumbrect = 0;
            var zoom = zoomobj.getcurrent()
            delete context.isthumbrect;
            delete context.startx;
            delete context.starty;
            delete context.startt;
            delete zoom.offset;
            delete rowobj.offset;
            context.refresh();
            addressobj.update();
        }, 40);
    }
},
];

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

var mouseobj = new Data("MOUSE", mouselst);

var presslst =
[
{
    name: "DEFAULT",
    pressup: function (context, rect, x, y) { },
    press: function (context, rect, x, y) { }
},
{
    name: "BOSS",
    pressup: function (context, rect, x, y)
    {
        context.isthumbrect = 0;
        context.pressed = 0;
        context.refresh();
    },
    press: function (context, rect, x, y)
    {
        var isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
        if (isthumbrect)
            context.pressed = 1;
        else
            galleryobj.hidedisplay = galleryobj.hidedisplay?0:1;
        context.refresh();
    }
},
];

var swipelst =
[
{
    name: "DEFAULT",
    swipeleftright: function (context, rect, x, y, evt) {},
    swipeupdown: function (context, rect, x, y, evt) {},
},
{
    name: "MENU",
    swipeleftright: function (context, rect, x, y, evt) {},
    swipeupdown: function (context, rect, x, y, evt)
    {
        context.slideshow = (context.timeobj.length()/context.virtualheight)*context.rvalue*6;
        context.swipetype = evt.type;
        context.slidereduce = context.slideshow/15;
        clearInterval(context.timemain);
        context.timemain = setInterval(function () { context.refresh(); }, globalobj.timemain);
    },
},
{
    name: "BOSS",
    swipeleftright: function (context, rect, x, y, evt)
    {
        var isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
        if (isthumbrect)
            return;
        setTimeout(function()
        {
            context.autodirect = evt.type == "swipeleft"?-1:1;
            clearInterval(context.timemain);
            context.timemain = 0;
            rotateobj.enabled = 0;
            context.tab();
        }, SWIPETIME);
    },

    swipeupdown: function (context, rect, x, y, evt)
    {
        var isthumbrect = context.thumbrect && context.thumbrect.hitest(x,y);
        if (isthumbrect)
            return;
        clearTimeout(context.swipeupdowntime)
        context.swipeupdowntime = setTimeout(function()
        {
            if (evt.type == "swipedown")
                context.moveup();
            else
                context.movedown();
            contextobj.reset();
        }, SWIPETIME);
    },
},
];

var keylst =
[
{
	name: "DEFAULT",
	keyup: function (evt) { },
	keydown: function (evt) { }
},
{
	name: "MENU",
	keyup: function (evt) { },
	keydown: function (evt)
	{
		var context =
            _3cnvctx.enabled ? _3cnvctx :
            _5cnvctx.enabled ? _5cnvctx :
            _6cnvctx.enabled ? _6cnvctx :
            _7cnvctx.enabled ? _7cnvctx :
			_8cnvctx.enabled ? _8cnvctx :
            _9cnvctx.enabled ? _9cnvctx :
            _4cnvctx;

		if (evt.key == "ArrowUp" || evt.key == "j")
		{
            var k = (20/context.virtualheight)*context.timeobj.length();
            context.timeobj.rotate(k);
            context.refresh()
        }
        else if (evt.key == "ArrowDown" || evt.key == "k")
		{
            var k = (20/context.virtualheight)*context.timeobj.length();
            context.timeobj.rotate(-k);
            context.refresh()
        }
        else if (evt.key == "Pageup" || evt.key == "o")
        {
            var k = (60/context.virtualheight)*context.timeobj.length();
            context.timeobj.rotate(-k);
            context.refresh()
        }
        else if (evt.key == "Pagedown" || evt.key == "p")
        {
            var k = (60/context.virtualheight)*context.timeobj.length();
            context.timeobj.rotate(k);
            context.refresh()
        }
 	}
},
{
	name: "BOSS",
	keyup: function (evt)
	{
		var context = _4cnvctx;
        globalobj.ctrlhit = 0;
        globalobj.shifthit = 0;
        context.refresh();
	},
	keydown: function (evt)
	{
		var context = _4cnvctx;
		var rect = context.rect();
        if (evt.ctrlKey)
            globalobj.ctrlhit = 1;
        if (evt.shiftKey)
            globalobj.shifthit = 1;

        context.refresh();

        if (evt.key != " " && isFinite(evt.key))
        {
            context.refresh();
            evt.preventDefault();
            return false;
        }
        else if (evt.key == " ")
        {
            if (screenfull.isEnabled)
            {
                if (screenfull.isFullscreen)
                    screenfull.exit();
                else
                    screenfull.request();
            }

            pageresize();
            context.refresh();
            evt.preventDefault();
        }
        else if (evt.key == "Tab")
        {
            evt.preventDefault();
            rotateobj.enabled = 0;
            context.autodirect = evt.shiftKey ? 1 : -1;
            context.tab();
        }
        else if (evt.key == "ArrowLeft" || evt.key == "h")
        {
            evt.preventDefault();
            rotateobj.enabled = 0;
            context.autodirect = 1;
            context.tab();
        }
        else if (evt.key == "ArrowRight" || evt.key == "l")
        {
            context.autodirect = -1;
            rotateobj.enabled = 0;
            evt.preventDefault();
            context.tab();
        }
        else if (evt.key == "Pageup" || evt.key == "ArrowUp" || evt.key == "k")
        {
            if (!rowobj.current())
                return;
            context.moveup();
            contextobj.reset();
            evt.preventDefault();
        }
        else if (evt.key == "Pageup" || evt.key == "ArrowDown" || evt.key == "j" )
        {
            if (rowobj.current() >= rowobj.length()-1)
                return;
            context.movedown();
            contextobj.reset();
            evt.preventDefault();
        }
        else if (evt.key == "[" || evt.key == "-")
        {
            var zoom = zoomobj.getcurrent();
            zoom.add(-1);
            contextobj.reset()
        }
        else if (evt.key == "]" || evt.key == "+")
        {
            var zoom = zoomobj.getcurrent();
            zoom.add(1);
            contextobj.reset()
        }
        else if (evt.key == "Enter")
        {
            context.movepage(evt.shiftKey?-1:1);
            evt.preventDefault();
        }

        addressobj.update();
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
        clearInterval(footcnvctx.timefooter);
        context.pressed = 0;
        if (context.moveprev && context.moveprev.hitest(x,y))
        {
            _4cnvctx.movepage(-1);
        }
        else if (context.movenext && context.movenext.hitest(x,y))
        {
            _4cnvctx.movepage(1);
        }
        else if (context.progresscircle && context.progresscircle.hitest(x,y))
        {
            if (_4cnvctx.timemain)
            {
                clearInterval(_4cnvctx.timemain);
                _4cnvctx.timemain = 0;
                rotateobj.enabled = 0;
            }
            else
            {
                rotateobj.enabled = 1;
                _4cnvctx.tab();
            }

            _4cnvctx.refresh();
        }
        else if (context.stretchctrl && context.stretchctrl.hitest(x,y))
        {
            pinchobj.set(1);
            var stretch = stretchobj.getcurrent();
            var a = (y-context.stretchctrl.y)/context.stretchctrl.height;
            var b = Math.floor(stretch.length()*(1-a));
            if (window.landscape())
            {
                var a = (x-context.stretchctrl.x)/context.stretchctrl.width;
                var b = Math.floor(stretch.length()*a);
            }

            stretch.set(b);
            context.refresh();
        }
        else if (context.menudown && context.menudown.hitest(x,y))
        {
            var context = _8cnvctx;
            context.slideshow = (context.timeobj.length()/context.virtualheight)*context.rvalue*18;
            context.swipetype = "swipedown";
            context.slidereduce = context.slideshow/15;
            clearInterval(context.timemain);
            context.timemain = setInterval(function () { context.refresh(); }, globalobj.timemain);
            context.refresh();
            var context = _4cnvctx;
            context.tapindex = 1;
            context.refresh();
            clearInterval(globalobj.tapthumb);
            globalobj.tapthumb = setTimeout(function()
            {
                context.tapindex = 0;
                context.refresh();
            }, 400)
        }
        else if (context.menuup && context.menuup.hitest(x,y))
        {
            var context = _8cnvctx;
            context.slideshow = (context.timeobj.length()/context.virtualheight)*context.rvalue*18;
            context.swipetype = "swipeup";
            context.slidereduce = context.slideshow/15;
            clearInterval(context.timemain);
            context.timemain = setInterval(function () { context.refresh(); }, globalobj.timemain);
            context.refresh();
            var context = _4cnvctx;
            context.tapindex = 3;
            context.refresh();
            clearInterval(globalobj.tapthumb);
            globalobj.tapthumb = setTimeout(function()
            {
                context.tapindex = 0;
                context.refresh();
            }, 400)
        }
        else if (context.menuhome && context.menuhome.hitest(x,y))
        {
            var obj = _8cnvctx.timeobj;
            var j = obj.berp() == 0 ? (1-galleryobj.berp())*TIMEOBJ : 0;
            obj.set(j);
            context.tapindex = 2;
            context.refresh();
            clearInterval(globalobj.tapthumb);
            globalobj.tapthumb = setTimeout(function()
            {
                _4cnvctx.tapindex = 0;
                _4cnvctx.refresh();
            }, 400)
        }
        else if (!headobj.enabled && context.thumbrect && context.thumbrect.hitest(x,y))
        {
            rotateobj.enabled = 0;
            clearInterval(context.timemain);
            context.timemain = setInterval(function () { drawslices() }, timemain.getcurrent());

            if (context.selectrect && context.selectrect.hitest(x,y)>=0)
            {
                context.tapping = context.tapping?0:1;
                context.refresh();
            }
            else
            {
                menuhide();
                context.hithumb(x,y);
                var zoom = zoomobj.getcurrent()
                var b = !Number(zoom.getcurrent()/100) && !zoom.current()
                if (!b)
                    contextobj.reset()
                context.tapping = 1;
                context.refresh();
            }
        }
        else if (context.ignores && context.ignores.hitest(x,y)>=0)
        {
        }
        else
        {
            if (menuenabled())
            {
                menuhide();
            }
            else if (bodyobj.enabled)
            {
                colorobj.enabled = 0;
                bodyobj.enabled = 0;
            }
            else
            {
                colorobj.enabled = 0;
                context.tapping = 0;
                context.isthumbrect = 0;
                thumbobj.enabled = 1;
                var h = galleryobj.hidedisplay;
                galleryobj.hidedisplay = 0;
                if (!h)
                {
                    headobj.enabled = headobj.enabled?0:1;
                    footobj.enabled = headobj.enabled;
                }

                pageresize();
            }

            context.refresh();
        }

        addressobj.update();
    }
},
{
    name: "MENU",
    tap: function (context, rect, x, y)
    {
		var k = getbuttonfrompoint(context, x, y);
		if (k == -1)
            return;

		var slice = context.sliceobj.data[k];
		slice.tap = 1;
        context.refresh();
        setTimeout(function ()
        {
            slice.func(k);
            slice.tap = 0;
            context.refresh();
        }, JULIETIME*5);
    },
},
];

ico = {};

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
{
    name: "BOSS",
    draw: function (context, rect, user, time)
    {
        rect = rect.shrink(THUMBORDER*2,THUMBORDER*2);
        var he = heightobj.getcurrent();
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

        var positx = positxobj.getcurrent();
        var posity = posityobj.getcurrent();
        var x = Math.floor(Math.nub(positx.getcurrent(), positx.length(), w, rect.width))+THUMBORDER*2;
        var y = Math.floor(Math.nub(posity.getcurrent(), posity.length(), h, rect.height))+THUMBORDER*2;

        context.thumbrect = new rectangle(x,y,w,h);
        context.save();
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;

        var blackfill = new Fill(THUMBFILL);

        if ((context.isthumbrect && jp) || context.tapping || context.pressed || context.pinching)
        {
            blackfill.draw(context, context.thumbrect, 0, 0);
            guideobj.getcurrent().draw(context, context.thumbrect, 0, 0);
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

            context.globalAlpha = alphaobj.berp();
            context.drawImage(context.thumbcanvas, x, y, w, h);
            context.globalAlpha = 1.0;
        }

        var r = new rectangle(x,y,w,h);
        var whitestroke = new Stroke(THUMBSTROKE,THUMBORDER);
        whitestroke.draw(context, r, 0, 0);
        var region = new Path2D();
        region.rect(x,y,w,h);
        context.clip(region);

        var ww = Math.max(30,(rect.width/context.virtualwidth)*w);
        var stretch = stretchobj.getcurrent();
        if (stretch < 50)
            stretch = (50-stretch.getcurrent())/100;
        else
            stretch = (stretch.getcurrent()-50)/100;
        stretch = 1-stretch;
        ww *= stretch;

        var b = Math.berp(0,photo.image.height,context.imageheight);
        var hh = Math.lerp(0,h,b);
        var b = Math.berp(0,photo.image.height,context.nuby);
        var yy = y+Math.lerp(0,h,b);
        var jj = context.timeobj.berp();
        var bb = w*(1-jj);
        var xx = x+bb-ww/2;
        context.lineWidth = THUMBORDER/2;
        var r = new rectangle(xx,yy,ww,hh);
        context.selectrect = []
        context.selectrect.push(r);
        blackfill.draw(context, r, 0, 0);
        var whitestroke = new Stroke(THUMBSTROKE,THUMBORDER);
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

        context.restore();
    },
},
];

var thumbobj = new Data("THUMB", thumblst);
thumbobj.enabled = 1;

var alphaobj = new Data("ALPHA", 100);
alphaobj.set(100)

var getbuttonfrompoint = function (context, x, y)
{
	var lst = context.sliceobj.data;

	var k;
    for (k = 0; k < lst.length; k++)
    {
		var hit = lst[k];
		if (!hit.fitwidth || !hit.fitheight)
			continue;
		var w = hit.fitwidth;
		var h = hit.fitheight + 18*2;
		var x1 = hit.center.x - w / 2;
		var y1 = hit.center.y - h / 2;
		var x2 = x1 + w;
		var y2 = y1 + h;
		if (x >= x1 && x < x2 &&
			y >= y1 && y < y2)
			break;
    }

	return k<lst.length?k:-1;
}

var menulst =
[
{
    name: "DEFAULT",
    draw: function (context, rect, user, time){}
},
{
    name: "EMENU",
    draw: function (context, rect, user, time)
    {
        context.save();
        rect.height = context.buttonheight;
        rect.width -= 40;
        context.translate(-rect.width/2, -rect.height/2);
        user.fitwidth = rect.width;
        user.fitheight = rect.height;
        context.font = "0.9rem Archivo Black";
        var clr = SCROLLNAB;
        var str = user.title;
        if (user.tap)
            clr = MENUTAP;

        var a = new Layer(
        [
            new Expand(new Rounded(clr, 2, "white", 8, 8), 0, 20),
            new MultiText()
        ]);

        var lst = user.line.split("\n");
        a.draw(context, rect, lst, time);
        context.restore();
    }
},
{
    name: "GMENU",
    draw: function (context, rect, user, time)
    {
        context.save();
        rect.height = context.buttonheight;
        rect.width -= 40;
        context.translate(-rect.width/2, -rect.height/2);
        user.fitwidth = rect.width;
        user.fitheight = rect.height;
        context.font = "0.9rem Archivo Black";
        var clr = SCROLLNAB;

        if (user.tap)
            clr = MENUTAP;
        else if (time == galleryobj.current())
            clr = MENUSELECT;

        var a = new Layer(
        [
            new Expand(new Rounded(clr, 2, "white", 8, 8), 0, 25),
            new MultiText(),
        ]);

        if (!user.lst)
        {
            var lst = [];
            let keys = Object.keys(user);
            for (var n = 0; n < keys.length; ++n)
            {
                var key = keys[n];
                var value = user[key]
                if (value && value.length && typeof value === 'string')
                {
                    if (value.substr(0,4).toLowerCase() != "http")
                        lst.push(value);
                }
            }

            user.lst = lst;
        }

        a.draw(context, rect, user.lst, 0);
        context.restore();
    }
},
{
    name: "MENU",
    draw: function (context, rect, user, time)
    {
        context.save();
        rect.height = context.buttonheight;
        rect.width -= 40;
        context.translate(-rect.width/2, -rect.height/2);
        user.fitwidth = rect.width;
        user.fitheight = rect.height;
        context.font = "0.9rem Archivo Black";
        var clr = SCROLLNAB;
        var str = user.title;

        if (user.tap)
        {
            clr = MENUTAP;
        }
        else if (user.path == "PROJECT")
        {
            if (time == galleryobj.current())
                clr = MENUSELECT;
        }
        else if (user.path == "FULLPANEL")
        {
            if (screenfull.isFullscreen)
                clr = MENUSELECT;
        }

        var a = new Layer(
        [
            new Expand(new Rounded(clr, 2, "white", 8, 8), 0, 6),
            new Shrink(new Text("white", "center", "middle",0, 0, 1),20,0),
        ]);

        a.draw(context, rect, user.title, time);
        context.restore();
    }
},
{
    name: "BOSS",
    draw: function (unused, rect, user, time)
    {
	}
},
];

function resetcanvas()
{
    if (!photo.image.height)
        return;

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

    var canvas = _4cnv;
    var context = _4cnvctx;
    context.show(0,0,window.innerWidth,window.innerHeight);

    var zoomax = 92.5;
    var n = 0;
    for (; n < zoomax; ++n)
    {
        var zoom = (100-n)/100;
        var height = photo.image.height*zoom;
        var aspect = photo.image.width/height;
        var width = context.canvas.height * aspect;
        if (width/window.innerWidth > 1.4)
            break;
    }

    var zoom = zoomobj.getcurrent()
    zoom.split(zoom.current(), `${n}-${zoomax}`, poomobj.length());
    var z = zoom.getcurrent();
    var zoom = (100-z)/100;
    context.imageheight = photo.image.height*zoom;
    context.virtualheight = context.canvas.height;
    var imageaspect = photo.image.width/context.imageheight;
    context.virtualwidth = context.canvas.height * imageaspect;
    context.virtualfactor = context.virtualwidth/window.innerWidth;
    context.virtualaspect = context.virtualwidth / context.canvas.height;
    context.virtualextent = context.virtualwidth.toFixed(0) + "x" + context.canvas.height;
    context.virtualsize = ((context.virtualwidth * context.canvas.height)/1000000).toFixed(1) + "MP";
    var y = Math.clamp(0,context.canvas.height-1,context.canvas.height*rowobj.berp());
    context.nuby = Math.nub(y, context.canvas.height, context.imageheight, photo.image.height);

    var speed = Math.max(0.1,speedobj.getcurrent()/10);
    context.virtualspeed = FIREFOX?0:TIMEOBJ/context.virtualwidth/speed;
    var rotatelst = [];
    var k = Math.floor(TIMEMID*0.8)
    var j = Math.floor(TIMEMID*1.2)
    for (var n = k; n < j; n+=context.virtualspeed)
        rotatelst.push(n);
    for (var n = j; n > k; n-=context.virtualspeed)
        rotatelst.push(n);
    rotateobj.data = rotatelst;

    var f = 3;
    if (context.virtualfactor < 1.25)
        f = 12;
    else if (context.virtualfactor < 1.75)
        f = 9;
    else if (context.virtualfactor < 2.25)
        f = 6;

    let slicelst = [];
    for (let n = 499; n >= 1; n=n-1)
        slicelst.push({slices: n*3, delay: SLICERADIUS/n});
    var slicewidth = context.virtualwidth/f;

    var j = 0;
    for (; j < slicelst.length; ++j)
    {
        var k = slicelst[j];
        var fw = context.virtualwidth / k.slices;
        if (fw >= slicewidth)
            break;
    }

    var canvaslen = SAFARI?Math.ceil(context.virtualwidth/MAXVIRTUAL):1;
    var e = slicelst[j-1];
    var delay = e.delay;
    var slices = Math.ceil(e.slices/canvaslen);
    context.delayinterval = delay/100000;
    context.delay = e;
    var gwidth = photo.image.width/canvaslen;
    context.bwidth = context.virtualwidth/canvaslen;
    context.colwidth = context.bwidth/slices;
    var slice = 0;
    context.sliceobj.data = []

    var j = 0;
    for (var n = 0; n < canvaslen; ++n)
    {
        if (!canvaslst[n])
        {
            var cnv = document.createElement("canvas");
            canvaslst[n] = cnv;
        }

        var cnv = canvaslst[n];
        if (cnv.height != context.canvas.height)
            cnv.height = context.canvas.height;
        if (cnv.width != context.bwidth)
            cnv.width = context.bwidth;

        var ctx = cnv.getContext('2d');
        ctx.drawImage(photo.image,
            n*gwidth, context.nuby, gwidth, context.imageheight,
            0, 0, context.bwidth, cnv.height);

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
            j += context.delayinterval;
        }
    }

    context.refresh();
}

var templatelst =
[
{
    name: "EXTRATALL",
    init: function ()
    {
        positxpobj.set(50);
        positypobj.set(90);
        positxlobj.set(50);
        positylobj.set(90);
        loomobj.split(50, "90-95", loomobj.length());
        poomobj.split(50, "75-90", poomobj.length());
        traitobj.split(40, "0.1-1.0", traitobj.length());
        scapeobj.split(70, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(50, "90-95", loomobj.length());
        poomobj.split(50, "75-90", poomobj.length());
    }
},
{
    name: "TALL",
    init: function ()
    {
        positxpobj.set(50);
        positypobj.set(90);
        positxlobj.set(50);
        positylobj.set(90);
        traitobj.split(40, "0.1-1.0", traitobj.length());
        scapeobj.split(70, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(50, "90-95", loomobj.length());
        poomobj.split(50, "75-90", poomobj.length());
    }
},
{
    name: "LEGEND",
    init: function ()
    {
        globalobj.rotate = 1
        positxpobj.set(100);
        positypobj.set(50);
        positxlobj.set(100);
        positylobj.set(50);
        traitobj.split(50, "0.1-1.0", traitobj.length());
        scapeobj.split(90, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(50, "90-95", loomobj.length());
        poomobj.split(50, "75-90", poomobj.length());
    }
},
{
    name: "COMIC",
    init: function ()
    {
        rowobj.row = 0;
        positxpobj.set(50);
        positypobj.set(90);
        positxlobj.set(50);
        positylobj.set(50);
        traitobj.split(60, "0.1-1.0", traitobj.length());
        scapeobj.split(70, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(50, "90-95", loomobj.length());
        poomobj.split(50, "75-90", poomobj.length());
    }
},
{
    name: "PORTRAIT",
    init: function ()
    {
        globalobj.rotate = 1
        positxpobj.set(50);
        positypobj.set(90);
        positxlobj.set(50);
        positylobj.set(50);
        traitobj.split(60, "0.1-1.0", traitobj.length());
        scapeobj.split(70, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(50, "90-95", loomobj.length());
        poomobj.split(50, "75-90", poomobj.length());
    }
},
{
    name: "SIDESCROLL",
    init: function ()
    {
        positxpobj.set(50);
        positypobj.set(100);
        positxlobj.set(50);
        positylobj.set(100);
        traitobj.split(90, "0.1-1.0", traitobj.length());
        scapeobj.split(90, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(0, "0-50", loomobj.length());
        poomobj.split(0, "0-50", poomobj.length());
    }
},
{
    name: "ULTRAWIDE",
    init: function ()
    {
        positxpobj.set(50);
        positypobj.set(100);
        positxlobj.set(50);
        positylobj.set(100);
        traitobj.split(95, "0.1-1.0", traitobj.length());
        scapeobj.split(95, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(0, "0-50", loomobj.length());
        poomobj.split(0, "0-50", poomobj.length());
    }
},
{
    name: "WIDE",
    init: function ()
    {
        positxpobj.set(50);
        positypobj.set(97.5);
        positxlobj.set(50);
        positylobj.set(97.5);
        traitobj.split(90, "0.1-1.0", traitobj.length());
        scapeobj.split(50, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(0, "25-90", loomobj.length());
        poomobj.split(0, "0-90", poomobj.length());
    }
},
{
    name: "LANDSCAPE",
    init: function ()
    {
        globalobj.rotate = 1
        positxpobj.set(50);
        positypobj.set(97.5);
        positxlobj.set(50);
        positylobj.set(85);
        traitobj.split(95, "0.1-1.0", traitobj.length());
        scapeobj.split(50, "0.1-1.0", scapeobj.length());
    },
    zoom: function ()
    {
        loomobj.split(50, "70-90", loomobj.length());
        poomobj.split(25, "25-90", poomobj.length());
    }
},
];

var templateobj = new Data("TEMPLATE", templatelst);

var bodylst =
[
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
            if (globalobj.promptedfile || galleryobj.length() < 2)
                return;
            context.save();
            context.font = "1rem Archivo Black";
            context.moveprev = new rectangle()
            context.movenext = new rectangle()
            var zoom = zoomobj.getcurrent();
            var a =
                    new Col([80,0,80],
                    [
                        new Row([80,0],
                        [
                            new Shrink(new Layer(
                            [
                                new Rectangle(context.moveprev),
                                new Shrink(new Circle(_4cnvctx.movingpage == -1?MENUTAP:SCROLLNAB,"white",3),10,10),
                                new Shrink(new Arrow(ARROWFILL,270),20,20),
                            ]),10,10),
                            0,
                        ]),
                        0,
                        new Row([80,0],
                        [
                            new Shrink(new Layer(
                            [
                                new Rectangle(context.movenext),
                                new Shrink(new Circle(_4cnvctx.movingpage == 1?MENUTAP:SCROLLNAB,"white",3),10,10),
                                new Shrink(new Arrow(ARROWFILL,90),20,20),
                            ]),10,10),
                            0,
                        ]),
                    ]);

            a.draw(context, rect, 0, 0);
            context.restore();
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
            context.save();
            context.ignores = [];
            context.menuup = new rectangle()
            context.menuhome = new rectangle()
            context.menudown = new rectangle()
            context.font = "1rem Archivo Black";
            var a = new Col([0,ALIEXTENT,_8cnv.width,ALIEXTENT,0],
                    [
                        0,
                        0,
                        0,
                        new Row([0,30,80,80,80,30,0],
                            [
                                0,
                                new Rectangles(),
                                new Layer(
                                [
                                    new Fill(context.tapindex == 1 ? "rgb(255,155,0)" : MENUCOLOR),
                                    new Rectangle(context.menudown),
                                    new Col([0,17,0],[0,new Row([0,17,0],[0,new Arrow(ARROWFILL,0),0]),0]),
                                ]),
                                new Layer(
                                [
                                    new Fill(context.tapindex == 2 ? "rgb(255,155,0)" : MENUCOLOR),
                                    new Rectangle(context.menuhome),
                                    new Col([0,17,0],[0,new Row([0,17,0],[0,new Circle("white"),0]),0]),
                                ]),
                                new Layer(
                                [
                                    new Fill(context.tapindex == 3 ? "rgb(255,155,0)"  : MENUCOLOR),
                                    new Rectangle(context.menuup),
                                    new Col([0,17,0],[0,new Row([0,17,0],[0,new Arrow(ARROWFILL,180),0]),0]),
                                ]),
                                new Rectangles(),
                                0,
                            ]),
                        0,
                    ]);

            a.draw(context, rect, context.ignores, 0);
            context.restore();
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
            context.save();
            context.font = "1rem Archivo Black";
            context.progresscircle = new rectangle();
            var h = (SAFARI && window.innerWidth > window.innerHeight) ? LARGEFOOT : SMALLFOOT;
            var a = new Row([0,h],
            [
                0,
               new Row([70,0],
               [
                   new Layer(
                   [
                       _4cnvctx.timemain ? new Shrink(new Circle("rgb(255,155,0)"),12,12) : 0,
                       new ProgressCircle(),
                       new Rectangle(context.progresscircle),
                   ]),
                   0,
               ]),
            ]);

            a.draw(context, rect, context.timeobj, 0);

            var lst = [];
            let keys = Object.keys(galleryobj.getcurrent());
            for (var n = 0; n < keys.length; ++n)
            {
                var key = keys[n];
                var value = galleryobj.getcurrent()[key]
                if (value && value.length && typeof value === 'string')
                {
                    if (value.substr(0,4).toLowerCase() != "http")
                        lst.push(value);
                }
            }

            var a = new MultiText();
            a.draw(context, rect, lst, 0);
            context.restore();
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
            context.stretchctrl = new rectangle()
            context.save();
            context.font = "1rem Archivo Black";
            var j = pinchobj.current();
            if (window.innerWidth < window.innerHeight)
            {
                var w = ALIEXTENT;
                var h = Math.min(rect.height/2,Math.max(320,rect.height-ALIEXTENT*4));
                var a = new Centered(w,h,
                        new RowA([50,0],
                        [
                            new Text("white", "center", "middle",0,1,1),
                            new Layer(
                            [
                                new Rectangle(context.stretchctrl),
                                new Fill(THUMBFILL),
                                new Stroke(THUMBSTROKE,THUMBORDER),
                                new CurrentVPanel(new Fill(THUMBSTROKE), ALIEXTENT, 1, "BLACK")
                            ]),
                        ]),
                    );

                a.draw(context, rect, [  "Stretch", stretchobj.getcurrent() ], 0);
            }
            else
            {
                var w = Math.min(rect.width/2,Math.max(640,rect.width-ALIEXTENT*4));
                var h = 100;
                var a = new Centered(w,h,
                        new RowA([50,0],
                        [
                            new Text("white", "center", "middle",0,0,1),
                            new Layer(
                            [
                                new Rectangle(context.stretchctrl),
                                new Fill(THUMBFILL),
                                new Stroke(THUMBSTROKE,THUMBORDER),
                                new CurrentHPanel(new Fill(THUMBSTROKE), ALIEXTENT, "BLACK")
                            ]),
                        ])
                    );

                a.draw(context, rect, ["Stretch",stretchobj.getcurrent()], 0);
            }

            context.restore();
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
            return 1;
            context.zoomctrl = new rectangle()
            context.save();
            context.font = "1rem Archivo Black";
            var j = pinchobj.current();
            if (window.innerWidth < window.innerHeight)
            {
                var w = ALIEXTENT;
                var h = Math.min(rect.height/2,Math.max(320,rect.height-ALIEXTENT*4));
                var a = new Centered(w,h,
                        new RowA([50,0],
                        [
                            new Text("white", "center", "middle",0,1,1),
                            new Layer(
                            [
                                new Rectangle(context.zoomctrl),
                                new Fill(THUMBFILL),
                                new Stroke(THUMBSTROKE,THUMBORDER),
                                new CurrentVPanel(new Fill(THUMBSTROKE), ALIEXTENT, 1, "BLACK")
                            ]),
                        ])
                    );

                a.draw(context, rect, [ "Zoom", zoomobj.getcurrent() ], 0);
            }
            else
            {
                var w = Math.min(rect.width/2,Math.max(640,rect.width-ALIEXTENT*4));
                var h = 100;
                var a = new Centered(w,h,
                        new RowA([50,0],
                        [
                            new Text("white", "center", "middle",0,0,1),
                            new Layer(
                            [
                                new Rectangle(context.zoomctrl),
                                new Fill(THUMBFILL),
                                new Stroke(THUMBSTROKE,THUMBORDER),
                                new CurrentHPanel(new Fill(THUMBSTROKE), ALIEXTENT, "BLACK")
                            ]),
                        ]),
                    );

                a.draw(context, rect, [ "Zoom", zoomobj.getcurrent() ], 0);
            }

            context.restore();
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
            return 1;
            context.timemainctrl = new rectangle()
            context.save();
            context.font = "1rem Archivo Black";
            var j = pinchobj.current();
            if (window.innerWidth < window.innerHeight)
            {
                var w = ALIEXTENT;
                var h = Math.min(rect.height/2,Math.max(320,rect.height-ALIEXTENT*4));
                var a = new Centered(w,h,
                        new RowA([50,0],
                        [
                            new Text("white", "center", "middle",0,1,1),
                            new Layer(
                            [
                                new Rectangle(context.timemainctrl),
                                new Fill(THUMBFILL),
                                new Stroke(THUMBSTROKE,THUMBORDER),
                                new CurrentVPanel(new Fill(THUMBSTROKE), ALIEXTENT, 1, "BLACK")
                            ]),
                        ]));

                a.draw(context, rect, [ "Timer", timemain, ], 0);
            }
            else
            {
                var w = Math.min(rect.width/2,Math.max(640,rect.width-ALIEXTENT*4));
                var h = 100;
                var a = new Centered(w,h,
                    new RowA([0,ALIEXTENT],
                    [
                        new Text("white", "center", "middle",0,0,1),
                        new Layer(
                        [
                            new Rectangle(context.timemainctrl),
                            new Fill(THUMBFILL),
                            new Stroke(THUMBSTROKE,THUMBORDER),
                            new CurrentHPanel(new Fill(THUMBSTROKE), ALIEXTENT, "BLACK")
                        ]),
                    ]));

                a.draw(context, rect, ["Timer",timemain], 0);
            }

            context.restore();
        }
    },
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
            context.speedctrl = new rectangle()
            context.save();
            context.font = "1rem Archivo Black";
            var j = pinchobj.current();
            if (window.innerWidth < window.innerHeight)
            {
                var w = ALIEXTENT;
                var h = Math.min(rect.height/2,Math.max(320,rect.height-ALIEXTENT*4));
                var a = new Centered(w,h,
                        new RowA([50,0],
                        [
                            new Text("white", "center", "middle",0,1,1),
                            new Layer(
                            [
                                new Rectangle(context.speedctrl),
                                new Fill(THUMBFILL),
                                new Stroke(THUMBSTROKE,THUMBORDER),
                                new CurrentVPanel(new Fill(THUMBSTROKE), ALIEXTENT, 1, "BLACK")
                            ]),
                        ]));

                a.draw(context, rect, [ "Speed", speedobj, ], 0);
            }
            else
            {
                var w = Math.min(rect.width/2,Math.max(640,rect.width-ALIEXTENT*4));
                var h = 100;
                var a = new Centered(w,h,
                    new RowA([0,ALIEXTENT],
                    [
                        new Text("white", "center", "middle",0,0,1),
                        new Layer(
                        [
                            new Rectangle(context.speedctrl),
                            new Fill(THUMBFILL),
                            new Stroke(THUMBSTROKE,THUMBORDER),
                            new CurrentHPanel(new Fill(THUMBSTROKE), ALIEXTENT, "BLACK")
                        ]),
                    ]));

                a.draw(context, rect, ["Speed", speedobj], 0);
            }

            context.restore();
       }
    },
  ];

var bodyobj = new Data("", bodylst);

url.path = "HOME";
url.project = 0;
var path = "gallery/" + url.path;
if (url.host == "100.115.92.200")
    path = "res/" + url.path;
var galleryobj = new Data("", 0);
galleryobj.mode = 0;
galleryobj.path = function()
{
    var k = galleryobj.getcurrent();
    var src = k.src;
    var w = k.width;
    var h = k.height;
    if (src && !src.indexOf("/") >= 0 && w && h)
    {
        var a = w/h;
        if (w > h)
        {
            while (w*h > MAXMEGAPIX)
            {
                w *= 0.999;
                h = w/a;
            }
        }
        else
        {
            while (w*h > MAXMEGAPIX)
            {
                h *= 0.999;
                w = a*h;
            }
        }

        w = Math.floor(w);
        h = Math.floor(h);
        var q = this.quality;
        return 'https://reportbase.com/image/'+src+'/w='+w+',h='+h+',quality='+q;
    }
    else if (src && src.indexOf("/") >= 0)
    {
        return k.full?k.full:src;
    }
    else
    {
        return 'https://reportbase.com/image/'+src+'/quality='+q;
    }

}

if (url.searchParams.has("p"))
{
    var e = url.searchParams.get("p");
    let k = e.split(".");
    url.path = k[0];
    if (k.length == 2)
        url.project = Number(k[1]);
    path = "gallery/" + url.path;
}
else if (url.searchParams.has("unsplash.user"))
{
    var e = url.searchParams.get("unsplash.user");
    let k = e.split(".");
    url.path = k[0];
    if (k.length == 2)
        url.project = Number(k[1]);
    path = "https://unsplash.reportbase5836.workers.dev/users/" + url.path;
}
else if (url.searchParams.has("unsplash.collection"))
{
    var e = url.searchParams.get("unsplash.collection");
    let k = e.split(".");
    url.path = k[0];
    if (k.length == 2)
        url.project = Number(k[1]);
    path = "https://unsplash.reportbase5836.workers.dev/collections/" + url.path;
}
else if (url.searchParams.has("pexels.curated"))
{
    var e = url.searchParams.get("pexels.curated");
    url.path = "";
    url.project = Number(e);
    path = "https://pexels.reportbase5836.workers.dev";
}

fetch(path)
  .then(function (response)
  {
     return response.json()
  })
  .then(function (obj)
  {
        galleryobj = Object.assign(galleryobj,obj);
        setfavicon();

        pretchobj.split(60, "40-90", pretchobj.length());
        letchobj.split(60, "40-90", letchobj.length());
        speedxobj.split(1.25, "1-20", speedxobj.length());
        speedyobj.split(1.25, "1-20", speedyobj.length());

        if (typeof galleryobj.quality === "undefined")
            galleryobj.quality = 85;
        if (typeof galleryobj.megapix === "undefined")
            galleryobj.megapix = 9000000;

        //7
        var lst =
        [
            {
                line: "Image Viewer\nhttps://repba.com\nimages@repba.com\nTom Brinkman",
                func: function() {menuhide(); }
            },
            {
                line: "High Resolution\n360° Panoramas\nImage Stretching\nImage Zooming",
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

        var slices = _7cnvctx.sliceobj;
        slices.data = lst;
        _7cnvctx.buttonheight = 80;
        _7cnvctx.delayinterval = DELAYCENTER / lst.length;
        _7cnvctx.virtualheight = lst.length*_7cnvctx.buttonheight;
        _7cnvctx.rvalue = 2;
        _7cnvctx.slidereduce = 0.75;

        galleryobj.data = galleryobj.datam?galleryobj.datam:galleryobj.data;
        for (var n = 0; n < galleryobj.data.length; ++n)
        {
            var k = galleryobj.data[n];
            k.func = function (index)
                {
                    menuhide();
                    galleryobj.set(index);
                    window.location.href = addressobj.full();
                }
        }

        _8cnvctx.sliceobj.data = galleryobj.data;
        galleryobj.set(url.project);
        var slices = _8cnvctx.sliceobj;
        _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
        _8cnvctx.rvalue = 2;
        _8cnvctx.buttonheight = 120;
        _8cnvctx.delayinterval = DELAYCENTER / slices.length();
        _8cnvctx.virtualheight = slices.length()*_8cnvctx.buttonheight;
        _8cnvctx.slidereduce = 0.75;

        //9
        var slices = _9cnvctx.sliceobj;
        slices.data= [];

        slices.data.push({title:"Open", path: "OPEN", func: function()
        {
            menuhide();
            promptFile().then(function(files) { dropfiles(files); })
        }});

        slices.data.push({title:"Slices", path: "SLICES", func: function(rect, x, y)
        {
            colorobj.enabled = colorobj.enabled?0:1;
            menuhide();
            _4cnvctx.refresh();
        }})

        slices.data.push({title:"Stretch", path: "STRETCH", func: function(rect, x, y)
        {
            bodyobj.enabled = 8;
            menuhide();
            _4cnvctx.refresh();
        }})

        slices.data.push({title:"Login", path: "LOGIN", func: function ()
        {
            menuhide();
            _4cnvctx.refresh();
            authClient.redirectToLoginPage()
        }})

        slices.data.push({title:"Download", path: "DOWNLOAD", func: function()
        {
            var obj = galleryobj.getcurrent();
            var path = "https://reportbase.com/image/"+obj.src+"/w="+obj.width;
            if (obj.src.indexOf("/") >= 0)
                path = obj.src;
            window.open(path,"Reportbase");
        }});

        if (url.searchParams.has("unsplash.user") ||
            url.searchParams.has("unsplash.collection"))
        {
            slices.data.push({title:"Unsplash User", path: "UNSPLASHUSER", func: function()
            {
                var path = "https://unsplash.com/@"+galleryobj.username;
                window.open(path,"UNSPLASH");
            }})
            slices.data.push({title:"Unsplash Image", path: "UNSPLASHIMAGE", func: function()
            {
                var path = "https://unsplash.com/photos/"+galleryobj.getcurrent().id;
                window.open(path,"UNSPLASH");
            }})
        }

        slices.data.push({title:"Help", path: "HELP", func: function(){menushow(_7cnvctx); }})

        slices.data.push({title:"Fullscreen", path: "FULLPANEL", func: function ()
        {
            if (screenfull.isEnabled)
                screenfull.toggle();
        }})

        slices.data.push({ title: "Screenshot", path: "SCREENSHOT", func: function()
        {
            _4cnvctx.refresh()
            setTimeout(function()
            {
                var k = document.createElement('canvas');
                var link = document.createElement("a");
                link.href = _4cnvctx.canvas.toDataURL('image/jpg');
                link.download = galleryobj.getcurrent()[0] + ".jpg";
                link.click();
                _4cnvctx.refresh()
            }, 1000);
        }});

        _9cnvctx.delayinterval = DELAYCENTER / slices.data.length;
        _9cnvctx.virtualheight = slices.data.length*_9cnvctx.buttonheight;
        _9cnvctx.rvalue = 2;
        _9cnvctx.slidereduce = 0.75;

        pageresize();
        contextobj.reset();
  })

var ContextObj = (function ()
{
    function init()
    {
        this.ANCHOR = 0;
        this.CURRENT = 0;

        for (var n = 0; n < contextlst.length; ++n)
        {
            var context = contextlst[n];
            context.index = n;
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
            context.enabled = 0;
            context.canvas.width = 1;
            context.canvas.height = 1;
            context.autodirect = -1;
            context.font = "400 1rem Archivo Black";
            context.fillText("  ", 0, 0);
            context.slideshow = 0;
            context.lastime = 0;
            context.slidereduce = 0;
            context.slidestop = 0;
            context.buttonheight = ALIEXTENT/2;
            setevents(context, eventlst[n]);
            context.sliceobj = new Data("", []);
            context.timeobj = new Data("", TIMEOBJ);
            context.timeobj.set(TIMEOBJ/2);
        }

        var time = url.searchParams.has("t") ? Number(url.searchParams.get("t")) : TIMEOBJ/2;
        _4cnvctx.timeobj.set(time);

    }

    init.prototype =
	{
        anchor: function () { return this.ANCHOR; },
        current: function () { return this.CURRENT; },
        label: function () { return ""; },
        length: function () { return this.data.length; },
        enabled: function () { return 0; },
        setanchor: function (index) { this.ANCHOR = Math.clamp(0, this.length() - 1, index); },
        setcurrent: function (index) { this.CURRENT = Math.clamp(0, this.length() - 1, index); },
        getcurrent: function () { return this.data[this.current()]; },
        name: function () { return this.CURRENT.toString(); },
        title: function () { return this.CURRENT.toString(); },

		resize: function (context)
       	{
			var top = 0;
			var left = 0;
			if (!context.enabled)
			{
				context.enabled = 0
				context.canvas.height = 0;
				return;
			}

            var k = context.index == 7 ? 640 : 420;
            var w = Math.min(k, window.innerWidth);
            var l = Math.floor((window.innerWidth-w)/2);
            context.show(l, 0, w, _4cnv.height);
        },

		reset: function ()
       	{
            contextobj.resetcontext4(_4cnvctx);
            setTimeout(function()
            {
                var lst = [_1cnvctx, _2cnvctx, _3cnvctx,  _5cnvctx,
                    _6cnvctx, _7cnvctx, _8cnvctx, _9cnvctx];
                for (var n = 0; n < lst.length; n++)
                {
                    var context = lst[n];
                    contextobj.resetcontext(context);
                }
            }, JULIETIME);
		},

        resetcontext4: function (context)
       	{
            if (photo.image)
            {
                contextobj.resize(context);
                resetcanvas(context);
            }
            else// if (url.path)
            {
                var path =  galleryobj.path();
                if (globalobj.promptedfile)
                    path = globalobj.promptedfile;
                seteventspanel(new Empty());
                photo.image = new Image();
                photo.image.crossOrigin = 1;
                photo.image.original = path;
                photo.image.src = path;

                photo.image.onerror =
                    photo.image.onabort = function(e)
                {
                    url.errors++;
                    location.reload();
                }

                photo.image.onload = function()
                {
                    this.aspect = this.width/this.height;
                    this.size = ((this.width * this.height)/1000000).toFixed(1) + "MP";
                    this.extent = this.width + "x" + this.height;
                    var e = galleryobj.getcurrent();
                    document.title = url.path +"."+galleryobj.current().pad(4);

                    var k;
                    if (this.aspect < 0.5)
                        k = "TALL"
                    else if (this.aspect < 1.0)
                        k = "PORTRAIT"
                    else if (this.aspect < 2.0)
                        k = "LANDSCAPE"
                    else if (this.aspect < 5.0)
                        k = "WIDE"
                    else
                        k = "ULTRAWIDE"

                    if (typeof galleryobj.getcurrent().template !== "undefined")
                        k = galleryobj.getcurrent().template;
                    if (typeof galleryobj.template !== "undefined")
                        k = galleryobj.template;

                    var j = templatelst.findIndex(function(a){return a.name == k;})
                    if (j != templateobj.current())
                    {
                        templateobj.set(j);
                        if (!templateobj.done)
                           templateobj.getcurrent().init();
                        templateobj.done = 1;
                        templateobj.getcurrent().zoom();
                    }

                    pageresize();
                    contextobj.resize(context);
                    resetcanvas(context);
                    seteventspanel(new YollPanel());

                    if (typeof galleryobj.getcurrent().row !== "undefined")
                        rowobj.set(window.innerHeight*(galleryobj.getcurrent().row/100));
                    else if (typeof galleryobj.row !== "undefined")
                        rowobj.set(window.innerHeight*(galleryobj.row/100));
                    else if (typeof rowobj.row !== "undefined")
                        rowobj.set(window.innerHeight*(rowobj.row/100));

                    if (globalobj.rotate)
                        rotateobj.enabled = 1;
                    clearInterval(context.timemain);
                    context.timemain = setInterval(function () { drawslices() }, timemain.getcurrent());

                    contextobj.reset()
                    setTimeout(function() { masterload(); }, 2000);
                    if (rotateobj.enabled)
                    {
                        if (!_4cnvctx.movingpage)
                            context.autodirect = -1;
                        else
                            context.autodirect = _4cnvctx.movingpage==1?-1:1
                        if (!_4cnvctx.timemain)
                            _4cnvctx.tab();
                    }
                }
			}

			return 1;
    	},
		resetcontext: function (context)
       	{
			contextobj.resize(context);
            return 1;
    	},
	};

	return init;
})();

var contextobj = new ContextObj();

function masterload()
{
    var lst = [];
    var k = galleryobj.current();
    var size = Math.min(4,galleryobj.length());
    for (var n = 0; n < size; ++n)
    {
        galleryobj.rotate(1);
        lst[n] = new Image();
        lst[n].src = galleryobj.path();
        lst[n].index = galleryobj.current();
        lst[n].onload = function()
        {
            galleryobj.data[this.index].loaded = 1;
        }
    }

    galleryobj.rotate(-5);
    var img = new Image();
    img.src = galleryobj.path();
    img.index = galleryobj.current();
    img.onload = function()
    {
        galleryobj.data[this.index].loaded = 1;
    }

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
        r.x  = rect.x;
        r.y  = rect.y;
        r.width  = rect.width;
        r.height  = rect.height;
    }
}

var Rectangles = function ()
{
    this.draw = function (context, rect, user, time)
    {
        user.push(rect);
    }
}

var Circle = function (color, scolor, width)
{
    this.draw = function (context, rect, user, time)
    {
        var radius = rect.height / 2;
	    if (radius <= 0)
            return;
	    context.save();
    	context.beginPath();
        context.arc(rect.x + rect.width / 2, rect.y + rect.height / 2, radius, 0, 2 * Math.PI, false);
        context.fillStyle = color;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
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

var Text = function (color,  align="center", baseline="middle", reverse=0, noclip=0, shadow=0)
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
        context.shadowOffsetX = shadow?shadow:0;
        context.shadowOffsetY = shadow?shadow:0;
        context.shadowColor = "black"

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

var Shadow  = function (panel)
{
    this.draw = function (context, rect, user, time)
    {
        context.save();
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = "black"
        panel.draw(context, rect, user, time);
        context.restore();
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

function menuenabled()
{
    var k = _2cnv.height || _3cnv.height || _5cnv.height || _6cnv.height || _7cnv.height ||
        _8cnv.height || _9cnv.height;
    return k;
}

function menuhide()
{
    var k = menuenabled();
    _2cnvctx.enabled = 0;
    _3cnvctx.enabled = 0;
    _5cnvctx.enabled = 0;
    _6cnvctx.enabled = 0;
    _7cnvctx.enabled = 0;
    _8cnvctx.enabled = 0;
    _9cnvctx.enabled = 0;
    _2cnvctx.hide();
    _3cnvctx.hide();
    _5cnvctx.hide();
    _6cnvctx.hide();
    _7cnvctx.hide();
    _8cnvctx.hide();
    _9cnvctx.hide();
    _4cnvctx.refresh();
    return k;
}

function reset()
{
    contextobj.reset()
    setTimeout(function() { contextobj.reset(); }, 400);
    setTimeout(function() { contextobj.reset(); }, 1000);
}

function resize()
{
    bodyobj.enabled = 0;
    colorobj.enabled = 0;
    delete _4cnvctx.thumbcanvas;
    reset();
    menuhide();
    var n = eventlst.findIndex(function(a){return a.name == "_4cnvctx";})
    setevents(_4cnvctx, eventlst[n])
    pageresize();
    _4cnvctx.tapping = 0;
    _4cnvctx.refresh();
}

function escape()
{
    delete _4cnvctx.thumbcanvas;
    colorobj.enabled = 0;
    bodyobj.enabled = 0;
    _4cnvctx.tapping = 0;
    menuhide();
    var n = eventlst.findIndex(function(a){return a.name == "_4cnvctx";})
    setevents(_4cnvctx, eventlst[n])
    _4cnvctx.setcolumncomplete = 0;
    reset();
    pageresize();
    _4cnvctx.refresh();
}

window.addEventListener("focus", (evt) => { });
window.addEventListener("blur", (evt) => { escape(); });
window.addEventListener("resize", (evt) => { resize(); });
window.addEventListener("screenorientation", (evt) => { resize(); });

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

	this.panstart = function (context, rect, x, y, type)
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

    this.pinch = function (context, scale)
    {
   		if (context.pinch_)
        	context.pinch_(context, scale);
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

var headlst =
[
    new function ()
    {
		this.draw = function (context, rect, user, time)
        {
        }
    },
	new function ()
	{
    	this.press = function (context, rect, x, y)
		{
            if (context.picture.hitest(x,y))
            {
                infobj.rotate(1);
                _4cnvctx.refresh();
            }
        }

     	this.tap = function (context, rect, x, y)
		{
            if (context.page.hitest(x,y))
            {
                _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
                menushow(_8cnvctx)
                _4cnvctx.refresh();
            }
            else if (context.prevpage.hitest(x,y))
            {
                _4cnvctx.movepage(-1);
            }
            else if (context.picture.hitest(x,y))
            {
                if (globalobj.shifthit)
                {
                    infobj.rotate(1);
                    _4cnvctx.refresh();
                }
            }
            else if (context.nextpage.hitest(x,y))
            {
                _4cnvctx.movepage(1);
            }
            else if (context.option.hitest(x,y))
            {
                _4cnvctx.refresh();
                menushow(_9cnvctx);
            }

            _4cnvctx.refresh();
		};

		this.draw = function (context, rect, user, time)
		{
            context.clear()
            context.save()
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
            context.shadowColor = "black"
            context.page = new rectangle()
            context.option = new rectangle()
            context.prevpage = new rectangle()
            context.nextpage = new rectangle()
            context.thumbnail = new rectangle()
            context.picture = new rectangle()
            context.font = "1rem Archivo Black";
            var s = _5cnvctx.enabled || _8cnvctx.enabled;
            var f = Math.min(rect.width - ALIEXTENT*4, 180);
            var a = new Layer(
                [
                    galleryobj.length()<2?0:new Fill(HEADBACK),
                    new Col([ALIEXTENT,0,ALIEXTENT,f,ALIEXTENT,0,ALIEXTENT],
                    [
                        galleryobj.length()<2?0:new Layer(
                        [
                            s ? new Fill(BUTTONBACK) : 0,
                            new PagePanel(s?0.1:0.075),
                            new Rectangle(context.page),
                        ]),
                        0,
                        new Layer(
                        [
                            new Rectangle(context.prevpage),
                            new Row([HNUB,0,HNUB],
                            [
                                0,
                                new Layer(
                                [
                                    _4cnvctx.movingpage == -1 ?
                                        new Circle(SCROLLNAB,"white",3) : 0,
                                    new Shrink(new Arrow(ARROWFILL,270),ARROWBORES,ARROWBORES-HNUB),
                                ]),
                                0,
                            ]),
                        ]),
                        new Layer(
                        [
                            new Rectangle(context.picture),
                            new Row([HNUB,0,HNUB],
                            [
                                0,
                                new Shrink(new Text("white", "center", "middle",0,1,0),20,20),
                                0,
                            ]),
                        ]),
                        new Layer(
                        [
                            new Rectangle(context.nextpage),
                            new Row([HNUB,0,HNUB],
                            [
                                0,
                                new Layer(
                                [
                                    _4cnvctx.movingpage == 1 ? new Circle(SCROLLNAB,"white",3) : 0,
                                    new Shrink(new Arrow(ARROWFILL,90),ARROWBORES,ARROWBORES-HNUB),
                                ]),
                                0,
                            ]),
                        ]),
                        0,
                        new Layer(
                        [
                            _9cnvctx.enabled ? new Fill(BUTTONBACK):0,
                            new OptionPanel((!_9cnvctx.enabled)?0.075:0.1),
                            new Rectangle(context.option),
                        ])
                    ])
               ]);

            var s;
            if (infobj.current() == 0)
            {
                s = (galleryobj.current()+1).toFixed(0);
            }
            else if (infobj.current() == 1)
            {
                s = (galleryobj.current()+1).toFixed(0);
                if (rect.width >= 400)
                    s += " / "+galleryobj.length()
            }
            else if (photo.image && infobj.current() == 2)
            {
                s = photo.image.extent +" ("+
                    photo.image.aspect.toFixed(2)+")";
            }
            else if (infobj.current() == 3)
            {
                s = _4cnvctx.timeobj.getcurrent().toFixed(1);
            }
            else if (infobj.current() == 4)
            {
                var visibles = 0;
                var slicelst = _4cnvctx.sliceobj.data;
                for (var m = 0; m < slicelst.length; ++m)
                {
                    if (slicelst[m].visible)
                        visibles += 1;
                }

                s = visibles.toFixed(0)+" / "+_4cnvctx.sliceobj.length()
            }
            else if (infobj.current() == 5)
            {
                s =  _4cnvctx.virtualfactor.toFixed(2)
            }

            a.draw(context, rect, s, time);
            context.restore()
		};
	},
	new function ()
	{
    	this.tap = function (context, rect, x, y)
		{
            if (context.page.hitest(x,y))
            {
                _8cnvctx.timeobj.set((1-galleryobj.berp())*TIMEOBJ);
                menushow(_8cnvctx)
                _4cnvctx.refresh();
            }
            else if (context.option.hitest(x,y))
            {
                _4cnvctx.refresh();
                menushow(_9cnvctx);
            }

            _4cnvctx.refresh();
		};

		this.draw = function (context, rect, user, time)
		{
            context.clear()
            context.save()
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowColor = "black"
            context.page = new rectangle()
            context.option = new rectangle()
            context.font = "1rem Archivo Black";
            var s = _5cnvctx.enabled || _8cnvctx.enabled;
            var a = new Layer(
                [
                    globalobj.promptedfile?0:new Fill(HEADBACK),
                    new Col([ALIEXTENT,0,ALIEXTENT],
                    [
                        new Layer(
                        [
                            s ? new Fill(BUTTONBACK) : 0,
                            new PagePanel(s?0.1:0.075),
                            new Rectangle(context.page),
                        ]),
                        0,
                        new Layer(
                        [
                            _9cnvctx.enabled ? new Fill(BUTTONBACK):0,
                            new OptionPanel((!_9cnvctx.enabled)?0.075:0.1),
                            new Rectangle(context.option),
                        ])
                    ])
               ]);

            a.draw(context, rect, 0, time);
            context.restore()
		};
	},
];

var footlst =
[
    new function()
    {
        this.draw = function (context, rect, user, time)
        {
        }
    },
    new function()
    {

	    this.pan = function (context, rect, x, y, type)
        {
            clearInterval(context.timefooter);
        };

        this.pressup = function (context, rect, x, y)
        {
            clearInterval(context.timefooter);
        };

        this.press = function (context, rect, x, y)
        {
            if (context.keyzoomup && context.keyzoomup.hitest(x,y))
            {
                clearInterval(context.timefooter);
                context.timefooter = setInterval(function ()
                {
                    var obj = zoomobj.getcurrent()
                    obj.add(1);
                    if (pinchobj.current() == 0)
                        contextobj.reset()
                    else
                        _4cnvctx.refresh();
                }, 16)
            }
            else if (context.keyzoomdown && context.keyzoomdown.hitest(x,y))
            {
                clearInterval(context.timefooter);
                context.timefooter = setInterval(function ()
                {
                    var obj = zoomobj.getcurrent()
                    obj.add(-1);
                    if (pinchobj.current() == 0)
                        contextobj.reset()
                    else
                        _4cnvctx.refresh();
                }, 16);
            }
        };

        this.tap = function (context, rect, x, y)
        {
            clearInterval(context.timefooter);
            if (context.progresscircle.hitest(x,y))
            {
                if (_4cnvctx.timemain)
                {
                    clearInterval(_4cnvctx.timemain);
                    _4cnvctx.timemain = 0;
                    rotateobj.enabled = 0;
                }
                else
                {
                    rotateobj.enabled = 1;
                    _4cnvctx.tab();
                }

                _4cnvctx.refresh();
            }
            else if (context.keyzoomup && context.keyzoomup.hitest(x,y))
            {
                bodyobj.enabled = 9;
                _4cnvctx.refresh();
                var obj = zoomobj.getcurrent()
                if (obj.current() >= obj.length()-1)
                    return;
                obj.add(1);
                if (pinchobj.current() == 0)
                    contextobj.reset()
                else
                    _4cnvctx.refresh();
            }
            else if (context.keyzoomdown && context.keyzoomdown.hitest(x,y))
            {
                bodyobj.enabled = 9;
                _4cnvctx.refresh();
                var obj = zoomobj.getcurrent()
                if (!obj.current())
                    return;
                obj.add(-1);
                if (pinchobj.current() == 0)
                    contextobj.reset()
                else
                    _4cnvctx.refresh();
            }
            else if (context.leftab.hitest(x,y))
            {
                promptFile().then(function(files) { dropfiles(files); })
            }
            else if (context.rightab.hitest(x,y))
            {
                if (screenfull.isEnabled)
                {
                    if (screenfull.isFullscreen)
                        screenfull.exit();
                    else
                        screenfull.request();
                }
            }

            addressobj.update();
        };

        this.draw = function (context, rect, user, time)
        {
            context.clear();
            context.save();
            context.shadowOffsetX = 1;
            context.shadowOffsetY = 1;
            context.shadowColor = "black"
            context.progresscircle = new rectangle();
            context.keyzoomup = new rectangle()
            context.keyzoomdown = new rectangle()
            context.leftab = new rectangle()
            context.rightab = new rectangle()
            var e = rect.height == LARGEFOOT ? [70,0] : [70,-1];
            var j = rect.width < 340 ? 50 : ALIEXTENT;
            var a = new Layer(
               [
                   1?0:new Fill(HEADBACK),
                   new Row(e,
                   [
                       new Col([j,0,j+10,ALIEXTENT,j+10,0,ALIEXTENT],
                       [
                            1?0:new Layer(
                            [
                                new Rectangle(context.leftab),
                                new Col([0,8,0],
                                    [
                                        0,
                                        new Row([0,8,4,8,4,8,0],
                                        [
                                            0,
                                            new Circle("white"),
                                            0,
                                            new Circle("white"),
                                            0,
                                            new Circle("white"),
                                            0,
                                        ]),
                                        0,
                                    ])
                            ]),
                            0,
                            1?0:new Layer(
                            [
                                new Rectangle(context.keyzoomdown),
                                new Minus(ARROWFILL),
                            ]),
                            new Layer(
                               [
                                   _4cnvctx.timemain ? new Shrink(new Circle("rgb(255,155,0)"),12,12) : 0,
                                   new ProgressCircle(),
                                   new Rectangle(context.progresscircle),
                               ]),
                            1?0:new Layer(
                            [
                                new Rectangle(context.keyzoomup),
                                new Plus(ARROWFILL),
                            ]),
                            0,
                            1?0:new Layer(
                            [
                                new FullPanel(),
                                new Rectangle(context.rightab),
                            ]),
                       ]),
                   ])
               ]);

            a.draw(context, rect, _4cnvctx.timeobj, 0);
            context.restore()
        };
    },
];

var footobj = new Data("", footlst);
var headobj = new Data("", headlst);
footobj.enabled = 0;
headobj.enabled = 0;
var infobj = new Data("", 6);
var positxpobj = new Data("POSITIONX", 100);
var positypobj = new Data("POSITIONY", 100);
var positxlobj = new Data("POSITIONX", 100);
var positylobj = new Data("POSITIONY", 100);
var positxobj = new Data("POSITIONX", [positxpobj,positxlobj]);
var posityobj = new Data("POSITIONY", [positypobj,positylobj]);

function menushow(context)
{
    colorobj.enabled = 0;
    bodyobj.enabled = 0;
    _4cnvctx.slideshow = 0;
    var enabled = context.enabled;
    _2cnvctx.hide();
    _3cnvctx.hide();
    _5cnvctx.hide();
    _6cnvctx.hide();
    _7cnvctx.hide();
    _8cnvctx.hide();
    _9cnvctx.hide();
    context.refresh();
    if (enabled)
        return;

    context.enabled = 1;
    if (context.complete)
    {
        contextobj.resize(context);
    }
    else
    {
        contextobj.resetcontext(context);
        context.complete = 1;
    }

    context.refresh();
    _4cnvctx.refresh();
}

var ClosePanel = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        var j = rect.width*size;
        var k = j/2;
        var e = new Fill(OPTIONFILL);
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

var PagePanel = function (size)
{
    this.draw = function (context, rect, user, time)
    {
        context.save()
        var j = rect.width*size;
        var k = j/2;
        var e = new Fill(OPTIONFILL);
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
        var j = rect.width*size;
        var k = j/2;
        var e = new Fill(OPTIONFILL);
        var a = new Layer(
        [
            new Col( [0,rect.height*0.35,0],
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

function pageresize()
{
    if (galleryobj.hidedisplay)
    {
        var h = 0;
        headcnvctx.show(0, 0, window.innerWidth,h);
//        footcnvctx.show(0, window.innerHeight-h, window.innerWidth, h);
    }
    else
    {
        var h = headobj.enabled ? ALIEXTENT : 0;
        headcnvctx.show(0,0,window.innerWidth,h);
        headobj.set(h?(globalobj.promptedfile||galleryobj.length()<2?2:1):0);
        headham.panel = headobj.getcurrent();
  //      var h = (SAFARI && window.innerWidth > window.innerHeight) ? LARGEFOOT : SMALLFOOT;
  //      if (!footobj.enabled)
   //         h = 0;

 //       footcnvctx.show(0, window.innerHeight-h, window.innerWidth, h);
 //       footobj.set(h?1:0);
 //       footham.panel = footobj.getcurrent();
    }
}

window.onerror = function(message, source, lineno, colno, error)
{
    //window.alert( error+","+lineno+","+console.trace());
};

document.addEventListener("touchstart", function(evt) { }, {passive: false});
document.addEventListener('touchmove', function (evt) { }, { passive: false });
window.addEventListener("touchend", function (evt) { });
window.addEventListener("beforeunload", (evt) => { });
window.addEventListener("pagehide", (evt) => { });
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() { setfavicon(); });

function setfavicon()
{
    var element = document.querySelector("link[rel='icon']");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      element.setAttribute("href","res/favicon-light.svg");
    else
      element.setAttribute("href","res/favicon-dark.svg");
}

window.addEventListener("visibilitychange", (evt) =>
{
    reset();
});

window.addEventListener("load", async () =>
{
});

if (url.protocol == "https:")
{
    authClient = PropelAuth.createClient({authUrl: "https://auth.reportbase.com", enableBackgroundTokenRefresh: true})
    authClient.getAuthenticationInfoOrNull(false)
    .then(function(client)
    {
        if (client)
            globalobj.user = client.user;
    })
}

function wraptext(ctx, text, maxWidth)
{
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for(var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push(line);
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if(n === words.length - 1) {
            lineArray.push(line);
        }
    }
    // Return the line array
    return lineArray;
}
