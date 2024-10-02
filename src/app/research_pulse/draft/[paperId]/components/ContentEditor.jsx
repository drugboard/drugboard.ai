"use client";
import KetcherEditor from '@/components/global/KetcherEditor';
import { Button, Textarea, Tooltip } from '@nextui-org/react';
import { Brain, Trash2 } from 'lucide-react';
import React from 'react';

const ContentEditor = ({content, onParagraphContentChange, deleteSection}) => {
  return (
    <> {
       content.length !==0 
       ?<>
        {
            content?.map((contentItem, index)=>{
                return(
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
                        <Tooltip className="font-semibold" showArrow={true} placement="top-end" content="Enhance with AI" color='secondary'>
                            <Button isIconOnly color="secondary" aria-label="Enhance with AI Button">
                                <Brain size={24} className="opacity-0 group-hover:opacity-100 cursor-pointer text-white" />
                            </Button>
                        </Tooltip>

                        <Tooltip className="font-semibold" showArrow={true} placement="top-end" content="Delete Section" color='danger'>
                            <Button onClick={()=>deleteSection(index)} isIconOnly color="danger" aria-label="Delete Button">
                                <Trash2 size={24} className="opacity-0 group-hover:opacity-100 cursor-pointer text-white" />
                            </Button>
                        </Tooltip>
                    </div>


                </article>
                }
                {
                    contentItem.type==="chemical-reaction" &&
                    <div className='w-full flex flex-col gap-2'>
                        <p className='font-semibold text-gray-600 text-md'>Draw the chemical reaction on drawing board below...</p>
                        <KetcherEditor />
                    </div>
                }
                </>
                )
            })
        }
       </>
       : <p className='text-gray-500 font-bold p-3 w-full text-center uppercase'>No Content...</p> 
    }
    </>
  )
}

export default ContentEditor;