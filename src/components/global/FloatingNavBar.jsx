"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, BookOpenCheck } from 'lucide-react';
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

const iconComponents = {
    Store: Store,
    BookOpenCheck: BookOpenCheck
};

const navLinks = [
    {
        name: "PharmaMarket",
        icon: "Store",
        href: "/pharma-market"
    },
    {
        name: "KnowledgePathways",
        icon: "BookOpenCheck",
        href: "knowledge-pathways" 
    },
];

const FloatingNavBar = () => {
    const pathName = usePathname();

    const handleScroll = (e, href) => {
        // If it's the knowledge-pathways link
        if (href === 'knowledge-pathways') {
            e.preventDefault();
            
            // If we're not on the home page, first navigate to home
            if (pathName !== '/') {
                window.location.href = '/#knowledge-pathways';
                return;
            }

            // Find the element and scroll to it
            const element = document.getElementById('knowledge-pathways');
            if (element) {
                // Add smooth scroll behavior to html element
                document.documentElement.style.scrollBehavior = 'smooth';
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <nav className="p-2 bg-white/80 border border-white shadow-xl rounded-full flex items-center gap-3">
            {navLinks?.map((navItem) => {
                const isActive = pathName.startsWith('/' + navItem?.href);
                const IconComponent = iconComponents[navItem.icon];

                return (
                    <Tooltip 
                        key={navItem.href}
                        showArrow={true} 
                        content={navItem?.name} 
                        color='secondary' 
                        className='font-semibold'
                    >
                        <Link 
                            href={navItem.href.startsWith('/') ? navItem.href : `/#${navItem.href}`}
                            onClick={(e) => handleScroll(e, navItem.href)}
                        >
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