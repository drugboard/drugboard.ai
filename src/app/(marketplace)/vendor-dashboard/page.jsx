"use client";
import AppWriteAuth from "@/services/backend/appwrite/auth.service";
import { isObjEmpty } from "@/utils/Obj.util";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VendorDashboardPage = () => {
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [currentUser, setCurrentuser] = useState(null);
  const navigate = useRouter();

  useEffect(() => {

    const getCurrentUser = async () => {
      try {
        const auth = new AppWriteAuth();
        const user = await auth.getUser();
        
        if (!isObjEmpty(user)) {
          setCurrentuser(user);
          return;
        }
      } catch (error) {
        console.error(error);
        setIsDashboardLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  useEffect(()=>{
    if(currentUser){
      if(!currentUser?.prefs?.isVendor){
        navigate.replace("/vendor-onboarding");
        return;
      }else{
        setIsDashboardLoading(false);
        return;
      }
    }
  },[currentUser])

  if (isDashboardLoading) {
    return (
      <div className="absolute inset-x-0 inset-y-0 h-full w-full bg-light bg-cover bg-center bg-fixed flex items-center justify-center">
        <p className="font-heading !text-white !font-black uppercase text-5xl text-center">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center h-full w-[85%] bg-white/80 border border-white rounded-3xl p-3">
      {/* Dashboard content */}
    </main>
  );
};

export default VendorDashboardPage;