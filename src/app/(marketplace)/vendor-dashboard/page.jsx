"use client";
import { isObjEmpty } from "@/utils/Obj.util";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VendorDashboardPage = () => {
  
  const [vendor, setvendor] = useState({});
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);

  useEffect(()=>{
    const vendor = {
      name: "Sundeeep Dasari",
      email: "sundeeepdev@gmail.com",
      phone: "+916305309431"
    }
    const timeoutId = setTimeout(()=>setvendor(vendor), 5000);

    return () => {
      // Cleaup the timeout function...
      clearTimeout(timeoutId);
    }
  },[]);

  const navigate = useRouter();

  useEffect(()=>{
    if(!isObjEmpty(vendor)){
      return setIsDashboardLoading(false);
    }
    return navigate.replace('/vendor-dashboard/authentication');
  }, [vendor]);


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