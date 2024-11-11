"use client";
import React, { useState } from "react";
import {Modal, ModalContent, ModalBody, Tooltip, Textarea} from "@nextui-org/react";
import PrimaryButton from "../../global/PrimaryButton";
import {Tabs, Tab} from "@nextui-org/react";
import { BookOpenCheck, NotebookPen } from 'lucide-react';
import { Link } from 'lucide-react';
import { AtSign } from 'lucide-react';
import { Hash } from 'lucide-react';
import FileUploader from "./FileUploader";
import LinkUploader from "./LinkUploader";
import Tagger from "./Tagger";
import UserMentioner from "./UserMentioner";
import AppWriteStorage from "@/services/backend/appwrite/storage.service";
import AppWriteAuth from "@/services/backend/appwrite/auth.service";
import db from "@/services/backend/appwrite/database.config";
import { toast } from "react-toastify";

const PostEditorModal = ({isOpen, onOpenChange}) => {

    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    const [files, setFiles] = useState([]);
    const [links, setLinks] = useState([]);

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    
    const [usersMentioned, setUsersMentioned] = useState([]);
    const [mentionedUsers, setMentionedUsers] = useState([]);


    const [selected, setSelected] = React.useState("donate-files");
    const [isCreatingPost, setIsCreatingPost] = useState(false);

    const saveFiles = async () => {
        if (!files || files.length === 0) {
          return [];
        }
    
        const fileIDs = [];
        const storage = new AppWriteStorage();
        const auth = new AppWriteAuth();
    
        const filePromises = files.map(async (file) => {
          try {
            const user = await auth.getCurrentUserSession();
            if (!user) throw new Error("User not authenticated");

            // console.log(file.file);
    
            const [fileID, fileURL] = await storage.uploadFile(
              "user-post-files",
              file.file
            );
    
            const newFile = {
              fileURL,
              fileTitle: file.fileTitle,
              fileID,
              storageBucketID: "user-post-files",
              storageName: "APPWRITE",
            };
    
            const response = await db.postFiles.createDoc(newFile);
            fileIDs.push(response.$id);
          } catch (err) {
            //TODO: Toast the error message.
              console.error("Error during file upload:", err);
          }
        });
    
        await Promise.all(filePromises);
        return fileIDs;
      };
    
    
      const saveLinks = async () => {
        if (!links || links.length === 0) {
          return [];
        }
    
        const linkIDs = [];
        const auth = new AppWriteAuth();
    
        const linkPromises = links.map(async (link) => {
          try {
            const user = await auth.getCurrentUserSession();
            if (!user) throw new Error("User not authenticated");
    
            const newLink = {
              externalLink: link.link,
              linkTitle: link.linkTitle,
            };
    
            const response = await db.postLinks.createDoc(newLink);
            linkIDs.push(response.$id);
          } catch (err) {
            console.error("Error in saving link:", err.message);
          }
        });
    
        await Promise.all(linkPromises);
        return linkIDs;
      };
    
    
      //Creating the New Post.
      const createPost = async (closePostEditorModal) => {
        setIsCreatingPost(true);

        //TODO: Disable all the Input Fields and Buttons in the Post Editor!

        const auth = new AppWriteAuth();
    
        try {
          const user = await auth.getCurrentUserSession();
          if (!user) throw new Error("User not authenticated");
    
          const [postFiles, postLinks] = await Promise.all([
            saveFiles(),
            saveLinks(),
          ]);

          let newPost = {
            postTitle,
            postContent,
            postTags: tags,
            postFiles: postFiles?.length ? postFiles : files,
            postLinks: postLinks?.length ? postLinks : links,
            postedByUserID: user.userId,
            postMentions: usersMentioned,
          };

          if(!postContent){
            toast.error("Post Content can't be empty.");
            return setIsCreatingPost(false);
          }

            const post = await db.posts.createDoc(newPost);
            if(post){
              console.log("Saved post:", post);
              clearPostEditor();
              setIsCreatingPost(false);
              closePostEditorModal();
              toast.success("New Post is created. ✨");
            }
        } catch (err) {
            setIsCreatingPost(false);
            toast.error("Sorry! Something went wrong.");
            toast.info("Please try creating post again!");
            console.error("Error in saving post:", err.message);
        }
      };

      const clearPostEditor = () => {
        setPostTitle("");
        setPostContent("");
        setFiles([]);
        setLinks([]);
        setTags([]);
        setSelectedTags([]);
        setUsersMentioned([]);
        setMentionedUsers([]);
      }


    return(
        <Modal
        size={"full"} 
        backdrop={"blur"} 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6 flex flex-row items-center",
          base: "bg-transparent text-[#a8b0d3] flex items-center justify-center",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        >
            <ModalContent>
                {
                    (onClose)=>(
                        <>
                            <ModalBody>
                                <form className="flex gap-3">
                                
                                  <div className="flex flex-col gap-3 h-[500px] w-[500px] rounded-3xl border-2 border-white bg-white backdrop-blur-lg">

                                      <div className="flex-1 flex flex-col gap-3 p-3 overflow-y-scroll">
                                          <Textarea
                                              key={"postTitle"}
                                              label="Post Title"
                                              labelPlacement="inside"
                                              isRequired
                                              minRows={2}
                                              placeholder="Write the post title..."
                                              className="break-words w-full mb-6 md:mb-0"
                                              classNames={{
                                              base: "",
                                              label: "font-bold uppercase",
                                              innerWrapper: "bg-transparent",
                                              input: [ "bg-transparent","text-xl font-semibold break-words","placeholder:text-default-700/50"],
                                              inputWrapper: ["bg-transparent"],

                                              }}
                                              value={postTitle}
                                              onValueChange={setPostTitle}
                                          />

                                          <Textarea
                                              key={"postContent"}
                                              label="Post Content"
                                              labelPlacement="inside"
                                              isRequired
                                              minRows={30}
                                              placeholder="Write your elloborative post Content..."
                                              className="break-words w-full mb-6 md:mb-0"
                                              classNames={{
                                              base: "",
                                              label: "font-bold uppercase",
                                              innerWrapper: "bg-transparent",
                                              input: [ "bg-transparent","text-md break-words", "placeholder:text-default-700/50"],
                                              inputWrapper: ["bg-transparent"],

                                              }}
                                              value={postContent}
                                              onValueChange={setPostContent}
                                          />
                                      </div>
                                      <footer className="z-10 bg-white sticky bottom-0 inset-x-0 w-full p-3 rounded-b-3xl border-t flex items-center justify-end">

                                          <PrimaryButton onClick={()=>createPost(onClose)} isLoading={isCreatingPost} startContent={<NotebookPen />} radius="full" className="text-lg font-semibold bg-gradient-to-tr from-[#A855F7] via-[#D946EF] to-[#EC4899] text-white shadow-lg">
                                            Create Post
                                          </PrimaryButton>
                                      </footer>
                                  </div>

                                  <div className="flex flex-col gap-3 items-stretch p-3 h-[500px] w-[300px] rounded-3xl border-2 border-white bg-white backdrop-blur-lg">
                                      <Tabs
                                          color="secondary" 
                                          variant="bordered"
                                          radius="full"
                                          className="flex items-center justify-center w-full"
                                          size="lg"
                                          aria-label="Tabs form"
                                          selectedKey={selected}
                                          onSelectionChange={setSelected}
                                          >
                                          
                                          <Tab key={"donate-files"} 
                                            title={
                                              <Tooltip showArrow={true} 
                                                content="Uploads PDFs" 
                                                color='success' 
                                                className='font-semibold'
                                              >
                                                <div className="flex items-center justify-center">
                                                  <BookOpenCheck/>
                                                </div>
                                              </Tooltip>
                                          }>
                                          </Tab>

                                          <Tab key={"add-external-links"} title={<Tooltip showArrow={true} content="Add external website links" color='success' className='font-semibold'>
                                              <div className="flex items-center justify-center">
                                              <Link/>
                                              </div></Tooltip>
                                          }>
                                          </Tab>

                                          
                                          <Tab key={"add-tags"} title={<Tooltip showArrow={true} content="Add tags" color='success' className='font-semibold'>
                                              <div className="flex items-center justify-center">
                                              <Hash/>
                                              </div></Tooltip>
                                          }>
                                          </Tab>
                                          

                                          
                                          <Tab key={"mention-people"} title={<Tooltip showArrow={true} content="Mention some awesome peers!" color='success' className='font-semibold'> 
                                              <div className="flex items-center justify-center">
                                              <AtSign/>
                                              </div></Tooltip>
                                          }>
                                          </Tab>
                                      </Tabs>  

                                      <div className="flex-1 flex flex-col items-stretch rounded-lg overflow-y-auto">
                                          {
                                              selected==="donate-files" && <FileUploader files={files} setFiles={setFiles}/>
                                          }
                                          {
                                              selected==="add-external-links" && <LinkUploader links={links} setLinks={setLinks}/>
                                          }
                                          {
                                              selected==="add-tags" && <Tagger tags={tags} setTags={setTags} selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
                                          }
                                          {
                                              selected==="mention-people" && <UserMentioner mentionedUsers={mentionedUsers} setMentionedUsers={setMentionedUsers} usersMentioned={usersMentioned} setUsersMentioned={setUsersMentioned}/>
                                          }
                                      </div>  
                                  </div>   
                                </form>
                            </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    )
}

export default PostEditorModal;