"use client"
import React, { useEffect, useState } from 'react'
import FloatingNavBar from '@/components/global/FloatingNavBar';
import ProfileCard from '@/components/ui/Home/ProfileCard';
import {BellRing, MessageCircleMore} from 'lucide-react';
import {Button, Tooltip} from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import PrimaryButton from '@/components/global/PrimaryButton';
import { Key } from 'lucide-react';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';
import { destURL, srcURL } from '@/services/backend/constants';
import { Atom } from 'lucide-react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { isObjEmpty } from '@/utils/Obj.util';

const Header = () => {
  const [isUnlockingDrugboard, setIsUnlockingDrugboard] = useState(false);
  const router = useRouter();
  const auth = new AppWriteAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(()=>{
    const getCurrentUser = async() => {
      try {
        const auth = new AppWriteAuth();
        const user = await auth.getUser();
        if(!isObjEmpty(user)){
          setCurrentUser(user);
          console.log(user);
        }
        setPageLoading(false);
      } catch (error) {
        // navigate.push("/onboarding");
        setPageLoading(false);
        console.log("Error Type: ",error.type);
        console.log("Error: ",error);
      }
   }
    getCurrentUser();
  }, [])

  const unlockDrugboard = async() => {

    try {
      setIsUnlockingDrugboard(true);
      await auth.SignInWithGoogle(
        srcURL,
        destURL
      )
      setIsUnlockingDrugboard(false);
    } catch (error) {
      setIsUnlockingDrugboard(false)
      console.log("Error Type: ",error.type);
      console.log("Error: ",error);
    }
  }

  return (
    <header className='flex items-center justify-between w-full'>

        <div className='flex items-center justify-center gap-6 px-3 border-2 border-white bg-white/80 rounded-3xl'>
          <Link href="/" className='cursor-grab'>
            <img className='max-h-[80px] object-contain' src="/drugboardLogo.png" alt="drugboard.ai" />
          </Link>

          {/* <div className='flex items-center gap-1 mt-2'>
            <Atom strokeWidth={3} className='mt-0.5'/>
            <h2 className='font-bold text-2xl'>Scientific Collaboration</h2>
            <Sparkles strokeWidth={3} className='mt-0.5'/>
          </div> */}
        </div>

        <FloatingNavBar />

        <div className='flex items-center gap-5 p-3 bg-white/80 border-2 border-white rounded-full'>

          {
            currentUser &&
            <div className='flex items-center gap-3'>
              <Tooltip showArrow={true} content="Messages" color='secondary' className='font-semibold'>
                <Button isIconOnly radius='full' variant="bordered" color="secondary" aria-label="Messages">
                  <MessageCircleMore size={24} className="cursor-pointer text-purple-700" />

                </Button>
              </Tooltip>

              <Tooltip showArrow={true} content="Notifications" color='secondary' className='font-semibold'>
                <Button isIconOnly radius='full' variant='bordered' color="secondary" aria-label="Notifications">
                  <BellRing size={24} className="cursor-pointer text-purple-700" /> 
                  
                </Button>
              </Tooltip>
            </div>
          }


          <div className='px-2 flex items-center justify-center gap-2'>
            {currentUser
            ? <ProfileCard setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            : <div>
            <PrimaryButton isLoading={isUnlockingDrugboard} color='secondary' startContent={<Key />} onClick={unlockDrugboard}>Unlock</PrimaryButton>
            </div>
            }
          </div>
          
        </div>

    </header>
  )
}

export default Header;