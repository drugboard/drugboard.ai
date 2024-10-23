"use client"
import React, { useState } from 'react'
import FloatingNavBar from '@/components/ui/Home/FloatingNavBar';
import ProfileCard from '@/components/ui/Home/ProfileCard';
import {BellRing, MessageCircleMore} from 'lucide-react';
import {Button, Tooltip} from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import PrimaryButton from '@/components/global/PrimaryButton';
import { Key } from 'lucide-react';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';
import { destURL, srcURL } from '@/services/backend/constants';
import { Store } from 'lucide-react';
import { ArrowRightLeft } from 'lucide-react';

const Header = ({setCurrentUser, currentUser}) => {
  const [isUnlockingDrugboard, setIsUnlockingDrugboard] = useState(false);
  const router = useRouter();
  const auth = new AppWriteAuth();

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

      <div className='p-1 text-black flex items-center gap-3 bg-white/80 rounded-xl border borer-white'>
        <button className='px-3 flex items-center justify-center' type='button' onClick={()=>router.push("/")} >
          <img src="/drugboardLogo.png" alt="drugboard.ai" className='h-[90px]' />
        </button>
        <ArrowRightLeft size={32} className='mt-3'/>
        <h2 className='font-cursive font-bold text-xl mt-3 px-3'>Scientific Colloboration</h2>
      </div>

        <FloatingNavBar setCurrentUser={setCurrentUser}/>

        <div className='flex items-center gap-5 p-3 bg-white/80 border-1 border-white rounded-full'>

          <PrimaryButton startContent={<Store size={20}/>} radius="full" className="font-semibold bg-gradient-to-tr from-[#7E22CE] via-[#C026D3] to-[#DB2777] shadow-lg">
            Become Vendor
          </PrimaryButton>

          <div className='flex items-center gap-3'>
            <Tooltip showArrow={true} content="Messages" color='secondary' className='font-semibold'>
              <Button className="group relative overflow-visible" isIconOnly radius='full' color="secondary" aria-label="Messages">
                <MessageCircleMore size={24} className="cursor-pointer text-white" />
                <div className='absolute -right-2 -top-2 flex items-center justify-center h-2 w-2 p-3 rounded-full bg-[#4ADE80]'>
                  <span className='font-semibold text-xs text-black'>5</span>
                </div>
              </Button>
            </Tooltip>

            <Tooltip showArrow={true} content="Notifications" color='secondary' className='font-semibold'>
              <Button className="group relative overflow-visible" isIconOnly radius='full' color="secondary" aria-label="Notifications">
                <BellRing size={24} className="cursor-pointer text-white" /> 
                <div className='absolute -right-2 -top-2 flex items-center justify-center h-2 w-2 p-3 rounded-full bg-[#4ADE80]'>
                  <span className='font-semibold text-xs text-black'>25</span>
                </div>
              </Button>
            </Tooltip>
          </div>

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