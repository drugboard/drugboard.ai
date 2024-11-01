"use client";
import BenzeneAvatar from "@/components/global/BenzeneAvatar";
import Link from "next/link";

const Header = ({user}) => {

  return (
    <header className="flex items-center justify-between w-full rounded-3xl">
        {/* <div className="h-full flex items-center">
            <Link href={`/${user?.username}`} className=" cursor-pointer border border-t-4 border-r-4 borer-white rounded-2xl">
                <img className="h-[80px] object-cover rounded-2xl" src={`${user?.profileImage}`} alt={`${user?.displayName}`} />
            </Link>

            <div className="rounded-r-3xl px-6 py-3 border-t-2 border-b-8 border-r-8 border-black bg-white flex items-center justify-center">
                <h2 className="text-xl font-bold uppercase -ml-3">{user?.displayName}</h2>
            </div>
            
        </div> */}

        <BenzeneAvatar imageUrl={`${user?.profileImage}`}/>
    </header>
  )
}

export default Header