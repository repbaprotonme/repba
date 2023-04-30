async function go()
{
    let response = await fetch('https://reportbase.com/dalle/generations',
    {
         method: 'PUT',
        headers: { "Content-Type": "application/json", },
       body: JSON.stringify({ 'prompt': 'Lion', 'n': 2, 'size': '1024x1024' })
    });

    var str = await response.text();
    console.log(str);
}

go();

