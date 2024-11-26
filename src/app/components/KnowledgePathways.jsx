"use client";
import React, { useState, useRef, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
// Import mhchem extension for chemical equations
import 'katex/dist/contrib/mhchem.min.js';

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

      const response = await fetch('http://localhost:8000/api/v1/ai/answerTheQuestion', {
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

  const processChemicalEquation = (text) => {
    return text.replace(/^\[(.*)\]$/, '$1')
              .replace(/\\ce{([^}]+)}/g, (match, equation) => {
                return match.startsWith('$') ? match : `$\\ce{${equation}}$`;
              });
  };
  
  const customStyles = {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-3 text-gray-800 border-b pb-2">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold my-2 text-gray-700">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-2xl font-medium my-1 text-gray-600">
        {children}
      </h3>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-2 my-2 italic bg-blue-50 py-2 rounded-xl">
        {children}
      </blockquote>
    ),

    ul: ({ children }) => (
      <ul className="list-disc pl-6 my-4 space-y-2">
        {children}
      </ul>
    ),

    li: ({ children }) => {
      if (typeof children === 'string') {
        // Process chemical equations in list items
        const parts = children.split(/(\[\\ce{[^}]+}\]|\\ce{[^}]+})/g);
        return (
          <li className="text-gray-800">
            {parts.map((part, index) => {
              if (part.match(/^\[?\\ce{[^}]+}\]?$/)) {
                return (
                  <span key={index} className='katex'>
                    {processChemicalEquation(part)}
                  </span>
                );
              }
              return part;
            })}
          </li>
        );
      }
      return <li className="text-gray-700">{children}</li>;
    },

    code: ({node, inline, className, children, ...props}) => {
      const content = String(children);
      
      // Handle chemical equations in code blocks
      if (inline && (content.includes('\\ce{') || content.match(/^\[.*\]$/))) {
        return (
          <span className='katex'>
            {processChemicalEquation(content)}
          </span>
        );
      }
      return <code className={className} {...props}>{children}</code>;
    },

    p: ({ children }) => {
      if (typeof children === 'string') {
        // Process chemical equations in list items
        const parts = children.split(/(\[\\ce{[^}]+}\]|\\ce{[^}]+})/g);
        return (
          <p className="text-gray-800">
            {parts.map((part, index) => {
              if (part.match(/^\[?\\ce{[^}]+}\]?$/)) {
                return (
                  <span key={index} className='katex'>
                    {processChemicalEquation(part)}
                  </span>
                );
              }
              return part;
            })}
          </p>
        );
      }
      return <p className="text-gray-700">{children}</p>;
    },
    
    // p: ({children}) => {
    //   if (!children) return null;
      
    //   const childrenArray = Array.isArray(children) ? children : [children];
      
    //   const processedChildren = childrenArray.map((child, index) => {
    //     if (typeof child === 'string') {
    //       // Split by chemical equations, whether they're in brackets or not
    //     const parts = child.split(/(\[\\ce{[^}]+}\]|\\ce{[^}]+})/g);
          
    //       return parts.map((part, partIndex) => {
    //         if (part.match(/^\[?\\ce{[^}]+}\]?$/)) {
    //           return (
    //             <span key={`${index}-${partIndex}`} className='katex'>
    //               {processChemicalEquation(part)}
    //             </span>
    //           );
    //         }
    //         return part;
    //       });
    //     }
    //     return child;
    //   });

    //   return (
    //     <p className="my-2">
    //       {processedChildren}
    //     </p>
    //   );
    // }
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
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[
                    [rehypeKatex, {
                      trust: true,
                      strict: false,
                      output: 'html',
                      throwOnError: false,
                      globalGroup: true,
                
                    }]
                  ]}
                  components={customStyles}
                  className="prose"
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