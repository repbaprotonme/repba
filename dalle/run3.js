const readline = require('readline');

const rl = readline.createInterface(
{
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter the text prompt: ', async (text) =>
{
    var obj =
          {
            'prompt': 'Lion',
            'n': 2,
            'size': '1024x1024'
          };

   let response = await fetch('https://dalle.reportbase5836.workers.dev',
   {
         method: 'PUT',
        headers:
       {
            "Content-Type": "application/json",
        },
       body: JSON.stringify(obj)
   });

    var str = await response.json();
    console.log(str);
  rl.close();
});


