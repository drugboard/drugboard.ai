'use client';
import moment from 'moment';
import {Tabs, Tab, Tooltip, Button, Avatar} from "@nextui-org/react";
import FilesListing from './FilesListing';
import LinksListing from './LinksListing';
import TagsListing from './TagsListing';
import { AtSign, BookOpenCheck, Hash, Link } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import awFuncs from '@/services/backend/appwrite/functions.config';
import { ShieldHalf } from 'lucide-react';
import { UserPlus } from 'lucide-react';

const PostCard = ({post, currentUserData}) => {

    const {postTitle, postContent, postedByUserID, postFiles, postLinks, postTags, postMentions} = post;

    const [selected, setSelected] = useState("donate-files");

    const [postOwner, setPostOwner] = useState(null);

    const [isPostVisible, setIsPostVisible] = useState(false);
    const [isPostOwnerVisible, setPostOwnerIsVisible] = useState(false);
    
    let date = new Date(post.$updatedAt);
    date = moment(date).format("Do MMM, YYYY - h:mm:ss a");
    const postDate = date.toLocaleString();

    useEffect(()=>{
        setIsPostVisible(false);
        const timeoutId = setTimeout(()=>setIsPostVisible(true), 100);
        return () => clearTimeout(timeoutId);
    }, [post?.$id])

    useEffect(() => {
        let timeoutId;

        const getPostOwner = async () => {
            try {
                setPostOwnerIsVisible(false); // Reset visibility when fetching new data
                const data = await awFuncs.getUserByID.get(`${postedByUserID}`);
                if (data) {
                    setPostOwner(data);
                    // Store the timeout ID
                    timeoutId = setTimeout(() => setPostOwnerIsVisible(true), 100);
                }
            } catch (error) {
                console.error("Error Fetching Post Owner:", error);
            }
        };

        getPostOwner();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [postedByUserID]);

    return (
        <article className={`flex gap-2 items-start rounded-3xl tansition-all duration-100 ease-in-out ${isPostVisible ? 'opacity-100' : 'opacity-0'}`} key={post?.$id}>
            <div className={`relative flex flex-col h-[500px] w-[60%] rounded-3xl border border-white bg-white/80 tansition-all duration-500 ease-in-out
             ${isPostVisible ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform -translate-x-4'}
                        `}>
                <div className="flex-1 flex flex-col gap-2 pt-5 px-5 pb-0 overflow-y-scroll">

                    <h3 className="text-[#020617] text-[18px] font-bold tansition-all duration-500 ease-in-out">
                        {postTitle}
                    </h3>

                    {postDate && (
                        <p className="text-xs text-[#64748B] font-bold tansition-all duration-500 ease-in-out">
                        6 min read ~ Posted on {postDate}
                        </p>
                    )}
                    <p className="flex-1 text-[#020617] text-md leading-md overflow-y-scroll tansition-all duration-500 ease-in-out">
                    {postContent}
                    </p>    

                </div>

                <footer className="z-10 bg-gradient-to-t from-white/100 via-white/50 to-white/10 absolute bottom-0 inset-x-0 h-[80px] w-full rounded-b-3xl">
                    
                </footer>
            </div>

            <div className="flex flex-col gap-2 items-stretch justify-between h-[500px] w-[40%] rounded-3xl tansition-all duration-500 ease-in-out">

                <div className={`flex flex-col gap-3 items-stretch p-3 max-h-[250px] w-full rounded-3xl border border-white bg-white/80 tansition-all duration-500 ease-in-out ${isPostVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}
                        `}>
                    <Tabs
                        color="secondary" variant="bordered"
                        radius="full"
                        className="flex items-center justify-center w-full"
                        size="lg"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                                                
                        <Tab key={"donate-files"} title={
                            <Tooltip showArrow={true} content="Files" color='success' className='font-semibold'>
                                <div className="flex items-center justify-center">
                                    <BookOpenCheck/>
                                </div>
                                </Tooltip>
                            }>
                        </Tab>

                        <Tab key={"add-external-links"} title={
                            <Tooltip showArrow={true} content="External Links" color='success' className='font-semibold'>
                                <div className="flex items-center justify-center">
                                    <Link/>
                                </div>
                            </Tooltip>
                            }>
                        </Tab>

                                                
                        <Tab key={"add-tags"} title={
                            <Tooltip showArrow={true} content="Tags" color='success' className='font-semibold'>
                                <div className="flex items-center justify-center">
                                    <Hash/>
                                </div>
                            </Tooltip>
                            }>
                        </Tab>
                                                

                                                
                        <Tab key={"mention-people"} title={
                            <Tooltip showArrow={true} content="Users Mentioned" color='success' className='font-semibold'> 
                                <div className="flex items-center justify-center">
                                    <AtSign/>
                                </div>
                                </Tooltip>
                            }>
                        </Tab>

                    </Tabs>  

                    <div className="h-full flex flex-col items-stretch justify-between rounded-lg overflow-y-auto tansition-all duration-500 ease-in-out">
                        {
                        selected==="donate-files" && <FilesListing files={postFiles}/>
                        }
                        {
                            selected==="add-external-links" && <LinksListing links={postLinks}/>
                        }
                        {
                            selected==="add-tags" && <TagsListing tags={postTags}/>
                        }
                        {/* {
                            selected==="mention-people" && <MentionsListing mentionedUsers={mentionedUsers}/>
                        } */}
                    </div>  

                </div>

                <footer className='flex flex-col gap-2 rounded-3xl'>
                    {/* User who posted */}
                    {postOwner && 
                        <article className={`
                            transition-all duration-500 ease-in-out
                            rounded-full border border-white bg-white/80 
                            flex items-center justify-start gap-2 p-1
                            ${isPostOwnerVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
                        `}>
                            <Avatar src={postOwner?.prefs?.profileImage} size="md" />
                            <div className='flex-1 flex flex-col items-start pr-3'>
                                <h5 className='font-semibold line-clamp-1'>{postOwner?.prefs?.displayName}</h5>
                                <p className='font-bold text-sm line-clamp-1 text-purple-700'>@{postOwner?.prefs?.username}</p>
                            </div>
                            {/* Actions on Post Owner */}

                            {
                                currentUserData?.$id !== postOwner?.$id ?
                                <div className='flex items-center gap-2'>
                                    <Tooltip showArrow={true} content={`Follow @${postOwner?.prefs?.username}`} color='secondary' className='font-semibold'>
                                        <Button isIconOnly color="secondary" radius='full' aria-label={`Follow @${postOwner?.prefs?.username}`}>
                                            <UserPlus size={20}/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip showArrow={true} content={`Block @${postOwner?.prefs?.username}`} color='danger' className='font-semibold'>
                                        <Button isIconOnly color="danger" radius='full' aria-label={`Block @${postOwner?.prefs?.username}`}>
                                            <ShieldHalf size={20}/>
                                        </Button>
                                    </Tooltip>
                                </div>
                                : <p className='mr-2 bg-purple-700 text-white text-sm font-semibold px-3 py-1 rounded-full'>You</p>
                            }

                        </article>
                    }


                    <div className='p-1 rounded-3xl border bg-white/80'>

                    </div>
                </footer>
            </div>

        </article>
    )
}

export default PostCard;