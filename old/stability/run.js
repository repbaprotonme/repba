const fs = require('fs');

const engineId = 'stable-diffusion-v1-5'
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
const apiKey = process.env.STABILITY_API_KEY

if (!apiKey) throw new Error('Missing Stability API key.')

async function go()
{
    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: 'A lighthouse on a cliff',
            },
          ],
          cfg_scale: 7,
          clip_guidance_preset: 'FAST_BLUE',
          height: 512,
          width: 512,
          samples: 4,
          steps: 30,
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`)
    }

    const json = (await response.json());
    console.log(json);
    //const responseJSON = (await response.json()) as GenerationResponse;

    /*
    interface GenerationResponse {
      artifacts: Array<{
        base64: string
        seed: number
        finishReason: string
      }>
    }

    const responseJSON = (await response.json()) as GenerationResponse

    responseJSON.artifacts.forEach((image, index) => {
      fs.writeFileSync(
        `v1_txt2img_${index}.png`,
        Buffer.from(image.base64, 'base64')
      )
    })
    */
}

go();
