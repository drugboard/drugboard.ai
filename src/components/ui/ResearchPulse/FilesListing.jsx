"use client";
import { File } from 'lucide-react';

const FilesListing = ({files}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
        {files?.map((file) => (
          <a href={`${file?.fileURL}`} target="_blank" key={file?.$id} className="w-full text-purple-700 px-3 py-2 transition-all duration-300 ease-in-out cursor-pointer flex bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-3xl">            
            <p className="flex-1 flex font-semibold text-sm items-center justify-start gap-1 text-purple-700">
              <File />
              <span className="line-clamp-1">{file?.fileTitle}</span>.pdf
            </p>
          </a>
        ))}
    </div>
  )
}

export default FilesListing;