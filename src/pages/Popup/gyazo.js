export const gyazo = async ({ image_url, title, url }) => {
  const client_id = 'c8d5b8c60bb10284b8ab43fe28e60fb0017d64cff2548a2fcaeb62d6b1335829';
  
  const formData = new FormData();
  formData.append('image_url', image_url);
  formData.append('client_id', client_id);
  formData.append('referer_url', url);
  formData.append('title', title);

  const response = await fetch("https://upload.gyazo.com/api/upload/easy_auth", {
    method: 'POST',
    body: formData,
  })

  const data = await response.json();
  const res = await fetch(data.get_image_url);
  return { imageUrl: res.url.replace('gyazo.com', 'i.gyazo.com') + '.png', gyazo: res.url }
}