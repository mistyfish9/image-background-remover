// Cloudflare Worker - remove.bg API proxy
const REMOVE_BG_API_KEY = REMOVE_BG_KEY; // Set via Cloudflare Workers secret

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: CORS_HEADERS });
    }

    try {
      const formData = await request.formData();
      const imageFile = formData.get('image_file');

      if (!imageFile) {
        return new Response(JSON.stringify({ error: 'No image file provided' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      const bgFormData = new FormData();
      bgFormData.append('image_file', imageFile);
      bgFormData.append('size', 'auto');

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': env.REMOVE_BG_KEY,
        },
        body: bgFormData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return new Response(JSON.stringify({ error: 'remove.bg API error', detail: errorText }), {
          status: response.status,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      const imageBuffer = await response.arrayBuffer();
      return new Response(imageBuffer, {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'image/png',
          'X-Credits-Charged': response.headers.get('X-Credits-Charged') || '1',
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }
  },
};
