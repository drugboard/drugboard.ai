"use client";

import { University } from "lucide-react";
import Link from "next/link";
import { LayoutDashboard } from 'lucide-react';

const DashboardSidebar = () => {
  return (
    <aside className='flex flex-col items-stretch gap-3 h-full bg-white/80 border-2 border-white w-[15%] rounded-3xl'>
        <Link href="/" className="cursor-grab px-3 border-b-2 border-b-white flex items-center justify-center">
          <img className="max-h-[90px] object-contain" src="/drugboardLogo.png" alt="drugboard.ai" />
        </Link>

        <div className="p-3 flex flex-col gap-3 items-start">
          <Link href={"/dashboard"} className="flex gap-2 items-center font-medium">
            <LayoutDashboard />
            <p>Dashboard</p>
          </Link>
          <Link href={"/dashboard/conferences"} className="flex gap-2 items-center font-medium">
            <University />
            <p>Conferences</p>
          </Link>
        </div>
    </aside>
  )
}

export default DashboardSidebar;