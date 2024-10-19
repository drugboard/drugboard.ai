"use client";
import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';

const ProfileCard = ({setCurrentUser, currentUser}) => {

  const router = useRouter()
  const auth = new AppWriteAuth();

  const logOut = async() => {
    try {
      const response = await auth.logOut();
      if(response){
        setCurrentUser(null);
        toast.success("Logged Out Successfully!");
      }
    } catch (error) {
      // console.log("Error: ", error);
      // console.log("Error Type: ",error.type);
      toast.error("You have already logged out!");
    }
  }

  return (
    <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              radius: "md",
              color: "secondary",
              size: "lg",
              isBordered: true,
              src: `${currentUser?.prefs?.profileImage}`
            }}
            className="transition-transform text-black"
            description={(
              <p onClick={()=>router.push(`/@${currentUser?.prefs?.username}`)} className='line-clamp-1 text-sm transition-all duration-750 ease-in-out text-[#C026D3] hover:text-[#C026D3] hover:underline font-semibold hover:font-bold'>
                @{currentUser?.prefs?.username}
              </p>
            )}
            name={(
              <h1 className="font-bold line-clamp-1">{currentUser?.prefs?.displayName}</h1>
            )}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold line-clamp-1">@nvd_prasad</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="theme">Theme (Light)</DropdownItem>
          
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem onClick={logOut} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}

export default ProfileCard;