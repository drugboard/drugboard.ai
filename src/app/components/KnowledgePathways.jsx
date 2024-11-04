"use client";
import React, { useEffect, useState } from 'react'
import {GraduationCap} from 'lucide-react';
import ProgressCard from '@/components/ui/KnowledgePathways/ProgressCard';
import { Tab, Tabs } from '@nextui-org/tabs';
import { Presentation } from 'lucide-react';
import { Atom } from 'lucide-react';

const KnowledgePathways = () => {
  const [selectedConferences, setSelectedConferences] = useState("all-conferences");

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

       <div className='w-full flex-1 flex items-center justify-between gap-3 p-3'>
        <div className='flex items-center justify-center bg-white/50 backdrop-blur-lg rounded-3xl h-full w-[60%]'>
          <ProgressCard />
        </div>
        <div className='h-full flex flex-col items-stretch gap-2 w-[40%] rounded-3xl backdrop-blur-lg bg-white/30'>       
            <Tabs
              color="secondary" 
              variant="solid"
              radius="full"
              className="mt-2 flex items-center justify-center w-full"
              size="lg"
              aria-label="Conferences Listing"
              selectedKey={selectedConferences}
              onSelectionChange={setSelectedConferences}
            >
              <Tab key={"all-conferences"} title={
                <div className="flex items-center space-x-2">
                  <Presentation />
                  <span className="font-medium text-lg">Conferences</span>
                </div>
              }>
              </Tab>
              <Tab key={"registered-conferences"} title={
                <div className="flex items-center space-x-2">
                  <Atom />
                  <span className="font-medium text-lg">Registered</span>
                </div>
              }>
              </Tab>
            </Tabs>
            <div className='p-2 flex-1 w-full bg-white/80 border border-white rounded-3xl'>

            </div>

        </div>
       </div>
    </section>
  )
}

export default KnowledgePathways