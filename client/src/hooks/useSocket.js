import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);
  }, [SERVER_URL]);

  return socket;
};

export default useSocket;
