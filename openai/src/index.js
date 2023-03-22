
export default
{
	async fetch(request, env, ctx)
    {
        let OPENAI_KEY = env.OPENAI_KEY;
        let PROMPTEXT = await request.text();

        var response = await fetch("https://api.openai.com/v1/completions",
        {
            method: 'POST',
            headers:
            {
                'Authorization': `Bearer ${OPENAI_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                "model": "text-davinci-003",
                "prompt": PROMPTEXT,
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
}
