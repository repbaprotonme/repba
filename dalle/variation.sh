curl --request POST https://api.openai.com/v1/images/variations \
  -H "Authorization: Bearer $OPENAI_KEY" \
  -F image='@a.png' \
  -F n=1 \
  -F size="1024x1024"































