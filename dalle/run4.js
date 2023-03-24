const readline = require('readline');

const rl = readline.createInterface(
{
  input: process.stdin,
  output: process.stdout
});

async function upload(obj)
{
    const res = await fetch('https://reportbase.com/image/',
    {
      method: 'POST',
      headers:
      {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(obj),
    });

    const json = await res.json()
    return json.id;
}

rl.question('Please enter the text prompt: ', async (text) =>
{
   let response = await fetch('https://dalle.reportbase5836.workers.dev',
   {
         method: 'POST',
         body: text,
         headers: { "Content-Type": "text/plain" }
   });

    var json = await response.json();
    for (var n = 0; n < json.length; n++)
    {
        var id = await upload(json[n])
        json[n].id = id;
    }

    console.log(json);
  rl.close();
});


