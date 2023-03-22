const fs = require('fs');
var OPENAI_KEY = process.env.OPENAI_KEY
async function complete(txtprompt)
{
    var url = "https://api.openai.com/v1/engines/davinci/completions";
    var response = await fetch(url,
    {
        method: 'POST',
        headers:
        {
            'Authorization': `Bearer ${OPENAI_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
            "prompt": txtprompt,
            "max_tokens": 5,
            "temperature": 1,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
            "stop": "\n"})
        })

    var json = await response.json()
    console.log(json)
}

complete("To be or");
