self.onmessage = function(ev)
{
    let canvas = ev.data.canvas;
    let context = canvas.getContext('2d');
    var slices = ev.data.slices;
    var buttonheight = ev.data.buttonheight;
    for (var m = 0; m < 10; ++m)
    {
        var y = m*50;
        context.fillStyle = "red";
        context.fillRect(0, y-10, 100, 20);//canvas.width, buttonheight);
    }

    const bitmap = canvas.transferToImageBitmap();
    self.postMessage({msg: 'render', bitmap});
}

/*
    if (ev.data.msg === 'offscreen')
    {
        let canvas = ev.data.canvas;
        let context = canvas.getContext('2d');
        context.fillStyle = "red";
        context.fillRect(0,0,100,100);
        const bitmap = canvas.transferToImageBitmap();
        self.postMessage({msg: 'render', bitmap});
    }
*/
