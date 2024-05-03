/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CustomToast from "./notifications/toasts/CustomToast";
import { setMatchManagementInningsData } from "../state/match/matchManagementSlice";

const SocketProvider = ({ matchId, socket, isAdmin, children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const username = `${user.first_name}`;

  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [isSocketDisconnected, setIsSocketDisconnected] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setIsSocketConnected(true);
        socket.emit("subscribeToMatch", matchId);

        socket.on("richInningsData", (richInningsData) => {
          dispatch(setMatchManagementInningsData(richInningsData));
        });
      });

      socket.on("disconnect", () => {
        setIsSocketDisconnected(true);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("richInningsData");
        socket.off("disconnect");
      }
    };
  }, [socket, matchId, dispatch]);

  return (
    <>
      {isSocketConnected && (
        <CustomToast
          color={"success"}
          content={`Hey ${username}, ${
            isAdmin
              ? `you're in control of this match!`
              : `you're watching this match live!`
          }`}
          duration={4000}
        />
      )}
      {isSocketDisconnected && (
        <CustomToast
          color={"danger"}
          content={`Connection lost! Please refresh the page and try again.`}
          duration={4000}
        />
      )}
      {children}
    </>
  );
};

export default SocketProvider;
