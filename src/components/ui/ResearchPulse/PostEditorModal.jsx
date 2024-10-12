import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip} from "@nextui-org/react";
import PrimaryButton from "../../global/PrimaryButton";
import {Tabs, Tab} from "@nextui-org/react";
import { BookOpenCheck } from 'lucide-react';
import { Link } from 'lucide-react';
import { AtSign } from 'lucide-react';
import { Hash } from 'lucide-react';

const PostEditorModal = ({isOpen, onOpenChange}) => {
    const [selected, setSelected] = React.useState("donate-files");
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const createPost = async(event) => {
        event.preventDefault();
        setIsCreatingPost(true);
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
                                
                                <div className="relative h-[500px] w-[500px] rounded-lg border-2 border-white bg-white backdrop-blur-lg">
                                    <div className="flex-1">

                                    </div>
                                    <div className="z-10 bg-white absolute bottom-0 inset-x-0 w-full p-3 rounded-lg border-t-2 border-t-white flex items-center justify-end">
                                        <PrimaryButton onClick={createPost} isLoading={isCreatingPost}>Create Post</PrimaryButton>
                                    </div>
                                </div>
                                <div className="flex flex-col items-stretch p-3 h-[500px] w-[300px] rounded-lg border-2 border-white bg-white backdrop-blur-lg">
                                    <Tabs
                                        color="secondary" variant="bordered"
                                        radius="full"
                                        className="flex items-center justify-center w-full"
                                        size="lg"
                                        aria-label="Tabs form"
                                        selectedKey={selected}
                                        onSelectionChange={setSelected}
                                        >
                                        
                                        <Tab key={"donate-files"} title={<Tooltip showArrow={true} content="Uploads PDFs" color='success' className='font-semibold'>
                                            <div className="flex items-center justify-center">
                                            <BookOpenCheck/>
                                            </div></Tooltip>
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