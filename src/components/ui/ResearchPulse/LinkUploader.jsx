"use client";
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import PrimaryButton from "@/components/global/PrimaryButton";
import { Link } from 'lucide-react';

const LinkUploader = ({links, setLinks}) => {

  const [isLinkUploaderOpen, setIsLinkUploaderOpen] = useState(false);

  
  const [linkTitle, setLinkTitle] = useState("");
  const [link, setLink] = useState("");

  const addLink = () => {
    if(linkTitle && link){
      const newLink = {
        linkTitle,
        link
      }
      if(links?.length===0){
        setLinks([newLink]);
        setIsLinkUploaderOpen(false);
      }else{
        setLinks([...links, newLink]);
        setIsLinkUploaderOpen(false);
      }
      setIsLinkUploaderOpen(false);
    }
  }

  const openLinkUploader = () => {
    setLinkTitle("");
    setLink("");
    setIsLinkUploaderOpen(true);
  }

  return (
    <div className="relative flex flex-col gap-3">
      <Popover isOpen={isLinkUploaderOpen} backdrop="blur" placement="bottom">
          <PopoverTrigger onClick={openLinkUploader}>
            <Button className="z-10 sticky top-0" radius="full" color="secondary" startContent={<Plus/>}>Add Link</Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            {(titleProps) => (
              <form {...titleProps} className="p-3 flex flex-col gap-3 w-[350px]">
                <Input
                    type="text"
                    label="Enter the link title here..."
                    color="secondary"
                    value={linkTitle}
                    onValueChange={setLinkTitle}
                    description="Eg., My Website, My Blog, My Journal Link"
                />

                <Input
                    type="text"
                    label="Enter the link here..."
                    color="secondary"
                    value={link}
                    onValueChange={setLink}
                    description="Paste the ethical and whitelist links here..."
                />

                <PrimaryButton onClick={addLink} startContent={<Plus />}>Add Link</PrimaryButton>
              </form>
            )}
          </PopoverContent>
        </Popover>

        <div className="flex flex-col gap-3 w-full">
          {links?.map((link, index) => (
            <article key={index} className="w-full text-purple-500 px-3 py-2 transition-all duration-300 ease-in-out cursor-pointer flex flex-col gap-1 items-start bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg">
              <p  className="w-full flex flex-col items-start text-sm text-[#475569] font-semibold line-clamp-1">{link.linkTitle}</p>
              <p className="flex items-center gap-1 text-purple-500 text-tiny font-semibold">
                <Link size={12}/>
                <span className="line-clamp-1">{link.link}</span>
              </p>
            </article>
          ))}
        </div>
    </div>
  )
}

export default LinkUploader;