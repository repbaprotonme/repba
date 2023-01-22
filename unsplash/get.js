const url = "https://reportbase.com/unsplash"
const response = fetch(url, 
{
    method: "POST",
    body: JSON.stringify({"query": "guitar"}),
    headers: { 'Content-type': 'application/json' }
})
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));



