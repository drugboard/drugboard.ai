"use client"
import React from 'react'
import FloatingNavBar from '@/components/ui/Home/FloatingNavBar';
import ProfileCard from '@/components/ui/Home/ProfileCard';
import {BellRing, MessageCircleMore} from 'lucide-react';
import {Button, Tooltip} from "@nextui-org/react";
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter();
  return (
    <header className='bg-white/60 backdrop-blur-3xl border-2 border-white rounded-lg flex items-center justify-between w-full'>
        {/* <h1 className='font-bold font-cursive text-3xl text-black '>Sciency.ai</h1> */}
        <button type='button' onClick={()=>router.push("/")} className='px-3'>
          <img src="/drugboard_capsule.png" alt="drugboard.ai" className='h-[70px]' />
        </button>
        <FloatingNavBar />
        <div className='flex items-center gap-8 py-1 px-[12px]'>
          <Tooltip showArrow={true} content="Messages" color='secondary' className='font-semibold'>
            <Button className="group relative overflow-visible" variant="flat" isIconOnly color="secondary" aria-label="Messages">
              <MessageCircleMore size={24} className="cursor-pointer text-[#A21CAF]" />
              <div className='transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 absolute -right-1 -top-1 flex items-center justify-center h-2 w-2 p-3 rounded-full bg-[#4ADE80]'>
                <span className='font-semibold text-black'>5</span>
              </div>
            </Button>
          </Tooltip>

          <Tooltip showArrow={true} content="Notifications" color='secondary' className='font-semibold'>
            <Button className="group relative overflow-visible" variant="flat" isIconOnly color="secondary" aria-label="Notifications">
              <BellRing size={24} className="cursor-pointer text-[#A21CAF]" /> 
              <div className='transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 absolute -right-1 -top-1 flex items-center justify-center h-2 w-2 p-3 rounded-full bg-[#4ADE80]'>
                <span className='font-semibold text-black'>25</span>
              </div>
            </Button>
          </Tooltip>

          <ProfileCard />
        </div>
    </header>
  )
}

export default Header;