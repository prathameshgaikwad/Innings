import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const useSocket = (serverURL) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(serverURL);
    setSocket(newSocket);
  }, [serverURL]);

  return socket;
};

export default useSocket;
