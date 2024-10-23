"use client";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { toast } from 'react-toastify';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';

const ProfileCard = ({setCurrentUser, currentUser}) => {

  const {name, email} = currentUser;
  const {username, displayName, profileImage} = currentUser?.prefs;

  const auth = new AppWriteAuth();

  const logOut = async() => {
    try {
      const response = await auth.logOut();
      if(response){
        setCurrentUser(null);
        toast.success("Logged Out Successfully!");
      }
    } catch (error) {
      console.log("Error: ", error);
      console.log("Error Type: ",error.type);
      toast.error("You have already logged out!");
    }
  }

  return (
    <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              radius: "full",
              color: "default",
              size: "md",
              isBordered: true,
              src: `${profileImage ? profileImage:"https://cdn-icons-png.flaticon.com/512/7725/7725433.png"}`
            }}
            className="transition-transform text-black"
            description={(
              <p className='w-[100px] line-clamp-1 text-sm transition-all duration-750 ease-in-out text-[#C026D3] hover:text-[#C026D3] hover:underline font-semibold hover:font-bold'>
                @{username ? username : email}
              </p>
            )}
            name={(
              <h1 className="font-bold transition-all duration-750 ease-in-out line-clamp-1">{displayName ? displayName: name}</h1>
            )}
          />
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem onClick={logOut} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>

      </Dropdown>
  )
}

export default ProfileCard;