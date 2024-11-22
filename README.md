# Yap 2 Notes

Yap 2 Notes is a web application that allows students to upload lecture videos or audio recordings and generate neatly formatted Markdown notes. The notes can be viewed directly in the browser or downloaded as a Markdown file, enabling easy study and review.

## Features

1. **Upload Lecture Media**: Users can upload video or audio files of lectures.
2. **Transcription**: Utilize (mocked) Whisper to convert uploaded media into text.
3. **Markdown Generation**: Use (mocked) GPT-4o to format the transcribed text into clean Markdown notes.
4. **View and Download Notes**: Easily view the generated Markdown within the browser and download it for offline access.
5. **Clear Inputs**: Reset the application to upload new files and generate fresh notes.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/lecture-notes-converter.git
   cd lecture-notes-converter
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

### Running the Development Server

Start the development server with one of the following commands:

Using npm:

```bash
npm run dev
```

Or using Yarn:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
