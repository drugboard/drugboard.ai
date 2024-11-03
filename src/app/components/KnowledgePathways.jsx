"use client";
import React, { useEffect } from 'react'
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
    <section id="knowledge-pathways" className='w-full min-h-screen flex flex-col items-stretch bg-white/80 rounded-3xl border border-white'>
        <div className="w-full px-3 py-2 flex items-center justify-between border-b-2 border-white">
            <div className="flex items-center gap-1 text-black">
                <GraduationCap />
                <h1 className="font-bold text-lg">Knowledge Pathways</h1>
            </div>
       </div>

       <div className='w-full flex-1 flex items-center justify-between'>
        <div className='flex-1'>
          
        </div>
        <div className='flex-1'>
            <ProgressCard />
        </div>
       </div>
    </section>
  )
}

export default KnowledgePathways