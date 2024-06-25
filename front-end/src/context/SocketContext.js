import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// สร้าง Context เพื่อใช้กับทุกๆ component และไม่ให้มีการเชื่อมต่อซ้ำซ้อน

// สร้าง context ของ socket.io
const SocketContext = createContext();

// ฟังก์ชั่น hook เพื่อใช้ context นี้
export const useSocket = () => {
    return useContext(SocketContext);
};

// Provider component สำหรับ socket.io
export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        return () => newSocket.close();
    }, []);

    return (
        // ส่ง socket instance
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}