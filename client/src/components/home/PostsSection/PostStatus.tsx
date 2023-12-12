import React from "react";
import { PostWrapper, Section1 } from "./styled";
import CustomAvatar from "@/components/common/CustomAvatar";

const PostStatus = () => {
  return (
    <PostWrapper gap={8}>
      <CustomAvatar />
      <Section1>What&#39;s up?</Section1>
    </PostWrapper>
  );
};

export default PostStatus;
