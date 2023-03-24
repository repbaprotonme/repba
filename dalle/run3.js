const readline = require('readline');

const rl = readline.createInterface(
{
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter the text prompt: ', async (text) =>
{
   let response = await fetch('https://dalle.reportbase5836.workers.dev',
   {
         method: 'POST',
         body: text,
         headers: { "Content-Type": "text/plain" }
   });

    var str = await response.json();
    console.log(str);
  rl.close();
});


