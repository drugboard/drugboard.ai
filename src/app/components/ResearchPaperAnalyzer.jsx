'use client';

import { useEffect, useState, useRef } from 'react';
import { Loader2, WandSparkles, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import * as pdfjsLib from 'pdfjs-dist';

const ResearchPaperAnalyzer = () => {
  // States
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [processingStatus, setProcessingStatus] = useState('');
  
  // Refs for cleanup
  const abortControllerRef = useRef(null);
  const resultsDivRef = useRef(null);

  // Initialize PDF.js worker
  useEffect(() => {
    const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
  }, []);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Auto-scroll to bottom of results when new content arrives
  useEffect(() => {
    if (resultsDivRef.current && loading) {
      resultsDivRef.current.scrollTop = resultsDivRef.current.scrollHeight;
    }
  }, [analysis, loading]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile?.type === 'application/pdf') {
      setFile(selectedFile);
      setError(null);
      // Reset states when new file is selected
      setAnalysis('');
      setProgress(0);
      setTotalChunks(0);
      setCurrentChunk(0);
      setProcessingStatus('');
    } else {
      setError('Please upload a PDF file');
      setFile(null);
    }
  };

  const extractTextFromPDF = async (url) => {
    try {
      setProcessingStatus('Extracting text from PDF...');
      const pdf = await pdfjsLib.getDocument(url).promise;
      const numPages = pdf.numPages;
      let extractedText = '';

      for (let i = 1; i <= numPages; i++) {
        setProcessingStatus(`Processing page ${i} of ${numPages}...`);
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        extractedText += pageText + '\n\n';
      }

      return extractedText;
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  const [isInitializing, setIsInitializing] = useState(false);

// Frontend: ResearchPaperAnalyzer.jsx
const analyseResearchJournal = async(event) => {
  event.preventDefault();
  if (!file) return;

  setLoading(true);
  setError(null);
  setAnalysis('');
  setProgress(0);
  setProcessingStatus('Initializing analysis...');

  try {
    const fileUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    
    setProcessingStatus('Extracting text from PDF...');
    const extractedText = await extractTextFromPDF(fileUrl);
    
    setProcessingStatus('Sending to analysis server...');
    const formData = new FormData();
    formData.append('textFromPDF', extractedText);

    const response = await fetch('/api/summarize-journal-paper', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'text/event-stream',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to process paper');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        console.log('Stream complete');
        break;
      }

      const text = decoder.decode(value);
      const lines = text.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(5));
            console.log('Received data:', data);

            if (data.type === 'status') {
              setProcessingStatus(data.token);
            }
            else if (data.type === 'content') {
              setAnalysis(prev => prev + data.token);
              if (data.progress) {
                setProgress(data.progress);
              }
            }
            else if (data.type === 'complete') {
              setProgress(100);
              setProcessingStatus('Analysis complete');
            }
            else if (data.type === 'error') {
              throw new Error(data.token);
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }
    }
  } catch (err) {
    setError(err.message || 'Error processing the paper');
    console.error('Analysis error:', err);
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
      <ul className="list-disc pl-6 flex flex-col gap-1 items-start break-words">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal flex flex-col gap-1 items-start pl-6 break-words">
        {children}
      </ol>
    ),
    // Handle list items
    li: ({ children }) => (
      <li className="whitespace-pre-wrap break-words">
        {children}
      </li>
    ),
    // Add specific components for chemical formulas
  chem: ({ children }) => (
    <span className="font-mono">{children}</span>
  ),
  
  // Improve code block handling
  code: ({ inline, className, children }) => {
    const match = /language-(\w+)/.exec(className || '');
    const isChemistry = match && match[1] === 'chemistry';

    if (inline) {
      return (
        <code className="px-1 py-0.5 rounded bg-gray-100 font-mono text-sm">
          {children}
        </code>
      );
    }

    if (isChemistry) {
      return (
        <div className="my-4 p-4 bg-gray-50 rounded-lg font-mono overflow-x-auto">
          {children}
        </div>
      );
    }

    return (
      <pre className="my-4 p-4 bg-gray-50 rounded-lg overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    );
  },

  // Add special handling for chemical reactions
  pre: ({ children }) => {
    if (typeof children === 'string' && children.includes('→')) {
      return (
        <div className="my-4 p-4 bg-purple-50 rounded-lg font-mono text-center">
          {children}
        </div>
      );
    }
    return <pre className="overflow-x-auto">{children}</pre>;
  }
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

              {/* Error Display */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Status Display */}
            {processingStatus && loading && (
              <div className="text-sm text-purple-600">
                {processingStatus}
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

        {/* Results Section */}
        {(analysis || loading) && (
          <div 
            ref={resultsDivRef}
            className="flex-1 bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 overflow-y-auto"
          >
            {/* Progress Bar */}
            {loading && (
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm text-purple-600">
                  <span>
                    {isInitializing 
                      ? 'Initializing analysis...'
                      : `Processing chunk ${currentChunk} of ${totalChunks}`
                    }
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-sm text-purple-600 mt-2">
                  {processingStatus}
                </div>
              </div>
            )}

            {/* Analysis Content */}
            <div className="prose prose-purple max-w-none">
              <ReactMarkdown 
                components={MarkdownComponents}
                className="analysis-content"
              >
                {analysis}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchPaperAnalyzer;