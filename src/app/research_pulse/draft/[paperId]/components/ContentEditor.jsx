"use client";
import { Button, Textarea, Tooltip } from '@nextui-org/react';
import { Brain, Trash2 } from 'lucide-react';
import React from 'react';

const ContentEditor = ({content, onParagraphContentChange}) => {
  return (
    <> {
       content.length !==0 
       ?<>
        {
            content?.map((contentItem, index)=>(
                <>
                {
                contentItem.type==="paragraph" &&
                <article className='group relative w-full'>
                    <Textarea
                        key={index}
                        label={`Section ${index+1}: Paragraph`}
                        labelPlacement="inside"
                        isRequired
                        color='secondary'
                        minRows={4}
                        // placeholder="Write each paragraph, individually..."
                        
                        value={contentItem?.paragraphContent}
                        onChange={(event)=>onParagraphContentChange(event,index)}

                        className="break-words w-full mb-6 md:mb-0"
                        classNames={{
                        base: "",
                        label: "font-bold uppercase",
                        innerWrapper: "bg-transparent",
                        input: [ "bg-transparent","font-semibold break-words"],
                        inputWrapper: ["bg-transparent"],

                        }}
                        
                    />

                    <div className="flex items-center gap-3 px-3 transition-opacity duration-150 ease-in-out opacity-0 group-hover:opacity-100 absolute -right-2 -top-2 z-10">
                        <Tooltip className="font-semibold" key={index} showArrow={true} placement="top-end" content="Enhance with AI" color='secondary'>
                            <Button key={index} isIconOnly color="secondary" aria-label="Delete">
                                <Brain size={24} className="opacity-0 group-hover:opacity-100 cursor-pointer text-white" />
                            </Button>
                        </Tooltip>

                        <Tooltip className="font-semibold" key={index} showArrow={true} placement="top-end" content="Delete Section" color='danger'>
                            <Button key={index} isIconOnly color="danger" aria-label="Delete">
                                <Trash2 size={24} className="opacity-0 group-hover:opacity-100 cursor-pointer text-white" />
                            </Button>
                        </Tooltip>
                    </div>


                </article>
                }
                </>
            ))
        }
       </>
       : <p className='text-gray-500 font-bold p-3 w-full text-center uppercase'>No Content...</p> 
    }
    </>
  )
}

export default ContentEditor;