"use client";
import { Tab, Tabs } from '@nextui-org/tabs';
import { Presentation } from 'lucide-react';
import { Atom } from 'lucide-react';
import { useState } from 'react';

const ConferencesListing = () => {
  const [selectedConferences, setSelectedConferences] = useState("all-conferences");

  return (
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
  )
}

export default ConferencesListing