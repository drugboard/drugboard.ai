"use client";
import AppWriteStorage from "@/services/backend/appwrite/storage.service";
import AppWriteAuth from "@/services/backend/appwrite/auth.service";
import db from "@/services/backend/appwrite/database.config";
import { toast } from "react-toastify";
import {Modal, ModalContent, ModalBody, Tooltip, Textarea} from "@nextui-org/react";


const VendorEditor = ({isOpen, onOpenChange}) => {

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
                                
                                  <div className="flex flex-col gap-3 h-[500px] w-[300px] rounded-lg border-2 border-white bg-white backdrop-blur-lg">
                                      <div className="flex-1 flex flex-col gap-3 p-3 overflow-y-scroll">
                                          {/**
                                           * Business Name
                                           * Business Owner Name
                                           * Address
                                           *    (DoorNo/FlatNo, StreetName, Area, City, District, PinCode, State, Country)
                                           * Contact Number
                                           **/}
                                      </div>
                                      <footer className="z-10 bg-white sticky bottom-0 inset-x-0 w-full p-3 rounded-lg border-t-2 border-t-white flex items-center justify-end">

                                          <PrimaryButton isLoading={isCreatingPost} startContent={<NotebookPen />} radius="full" className="font-semibold bg-gradient-to-tr from-[#A855F7] via-[#D946EF] to-[#EC4899] text-white shadow-lg">
                                            Save Details
                                          </PrimaryButton>
                                      </footer>
                                  </div>

                                  <div className="flex flex-col gap-3 items-stretch p-3 h-[500px] w-[300px] rounded-lg border-2 border-white bg-white backdrop-blur-lg">
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

export default VendorEditor;