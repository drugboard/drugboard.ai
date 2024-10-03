"use client";
import KetcherEditor from '@/components/global/KetcherEditor';
import { Button, Textarea, Tooltip } from '@nextui-org/react';
import { Brain, Trash2 } from 'lucide-react';
import React from 'react';

const ContentEditor = ({content, onTextualContentChange, deleteSection}) => {
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
                <article key={contentItem?.id} className='group relative w-full'>
                    <Textarea
                        label={`Section ${index+1}: Paragraph`}
                        labelPlacement="inside"
                        isRequired
                        color='secondary'
                        minRows={4}
                        
                        value={contentItem?.content}
                        onChange={(event)=>onTextualContentChange(event,index)}

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
                contentItem.type==="h2" &&
                <article key={contentItem?.id} className='group relative w-full'>
                    <Textarea
                        label={`Section ${index+1}: Sub Heading 1`}
                        labelPlacement="inside"
                        isRequired
                        color='secondary'
                        minRows={1}
                        
                        value={contentItem?.content}
                        onChange={(event)=>onTextualContentChange(event,index)}

                        className="break-words w-full mb-6 md:mb-0"
                        classNames={{
                        base: "",
                        label: "font-bold uppercase",
                        innerWrapper: "bg-transparent",
                        input: [ "bg-transparent","font-bold break-words", "text-xl"],
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
                contentItem.type==="h3" &&
                <article key={contentItem?.id} className='group relative w-full'>
                    <Textarea
                        label={`Section ${index+1}: Sub Heading 2`}
                        labelPlacement="inside"
                        isRequired
                        color='secondary'
                        minRows={1}
                        // placeholder="Write each paragraph, individually..."
                        
                        value={contentItem?.content}
                        onChange={(event)=>onTextualContentChange(event,index)}

                        className="break-words w-full mb-6 md:mb-0"
                        classNames={{
                        base: "",
                        label: "font-bold uppercase",
                        innerWrapper: "bg-transparent",
                        input: [ "bg-transparent","font-bold break-words", "text-lg"],
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
                    <article key={contentItem?.id} className='group relative w-full flex flex-col gap-2'>
                        <p className='font-semibold text-gray-600 text-md'>Draw the chemical reaction on drawing board below... {`Section: ${index + 1}`}</p>
                        <KetcherEditor id={contentItem?.id} />
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