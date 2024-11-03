// app/api/summarize-journal-paper/route.js
import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';

// PDF text extraction function
async function extractTextFromPDF(buffer) {
  try {
    const options = {
      pagerender: function(pageData) {
        return pageData.getTextContent().then(function(textContent) {
          return textContent.items.map(item => item.str).join(' ');
        });
      }
    };

    const data = await pdf(buffer, options);
    return data.text
      .replace(/\s+/g, ' ')
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .trim();
    
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer and extract text
    const buffer = await file.arrayBuffer();
    const paperText = await extractTextFromPDF(buffer);

    // Validate extracted text
    if (!paperText || typeof paperText !== 'string') {
      throw new Error('Invalid text extracted from PDF');
    }

    // Prepare AI API request with error handling
    try {
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
      
      // Ensure we have valid content before sending response
      if (!result?.choices?.[0]?.message?.content) {
        throw new Error('Invalid response from AI API');
      }

      return NextResponse.json({
        success: true,
        analysis: result.choices[0].message.content
      });

    } catch (aiError) {
      console.error('AI processing error:', aiError);
      return NextResponse.json(
        { error: 'Error processing paper with AI service' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: error.message || 'Error processing the PDF file' },
      { status: 500 }
    );
  }
}