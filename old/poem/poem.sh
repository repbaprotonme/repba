echo "Please enter the text prompt: "
read text

poem=$(curl -X POST -H "Content-Type: application/json" -d "{\"text\": \"$text\"}" https://chaptgpt.herokuapp.com/generate-poem)
echo "$poem"



























