//node delete.js TEMP

const options =
{
    method: 'DELETE',
    headers:
    {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer hXCWi4iJ8wDztj3LUWqzqXyqjgPCmPypnr5Rjkjb'
    }
};

var id = "$1";
fetch(`https://reportbase.com/image/${id}`, options)


