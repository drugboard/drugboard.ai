"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
import KnowledgePathways from './components/KnowledgePathways';
import SmartStream from './components/SmartStream';
import EurekaMoments from './components/EurekaMoments';
import SynergyFinder from './components/SynergyFinder';
import ResearchPulse from './components/ResearchPulse';
import {Tabs, Tab} from "@nextui-org/react";
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import {Newspaper} from 'lucide-react';
import {GraduationCap} from 'lucide-react';
import Header from './components/Header';

const Home = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [selected, setSelected] = React.useState("smartstream");
  
  const navigate = useRouter();


  React.useEffect(() => {
    

    const user = "sundeep";
    setCurrentUser(user);
    if(!user){
      navigate.push('/login');
    }
    setPageLoading(false);
  }, []);

    return (
      <>
        {
          currentUser && !pageLoading?(
            <div className="w-full flex flex-col items-stretch p-[12px] gap-[12px]">
              <Header />     
              <main className='w-full flex flex-col items-center justify-center gap-[12px]'>
                <section className='h-[100vh] w-full flex flex-row gap-[12px]'>
                  <div className='h-[100vh] w-1/2 rounded-lg border-2 border-white bg-white/60 backdrop-blur-3xl p-2'>
                    <Tabs
                      color="secondary" variant="bordered"
                      radius="full"
                      size="lg"
                      aria-label="Tabs form"
                      selectedKey={selected}
                      onSelectionChange={setSelected}
                    >
                      <Tab key={"smartstream"} title={
                        <div className="flex items-center space-x-2">
                          <TipsAndUpdatesRoundedIcon/>
                          <span className="font-bold font-cursive">Smart Stream</span>
                        </div>
                      }>
                        <SmartStream />
                      </Tab>
                      <Tab key={"eurekamoments"} title={
                        <div className="flex items-center space-x-2">
                          <Newspaper />
                          <span className="font-bold font-cursive">Eureka Moments</span>
                        </div>
                      }>
                        <EurekaMoments />
                      </Tab>
                    </Tabs>
                  </div>

                  <div className='h-[100vh] w-1/2 rounded-lg border-2 border-white bg-white/60 backdrop-blur-3xl'>
                    <div className="w-full px-3 py-2 flex items-center justify-between border-b-2 border-white">
                          <div className="flex items-center gap-2 text-black">
                              <GraduationCap />
                              <h1 className="font-bold font-cursive text-lg">Knowledge Pathways</h1>
                          </div>
                    </div>
                  </div>
                </section>
                <ResearchPulse />
              </main>
            </div>
          ):
            (
              <div className='h-screen w-full flex items-center justify-center'>
                <h1 className='text-white font-bold text-2xl'>Page is Loading...</h1>
              </div>
            )
        }
      </>
        
    )
  
}

export default Home