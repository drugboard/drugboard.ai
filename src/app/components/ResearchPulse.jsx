"use client";
import React, { useEffect, useState } from 'react'
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import { Button } from '@nextui-org/button';
import {useDisclosure} from "@nextui-org/react";
import PostEditorModal from '@/components/ui/ResearchPulse/PostEditorModal';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import {Ampersand} from 'lucide-react';
import { useRouter } from 'next/navigation';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';
import db from '@/services/backend/appwrite/database.config';
import { appwriteClient } from '@/services/backend/appwrite';
import { databaseID, postsID } from '@/services/backend/constants';
import PostCard from '@/components/ui/ResearchPulse/PostCard';
import PrimaryButton from '@/components/global/PrimaryButton';
import { NotebookPen } from 'lucide-react';

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
    <section className='z-10 flex flex-col justify-center w-full bg-white/60 backdrop-blur-3xl rounded-xl border-2 border-white'>
        <div className="px-3 py-2 flex items-center justify-between border-b-2 border-white">
            <div className="flex items-center gap-6 text-black">
              <div className='flex items-center gap-2 text-black'>
                <ScienceRoundedIcon />
                <h1 className="font-bold font-cursive text-lg">Research Pulse</h1>
              </div>
              {/* <Ampersand />
              <div className='flex items-center gap-2 text-black'>
                <Diversity3RoundedIcon />
                <h1 className='font-bold font-cursive text-lg'>Synergy Finder</h1>
              </div> */}
            </div>

            <div className='flex items-center gap-3'>
              <PrimaryButton onClick={onOpen} startContent={<NotebookPen size={20}/>} radius="full" className="font-semibold bg-gradient-to-tr from-[#7E22CE] via-[#C026D3] to-[#DB2777] text-white shadow-lg">
                Create Post
              </PrimaryButton>
            </div>

            <PostEditorModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>

        <div className='flex-1 flex gap-3 p-3'>
          <div className='flex flex-col gap-3 h-full rounded-md w-[60%] overflow-y-auto px-[8px] py-[8px]'>
            {posts
              ?
                  posts?.map((post) => (
                    <PostCard post={post} key={post?.$id} />
                  ))
              :
                  <h1>No Posts Data!</h1>
              }  
                  {/* TODO: Skeleton UI for Post Cards... */}
          </div>

          <div className='bg-white h-full w-[40%]'>

          </div>
        </div>
    </section>

  )
}

export default ResearchPulse