"use client";
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import React, { useState } from 'react'
import { File, FilePlus2 } from 'lucide-react';
import PrimaryButton from "@/components/global/PrimaryButton";
import { FileText } from 'lucide-react';
import { CircleX } from 'lucide-react';
import { IconButton } from "@mui/material";
import { FileUp } from 'lucide-react';


const FileUploader = ({files, setFiles}) => {

  const [isFileUploaderOpen, setIsFileUploaderOpen] = useState(false);

    const [fileTitle, setFileTitle] = useState("");
    const [file, setFile] = useState(null);

    const onUploadFileChange = (event) => {
      setFile(event.target.files[0]);
    }

    const removeFile = () => {
      setFile(null);
    }

    const addFile = () => {
      if(fileTitle && file){
        // TODO: Save the file in the draft files...
        const newFile = {
          fileTitle,
          file
        }

        if(files?.length===0){
          setFiles([newFile]);
          setIsFileUploaderOpen(false);
        }else{
          setFiles([...files, newFile]);
          setIsFileUploaderOpen(false);
        }

        setIsFileUploaderOpen(false);
      }
    }

    const openFileUploader = () => {
      setFileTitle("");
      setFile(null);
      setIsFileUploaderOpen(true);
    }
    

    return (
      <div className="relative flex flex-col gap-3">
        <Popover isOpen={isFileUploaderOpen}  placement="bottom">
          <PopoverTrigger onClick={openFileUploader}>
            <Button className="z-10 sticky top-0" radius="full" color="secondary" startContent={<FilePlus2/>}>Add File</Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            {(titleProps) => (
              <form {...titleProps} className="p-3 flex flex-col gap-3 w-[350px]">
                <Input
                    type="text"
                    label="Enter the file title here..."
                    color="secondary"
                    value={fileTitle}
                    onValueChange={setFileTitle}
                    description="Eg., Research Article, Inorganic 101, Jounal Doc etc.,"
                    className="max-w-xs"
                />

                <div className="flex flex-col gap-1">
                  <input onChange={onUploadFileChange} type="file" accept="application/pdf" id="pdf-file" className="hidden"/>
                  <label htmlFor="pdf-file" className="cursor-pointer p-3 text-center font-semibold text-purple-500 border border-purple-300 bg-purple-100 rounded-lg flex items-center justify-center gap-2">
                    <FileUp /> <span>Upload PDF</span>
                  </label>
                  {
                    !file && <p className="text-gray-400 text-xs">Upload the Files which helps to share the knowledge to other peers.</p>
                  }
                  {/* PDF Title Here */}                   
                  {
                    file &&
                    <article className="text-gray-500 flex items-center gap-2 p-2 border border-gray-500 rounded-lg">
                      <FileText size={18} />
                      <p className="flex-1 flex gap-0 text-md font-semibold"><span className="line-clamp-1">{file?.name?.replace(".pdf", "")}</span>.pdf</p>
                      <IconButton onClick={removeFile}>
                        <CircleX size={18} className="text-red-500"/>
                      </IconButton>
                    </article>
                  }
                </div>

                <PrimaryButton onClick={addFile} startContent={<FilePlus2 />}>Add File</PrimaryButton>
              </form>
            )}
          </PopoverContent>
        </Popover>
        <div className="flex flex-col gap-3 w-full">
        {files?.map((file, index) => (
          <article key={index} className="w-full text-purple-500 px-3 py-2 transition-all duration-300 ease-in-out cursor-pointer flex flex-col gap-1 items-start bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg">
            <p  className="w-full text-sm flex flex-col items-start text-[#475569] font-semibold line-clamp-1">{file?.fileTitle}</p>
            
            <p className="flex text-tiny items-center justify-start gap-1 text-purple-500 font-semibold">
              <File size={12}/>
              <span className="line-clamp-1">{file?.file?.name?.replace(".pdf", "")}</span>.pdf
            </p>

          </article>
        ))}
        </div>
      </div>
    )
}

export default FileUploader