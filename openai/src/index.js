export default
{
	async fetch(request, env, ctx)
    {
        let txtprompt = await request.text();
        var response = await fetch("https://api.openai.com/v1/engines/davinci/completions",
        {
            method: 'POST',
            headers:
            {
                'Authorization': 'Bearer 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',
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
        var txt = json['choices'][0].text;
        return new Response(txt,
        {
            headers:
            {
               'Access-Control-Allow-Origin': '*',
                "Content-Type": "text/plain"
            }
        });
    }
};
