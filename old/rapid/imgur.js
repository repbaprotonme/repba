//{"data":{"id":"oNt6tm4","deletehash":"jiu9TvOqchvvU6R"},"success":true,"status":200}[

var myHeaders = new Headers();
myHeaders.append("Authorization", "Client-ID 5107d7a8a6ff773");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

fetch("https://api.imgur.com/3/album/90ef1830bd083ba/images", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

