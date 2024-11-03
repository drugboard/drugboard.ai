'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { WandSparkles } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { FileUp } from 'lucide-react';

const ResearchPaperAnalyzer = () => {

  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please upload a PDF file');
      setFile(null);
    }
  };

  const analyseResearchJournal = async (event) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/summarize-journal-paper', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process paper');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message || 'Error processing the paper. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Custom components for ReactMarkdown
  const MarkdownComponents = {
    // Handle paragraphs
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed whitespace-pre-wrap break-words">
        {children}
      </p>
    ),
    // Handle headings
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-purple-800 border-b pb-2">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-purple-700">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-medium mt-4 mb-2 text-purple-600">
        {children}
      </h4>
    ),
    // Handle lists
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 break-words">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 break-words">
        {children}
      </ol>
    ),
    // Handle list items
    li: ({ children }) => (
      <li className="whitespace-pre-wrap break-words leading-relaxed">
        {children}
      </li>
    ),
    // Handle chemical equations and code blocks
    code: ({ inline, children }) => (
      inline ? 
        <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-sm break-words">
          {children}
        </code>
        :
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mb-4 whitespace-pre-wrap break-words">
          <code className="font-mono text-sm">{children}</code>
        </pre>
    )
  };

  return (
    <div className="w-[50%] h-screen bg-transparent rounded-3xl">
      <div className="h-full w-full mx-auto flex flex-col items-stretch gap-2">
        
        <div className="bg-white/80 border border-white backdrop-blur-xl rounded-3xl shadow-md overflow-hidden">
          {/* Upload Form */}
          <form onSubmit={analyseResearchJournal} className="space-y-2 pb-3 flex flex-col items-center">

              <h1 className="flex items-center gap-2 text-2xl font-bold text-purple-600 border-b border-white px-6 py-3 w-full">
                <span><WandSparkles size={32}/></span>
                Chemistry Research Journal Analyzer
              </h1>
              
              <div className="space-y-2 p-3">
                <label className="block text-sm font-medium text-gray-500">
                  Upload Research Paper (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 
                           file:mr-4 file:py-2 file:px-4 file:rounded-md 
                           file:border-2 file:outline-none file:cursor-pointer file:border-purple-500 file:text-sm file:font-semibold 
                           file:bg-purple-50 file:text-purple-700 
                           hover:file:bg-purple-100 
                           transition-all duration-150"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!file || loading}
                className={`flex items-center justify-center gap-2 
                          rounded-full py-2 px-6 font-semibold
                          transition-all duration-150
                          ${
                            !file || loading
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing Paper...
                  </>
                ) : (
                  <>
                  <Sparkles />
                  Analyze Paper
                  </>
                )}
              </button>
          </form>
        </div>

        {/* Analysis Results with Enhanced Styling */}
        {analysis && (
            <div className="flex-1 p-3 bg-white/80 backdrop-blur-xl border border-white rounded-3xl w-full">
              <div className="prose prose-purple max-w-none 
                            prose-headings:break-words
                            prose-p:whitespace-pre-wrap prose-p:break-words
                            prose-li:whitespace-pre-wrap prose-li:break-words">
                {/* <ReactMarkdown 
                  components={MarkdownComponents}
                  className="analysis-content"
                >
                  {analysis}
                </ReactMarkdown> */}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ResearchPaperAnalyzer;