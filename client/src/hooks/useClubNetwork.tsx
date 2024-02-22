import { IPost } from "@server/types/Post";
import { useState, createContext, useEffect, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { useNotificationCount, useNotifications } from "./useNotifications";
import { ESocketEventName } from "@server/types/common";
import { App } from "antd";
import { useMember } from "./useMember";

const useClubNetworkContext = () => {
  const { refetch } = useNotifications();
  const { refetch: countRefetch } = useNotificationCount(false);
  const { message } = App.useApp();
  const { data: memberData } = useMember();
  const isLoggedIn = useMemo(() => !!memberData?.id, [memberData?.id]);

  const [openPostModal, setOpenPostModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [post, setPost] = useState<IPost>();
  const [socket, setSocket] = useState<any>();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {
    const URL =
      process.env.NODE_ENV === "production" ? "" : "http://localhost:3009";
    const token = localStorage.getItem("accessToken") || "";
    const username = localStorage.getItem("username") || "";
    const s = io(URL, {
      auth: {
        username,
      },
      extraHeaders: {
        Authorization: token,
      },
    });
    setSocket(s);

    s.on("NOTI", (value) => {
      console.log("NOTI 🔫", value);
    });
    s.on("users", (value) => {
      console.log("users online now: 😑", value);
      setOnlineUsers(value);
    });
    s.on(ESocketEventName.NOTIFICATION, async (value) => {
      console.log("WS: ", ESocketEventName.NOTIFICATION);
      await countRefetch();
      await refetch();
    });

    // Level up
    s.on(ESocketEventName.LEVEL_UP, async (value) => {
      console.log("WS: ", ESocketEventName.LEVEL_UP, value);
      message.success(value);
    });

    return () => {
      s.disconnect();
    };
  }, [countRefetch, message, refetch]);

  const handleOpenLogin = () => {
    setOpenLoginModal(true);
  };

  return {
    openPostModal,
    setOpenPostModal,
    postContent,
    setPostContent,
    post,
    setPost,
    openLoginModal,
    setOpenLoginModal,
    handleOpenLogin,
    onlineUsers,
    isLoggedIn,
    memberData,

    socket,
  };
};

const useAppContext = () => {
  const contextValues = useClubNetworkContext();
  return {
    ...contextValues,
  };
};

const AppContext = createContext<ReturnType<typeof useAppContext>>({} as any);

export const ClubNetworkProvider: React.FC<any> = ({ children }) => {
  const contextValues = useAppContext();
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

const useClubNetwork = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("AppContext must be used inside an AuthProvider");
  }
  return ctx;
};

export default useClubNetwork;
