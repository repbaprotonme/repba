write a cloudflare worker using chaptgpt to create a poem from text prompt

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request)
{
  // get the text prompt
  let text = await request.text();

  // generate the poem using chaptgpt
  let poem = await generatePoem(text);

  // return the poem
  return new Response(poem, {
    headers: { 'content-type': 'text/plain' },
  })
}

async function generatePoem(text) {
  // make a request to the chaptgpt endpoint
  let response = await fetch('https://chaptgpt.herokuapp.com/generate-poem', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  let { poem } = await response.json();
  return poem;
}

Write a bash script to run this from the command line

#!/bin/bash
# Generate poem from text prompt

# Get the text prompt
echo "Please enter the text prompt: "
read text

# Generate the poem
poem=$(curl -X POST -H "Content-Type: application/json" -d "{\"text\": \"$text\"}" https://chaptgpt.herokuapp.com/generate-poem)

# Print the poem
echo "$poem"

write a node script to run this from the command line

const readline = require('readline');
const fetch = require('node-fetch');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask user for the text prompt
rl.question('Please enter the text prompt: ', async (text) => {

  // Generate the poem
  const res = await fetch('https://chaptgpt.herokuapp.com/generate-poem', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });

  const { poem } = await res.json();

  // Print the poem
  console.log(poem);
  rl.close();
});

write a cloudflare worker and html page to run this from the command line

// Cloudflare Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let url = new URL(request.url);

  // If the request is for generate-poem, generate the poem
  if (url.pathname == '/generate-poem') {
    // get the text prompt
    let requestBody = await request.text();
    let { text } = JSON.parse(requestBody);

    // generate the poem using chaptgpt
    let poem = await generatePoem(text);

    // return the poem
    return new Response(poem, {
      headers: { 'content-type': 'text/plain' },
    })
  }

  // Otherwise, serve the HTML page
  else {
    return fetch('https://example.com/poem-generator.html');
  }
}

async function generatePoem(text) {
  // make a request to the chaptgpt endpoint
  let response = await fetch('https://chaptgpt.herokuapp.com/generate-poem', {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
  let { poem } = await response.json();
  return poem;
}

// HTML Page
<html>
  <head>
    <title>Poem Generator</title>
  </head>
  <body>
    <h1>Poem Generator</h1>
    <form>
      <label>Text Prompt:</label>
      <input type="text" id="textInput" />
      <button type="submit" onclick="generatePoem()">Generate Poem</button>
    </form>
    <p id="poemOutput"></p>
    <script>
      async function generatePoem() {
        // get the text prompt
        let text = document.getElementById('textInput').value;

        // make a request to the Cloudflare worker
        let response = await fetch('/generate-poem', {
          method: 'POST',
          body: JSON.stringify({ text }),
        });
        let poem = await response.text();

        // display the poem
        document.getElementById('poemOutput').innerText = poem;
      }
    </script>
  </body>
</html>
