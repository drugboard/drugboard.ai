"use client";
import React, { useEffect, useState } from 'react'
import {GraduationCap} from 'lucide-react';
import ProgressCard from '@/components/ui/KnowledgePathways/ProgressCard';


const KnowledgePathways = () => {

  useEffect(() => {
    // Check if we need to scroll to this section on mount
    let timeoutId;
    if (window.location.hash === '#knowledge-pathways') {
        const element = document.getElementById('knowledge-pathways');
        if (element) {
            // Add a small delay to ensure the element is properly rendered
            timeoutId = setTimeout(() => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
    
    return () => {
      if(timeoutId)
      clearTimeout(timeoutId);
    }
  }, []);

 
  return (
    <section id="knowledge-pathways" className='w-full h-screen flex flex-col items-stretch bg-white/80 rounded-3xl border border-white'>
        <div className="w-full px-3 py-2 flex items-center justify-between border-b border-white shadow-md">
          <div className="flex items-center gap-1 text-black">
            <GraduationCap />
            <h1 className="font-bold text-lg">Knowledge Pathways</h1>
          </div>
        </div>

       <div className='w-full flex-1 flex items-center justify-between gap-3'>
        
       </div>
    </section>
  )
}

export default KnowledgePathways