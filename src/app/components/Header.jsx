"use client"
import React, { useEffect, useState } from 'react'
import FloatingNavBar from '@/components/global/FloatingNavBar';
import ProfileCard from '@/components/ui/Home/ProfileCard';
import {BellRing, MessageCircleMore, MoonIcon, Settings, Store, SunIcon} from 'lucide-react';
import {Button, Switch, Tooltip} from "@nextui-org/react";
import { usePathname, useRouter } from 'next/navigation'
import PrimaryButton from '@/components/global/PrimaryButton';
import { Key } from 'lucide-react';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';
import { destURL, srcURL } from '@/services/backend/constants';
import Link from 'next/link';
import { isObjEmpty } from '@/utils/Obj.util';
import { Sparkles } from 'lucide-react';
import { Atom } from 'lucide-react';

const Header = ({isDarkMode, setIsDarkMode}) => {
  const [isUnlockingDrugboard, setIsUnlockingDrugboard] = useState(false);
  const router = useRouter();
  const auth = new AppWriteAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  
  const pathName = usePathname();

  useEffect(()=>{
    const getCurrentUser = async() => {
      try {
        const auth = new AppWriteAuth();
        const user = await auth.getUser();
        if(!isObjEmpty(user)){
          setCurrentUser(user);
          // console.log(user);
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

  const setToDarkMode = () => {
    if(setIsDarkMode){
      isDarkMode?setIsDarkMode(false):setIsDarkMode(true)
      return;
    }
    isDarkMode.value ? isDarkMode.value = false : isDarkMode.value = true;
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

        <div className='flex items-center gap-1'>
        
            <Switch
                isSelected={isDarkMode}
                onValueChange={setIsDarkMode}
                size="lg"
                color="success"
                thumbIcon={({ isSelected, className }) =>
                  isSelected ? (
                    <MoonIcon size={18} className={className} />
                    
                  ) : (
                    <SunIcon size={18} className={className} /> 
                  )
                }
              >
            </Switch>

          <div className='flex items-center gap-5 p-2 bg-white/80 border-2 border-white rounded-full'>
            {

              currentUser &&
              <div className='flex items-center gap-3'>
                {
                  pathName.startsWith("/pharma-market") && (
                    <>
                      {
                        !currentUser?.prefs?.isVendor
                          ? (
                            <PrimaryButton onClick={() => router.push("/vendor-dashboard")} color="secondary" startContent={<Store size={20}/>} radius="full" className="text-lg border-2 border-[#5B21B6] hover:bg-[#5B21B6] px-6 py-3 text-white shadow-lg">
                              Become Vendor
                            </PrimaryButton>
                          ) : (
                            <PrimaryButton onClick={() => router.push("/vendor-dashboard")} color="secondary" startContent={<Settings size={20}/>} radius="full" className="text-lg border-2 border-[#5B21B6] hover:bg-[#5B21B6] px-6 py-3 text-white shadow-lg">
                              Vendor Dashboard
                            </PrimaryButton>
                          ) 
                      }
                    </>
                  )
                }
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
        </div>


    </header>
  )
}

export default Header;