"use client";
import React, { useState } from 'react';
import {Textarea} from "@nextui-org/input";
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import { Atom, Heading2, Heading3, List, NotebookPen, WrapText } from 'lucide-react';
import { StickyNote } from 'lucide-react';
import { BookOpenCheck } from 'lucide-react';
import { SquareActivity } from 'lucide-react';
import ContentEditor from './components/ContentEditor';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";

// Every draft has an unique id...
import { v4 as uuidv4 } from 'uuid';

const ResearchPaperEditor = () => {
  
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState([]);

  const [content, setContent] = useState([]);


  const addChemicalReaction = () => {
    const newContent = [...content];
    const newReaction = {
      id: uuidv4(),
      type: "chemical-reaction",
      content: {
        reactants: [],
        products: [],
        catalysts: [],
        smarts: "",
        smiles: ""
      }
    }
    newContent.push(newReaction);
    setContent(newContent);
  }

  const addHeading2 = () => {
    const newContent = [...content];
    const newHeading2 = {
      id: uuidv4(),
      type: "h2",
      content: ""
    };
    newContent.push(newHeading2);
    setContent(newContent);
  }

  const addHeading3 = () => {
    const newContent = [...content];
    const newHeading3 = {
      id: uuidv4(),
      type: "h3",
      content: ""
    };
    newContent.push(newHeading3);
    setContent(newContent);
  }


  const addParagraph = () => {
    const newContent = [...content];
    const newParagraph = {
      id: uuidv4(),
      type: "paragraph",
      content: ""
    };
    newContent.push(newParagraph);
    setContent(newContent);
  }

  const onTextualContentChange = (event, index) => {
    const newContent = [...content];
    newContent[index].content = event.target.value;
    setContent(newContent);
  }

  const deleteSection = (indexToDelete) => {
    const newContent = content?.filter((_, index) => index !== indexToDelete);
    setContent(newContent);
  }

  const previewAndPublishArticle = (event) => {
    event.preventDefault();
  }

  return (
    <div className='overflow-scroll flex flex-col items-start gap-3 p-3'>
      <header className='h-w-full flex items-center justify-between'>
        <div className='flex items-center gap-3 text-white'>
          <SquareActivity />
          <h1 className="text-white font-cursive text-xl font-bold">Research Pulse <span className='text-black/45'>/</span> <span className='text-[#052E16]'>Paper Publication</span></h1>
        </div>
        
      </header>
      <main className="flex flex-row gap-3 w-full">
        <section className='flex flex-col items-start gap-3 w-[20%] rounded-md'>


          <div className='w-full'>  
            <Accordion isCompact className='bg-white/80 backdrop-blur-md' variant="shadow">
              <AccordionItem key="frequently-edited"
                aria-label="Frequently Edited"
                startContent={<NotebookPen />}
                subtitle={<p>{"4 Frequently Edited Papers"}</p>}
                title={<p className='font-semibold'>Frequently Edited</p>}
                >
                <p>Dynamic Content Here...</p>
              </AccordionItem>

              {/* Drafts */}
              <AccordionItem key="saved-drafts"
                aria-label="Saved Drafts"
                startContent={<StickyNote />}
                subtitle={<p>{"9 Saved Drafts Papers"}</p>}
                title={<p className='font-semibold'>Saved Drafts</p>}
                >
                <p>Dynamic Content Here...</p>
              </AccordionItem>

              {/* Published */}
              <AccordionItem key="published"
                aria-label="Published"
                startContent={<BookOpenCheck />}
                subtitle={<p>{"6 Published Papers"}</p>}
                title={<p className='font-semibold'>Published</p>}
                >
                <p>Dynamic Content Here...</p>
              </AccordionItem>
              
            </Accordion>
          </div>
        </section>
        <section className='w-[80%] flex flex-col items-start gap-4 border border-white rounded-lg p-3 bg-white/80 backdrop-blur-md'>
          <form onSubmit={previewAndPublishArticle} className='flex flex-col items-start gap-4 my-2 rounded-lg w-full'>
            <Textarea
                key={"title"}
                label="Paper Title"
                labelPlacement="inside"
                isRequired
                // color='secondary'
                minRows={1}
                placeholder="Write the paper title..."
                className="break-words w-full mb-6 md:mb-0"
                classNames={{
                  base: "",
                  label: "font-bold uppercase",
                  innerWrapper: "bg-transparent",
                  input: [ "bg-transparent","text-3xl font-bold break-words"],
                  inputWrapper: ["bg-transparent"],

                }}
                value={title}
                onValueChange={setTitle}
              />
              <Textarea
                key={"subtitle"}
                isRequired
                // color='primary'
                label="subtitle"
                labelPlacement="inside"
                minRows={1}
                placeholder="Write an subtitle here..."
                className="break-words w-full mb-6 md:mb-0"
                classNames={{
                  base: "",
                  label: "font-bold uppercase",
                  innerWrapper: "bg-transparent",
                  input: [ "bg-transparent","text-xl font-semibold break-words"],
                  inputWrapper: ["bg-transparent"],
                }}
                value={subtitle}
                onValueChange={setSubtitle}
              />

              <ContentEditor content={content} onTextualContentChange={onTextualContentChange} deleteSection={deleteSection} />
          </form>
          <Dropdown>
            <DropdownTrigger>
              <Button 
                className=''
                color='secondary'

              >
                Add Section
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onClick={addChemicalReaction} key="chemical-reaction">
                <article className='flex items-center gap-3 text-black font-semibold text-md'>
                  <Atom />
                  <span>Chemical Reaction</span>
                </article>
              </DropdownItem>

              <DropdownItem onClick={addHeading2} key="sub-heading-1">
                <article className='flex items-center gap-3 text-black font-semibold text-md'>
                  <Heading2 />
                  <span>Sub Heading 1</span>
                </article>
              </DropdownItem>

              <DropdownItem onClick={addHeading3} key="sub-heading-2">
                <article className='flex items-center gap-3 text-black font-semibold text-md'>
                  <Heading3 />
                  <span>Sub Heading 2</span>
                </article>
              </DropdownItem>

              <DropdownItem onClick={addParagraph} key="paragraph">
                <article className='flex items-center gap-3 text-black font-semibold text-md'>
                  <WrapText />
                  <span>Paragraph</span>
                </article>
              </DropdownItem>

              <DropdownItem key="qna">
                <article className='flex items-center gap-3 text-black font-semibold text-md'>
                  <List />
                  <span>Questions & Answers</span>
                </article>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </section>
      </main>
    </div>
  )
}

export default ResearchPaperEditor