"use client";
import AppWriteAuth from "@/services/backend/appwrite/auth.service";
import { isObjEmpty } from "@/utils/Obj.util";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VendorDashboardPage = () => {

  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [currentUser, setCurrentuser] = useState(null);

  const navigate = useRouter();

  useEffect(()=>{
    const getCurrentUser = async() => {
      try{
        const auth = new AppWriteAuth();
        const user = await auth.getUser();
        if(!isObjEmpty(user)){
          setCurrentuser(user);
          console.log(user);
        }
      }catch(error){
        console.error(error);
      }
    }
    getCurrentUser();
  }, [])

  useEffect(()=>{
    if(currentUser){
      console.log(currentUser?.prefs?.isVendor);
      if(currentUser?.prefs?.isVendor){
        setIsDashboardLoading(false);
      }else{
        navigate.replace("/vendor-dashboard/authentication");
      }
    }
  }, [currentUser]);


  return (
    <>
    {
      !isDashboardLoading ? (
        <main className="flex items-center justify-center h-full w-full">
          <p className="font-heading !text-white !font-black uppercase text-5xl text-center">Vendor Dashboard</p>
        </main>
      )
      : (
      <p className="font-heading !text-white !font-black uppercase text-5xl text-center">Loading...</p>
      ) 
    }
    </>
  )
}

export default VendorDashboardPage;