"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, LayoutDashboard } from 'lucide-react';
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

const iconComponents = {
    Store: Store,
    LayoutDashboard: LayoutDashboard
};

const navLinks = [
    {
        name: "PharmaMarket",
        icon: "Store",
        href: "/pharma-market"
    }
];

const FloatingNavBar = () => {
    const pathName = usePathname();

    return (
        <nav className="p-3 bg-white/80 border border-white shadow-xl rounded-full flex items-center gap-5">
            {navLinks?.map((navItem) => {
                const isActive = pathName.startsWith(navItem?.href);
                const IconComponent = iconComponents[navItem.icon];

                return (
                    <Tooltip 
                        key={navItem.href}
                        showArrow={true} 
                        content={navItem?.name} 
                        color='secondary' 
                        className='font-semibold'
                    >
                        <Link href={navItem?.href}>
                            <Button 
                                isIconOnly 
                                radius='full' 
                                variant={isActive ? "solid" : "bordered"} 
                                color="secondary" 
                                aria-label={navItem.name}
                            >
                                {IconComponent && (
                                    <IconComponent size={24} className={`cursor-pointer ${isActive ? "text-white" : "text-purple-700" }`} />
                                )}
                            </Button>
                        </Link>
                    </Tooltip>
                );
            })}
        </nav>
    );
};

export default FloatingNavBar;