const fs = require('fs');

async function savePhotoFromAPI()
{
    const response = await fetch(`https://reportbase.com/image/HOPE.0000/blob`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const outputFileName = `image.webp`
    fs.createWriteStream(outputFileName).write(buffer);
}

savePhotoFromAPI()

