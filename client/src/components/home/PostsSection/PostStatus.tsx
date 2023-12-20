import React from "react";
import { PostWrapper, Section1 } from "./styled";
import CustomAvatar from "@/components/common/CustomAvatar";
import useClubNetwork from "@/hooks/useClubNetwork";
import { useMember } from "@/hooks/useMember";

const PostStatus = () => {
  const { data: memberData } = useMember();
  const { setOpenPostModal, setPostContent, setPost } = useClubNetwork();
  const handlePost = () => {
    setPostContent("");
    setPost(undefined);
    setOpenPostModal(true);
  };
  return (
    <PostWrapper gap={8}>
      <CustomAvatar username={memberData?.username} />
      <Section1 onClick={handlePost}>What&#39;s up?</Section1>
    </PostWrapper>
  );
};

export default PostStatus;
