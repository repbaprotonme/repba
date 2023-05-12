const DIFFUSION_KEY = process.env.DIFFUSION_KEY;

var body =
{
    "key": DIFFUSION_KEY,
    "prompt": "ultra realistic close up portrait ((beautiful pale cyberpunk female with heavy black eyeliner)), blue eyes, shaved side haircut, hyper detail, cinematic lighting, magic neon, dark red city, Canon EOS R3, nikon, f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame, 8K",
    "negative_prompt": "((out of frame)), ((extra fingers)), mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), (((tiling))), ((naked)), ((tile)), ((fleshpile)), ((ugly)), (((abstract))), blurry, ((bad anatomy)), ((bad proportions)), ((extra limbs)), cloned face, (((skinny))), glitchy, ((extra breasts)), ((double torso)), ((extra arms)), ((extra hands)), ((mangled fingers)), ((missing breasts)), (missing lips), ((ugly face)), ((fat)), ((extra legs)), anime",
    "width": "512",
    "height": "512",
    "samples": "1",
    "num_inference_steps": "20",
    "safety_checker": "no",
    "enhance_prompt": "yes",
    "seed": null,
    "guidance_scale": 7.5,
    "webhook": null,
    "track_id": null
}
console.log(body);
var init =
{
  method: 'POST',
  body: JSON.stringify(body),
  headers:
  {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  redirect: 'follow'
};

fetch("https://stablediffusionapi.com/api/v3/text2img", init)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
