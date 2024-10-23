"use client";
import { Hash } from 'lucide-react';
import React from 'react'

const TagsListing = ({tags}) => {
  return (
    <div className='flex flex-col gap-3'>
        {
          tags?.map((tag) => (
            <p key={tag?.$id} className='w-full flex items-center gap-1 px-3 font-semibold text-purple-700'>
              <Hash size={16}/>
              <span className='line-clamp-1'>{tag?.tagName}</span>
            </p>
          ))
        }
    </div>
  )
}

export default TagsListing;