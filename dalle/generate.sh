curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_KEY" \
  -d '{
    "prompt": "A cute baby sea otter",
    "n": 10,
    "size": "1024x1024"
  }'






























