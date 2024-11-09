"use client";

import { BookOpenCheck, Store, University } from "lucide-react";
import Link from "next/link";
import { LayoutDashboard } from 'lucide-react';
import { usePathname } from "next/navigation";
import { ChartNoAxesCombined } from 'lucide-react';
import { Logs } from 'lucide-react';

const iconComponents = {
    Overview: ChartNoAxesCombined,
    Catalog: Logs,
    BookOpenCheck: BookOpenCheck,
};

const navLinks = [
    {
        name: "Overview",
        icon: "Overview",
        href: "/vendor-dashboard"
    },
    {
        name: "Catalog",
        icon: "Catalog",
        href: "/vendor-dashboard/catalog" 
    },
    {
        name: "Order Book",
        icon: "BookOpenCheck",
        href: "/vendor-dashboard/order-book" 
    },
];

const VendorDashboardSidebar = () => {
    const pathName = usePathname();

  return (
    <aside className='flex flex-col items-stretch gap-3 h-full bg-white/80 border-2 border-white w-[15%] rounded-3xl'>
        <Link href="/" className="cursor-grab px-3 border-b-2 border-b-white flex items-center justify-center">
          <img className="max-h-[90px] object-contain" src="/drugboardLogo.png" alt="drugboard.ai" />
        </Link>

        <nav className="p-3 flex flex-col gap-2 items-stretch">
            {navLinks?.map((navItem) => {
                const isActive = pathName === navItem.href;
                const IconComponent = iconComponents[navItem.icon];

                return (
                    
                    <Link 
                        href={navItem.href.startsWith('/') ? navItem.href : `/#${navItem.href}`}
                        key={navItem.href}
                        className={`flex items-start gap-2 transition-all duration-500 ease-in-out cursor-pointer p-3 rounded-md  ${isActive ? "bg-purple-600 text-white" : "text-black hover:text-purple-600" }`}
                    >
                        {IconComponent && (
                            <IconComponent size={24}  />
                        )}
                        <span className="font-medium">{navItem.name}</span>
                    </Link>
                );
            })}
        </nav>
    </aside>
  )
}

export default VendorDashboardSidebar;