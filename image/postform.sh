curl --request POST \
  --url https://api.cloudflare.com/client/v4/accounts/41f6f507a22c7eec431dbc5e9670c73d/images/v1 \
  --header 'Content-Type: multipart/form-data' \
  --header 'Authorization: Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb' \
  --header 'X-Auth-Key': 'd27e8f43b04336d419f9b85927dc1e25bb915' \
  --header 'X-Auth-Email: reportbase@gmail.com' \
  --form metadata= \
  --form requireSignedURLs= \
  --form 'url=["test.webp"]'




















