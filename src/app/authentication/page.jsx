"use client"
import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader} from "@nextui-org/react";
import { toast } from 'react-toastify';

const Authentication = () => {
  const [selected, setSelected] = React.useState("login");

  return (
    <main className='h-screen w-screen flex items-stretch justify-center'>
      <section className="flex-1"></section>
      <section className="flex-1 flex items-center justify-center">
        <div className="flex flex-col">
          <Card className="max-w-full w-[340px] h-[400px]">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                aria-label="Tabs form"
                selectedKey={selected}
                onSelectionChange={setSelected}
              >
                <Tab key="login" title="Login">
                  <form className="flex flex-col gap-4">
                    <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                    <Input
                      isRequired
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <p className="text-center text-small">
                      Need to create an account?{" "}
                      <Link size="sm" onPress={() => setSelected("sign-up")}>
                        Sign up
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button fullWidth color="primary">
                        Login
                      </Button>
                    </div>
                  </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <form className="flex flex-col gap-4 h-[300px]">
                    <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                    <Input isRequired label="Email" placeholder="Enter your email" type="email" />
                    <Input
                      isRequired
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <p className="text-center text-small">
                      Already have an account?{" "}
                      <Link size="sm" onPress={() => setSelected("login")}>
                        Login
                      </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button onClick={()=>toast("Wow, so easy!")} fullWidth color="primary">
                        Sign up
                      </Button>
                    </div>
                  </form>
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </section>
    </main>
  )
}

export default Authentication