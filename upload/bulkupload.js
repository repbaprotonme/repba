// URL where your original images are accessible
const imageOriginURL = "https://imagejam.s3.amazonaws.com/";
const images = [
    "cakes/aliet-kitchen-qrDbj7OV2EU-unsplash-ツ.jpg",
    "cakes/amirali-mirhashemian-cZFU60dKB6U-unsplash.jpg",
    // obtain the list of images to import in any way...
];

bulkUpload();

async function bulkUpload() {
    for(image_name in images) {
        await upload(image_name, process.env.CF_IMAGES_ACCOUNT_ID, process.env.CF_IMAGES_API_KEY);
    }
}

async function upload(imageName, CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY) {
    // Upload image to Cloudflare Images
    // CF Images will download the image hosted at the provided URL and store it
    // Leverages Upload by URL and Custom ID features of Cloudflare Images
    // see https://developers.cloudflare.com/images/cloudflare-images/upload-images/custom-id/

    console.log(`Uploading to Cloudflare Images: ${imageName}`);

    const body = new FormData();
    // tell CF Images to fetch this image for us
    body.append("url", imageOriginURL + imageName);
    // tell CF Images that we want our image to have this ID (ie, its current name)
    body.append("id", imageName);

    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CF_IMAGES_ACCOUNT_ID}/images/v1`,
        {
            method: "POST",
            headers: { "Authorization": `Bearer ${CF_IMAGES_API_KEY}` },
            body,
        }
    );

    if (res.status !== 200 && res.status !== 409) {
        throw new Error("HTTP " + res.status + " : " + await res.text());
    }

    if (res.status === 409) {
        // 409: image already exists, imported by a previous run
        console.log("Already exist: " + imageName);
    }
}
