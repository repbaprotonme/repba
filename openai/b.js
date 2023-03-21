    var url = "https://api.openai.com/v1/engines/davinci/completions";
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
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


