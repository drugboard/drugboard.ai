"use client";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { toast } from 'react-toastify';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileCard = ({setCurrentUser, currentUser}) => {

  const {name, email} = currentUser;
  const {username, displayName, profileImage} = currentUser?.prefs;
  const router = useRouter();

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

  const navigateToAdminDashboard = () => {
    if(currentUser){
      if(currentUser?.labels?.includes("admin")){
        router.push("/dashboard");
      }else{
        return;
      }
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
              <p className='text-left w-[100px] line-clamp-1 text-sm transition-all duration-750 ease-in-out text-[#C026D3] hover:text-[#C026D3] hover:underline font-semibold hover:font-bold'>
                @{username ? username : email?.replace("@gmail.ccom", "")}
              </p>
            )}
            name={(
              <h1 className="w-[100px] text-left font-bold transition-all duration-750 ease-in-out line-clamp-1">{displayName ? displayName: name}</h1>
            )}
          />
        </DropdownTrigger>

        <DropdownMenu aria-label="User Actions" variant="flat">
          {
            currentUser?.labels?.includes('admin') && (
              <DropdownItem onClick={navigateToAdminDashboard} key="admin-dashboard" color="secondary">
                <div className="flex items-center justify-start gap-2 font-medium">
                  <Settings />
                  <p>Dashboard</p>
                </div>
              </DropdownItem>
            )
          }
          <DropdownItem onClick={logOut} key="logout" color="danger">
            <div className="flex items-center justify-start gap-2 font-medium">
              <LogOut />
              <p>Logout</p>
            </div>
          </DropdownItem>
        </DropdownMenu>

      </Dropdown>
  )
}

export default ProfileCard;