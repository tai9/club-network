import React from "react";
import { PostsSectionWrapper } from "./styled";
import { Button, Flex } from "antd";
import PostStatus from "./PostStatus";
import Post from "./Post";

const PostsSection = () => {
  return (
    <PostsSectionWrapper>
      <Flex gap={16}>
        <Button type="primary">My Feed</Button>
        <Button>My Posts</Button>
        <Button>Discover</Button>
      </Flex>
      <PostStatus />
      <Post />
    </PostsSectionWrapper>
  );
};

export default PostsSection;
