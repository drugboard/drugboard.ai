"use client";
import { Avatar } from '@nextui-org/react';
import UserMentionerAutoComplete from './UserMentionerAutoComplete'

/**
 * Use Debouncing technique to call the tags tables from the db.
 */

const UserMentioner = ({mentionedUsers, setMentionedUsers, usersMentioned, setUsersMentioned}) => {
  return (
    <div className='flex flex-col gap-3'>
      <UserMentionerAutoComplete 
        mentionedUsers={mentionedUsers} 
        setMentionedUsers={setMentionedUsers} 
        usersMentioned={usersMentioned} 
        setUsersMentioned={setUsersMentioned}
      />
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
    </div>
  )
}

export default UserMentioner