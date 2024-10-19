"use client";
import { Link } from 'lucide-react';
import React from 'react'

const LinksListing = ({links}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
          {links?.map((link) => (
            <article key={link?.$id} className="w-full text-purple-500 px-3 py-2 transition-all duration-300 ease-in-out cursor-pointer flex flex-col gap-1 items-start bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg">
              <p  className="w-full flex flex-col items-start text-sm text-[#475569] font-semibold line-clamp-1">{link.linkTitle}</p>
              <p className="flex items-center gap-1 text-purple-500 text-tiny font-semibold">
                <Link size={12}/>
                <a className='line-clamp-1' href={`${link?.externalLink}`} target='_blank'>{link.externalLink}</a>
              </p>
            </article>
          ))}
    </div>
  )
}

export default LinksListing;