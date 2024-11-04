import pdf from 'pdf-parse';

async function extractTextFromPDF(buffer) {
  try {
    // Basic options for pdf-parse
    const options = {
      pagerender: function(pageData) {
        // Return text only, no formatting
        return pageData.getTextContent().then(function(textContent) {
          return textContent.items.map(item => item.str).join(' ');
        });
      }
    };

    // Parse the PDF buffer
    const data = await pdf(buffer, options);
    
    // Return the extracted text, removing excessive whitespace
    return data.text
      .replace(/\s+/g, ' ')           // Replace multiple spaces with single space
      .replace(/(\r\n|\n|\r)/gm, ' ') // Replace line breaks with space
      .trim();                        // Remove leading/trailing whitespace
    
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF');
  }
}

export default extractTextFromPDF;