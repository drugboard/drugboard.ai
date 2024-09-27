"use client";

import React, { useRef, useState } from 'react'
import {Textarea} from "@nextui-org/input";
import { Send } from 'lucide-react';
import {Accordion, AccordionItem} from "@nextui-org/react";
import { NotebookPen } from 'lucide-react';
import { StickyNote } from 'lucide-react';
import { BookOpenCheck } from 'lucide-react';
import { SquareActivity } from 'lucide-react';




const ResearchPaperEditor = () => {
  const publishButtonRef = useRef(null); 
  const [isPaperPublishing, setIsPaperPublishing] = useState(false);

  const [isPaperPubliclyPublishing, setIsPaperPubliclyPublishing] = useState(true);
  
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  
  const [tags, setTags] = useState([]);

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
    <div className='flex flex-col items-start gap-3 p-3'>
      <header className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-3 text-white'>
          <SquareActivity />
          <h1 className="text-white font-cursive text-xl font-bold">Research Pulse <span className='text-black/45'>/</span> <span className='text-[#052E16]'>Paper Publication</span></h1>
        </div>
        <button ref={publishButtonRef} onClick={publishPaper} className='flex items-center gap-3 px-5 py-2 rounded-full text-[#D946EF] hover:text-[#C026D3] bg-white border-2 border-white hover:border-[#C026D3] hover:bg-[#F8FAFC] disabled:opacity-65 disabled:cursor-wait'>
          <span className='font-bold text-lg uppercase'>{isPaperPublishing ? "Publishing..." : "Publish Paper"}</span>
          <Send />
        </button>
      </header>
      <div className="flex flex-row gap-3 min-h-screen w-full">
        <nav className='flex flex-col items-start gap-3 min-h-screen w-[20%] rounded-md'>
          <div className='w-full'>  
            <Accordion isCompact className='bg-white/80 backdrop-blur-md' variant="shadow">
              <AccordionItem key="frequently-edited"
                aria-label="Frequently Edited"
                startContent={<NotebookPen />}
                subtitle={<p>{"4 Frequently Edited Papers"}</p>}
                title={<p className='font-semibold'>Frequently Edited</p>}
                >
                <p>Dynamic Content Here...</p>
              </AccordionItem>

              {/* Drafts */}
              <AccordionItem key="saved-drafts"
                aria-label="Saved Drafts"
                startContent={<StickyNote />}
                subtitle={<p>{"9 Saved Drafts Papers"}</p>}
                title={<p className='font-semibold'>Saved Drafts</p>}
                >
                <p>Dynamic Content Here...</p>
              </AccordionItem>

              {/* Published */}
              <AccordionItem key="published"
                aria-label="Published"
                startContent={<BookOpenCheck />}
                subtitle={<p>{"6 Published Papers"}</p>}
                title={<p className='font-semibold'>Published</p>}
                >
                <p>Dynamic Content Here...</p>
              </AccordionItem>
              
            </Accordion>
          </div>
        </nav>
        <form className='flex flex-col items-start gap-4 border border-white rounded-lg p-3 min-h-screen w-[80%] bg-white/80 backdrop-blur-md'>
        <Textarea
            key={"title"}
            label="Paper Title"
            labelPlacement="inside"
            isRequired
            color='secondary'
            minRows={1}
            placeholder="Write the paper title..."
            className="break-words w-full mb-6 md:mb-0"
            classNames={{
              base: "",
              label: "font-bold uppercase",
              innerWrapper: "bg-transparent",
              input: [ "bg-transparent","text-3xl font-bold break-words"],
              inputWrapper: ["bg-transparent"],

            }}
            value={title}
            onValueChange={setTitle}
          />
          <Textarea
            key={"subtitle"}
            isRequired
            color='primary'
            label="subtitle"
            labelPlacement="inside"
            minRows={1}
            placeholder="Write an subtitle here..."
            className="break-words w-full mb-6 md:mb-0"
            classNames={{
              base: "",
              label: "font-bold uppercase",
              innerWrapper: "bg-transparent",
              input: [ "bg-transparent","text-xl font-semibold break-words"],
              inputWrapper: ["bg-transparent"],
            }}
            value={subtitle}
            onValueChange={setSubtitle}
          />
        </form>
      </div>
    </div>
  )
}

export default ResearchPaperEditor