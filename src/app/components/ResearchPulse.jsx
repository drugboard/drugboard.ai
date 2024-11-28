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
import { Query } from 'appwrite';
import { Brain } from 'lucide-react';

const ResearchPulse = ({currentUserData, setCurrentUserData}) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [posts, setPosts] = useState(null);
  const [isPostsLoading, setIsPostsLoading] = useState(false);


  
  useEffect(() => {
    if(currentUserData){
      // console.log(currentUserData)
      fetchPostsData();
    }
    const unsubscribe = appwriteClient.subscribe(
      `databases.${databaseID}.collections.${postsID}.documents`,
      async (response) => {
        if (
          response?.events?.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          if(response?.payload?.$id){
            const newlyAddedPostId = response?.payload?.$id;
            const newlyAddedPost = await db.posts.getDoc(newlyAddedPostId);
              setPosts((previousState) => {
                if (previousState == null) {
                  return [newlyAddedPost];
                } else {
                  console.log("Newly Added Post: ",newlyAddedPost);
                  return [newlyAddedPost, ...previousState];
                }
            });
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [currentUserData]);

  useEffect(() => {
    // Check if we need to scroll to this section on mount
    let timeoutId;
    if (window.location.hash === '#research-pulse') {
        const element = document.getElementById('research-pulse');
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


  const fetchPostsData = async () => {
      if(currentUserData){
        setTimeout(()=>setIsPostsLoading(true),100);
        const postsData = await db.posts.getAllDocs([Query.orderDesc('$createdAt')]);
        if(postsData?.length){
          setIsPostsLoading(false);
        !isPostsLoading && setTimeout(()=>setPosts(postsData), 200);
        }

        // setTimeout(()=>setIsPostsLoading(false),100);
        // postsData?.length > 0 && console.log(postsData);
      }
  };

  useEffect(()=>{
    if(!currentUserData){
      setIsPostsLoading(true);
      setPosts(null);
    }
  }, [currentUserData])

  const navigate = useRouter();

  const goToResearchPublishing = () => {
    return navigate.push("/research_pulse/draft/123");
  }

  return (
    <div id="research-pulse" className='h-screen z-10 w-[50%] flex flex-col rounded-2xl border border-white'>

      {/* Research Pulse Header Band */}

            <div className="z-20 px-3 py-2 flex items-center rounded-t-2xl justify-between text-[#020617] bg-white/80 border-b border-white shadow-md">
              
              <div className='flex items-center gap-2 text-[#020617]'>
                <Brain strokeWidth={2}/>
                <h1 className="text-lg !font-bold">Research Pulse</h1>
              </div>

              <PrimaryButton onClick={onOpen} color="secondary" startContent={<NotebookPen size={20}/>} radius="full" className="text-lg border-2 border-[#5B21B6] hover:bg-[#5B21B6] px-6 py-3 text-white shadow-lg">
                Create Post
              </PrimaryButton>

            </div>

            <div className='flex p-3 bg-white/80 flex-col justify-start gap-3 h-full rounded-b-2xl w-full overflow-y-auto'>
              {(posts?.length)
                  ?
                    posts?.map((post) => (
                      <PostCard post={post} key={post?.$id} currentUserData={currentUserData} />
                    ))

                  :
                  <div className='rounded-2xl h-full w-full bg-white/80 flex items-center justify-center'>
                    <img src="/noposts.png" alt="No Posts" className={`transition-all duration-300 ease-in-out h-full w-full rounded-2xl object-cover ${isPostsLoading ? 'opacity-100 transform traslate-y-0' : 'opacity-0 transform translate-y-0'}`} />
                  </div>
              }

            </div>

            <PostEditorModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>

  )
}

export default ResearchPulse;