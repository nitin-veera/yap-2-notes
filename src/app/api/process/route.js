import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Define allowed MIME types
const ALLOWED_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "video/mp4",
  "audio/m4a",
  "audio/x-m4a",
];

// Explicitly set Node.js runtime - better for file processing and OpenAI API calls
export const runtime = 'nodejs';

// Increase the maximum request size if needed
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '50mb',
  },
};

export async function POST(request) {
  console.log("Received POST request to /api/process");

  try {
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded." },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: "Unsupported file type. Please upload an MP3, WAV, MP4, or M4A file." },
        { status: 400 }
      );
    }

    // Validate file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File size exceeds 100MB limit." },
        { status: 400 }
      );
    }

    // Initialize OpenAI
    const openai = new OpenAI();
    openai.apiKey = process.env.OPENAI_API_KEY;

    // Process the file with OpenAI
    const transcriptionResponse = await openai.audio.transcriptions.create({
        file: file,
        model: "whisper-1",
    });

    const transcriptText = transcriptionResponse.text;
    console.log("Transcription completed");

    // Generate markdown
    const markdownResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages:[{
        role: "user",
        content: `Convert the following transcription into well-formatted Markdown notes:\n\n${transcriptText}`
      }],
      max_tokens: 1500,
      temperature: 0.5,
    });

    const markdown = markdownResponse.choices[0].message.content.trim();

    // Return the response
    return NextResponse.json({
      success: true,
      transcript: transcriptText,
      markdown,
    });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Failed to process the file", error: error.message },
      { status: 500 }
    );
  }
} 