"use client"
import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import { StyledEngineProvider } from "@mui/material";
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { WebinarSocketProvider } from "@/services/sockets/WebinarSocket";


function Provider({children}) {
  
  return (
    <NextUIProvider>
      <StyledEngineProvider injectFirst>
        {/* <WebinarSocketProvider> */}
          {children}
        {/* </WebinarSocketProvider> */}
        {/* <ToastContainer />   */}
      </StyledEngineProvider>
    </NextUIProvider>
  );
}

export default Provider;