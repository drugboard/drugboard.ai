// app/api/summarize-journal-paper/route.js
import { NextResponse } from 'next/server';
import * as pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist/build/pdf.js';

// Initialize pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

async function extractTextFromPDF(arrayBuffer) {
  if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) {
    throw new Error('Invalid PDF data provided');
  }

  try {
    // Load the PDF document
    const loadingTask = getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    // Array to store text from all pages
    let textContent = [];

    // Iterate through each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      
      // Extract text items and join them
      const pageText = content.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      textContent.push(pageText);
    }

    // Clean up and format the text
    const cleanText = textContent
      .join('\n\n')  // Add paragraph breaks between pages
      .replace(/([.!?])\s*(?=[A-Z])/g, '$1\n') // Add line breaks after sentences
      .replace(/\n{3,}/g, '\n\n')  // Normalize multiple line breaks
      .trim();

    return cleanText;

  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF: ' + error.message);
  }
}

const SYSTEM_PROMPT = `You are a chemistry research paper analyzer. Your task is to analyze the provided research paper and create a structured summary following these rules:

1. Chemical Reactions List:
   - Extract and list all chemical reactions mentioned in the paper
   - Use standard IUPAC nomenclature
   - Present reactions in a clear, equation format

2. Detailed Reaction Analysis:
   - For each reaction, provide:
     a) Complete formulation
     b) List of reactants
     c) List of reagents
     d) Products
     e) Reaction conditions
   - Explain each reaction in simple chemistry terms
   - Use standard IUPAC chemical names for all molecules

3. Research Analysis:
   - Provide a comprehensive research perspective
   - List and analyze the most cited references
   - Include relevant bibliography

Format the output as follows:
Give me the response in the Markdown format with the following sections, Use bold, italic, ordered, unordered lists, h2, h3,h4 tags in appropriate places and format the every section in beautiful hierarchy.

SECTION 1: Summarize the whole research: abstract, intro, main research, findings, observations in third person perspective. (1 page, 2000 tokens)
SECTION 2: Chemical Reactions Overview (1 page, 2000 tokens)
SECTION 3: Detailed Reaction Analysis (2 pages, 8000 tokens)
SECTION 4: Research Perspective, Future Scope and Bibliography (2 pages, 6000 tokens)

Total length should be 5-6 pages, with clear section breaks and formatted text.`;


// AI processing function
async function processWithAI(paperText) {
  if (!process.env.PPLX_AI_API_KEY || !process.env.PPLX_AI_RESEARCH_PAPER_SUMMARIZER_MODEL_CHAT) {
    throw new Error('Missing required environment variables');
  }

  const aiRequest = {
    model: process.env.PPLX_AI_RESEARCH_PAPER_SUMMARIZER_MODEL_CHAT,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT
      },
      {
        role: "user",
        content: `Please analyze the following chemistry research paper: \n\n${paperText}`
      }
    ],
    temperature: 0.2,
    max_tokens: 35000
  };

  const aiResponse = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.PPLX_AI_API_KEY}`
    },
    body: JSON.stringify(aiRequest)
  });

  if (!aiResponse.ok) {
    const errorData = await aiResponse.json();
    throw new Error(errorData.error || `AI API error: ${aiResponse.statusText}`);
  }

  const result = await aiResponse.json();
  
  if (!result?.choices?.[0]?.message?.content) {
    throw new Error('Invalid response from AI API');
  }

  return result.choices[0].message.content;
}

// Main route handler
export async function POST(request) {
  try {
    // Validate request
    if (!request || !request.formData) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: 'No valid PDF file provided' },
        { status: 400 }
      );
    }

    // Add file size validation
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'PDF file size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Process PDF directly from ArrayBuffer
    const buffer = await file.arrayBuffer();
    const paperText = await extractTextFromPDF(buffer);

    // Process with AI
    const analysis = await processWithAI(paperText);

    return NextResponse.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Error in PDF processing route:', error);
    
    const errorMessage = error.message || 'Error processing the PDF file';
    const statusCode = error.message.includes('Missing required environment') ? 500 :
                      error.message.includes('No valid PDF') ? 400 : 500;

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}