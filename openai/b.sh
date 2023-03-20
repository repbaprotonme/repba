function OpenaiFetchAPI() {
    console.log("Calling GPT3")
    var url = "https://api.openai.com/v1/engines/davinci/completions";
    var bearer = 'Bearer ' + YOUR_TOKEN
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": "Once upon a time",
            "max_tokens": 5,
            "temperature": 1,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
            "stop": "\n"
        })


    }).then(response => {
        
        return response.json()
       
    }).then(data=>{
        console.log(data)
        console.log(typeof data)
        console.log(Object.keys(data))
        console.log(data['choices'][0].text)
        
    })
        .catch(error => {
            console.log('Something bad happened ' + error)
        });

}

async* streamCompletion(prompt: string,
      parameters: any): any {
    const r = await fetch(`${openAiEndpoint}/${parameters.model}/completions`, {
      method: "POST",
      body: JSON.stringify({
        "prompt": prompt,
        "temperature": parameters.temperature,
        "max_tokens": parameters.maxTokens,
        "top_p": parameters.topP,
        "frequency_penalty": parameters.frequencyPenalty,
        "presence_penalty": parameters.presencePenalty,
        "stop": parameters.stop,
        "stream": true,
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${openAiKey}`,
      },
    });
    for await (const chunk of r.body) {
      console.log(chunk.toString());
      if (chunk.toString().includes("error")) throw Error(chunk.toString());
      if (chunk.toString().includes("DONE")) return;
      // Sometimes fail parsing JSON here :/
      const data = JSON.parse(chunk.toString().replace("data: ", ""));
      if (!data.choices || data.choices.length === 0) continue;
      yield data.choices[0].text;
    }

