async function complete(text)
{
   let response = await fetch('https://openai.reportbase5836.workers.dev',
   {
         method: 'POST',
         body: text,
         headers: { "Content-Type": "text/plain" }
   });

    var str = await response.text();
    console.log(str);
}

complete("To be or");
