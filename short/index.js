//https://www.okezie.dev/blog/url-shortener-on-cloudflare-workers

addEventListener('fetch', event => {
 event.respondWith(handleRequest(event.request))
})

const htmlBody = `
<html>
   <head>
       <style>
           #url {
               font-size: 2em;
               width: 100%;
               max-width: 500px;
           }
           #submit {
               font-size: 2em;
           }
       </style>
       <script>
           const submitURL = () => {
               document.getElementById("status").innerHTML="creating short url"
               //await call url for new shortlink and return
               fetch('/', {method: "POST", body: document.getElementById("url").value})
                   .then(data => data.text())
                   .then(data => {

                       console.log('ready')
                       document.getElementById("status").innerHTML="Your short URL: http://short.reportbase5836.workers.dev/" + data
                   } )
           }
       </script>
   </head>
   <body>
       <h1 id="title">URL Shortener</h1>
       <input type="text" id="url" placeholder="enter url here" />
       <button id="submit" onclick="submitURL()">Submit</button>
       <div id="status"></div>
   </body>
</html>
`

/**
* Respond with hello worker text
* @param {Request} request
*/
async function handleRequest(request) {
   if( request.method === "POST"){
       const neededURL = await  request.text()
       let cleanURL
       //add necessary protocols if needed to url
       if(!neededURL.match(/http:\/\//g) && !neededURL.match(/https:\/\//g)){
           cleanURL = "https://" + neededURL
       }
       else {
           cleanURL = neededURL
       }

       const rand = Math.random().toString(30).substr(2, 5);
       await URL_SPACE.put(rand, cleanURL)
       return new Response(rand)
   }

   if( request.method === "GET" ){
       let shortCode = request.url.replace(/https:\/\/.+?\//g, "")
       shortCode = shortCode.replace(/http:\/\/.+?\//g, "")

       if(shortCode !== "") {
           const redirectTo = await URL_SPACE.get(shortCode)
           return Response.redirect(redirectTo, 301)
       }
       else {
           return new Response( htmlBody, {
               headers: { 'content-type': 'text/html' },
           })
       }
   }

}

