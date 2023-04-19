let image = _4cnv.toDataURL("image/png");
fetch(`https://bucket.reportbase5836.workers.dev/gallery/screen2`,
{
  method: 'POST',
  body: image
})
