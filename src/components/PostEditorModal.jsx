import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const PostEditorModal = ({isOpen, onOpenChange}) => {
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
                                <div className="h-[500px] w-[300px] rounded-lg border-2 border-white bg-white backdrop-blur-lg"></div>
                                <div className="relative h-[500px] w-[500px] rounded-lg border-2 border-white bg-white backdrop-blur-lg">
                                    <div className="flex-1"></div>
                                    <div className="sticky bottom-0 inset-x-0 w-full p-3 rounded-lg border-t-2 border-t-white flex items-center justify-end">
                                        <Button color="foreground" variant="light" onPress={onClose}>
                                        Close
                                        </Button>
                                        <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                                        Action
                                        </Button>
                                    </div>
                                </div>
                                <div className="h-[500px] w-[500px] rounded-lg border-2 border-white bg-white backdrop-blur-lg"></div>   
                            </ModalBody>
                            {/* <ModalFooter>
                                
                            </ModalFooter> */}
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    )
}

export default PostEditorModal;