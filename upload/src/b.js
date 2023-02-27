export default
{
	async fetch(request, env, ctx)
    {
        const options =
        {
          method: 'POST',
          headers:
          {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb',
              'X-Auth-Email': 'reportbase@gmail.com',
              'X-Auth-Key': 'd27e8f43b04336d419f9b85927dc1e25bb915',
          },
        };

        var response = await fetch('https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1/direct_upload', options);
        var body = await response.json();
        var action = body.result.uploadURL;

        var html =
        `<!DOCTYPE html>
         <html>
         <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css">
         <body>
           <form id="form1" name="form1"
             method="post"
             action="javascript:submit()"
             enctype="multipart/form-data">
             <input type="file" id="file1" name="file1" />
             <input type="submit" />
           </form>
           <script>
            function submit()
            {
                var form1 = document.getElementById("form1")
                form1.action="${action}"
            }

            var file1 = document.getElementById("file1");
            file1.onchange = function()
            {
                if (!this.files)
                    return;
                var reader = new FileReader();
                reader.onload = function (e)
                {
                    var img = new Image();
                    img.src = e.target.result;
                    img.onload = function ()
                    {
                        var w = this.width;//max 12000
                        var h = this.height;//max 12000
                    }
                }

                let input = this.files[0];
                reader.readAsDataURL(input);
            };
           </script>
         </body>
        </html>`;

		return new Response(html,
        {
            headers:
            {
		        'content-type': 'text/html;charset=UTF-8',
	        }
        });
	},
};
