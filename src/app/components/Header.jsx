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
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

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
    <header className='flex justify-between w-full'>

      <Link href="/" className='cursor-grab px-3 flex items-center justify-center z-50 fixed top-2 left-2 p-1  bg-black rounded-3xl border border-t-4 border-r-4 borer-white' >
        <img src="/drugboardLogoCapsule.png" alt="drugboard.ai" className='h-[90px]' />
      </Link>

      <div className='title-card ml-28 pl-8 px-6 py-3 text-[#020617] flex items-center justify-center gap-1 bg-white/80 rounded-full border-3 border-b-8 border-r-8 border-black'>
        <BrainCircuit size={32} strokeWidth={3} />
        <h2 className='font-heading uppercase text-2xl text-black font-bold px-3'>Scientific <span className='!font-black bg-gradient-to-r from-[#C026D3] to-purple-600 bg-clip-text text-transparent'>Colloboration</span></h2>
      </div>

        {/* <FloatingNavBar setCurrentUser={setCurrentUser}/> */}

        <div className='flex items-center gap-5 p-3 bg-white/80 border-1 border-white rounded-full'>

          {/* <PrimaryButton startContent={<Store size={20}/>} radius="full" className="font-semibold bg-gradient-to-tr from-[#7E22CE] via-[#C026D3] to-[#DB2777] shadow-lg">
            Become Vendor
          </PrimaryButton> */}

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