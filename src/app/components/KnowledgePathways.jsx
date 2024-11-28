"use client";
import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
// Import mhchem extension explicitly
import 'katex/contrib/mhchem';

const KnowledgePathways = () => {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef('');

  useEffect(() => {
    let timeoutId;
    if (window.location.hash === '#knowledge-pathways') {
      const element = document.getElementById('knowledge-pathways');
      if (element) {
        timeoutId = setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
    
    return () => {
      if(timeoutId) clearTimeout(timeoutId);
    }
  }, []);

  const generateContent = async () => {
    try {
      setIsLoading(true);
      contentRef.current = '';
      setContent('');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/ai/answerTheQuestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') break;

            try {
              const parsed = JSON.parse(data);
              contentRef.current += parsed.content;
              setContent(contentRef.current);
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const markdownStyles = `
        /* Base styles for markdown content */
        .markdown-content {
            /* Typography */
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 16px;
            line-height: 1.7;
            color: #374151;
            
            /* Spacing */
            max-width: 100%;
            overflow-x: hidden;
            padding: 1rem;
            
            /* Headings */
            h1, h2, h3, h4, h5, h6 {
                margin-top: 2rem;
                margin-bottom: 1rem;
                font-weight: 600;
                line-height: 1.25;
            }
            
            h1 { font-size: 2em; border-bottom: 1px solid #e5e7eb; }
            h2 { font-size: 1.5em; }
            h3 { font-size: 1.25em; }
            
            /* Paragraphs and spacing */
            p {
                margin-bottom: 1rem;
                line-height: 1.7;
            }
            
            /* Lists */
            ul, ol {
                margin: 1rem 0;
                padding-left: 2rem;
            }
            
            li {
                margin: 0.5rem 0;
            }
            
            /* Blockquotes */
            blockquote {
                border-left: 4px solid #3b82f6;
                margin: 1rem 0;
                padding: 0.5rem 1rem;
                background-color: #eff6ff;
                color: #1e40af;
            }
            
            /* Code blocks */
            pre {
                background-color: #f3f4f6;
                padding: 1rem;
                border-radius: 0.375rem;
                overflow-x: auto;
                margin: 1rem 0;
            }
            
            /* Inline code */
            code {
                background-color: #f3f4f6;
                padding: 0.2rem 0.4rem;
                border-radius: 0.25rem;
                font-size: 0.875em;
            }
            
            /* Chemical equations and LaTeX */
            .equation-block {
                overflow-x: auto;
                padding: 1rem 0;
                margin: 1rem 0;
                text-align: center;
            }
            
            .katex-display {
                overflow-x: auto;
                padding: 0.5rem 0;
                margin: 0.5rem 0 !important;
            }
            
            .katex {
                font-size: 1.1em !important;
                text-align: left;
            }
            
            /* Tables */
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 1rem 0;
            }
            
            th, td {
                border: 1px solid #e5e7eb;
                padding: 0.75rem;
                text-align: left;
            }
            
            th {
                background-color: #f9fafb;
            }
            
            /* Links */
            a {
                color: #2563eb;
                text-decoration: none;
            }
            
            a:hover {
                text-decoration: underline;
            }
            
            /* Images */
            img {
                max-width: 100%;
                height: auto;
                margin: 1rem 0;
                border-radius: 0.375rem;
            }
        }
    `;

    const customStyles = {
      h1: ({ children }) => (
          <h1 className="text-4xl font-bold mb-6 mt-8 text-gray-800 border-b pb-2">
              {children}
          </h1>
      ),
      h2: ({ children }) => (
          <h2 className="text-3xl font-semibold mb-4 mt-6 text-gray-700">
              {children}
          </h2>
      ),
      h3: ({ children }) => (
          <h3 className="text-2xl font-medium mb-3 mt-4 text-gray-600">
              {children}
          </h3>
      ),
      blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic bg-blue-50 py-2 rounded">
              {children}
          </blockquote>
      ),
      ul: ({ children }) => (
          <ul className="list-disc pl-6 my-4 space-y-2">
              {children}
          </ul>
      ),
      li: ({ children }) => (
          <li className="text-gray-700">
              {children}
          </li>
      ),
  };
  return (
    <section id="knowledge-pathways" className='w-full h-screen flex flex-col items-stretch bg-white/80 rounded-3xl border border-white'>
      <div className="w-full px-3 py-2 flex items-center justify-between border-b border-white shadow-md">
        <div className="flex items-center gap-1 text-black">
          <GraduationCap />
          <h1 className="font-bold text-lg">Knowledge Pathways</h1>
        </div>
      </div>

      <div className="flex flex-col items-stretch gap-3 p-3 h-full w-full mx-auto overflow-y-auto">
            <div className=" bg-white rounded-2xl shadow-md p-3 flex items-stretch justify-center">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic..."
                className="flex-1 border rounded-l-xl p-3"
                disabled={isLoading}
              />
              <button
                onClick={generateContent}
                disabled={isLoading || !topic}
                className="bg-blue-500 px-4 text-white rounded-r-xl hover:bg-blue-600 disabled:bg-blue-400"
              >
                {isLoading ? 'Generating...' : 'Generate Content'}
              </button>
            </div>

            {
              content &&
              <div className="h-full bg-white w-full rounded-3xl shadow-md p-6 prose overflow-y-auto">
                <style>{markdownStyles}</style>
                
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                   components={customStyles}
                  className="markdown-content"
                >
                  {content}
                </ReactMarkdown>
              </div>
            }
      </div>
    </section>
  );
};

export default KnowledgePathways;
