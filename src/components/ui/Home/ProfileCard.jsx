"use client";
import React from 'react'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { useRouter } from 'next/navigation'

const ProfileCard = () => {
  const router = useRouter()
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
              src: "./Prasad.jpg",
            }}
            className="transition-transform text-black"
            description={(
              <p onClick={()=>router.push("/@nvd_prasad")} className='text-sm transition-all duration-750 ease-in-out text-[#C026D3] hover:text-[#C026D3] hover:underline font-semibold hover:font-bold'>
                @nvd_prasad
              </p>
            )}
            name={(
              <h1 className="font-bold">Dr. Prasad Atmuri</h1>
            )}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@nvd_prasad</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="theme">Theme (Light)</DropdownItem>
          
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
  )
}

export default ProfileCard;