curl https://api.openai.com/v1/images/generations \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $OPENAI_KEY" \
  -d '{
  "prompt": "three baby boys playing hockey",
  "n": 1,
  "size": "1024x1024"
}'




























