"use client";
import React from 'react'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import { Button } from '@nextui-org/button';
import {useDisclosure} from "@nextui-org/react";
import PostEditorModal from '@/components/PostEditorModal';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import {Ampersand} from 'lucide-react';

const ResearchPulse = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <section className='z-10 h-[100vh] w-full bg-white/60 backdrop-blur-3xl rounded-xl border-2 border-white'>
        <div className="px-3 py-2 flex items-center justify-between border-b-2 border-white">
            <div className="flex items-center gap-6 text-black">
              <div className='flex items-center gap-2 text-black'>
                <ScienceRoundedIcon />
                <h1 className="font-bold font-cursive text-lg">Research Pulse</h1>
              </div>
              <Ampersand />
              <div className='flex items-center gap-2 text-black'>
                <Diversity3RoundedIcon />
                <h1 className='font-bold font-cursive text-lg'>Synergy Finder</h1>
              </div>
            </div>

            <Button onPress={onOpen} color="secondary">Open Modal</Button>
            <PostEditorModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
    </section>

  )
}

export default ResearchPulse