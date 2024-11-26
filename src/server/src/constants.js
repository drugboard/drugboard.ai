import dotenv from 'dotenv';
dotenv.config({
    path: "./.env"
});

export const PORT = process.env.PORT;

export const CLOUDINARY_NAME = process.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.CLOUDINARY_API_SECRET;

export const MONGO_DB_URL = process.env.MONGO_DB_URL;
export const DB_NAME = process.env.DB_NAME;

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const GPT_MODEL_1 = process.env.GPT_MODEL_1;
export const GPT_MODEL_2 = process.env.GPT_MODEL_2;
export const GPT_MODEL_3 = process.env.GPT_MODEL_3;

export const get_prompt = (TOPIC) => {
    const PROMPT = `Please provide a comprehensive 2-page summary about "${TOPIC}"  
    Format Requirements:
    1. Use markdown headers (#, ##, ###) for all sections.
    2. Include at least 2-3 chemical equations using this exact format: \n $\\ce{reactants -> products}$ \n.
    3. Each equation must be in a separate line, wrapped in $ symbols.
    4. Use blockquotes (>) for important statements.
    5. Maintain logical flow and accuracy.
    6. Highlight critical terms using bold (**term**).
    
    Ensure scientific accuracy and proper LaTeX formatting throughout.

    Note:  Follow this strictly...
    1. Generate the chemical reactions seperately as an entity, don't mix it with code, blockquotes, headings, paragraphs, spans or any text formating symbols of markdown, Generate the chemical reactions in the above mentioned format only as a seperate entity in the new line.

    generate using proper LaTeX notation for all chemical equations and mathematical expressions following this exact structure:

    # Main Title: ${TOPIC}
    
    ## Introduction
    Start with a compelling introduction that includes:
    - Brief overview
    - Historical context
    - Key significance
    > Include a notable quote or fact about ${TOPIC}
    
    ## Key Concepts
    ### Core Principles
    [Explain fundamental concepts]
    
    ### Important Components
    [Break down major elements]
    
    ## Technical Details
    ### Process Overview
    [Include relevant chemical equations in the new line using LaTeX notation exactly as shown in the below]
    - Example: \n $\\ce{6 CO2 + 6 H2O + light -> C6H12O6 + 6 O2}$ \n
    
    ### Mechanisms and Reactions
    [Explain key mechanisms with chemical equations in the new line using LaTeX notation exactly as shown in the below]
    - Format all chemical equations like: \n $\\ce{2 H2O -> 2 H2 + O2}$ \n
    - Always wrap chemical equations in $ symbols
    - Use \n \\ce{} for all chemical reactions
    - Include reaction conditions and states:
      - States: \n $\\ce{H2O(l) -> H2O(g)}$ \n
      - Concentrations: \n $\\ce{[H+] + [OH-] -> H2O}$ \n
      - Catalysts: \n $\\ce{A + B ->[catalyst] C + D}$ \n
      - Reversible reactions: \n $\\ce{A + B <=> C + D}$ \n
    
    ## Applications
    ### Current Uses
    [List and explain major applications]
    
    ### Future Potential
    [Discuss emerging possibilities]
    
    ## Analysis
    ### Advantages
    - Point 1
    - Point 2
    
    ### Limitations
    - Point 1
    - Point 2
    
    ### Expert Insights
    > Include relevant expert quotes or research findings
    
    ## Conclusion
    [Summarize key points and future outlook]
`    
    return PROMPT;
}

