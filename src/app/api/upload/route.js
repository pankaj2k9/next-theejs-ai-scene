import { uploadFiles, createRepo, whoAmI } from "@huggingface/hub";
export const runtime = 'edge'

export async function POST(req) {


  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const formData = await req.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const credentials = {
    accessToken: process.env.NEXT_HUGGINGFACE_TOKEN,
  };

  const repo = { type: "dataset", name: process.env.NEXT_HUGGINGFACE_REPO };
  try {
    const username = (await whoAmI({ credentials })).name;

    await uploadFiles({
      repo,
      credentials,
      files: [{
        path: file.name,
        content: file.stream(),
      }],
    });

    return new Response(JSON.stringify({ success: true, message: "File uploaded successfully" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error uploading to Hugging Face Hub:', error);
    return new Response(JSON.stringify({ error: 'Upload failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}