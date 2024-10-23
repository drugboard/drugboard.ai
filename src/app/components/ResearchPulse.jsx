"use client";
import { useEffect, useState } from 'react'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import {useDisclosure} from "@nextui-org/react";
import PostEditorModal from '@/components/ui/ResearchPulse/PostEditorModal';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import {Ampersand, BrainCircuit, NotebookPen} from 'lucide-react';
import { useRouter } from 'next/navigation';
import db from '@/services/backend/appwrite/database.config';
import { appwriteClient } from '@/services/backend/appwrite';
import { databaseID, postsID } from '@/services/backend/constants';
import PostCard from '@/components/ui/ResearchPulse/PostCard';
import PrimaryButton from '@/components/global/PrimaryButton';

const ResearchPulse = ({currentUserData, setCurrentUserData}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [posts, setPosts] = useState(null);
  
  useEffect(() => {
    if(currentUserData){
      console.log(currentUserData)
      fetchPostsData();
    }
    const unsubscribe = appwriteClient.subscribe(
      `databases.${databaseID}.collections.${postsID}.documents`,
      (response) => {
        if (
          response?.events?.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          response?.payload &&
            setPosts((previousState) => {
              if (previousState == null) {
                return [response?.payload];
              } else {
                return [response?.payload, ...previousState];
              }
          });
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUserData]);

  const fetchPostsData = async () => {
      if(currentUserData){
        const postsData = await db.posts.getAllDocs();
        postsData?.length > 0 && setPosts(postsData);
        postsData?.length > 0 && console.log(postsData);
      }
  };

  useEffect(()=>{
    if(!currentUserData){
      console.log(currentUserData)
      setPosts(null);
    }
  }, [currentUserData])

  const navigate = useRouter();

  const goToResearchPublishing = () => {
    return navigate.push("/research_pulse/draft/123");
  }

  return (
    <section className='lg:h-screen z-10 flex flex-col gap-3 w-full'>

      {/* Research Pulse Header Band */}
        <div className="flex items-center justify-between rounded-xl">

            <div className="px-5 py-3 flex items-center gap-6 text-black border border-white rounded-full bg-white/80 backdrop-blur-3xl">
              <div className='flex items-center gap-2 text-black'>
                <ScienceRoundedIcon />
                <h1 className="font-bold font-cursive">Research Pulse</h1>
              </div>
              <Ampersand />
              <div className='flex items-center gap-2 text-black'>
                <Diversity3RoundedIcon />
                <h1 className='font-bold font-cursive'>Synergy Finder</h1>
              </div>
            </div>

            <div className='p-1 flex items-center gap-1 border border-white rounded-full bg-white/80 backdrop-blur-3xl'>
              <PrimaryButton onClick={goToResearchPublishing} startContent={<BrainCircuit size={20}/>} radius="full" className="font-semibold bg-gradient-to-tr from-[#7E22CE] via-[#C026D3] to-[#DB2777] text-white shadow-lg">
                  Publish Research
              </PrimaryButton>
              <PrimaryButton onClick={onOpen} startContent={<NotebookPen size={20}/>} radius="full" className="font-semibold bg-gradient-to-tr from-[#7E22CE] via-[#C026D3] to-[#DB2777] text-white shadow-lg">
                Create Post
              </PrimaryButton>
            </div>

            <PostEditorModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>

        <div className='flex items-start justify-between gap-3 h-full w-full overflow-y-auto'>
          
          <div className='flex flex-col gap-3 h-full rounded-md w-[50%] overflow-y-auto'>
            {posts
              ?
                  posts?.map((post) => (
                    <PostCard post={post} key={post?.$id} />
                  ))
              :
                  <div className='flex items-center justify-center p-3 w-full radius-xl bg-white/80 border border-white h-[60vh]'>
                    <img src="/noposts.png" alt="No Posts" className='h-[80%] rounded-2xl object-contain' />
                  </div>
              }  
                  {/* TODO: Skeleton UI for Post Cards... */}
          </div>

          <div className='border border-white bg-white/80 h-[500px] w-[50%] rounded-lg'>

          </div>
        </div> 

    </section>

  )
}

export default ResearchPulse;