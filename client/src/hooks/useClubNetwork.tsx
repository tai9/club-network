import { IPost } from "@/types/Post";
import { useState, createContext, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const usePostContext = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [post, setPost] = useState<IPost>();
  const [socket, setSocket] = useState<any>();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

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
    });
    s.on("N_POST_CREATED", (value) => {
      console.log("N_POST_CREATED: ⏮️", value);
      setNotificationCount(100);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return {
    openPostModal,
    setOpenPostModal,
    postContent,
    setPostContent,
    post,
    setPost,
    openLoginModal,
    setOpenLoginModal,
    notificationCount,
    socket,
  };
};

const useAppContext = () => {
  const postContextValues = usePostContext();

  return {
    ...postContextValues,
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
