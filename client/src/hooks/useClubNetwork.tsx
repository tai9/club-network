import { IPost } from "@/types/Post";
import { useState, createContext, useEffect, useContext } from "react";

const usePostContext = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [post, setPost] = useState<IPost>();
  return {
    openPostModal,
    setOpenPostModal,
    postContent,
    setPostContent,
    post,
    setPost,
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
