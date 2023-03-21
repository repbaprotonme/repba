var fs = require("fs");
const data = new FormData();
data.append('image', fs.createReadStream('a.png'));
data.append('n', 1);
data.append('size', '1024x1024');

const options = {
  method: 'POST',
  body: data,
  headers: {
    'Authorization': 'Bearer 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',
  },
};

fetch('https://api.openai.com/v1/images/variations', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
