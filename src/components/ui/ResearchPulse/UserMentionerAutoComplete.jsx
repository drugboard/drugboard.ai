"use client";
import {Autocomplete, AutocompleteItem, Avatar} from "@nextui-org/react";
import { UserRoundSearch } from 'lucide-react';
import { useEffect, useState } from "react";
import awFuncs from "@/services/backend/appwrite/functions.config";

const UserMentionerAutoComplete = ({mentionedUsers, setMentionedUsers, usersMentioned, setUsersMentioned}) => {

    const [selectedUser, setSelectedUser] = useState("");
    const [drugboardUsers, setDrugboardUsers] = useState([]);

    //Fetching all the drugboard users...
    useEffect(() => {

        const fetchAllUsers = async () => {
            try {
            const data = await awFuncs.getAllUsers.get();
            const users = data.users;
            if (users?.length > 0) {
                setDrugboardUsers(users);
                // console.log("Users: ", users);
            }
            } catch (error) {
            console.error("Error Fetching All Users:", error);
            }
        };

        fetchAllUsers();
    },[]);

    useEffect(()=>{
        if(selectedUser){
            const [userID, username, profileImage] = selectedUser?.split(" ")
            
            if(usersMentioned?.length === 0){
                setUsersMentioned([userID])
            }else{
                if(!usersMentioned?.includes(userID)){
                    const newUsersMentioned = [...usersMentioned, userID];
                    setUsersMentioned(newUsersMentioned);
                }
            }
    
            if(mentionedUsers?.length === 0){
                const newUser = {
                    userID, username, profileImage
                };
                setMentionedUsers([newUser]);
            }else{
                const existedMention = mentionedUsers?.filter((user) => user?.userID === userID);
                console.log("Existed Mentions: ",existedMention)
                if(existedMention?.length===0){
                    const newUser = {
                        userID, username, profileImage
                    }
                    const newMentionedUsers = [...mentionedUsers, newUser];
                    setMentionedUsers(newMentionedUsers);
                }
            }
        }

    },[selectedUser])

    

    return (
        <Autocomplete
        color="secondary"
        variant="flat"
        defaultItems={drugboardUsers}
        selectedKey={selectedUser}
        onSelectionChange={setSelectedUser}
        aria-label="Select for related tags"
        label={<p className="flex items-center gap-2"><UserRoundSearch className="text-purple-500" size={16}/> Search for users to mention...</p>}
        radius="full"
        >
        {(user) => (
            <AutocompleteItem key={`${user?.$id} ${user?.prefs?.username} ${user?.prefs?.profileImage}`} textValue={user?.prefs?.username}>
                <div className="flex gap-2 items-center">
                    <Avatar alt={user?.name} className="flex-shrink-0" size="sm" src={user?.prefs?.profileImage} />
                    <div className="flex flex-col">
                        <span className="line-clamp-1 text-small font-semibold">{user?.prefs?.displayName}</span>
                        <span className="line-clamp-1 text-tiny font-bold text-purple-600">@ {user?.prefs?.username}</span>
                    </div>
                </div>
            </AutocompleteItem>
        )}
        </Autocomplete>
    );
}

export default UserMentionerAutoComplete;