import React from "react";
import { PostWrapper, Section1 } from "./styled";
import CustomAvatar from "@/components/common/CustomAvatar";
import useClubNetwork from "@/hooks/useClubNetwork";

const PostStatus = () => {
  const { setOpenPostModal, setPostContent, setPost } = useClubNetwork();
  const handlePost = () => {
    setPostContent("");
    setPost(undefined);
    setOpenPostModal(true);
  };
  return (
    <PostWrapper gap={8}>
      <CustomAvatar />
      <Section1 onClick={handlePost}>What&#39;s up?</Section1>
    </PostWrapper>
  );
};

export default PostStatus;
