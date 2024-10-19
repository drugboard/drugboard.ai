'use client';
import moment from 'moment';
import {Tabs, Tab, Tooltip, Button} from "@nextui-org/react";
import FilesListing from './FilesListing';
import LinksListing from './LinksListing';
import TagsListing from './TagsListing';
import { AtSign, BookOpenCheck, Hash, Link } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ArrowBigUpDash } from 'lucide-react';
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
        <article className='flex gap-3 items-start p-3' key={post?.$id}>
            <div className="flex flex-col gap-3 h-[500px] w-[500px] rounded-lg border-2 border-white bg-white backdrop-blur-lg">
                <div className="flex-1 flex flex-col gap-2 p-3 overflow-y-scroll">

                    <h3 className="text-[#475569] text-[18px] font-bold">
                        {postTitle}
                    </h3>

                    {postDate && (
                        <p className="text-[14px] font-semibold text-[#64748B]">
                        6 min read ~ Posted on {postDate}
                        </p>
                    )}
                    <p className="flex-1 text-[#020617] text-[15px] font-semibold leading-md overflow-y-scroll">
                    {postContent}
                    </p>    

                </div>

                {/* <footer className="z-10 bg-white sticky bottom-0 inset-x-0 w-full p-3 rounded-lg border-2 border-black flex items-center justify-end">
                    
                </footer> */}
            </div>
            <div className="flex flex-col gap-3 items-stretch max-h-[500px] w-[300px] rounded-lg">
                <div className="flex flex-col gap-3 items-stretch p-3 h-full w-full rounded-lg border-2 border-white bg-white backdrop-blur-lg">
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
                            <Tooltip showArrow={true} content="Uploads PDFs" color='success' className='font-semibold'>
                                <div className="flex items-center justify-center">
                                    <BookOpenCheck/>
                                </div>
                                </Tooltip>
                            }>
                        </Tab>

                        <Tab key={"add-external-links"} title={
                            <Tooltip showArrow={true} content="Add external website links" color='success' className='font-semibold'>
                                <div className="flex items-center justify-center">
                                    <Link/>
                                </div>
                            </Tooltip>
                            }>
                        </Tab>

                                                
                        <Tab key={"add-tags"} title={
                            <Tooltip showArrow={true} content="Add tags" color='success' className='font-semibold'>
                                <div className="flex items-center justify-center">
                                    <Hash/>
                                </div>
                            </Tooltip>
                            }>
                        </Tab>
                                                

                                                
                        <Tab key={"mention-people"} title={
                            <Tooltip showArrow={true} content="Mention some awesome peers!" color='success' className='font-semibold'> 
                                <div className="flex items-center justify-center">
                                    <AtSign/>
                                </div>
                                </Tooltip>
                            }>
                        </Tab>

                    </Tabs>  

                    <div className="flex-1 flex flex-col items-stretch justify-between rounded-lg overflow-y-auto">
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
                <div className='rounded-lg border-2 border-[] bg-[] backdrop-blur-lg flex flex-col items-center justify-center p-3'>
                    <img src="/drugboardLogo.png" alt="" className='object-contain w-[270px]' />
                    <h3 className='font-cursive font-bold text-left flex items-center gap-1'><span>Powered by </span><ArrowBigUpDash /> </h3>
                </div>

                {/* User who posted */}
                {postOwner && 
                    <article className='rounded-lg border-2 border-[] bg-[] backdrop-blur-lg flex items-center justify-around gap-2 p-1'>
                        <img src={postOwner?.prefs?.profileImage} alt="" className='object-cover rounded-lg h-[60px] w-[60px]' />
                        <div className='flex flex-col items-start'>
                            <h5 className='font-semibold line-clamp-1'>{postOwner?.prefs?.displayName}</h5>
                            <p className='font-bold text-sm line-clamp-1'>@ {postOwner?.prefs?.displayName}</p>
                        </div>
                        {/* Actions on Post Owner */}
                        <div className='flex items-center gap-2'>
                            <Button isIconOnly color="secondary" aria-label="Follow this User">
                                <UserPlus size={20}/>
                            </Button>
                            <Button isIconOnly color="danger" aria-label="Block this User">
                                <ShieldHalf size={20}/>
                            </Button>
                        </div>
                    </article>
                }

                {/* Actions On Post */}
                <footer className='rounded-lg border-2 border-white bg-white backdrop-blur-lg flex flex-col items-center justify-center p-3'>
                    
                </footer>
            </div>

        </article>
    )
}

export default PostCard;