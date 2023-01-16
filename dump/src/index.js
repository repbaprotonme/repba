export default {
  async fetch(request, env) {

        let url = "https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1?page=1&per_page=100";
        let options = { method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer majjgSB2awSS1-8WJ7OoRvst4gsGjfLl3Fl0kpdC' }};
        let response = await fetch(url, options)
            .then(response => {return response.json();});
        return new Response(JSON.stringify({ response }),
            {
                headers: { "Content-Type": "application/json" }
            });
    }
  }


