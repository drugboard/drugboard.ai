"use client";
import { useState } from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";

const VendorAuthenticationPage = () => {
    const [selected, setSelected] = useState("login");
    return (
        <main className="h-full w-full p-6 flex gap-6">
            {/* Marketing Stuff*/}
            <section className="w-[60%] h-full rounded-3xl bg-white/80 backdrop-blur-2xl border border-white">
            </section>

            <section className="w-[40%] h-full flex items-center justify-center">
                <Card className="rounded-3xl bg-white/90 border border-white backdrop-blur-2xl max-w-full w-[340px] h-[450px]  ">
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
                            <Tab key="sign-up" title="Sign up">
                                <form className="flex flex-col gap-4">
                                    <Input name="name" isRequired label="Name" placeholder="Enter your name" type="password" />
                                    <Input name="email" isRequired label="Email" placeholder="Enter your email" type="email" />
                                    <Input
                                        name="password"
                                        isRequired
                                        label="Password"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <Input
                                        name="confirm-password"
                                        isRequired
                                        label="Confirm Password"
                                        placeholder="Confirm the above password"
                                        type="password"
                                    />
                                    <p className="text-center text-small">
                                    Are you an already, Vendor?{" "}
                                    <Link className="text-purple-700 cursor-pointer font-bold hover:underline" size="sm" onPress={() => setSelected("login")}>
                                        Login
                                    </Link>
                                    </p>
                                    <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="secondary">
                                        Register As Vendor
                                    </Button>
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