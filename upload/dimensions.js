async function getImageDimensions(file) {
    let img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    let width = img.width;
    let height = img.height;
    return {
        width,
        height,
    }
  }

const {width, height } = await getImageDimensions(file)

const addImage = async (file, title, location) =>
{
   const { width, height } = await getImageDimensions(file)
   const url = await uploadToCloudStorage(file) // returns storage url
   await addToDatabase(url, width, height, title, location)
}

