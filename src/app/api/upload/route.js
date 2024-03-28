import { uploadFiles, listFiles, whoAmI } from "@huggingface/hub";
import { getRandomPosition } from "../../components/utils";
// export const runtime = 'edge'

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
        content: file,
      }],
    });
    const fileURL = `https://huggingface.co/datasets/${process.env.NEXT_HUGGINGFACE_REPO}/resolve/main/${file.name}`;
    return new Response(JSON.stringify({ success: true, message: "File uploaded successfully", url: fileURL }), {
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
export async function GET() {

  const credentials = {
    accessToken: process.env.NEXT_HUGGINGFACE_TOKEN,
  };

  try {
    const repo = { type: "dataset", name: process.env.NEXT_HUGGINGFACE_REPO };
    const filesGenerator = listFiles({ repo, credentials });

    // Create an array to hold the files
    const files = [];
    // Use for await...of to iterate over the async generator
    for await (const file of filesGenerator) {
      if (file.path && (file.path.endsWith('.ply') || file.path.endsWith('.splat'))) {
        files.push({url: `https://huggingface.co/datasets/${process.env.NEXT_HUGGINGFACE_REPO}/resolve/main/${file.path}`, position: getRandomPosition()});
      }

    }

    return new Response(JSON.stringify({ success: true, files }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error retrieving files from Hugging Face Hub:', error);
    return new Response(JSON.stringify({ error: 'Failed to retrieve files', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}