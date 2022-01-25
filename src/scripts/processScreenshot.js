export async function parseScreenshot(file) {
  /* Wonder if we'll ever find a good solution for this */
  return file;
}

const IMGUR_CLIENT = '67e21e819d6df7c';

export async function uploadScreenshot(file) {
  if (!file) return null;
  const formdata = new FormData();
  formdata.append('image', file);
  formdata.append('type', 'file');
  const payload = {
    method: 'post',
    headers: {
      Authorization: `Client-ID ${IMGUR_CLIENT}`,
    },
    body: formdata,
  };
  try {
    const imgurResponse = await fetch('https://api.imgur.com/3/image/', payload);
    console.log(imgurResponse);
    return JSON.parse(await imgurResponse.text()).data.link;
  } catch (e) {
    console.log(e);
  }
  return null;
}
