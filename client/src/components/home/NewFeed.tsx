import React from "react";
import { NewFeedWrapper } from "./styled";
import PostsSection from "./PostsSection";
import MemberInfo from "./MemberInfo";

const NewFeed = () => {
  return (
    <NewFeedWrapper>
      <PostsSection />
      <MemberInfo />
    </NewFeedWrapper>
  );
};

export default NewFeed;
