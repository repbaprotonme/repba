<head>
<style>
iframe 
{ 
    background:white;
    border:none;
    overflow:hidden;
}
</style>
<script>
window.addEventListener('message',function(e) 
{
    var url = new URL(window.location.href);
    if (e.data.command && e.data.command == "stopall")
    {
        var k = document.getElementsByTagName('iframe');
        var j = Array.prototype.slice.call(k);
        j.forEach(function(e) 
        {
            var a = { "stop": 1, } 
            var i = e.contentWindow;
            i.postMessage("stop", url.origin);
        });        
    }
}, false);

</script>
</head>
<body>
<center>

<table>
<tr>
<td width=60></td>
<td width=960 align=center>

{DESCRIBE}

</td>
<td width=60></td>
</tr>
</table>

<script>
var k = document.getElementsByTagName('iframe');
var j = Array.prototype.slice.call(k);
j.forEach(function(e) 
{
    e.contentWindow.addEventListener('wheel', function(evt) 
    {
        evt.preventDefault();
        return false;
    }, { passive: false });
});        

</script>
</body>

