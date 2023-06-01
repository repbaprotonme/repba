async function go()
{
    let response = await fetch('https://dalle.reportbase5836.workers.dev',
    {
         method: 'PUT',
        headers: { "Content-Type": "application/json", },
       body: JSON.stringify({ 'prompt': 'A pre-war Soviet propaganda poster in which a stern but avuncular duck warns young communists against the risks of playing outdoor sports against the werewolves of capitalism.', 'n': 2, 'size': '1024x1024' })
    });

    var str = await response.json();
    console.log(str);
}

go();

