import React, {useMemo} from 'react';
import {io} from "socket.io-client";

const WebinarSocketContext = React.createContext(null);

export const WebinarSocketProvider = ({children}) => {
    const webinarSocket = useMemo(()=>io({
        host: "localhost",
        port: 8002
    }), []);

    return (
        <WebinarSocketContext.Provider value={{webinarSocket}}>
            {children}
        </WebinarSocketContext.Provider>
    )
}