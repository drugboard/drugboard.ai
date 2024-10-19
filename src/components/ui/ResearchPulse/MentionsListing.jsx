"use client";
import React from 'react'

const MentionsListing = ({mentionedUsers}) => {
  return (
    <div className='flex flex-col gap-3'>
        {
          mentionedUsers?.map((user) => (
            <article key={user?.username} className="flex gap-2 items-center">
                <Avatar alt={user?.username} className="flex-shrink-0" size="sm" src={user?.profileImage} />
                <div className="flex flex-col">
                  <span className="line-clamp-1 font-semibold text-purple-600">@{user?.username}</span>
                </div>
            </article>
          ))
        }
    </div>
  )
}

export default MentionsListing