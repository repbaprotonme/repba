//fetch("https://api.pexels.com/v1/search?query=nature&per_page=1",{
fetch("https://api.pexels.com/v1/curated?per_page=80&page=1",{
//fetch("https://api.pexels.com/v1/photos/2014422",{
  headers: 
  {
    Authorization: "F8k2ebLZ7fIjWegfAZpNerv98JnIK7oYMkCdnXE3eqpscBKZuTFUZLoO"
  }
})
   .then(resp => {
     return resp.json()
   })
   .then(data => {
     console.log(data)
   })

