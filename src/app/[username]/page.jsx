"use client";
import React, { useEffect, useState } from 'react'
import HeroSection from './components/HeroSection';
import Header from './components/Header';
import { toast } from 'react-toastify';
import { getUserByUsername } from '@/lib/users/getUserByUsername';

const DrugboardUserProfile = ({params}) => {

  const [user, setUser] = useState(null)
  const [isUserProfileLoading, setIsUserProfileLoading] = useState(true);

  useEffect(()=>{
    const fetchUserProfileData = async () => {
      try{
        setIsUserProfileLoading(true);
        const user = await getUserByUsername(params?.username);
        setUser(user);
        console.log("User: ", user)
      }catch(error){
        console.log(error);
        setIsUserProfileLoading(false);
        toast.error("User Profile is Not Loading!")
      }finally{
        setIsUserProfileLoading(false);
      }
    }
    fetchUserProfileData();
  },[]);

  return (
    <>
    {
      (user && !isUserProfileLoading) ? (
        <>
          <Header user={user}/>

          <main>
            {/* Hero Section */}
            <HeroSection user={user}/>
          </main>

          <footer></footer>
        </>
      ) : (
        <div className='h-screen w-full flex items-center justify-center'>
          <h1 className='font-bold text-3xl text-white'>User Profile Loading...</h1>
        </div>
      )
    }
          
    </>
  )
}

export default DrugboardUserProfile