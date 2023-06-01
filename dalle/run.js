var OPENAI_KEY = process.env.OPENAI_KEY
fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'authorization': `bearer ${OPENAI_KEY}`
  },
  body: JSON.stringify({
    'prompt': 'A cute baby sea otter',
    'n': 1,
    'size': '1024x1024'
  })
})
.then(res => res.json())
.then(json => console.log(json))
.catch(error => console.log(error))


