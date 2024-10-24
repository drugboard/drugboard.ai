import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";
import { StyledEngineProvider } from "@mui/material";
import { Slide, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from "@/state/providers/user.provider";
// import { WebinarSocketProvider } from "@/services/sockets/WebinarSocket";


function Provider({children}) {
  
  return (
    <NextUIProvider>
      <StyledEngineProvider injectFirst>

        {/* <UserProvider> */}
          {children}
        {/* </UserProvider> */}

        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition= {Slide}
        />  
      </StyledEngineProvider>
    </NextUIProvider>
  );
}

export default Provider;