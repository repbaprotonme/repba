const fs = require('fs');
var OPENAI_KEY = process.env.OPENAI_KEY
fetch('https://api.openai.com/v1/images/generations',
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'authorization': `bearer ${OPENAI_KEY}`
  },
  body: JSON.stringify({
    'prompt': 'A cute baby sea otter',
    'n': 1,
    'response_format': 'b64_json',
    'size': '1024x1024'
  })
})
.then(res => res.json())
.then(json => fs.writeFileSync("a.png",json.data[0].b64_json,{encoding: 'base64'}))
.catch(error => console.log(error))

