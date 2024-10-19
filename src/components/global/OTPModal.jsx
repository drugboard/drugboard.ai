"use client";
import React, { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Textarea, Input} from "@nextui-org/react";
import PrimaryButton from './PrimaryButton';
import { SquareAsterisk } from 'lucide-react';
import AppWriteAuth from '@/services/backend/appwrite/auth.service';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const OTPModal = ({isOpen, onOpenChange}) => {

    const [otp, setOtp] = useState("");
    const navigate = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const auth = new AppWriteAuth();

    const startSignInSession = async(onClose) => {
        try {
            if(!userId) toast.error("No User ID!");
            if(!otp) toast.error("Please enter OTP!");
            const session = await auth.createUserSession(userId, otp);
            if(!session) toast.error("Something went wrong!");
            if(session){
                console.log("User Session: ", session);
                navigate.push("/");
                onClose();
                toast.success("You are loggedin successfully!");
            }
            
        } catch (error) {
            console.log(error);
            console.log("Error Type: ", error.type);
            if(error?.type === "user_session_already_exists") toast.error("You are already signedin!");
        }

    }

    const closeOTPModal = (onClose) => {
        navigate.push("/");
        onClose();
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
                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                        <ModalBody>
                            <form className='flex flex-col gap-2'>
                                <Input
                                    type="otp"
                                    label="OTP"
                                    value={otp}
                                    onValueChange={setOtp}
                                    placeholder="* * * * * *"
                                    labelPlacement="outside"
                                    description={"Enter 6 digit otp that has been sent to your phone."}
                                    startContent={<SquareAsterisk />}
                                />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={()=>closeOTPModal(onClose)}>
                            Close
                            </Button>
                            <PrimaryButton color="success"  onClick={()=>startSignInSession(onClose)}>
                            Verify & LogIn
                            </PrimaryButton>
                        </ModalFooter>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    )   
}

export default OTPModal