self.onmessage = function(ev)
{
    //if (ev.data.msg === 'offscreen')
    {
        let canvas = ev.data.canvas;
        let context = canvas.getContext('2d');
        context.fillStyle = "red";
        context.fillRect(0,0,100,100);
        const bitmap = canvas.transferToImageBitmap();
        self.postMessage({msg: 'render', bitmap});
    }
}
