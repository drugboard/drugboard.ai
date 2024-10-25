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
    <section className='lg:h-screen z-10 flex items-start gap-3 w-full'>

      {/* Research Pulse Header Band */}
        <div className="flex flex-col h-full w-[50%] rounded-2xl">

            <div className="z-20 px-3 py-2 flex items-center rounded-t-2xl justify-between text-[#020617] bg-white/80 border border-white shadow-xl">
              
              <div className='flex items-center gap-2 text-[#020617]'>
                <Brain strokeWidth={3}/>
                <h1 className="text-2xl font-heading">Research Pulse</h1>
              </div>

              <PrimaryButton onClick={onOpen} startContent={<NotebookPen size={20}/>} radius="full" className="text-lg p-6 font-semibold bg-[#7E22CE] text-white shadow-lg">
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
                  <div className='rounded-b-2xl h-full w-full bg-white/80 flex items-center justify-center'>
                    <img src="/noposts.png" alt="No Posts" className={`transition-all duration-300 ease-in-out h-full w-full rounded-b-2xl object-cover ${isPostsLoading ? 'opacity-100 transform traslate-y-0' : 'opacity-0 transform translate-y-0'}`} />
                  </div>
              }

            </div>

            <PostEditorModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>

      

        <div className='border border-white bg-white/80 h-[500px] w-[50%] rounded-2xl'>
        </div>

    </section>

  )
}

export default ResearchPulse;