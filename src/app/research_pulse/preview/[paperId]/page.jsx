"use client";
import { Send } from 'lucide-react';
import React, { useRef, useState } from 'react'

const ResearchPaperPreview = () => {
    const publishButtonRef = useRef(null); 
    const [isPaperPublishing, setIsPaperPublishing] = useState(false);
    const [isPaperPubliclyPublishing, setIsPaperPubliclyPublishing] = useState(true);

    const publishPaper = async (event) => {
        event.preventDefault();
        publishButtonRef.current.disabled = true;
        setIsPaperPublishing(true);
    
        await setTimeout(()=>{
          setIsPaperPublishing(false);
          publishButtonRef.current.disabled = false;
        }, 3000)
    
      }
  return (
    <div>
        <header>
            <button ref={publishButtonRef} onClick={publishPaper} className='flex items-center gap-3 px-5 py-2 rounded-full text-[#D946EF] hover:text-[#C026D3] bg-white border-2 border-white hover:border-[#C026D3] hover:bg-[#F8FAFC] disabled:opacity-65 disabled:cursor-wait'>
            <span className='font-bold text-lg uppercase'>{isPaperPublishing ? "Publishing..." : "Publish Paper"}</span>
            <Send />
            </button>
        </header>
    </div>
  )
}

export default ResearchPaperPreview