"use client";
import { useEffect, useState } from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, Textarea} from "@nextui-org/react";
import AppWriteAuth from "@/services/backend/appwrite/auth.service";
import { isObjEmpty } from "@/utils/Obj.util";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PrimaryButton from "@/components/global/PrimaryButton";

const VendorAuthenticationPage = () => {
    const [selected, setSelected] = useState("register-vendor");
    const [currentUser, setCurrentUser] = useState(null);

    const [traderType, setTraderType] = useState("wholesaler");

    const router = useRouter();

    useEffect(()=>{
        const getCurrentUser = async() => {
            try {
                const auth = new AppWriteAuth();
                const user = await auth.getUser();
                if(!isObjEmpty(user)){
                    setCurrentUser(user);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getCurrentUser();
    },[]);

    useEffect(()=>{
        if(currentUser){
            if(currentUser?.prefs?.isVendor){
                router.replace("/vendor-dashboard");
                toast.info("You are already a Vendor!")
            }
        }
    },[currentUser]);

    return (
        <main className="h-full w-full p-6 flex gap-6">
            {/* Marketing Stuff*/}
            <section className="p-6 w-[60%] h-full rounded-3xl bg-white/80 backdrop-blur-lg border border-white flex flex-col gap-3">
                <div>
                    <h1>

                    </h1>
                </div>

                <div></div>

                <div></div>
            </section>

            <section className="w-[40%] h-full flex items-center justify-center">
                <Card className="rounded-3xl bg-white/80 border border-white backdrop-blur-lg max-w-full w-full h-full">
                    <CardBody className="overflow-y-auto">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={setSelected}
                        >
                            <Tab key="login" title="Login">
                                <form className="flex flex-col gap-4">
                                    <Input name="email" isRequired label="Email" placeholder="Enter your email" type="email" />
                                    <Input
                                        name="password"
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                    Need to Become as Vendor?{" "}
                                    <Link className="text-purple-700 cursor-pointer font-bold hover:underline" size="sm" onPress={() => setSelected("sign-up")}>
                                        Register
                                    </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="secondary">
                                        Login
                                    </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="register-vendor" title="Register As Vendor">
                                <form className="flex flex-col items-center gap-4">

                                    <Input 
                                        name="companyName" 
                                        fullWidth 
                                        isRequired 
                                        label="Company Name" 
                                        placeholder="Enter your company name" 
                                        type="text" 
                                    />

                                    <Textarea
                                        key="companyDescription"
                                        name="companyDescription" 
                                        label="Company Description"
                                        labelPlacement="inside"
                                        isRequired
                                        minRows={30}
                                        placeholder="Describe your company..."
                                        className="break-words w-full mb-6 md:mb-0 "
                                    />

                                    <Input 
                                        name="taxIdenticationNumber" 
                                        fullWidth 
                                        isRequired 
                                        label="Tax Identication Number" 
                                        placeholder="Enter your Tax Identication Number" 
                                        type="text" 
                                    />

                                    <Tabs
                                        fullWidth
                                        color="secondary"
                                        radius="full"
                                        size="md"
                                        aria-label="Tabs form"
                                        selectedKey={traderType}
                                        onSelectionChange={setTraderType}
                                    >
                                        <Tab key="wholesaler" title={
                                            <p className="font-medium">
                                                Wholesaler
                                            </p>
                                        }></Tab>
                                        <Tab key="retail" title={
                                            <p className="font-medium">
                                                Retail
                                            </p>
                                        }></Tab>
                                    </Tabs>

                                    <Input 
                                        name="supplierMobileNumber" 
                                        fullWidth 
                                        isRequired 
                                        label="Supplier Mobile Number" 
                                        placeholder="Enter your Mobile Number" 
                                        type="text" 
                                    />
                                    
                                    <p className="text-center text-small font-medium">
                                    Are you an already, Vendor? Welcome to {" "}
                                    <Link className="text-purple-700 cursor-pointer font-bold hover:underline" size="sm" href="/vendor-dashboard">
                                        Vendor Dashboard
                                    </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                    <PrimaryButton fullWidth={true}>
                                        Register As Vendor
                                    </PrimaryButton>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </section>
        </main>
  )
}

export default VendorAuthenticationPage;