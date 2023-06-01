const fs = require('fs');
const args = process.argv;

var init =
{
  method: 'PUT',
  body: JSON.stringify({ 'prompt': 'Lion', 'n': 1, 'size': '1024x1024' }),
  headers:
  {
    'Content-Type': 'application/json',
  },
};

const fetchUrl = (init) =>
{
  return fetch(`https://dalle.reportbase5836.workers.dev`, init)
    .then(response =>
    {
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      return response.json();
    });
};

const promises =
[
  fetchUrl(init),
  fetchUrl(init),
];

Promise.all(promises)
  .then(results =>
  {
    const data1 = results[0];
    const data2 = results[1];
    const output = [...data1, ...data2];

    var j = {};
    j.data = [];
    for (var n = 0; n < output.length; ++n)
    {
        var k = {};
        k.full = output[n].url;
        k.prompt = "Prompt...";
        j.data.push(k);
    }

    console.log(JSON.stringify(j));
  })
  .catch(error =>
  {
    console.error('Error fetching data:', error);
  });

