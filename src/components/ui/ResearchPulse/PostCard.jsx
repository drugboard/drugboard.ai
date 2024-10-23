'use client';
import moment from 'moment';
import {Tabs, Tab, Tooltip, Button} from "@nextui-org/react";
import FilesListing from './FilesListing';
import LinksListing from './LinksListing';
import TagsListing from './TagsListing';
import { AtSign, BookOpenCheck, Hash, Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import awFuncs from '@/services/backend/appwrite/functions.config';
import { ShieldHalf } from 'lucide-react';
import { UserPlus } from 'lucide-react';

const PostCard = ({post}) => {

    const {postTitle, postContent, postedByUserID, postFiles, postLinks, postTags, postMentions} = post;

    const [selected, setSelected] = useState("donate-files");

    const [postOwner, setPostOwner] = useState(null);

    let date = new Date(post.$updatedAt);
    date = moment(date).format("Do MMM, YYYY - h:mm:ss a");
    const postDate = date.toLocaleString();

    //Fetching all the drugboard users...
    useEffect(() => {

        const getPostOwner = async () => {
            try {
            const data = await awFuncs.getUserByID.get(`${postedByUserID}`);
            const user = data;
            if (user) {
                setPostOwner(user);
                console.log("Post Owner: ", user);
            }
            } catch (error) {
            console.error("Error Fetching All Users:", error);
            }
        };

        getPostOwner();
    },[]);

    return (
        <article className='flex gap-3 items-start tansition-all duration-500 ease-in-out' key={post?.$id}>
            <div className="relative flex flex-col h-[500px] w-[60%] rounded-xl border border-white bg-white/80 tansition-all duration-500 ease-in-out">
                <div className="flex-1 flex flex-col gap-2 pt-5 px-5 pb-0 overflow-y-scroll tansition-all duration-500 ease-in-out">

                    <h3 className="text-[#475569] text-[18px] font-bold tansition-all duration-500 ease-in-out">
                        {postTitle}
                    </h3>

                    {postDate && (
                        <p className="text-[14px] text-[#64748B] tansition-all duration-500 ease-in-out">
                        6 min read ~ Posted on {postDate}
                        </p>
                    )}
                    <p className="flex-1 text-[#020617] text-[15px] leading-md overflow-y-scroll tansition-all duration-500 ease-in-out">
                    {postContent}
                    </p>    

                </div>

                <footer className="z-10 bg-gradient-to-t from-white/100 via-white/50 to-white/20 absolute bottom-0 inset-x-0 h-[80px] w-full rounded-xl">
                    
                </footer>
            </div>

            <div className="flex flex-col gap-3 items-stretch justify-between h-[250px] w-[40%] rounded-xl tansition-all duration-500 ease-in-out">

                <div className="flex flex-col gap-3 items-stretch p-3 h-full w-full rounded-xl border border-white bg-white/80 tansition-all duration-500 ease-in-out">
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

                {/* Advertisement */}
                {/* <div className='rounded-lg border border-white bg-white/80 flex flex-col items-center justify-center p-3'>
                    <img src="/drugboardLogo.png" alt="" className='object-contain w-[270px]' />
                    <h3 className='font-cursive font-bold text-left flex items-center gap-1'><span>Powered by </span><ArrowBigUpDash /> </h3>
                </div> */}

                {/* User who posted */}
                {postOwner && 
                    <article className='rounded-full border border-white bg-white/80 flex items-center justify-around gap-2 p-1'>
                        <img src={postOwner?.prefs?.profileImage} alt="" className='object-cover rounded-full h-[60px] w-[60px]' />
                        <div className='flex flex-col items-start'>
                            <h5 className='font-semibold line-clamp-1'>{postOwner?.prefs?.displayName}</h5>
                            <p className='font-bold text-sm line-clamp-1'>@ {postOwner?.prefs?.username}</p>
                        </div>
                        {/* Actions on Post Owner */}
                        <div className='flex items-center gap-2 mr-2'>
                            <Tooltip showArrow={true} content={`Follow @${postOwner?.prefs?.username}`} color='secondary' className='font-semibold'>
                                <Button isIconOnly color="secondary" radius='full' aria-label={`Follow @${postOwner?.prefs?.username}`}>
                                    <UserPlus size={20}/>
                                </Button>
                            </Tooltip>
                            <Tooltip showArrow={true} content={`Block @${postOwner?.prefs?.username}`} color='secondary' className='font-semibold'>
                                <Button isIconOnly color="danger" radius='full' aria-label={`Block @${postOwner?.prefs?.username}`}>
                                    <ShieldHalf size={20}/>
                                </Button>
                            </Tooltip>
                        </div>
                    </article>
                }

                {/* Actions On Post */}
                {/* <footer className='rounded-lg border border-white bg-white/80 flex flex-col items-center justify-center p-3'>
                    
                </footer> */}
            </div>

        </article>
    )
}

export default PostCard;