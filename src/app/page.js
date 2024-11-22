"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export default function Home() {
  const [file, setFile] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMarkdown("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to process the file.");
      }

      const data = await res.json();
      setMarkdown(data.markdown);
    } catch (err) {
      console.error("Upload Error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `/api/download?content=${encodeURIComponent(markdown)}`
      );
      if (!response.ok) {
        throw new Error("Failed to download the markdown file.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lecture-notes.md");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during download.");
    }
  };

  const handleClear = () => {
    setFile(null);
    setMarkdown("");
    setError("");
    document.getElementById("fileInput").value = "";
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-gray-900 via-gray-800 to-gray-900 text-foreground flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 space-y-8">
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            Yap 2 Notes
          </h1>
          <p className="text-xl text-gray-300/80 font-light">
            Transform your lectures into beautifully formatted notes in seconds
          </p>
        </header>

        <main className="space-y-8">
          <div className="space-y-3">
            <label
              htmlFor="fileInput"
              className="block text-base font-medium text-gray-200"
            >
              Upload Your Lecture
            </label>
            <div className="relative">
              <input
                type="file"
                id="fileInput"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-300
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gradient-to-r file:from-blue-500 file:to-purple-500
                  file:text-white
                  hover:file:opacity-90
                  cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2 focus:ring-offset-gray-900
                  rounded-lg
                  border border-gray-600
                  bg-gray-800/50"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`flex-1 px-8 py-4 rounded-lg text-white font-medium 
                ${loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                } 
                transform transition-all duration-200 ease-in-out
                shadow-[0_0_20px_rgba(66,153,225,0.3)]
                hover:shadow-[0_0_25px_rgba(66,153,225,0.4)]`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : "Convert to Markdown"}
            </button>
            <button
              onClick={handleClear}
              className="px-8 py-4 rounded-lg bg-gray-700 text-gray-200 font-medium 
                hover:bg-gray-600 transform transition-all duration-200 ease-in-out
                border border-gray-600"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-900/30 border border-red-500/50 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {markdown && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-200 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generated Notes
              </h2>
              <div className="prose prose-lg prose-invert max-w-none w-full overflow-y-auto p-8 
                bg-gray-800/50 rounded-xl border border-gray-700 
                shadow-inner backdrop-blur-sm">
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
              <button
                onClick={handleDownload}
                className="w-full px-8 py-4 rounded-lg 
                  bg-gradient-to-r from-emerald-500 to-teal-500 
                  text-white font-medium 
                  hover:opacity-90
                  transform transition-all duration-200 ease-in-out
                  shadow-[0_0_20px_rgba(16,185,129,0.3)]
                  hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              >
                Download Markdown
              </button>
            </div>
          )}
        </main>

        <footer className="text-center pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Yap 2 Notes. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
