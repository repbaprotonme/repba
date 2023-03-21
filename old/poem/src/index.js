//write a cloudflare worker  using chaptgpt to create a poem
export default
{
	async fetch(request, env, ctx)
    {
          const poem = await fetch('https://api.chapgpt.com/generate',
          {
            method: 'POST',
            body: JSON.stringify({
              prompt: 'A poem about the clouds',
              maxTokens: 100
            })
          })

          const text = await poem.text()

          return new Response(text, {
            headers: { 'content-type': 'text/plain' },
          })
        }
	},
};
