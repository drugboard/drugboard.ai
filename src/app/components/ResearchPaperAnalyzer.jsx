"use cient";

import { Loader2 } from "lucide-react";
import { useState } from "react";

const ResearchPaperAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
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

    const analyseResearchJournal = async() => {
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

            if (!response.ok) throw new Error('Failed to process paper');

            const data = await response.json();
            setAnalysis(data.analysis);
            console.log(data.analysis);
        } catch (err) {
            setError('Error processing the paper. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
  return (
    <div className='flex items-center justify-center gap-3 h-screen p-3 w-[50%] rounded-3xl border border-white bg-white/80'>

        <form onSubmit={analyseResearchJournal} className="flex flex-col gap-3 bg-white/50 backdrop-blur-xl border border-white shadow-xl rounded-3xl">
            <h1 className="text-lg font-semibold text-purple-800 p-3 border-b border-white">Analyse Research Journal:</h1>
            <div className="flex flex-col gap-3 p-3">
              <label className="block text-sm font-medium text-gray-700">
                Upload Research Paper (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!file || loading}
              className="flex items-center gap-2 rounded-full font-medium px-6 py-2 bg-purple-700 border-2 border-purple-800 text-white cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Analyze Paper'
              )}
            </button>
        </form>
                  
    </div>
  )
}

export default ResearchPaperAnalyzer