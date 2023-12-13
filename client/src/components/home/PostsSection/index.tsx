import React from "react";
import { PostsSectionWrapper } from "./styled";
import { Button, Flex } from "antd";
import PostStatus from "./PostStatus";
import Post from "./Post";
import usePosts from "@/hooks/usePosts";

const PostsSection = () => {
  const { data: postData } = usePosts();
  console.log(postData, "😀");
  return (
    <PostsSectionWrapper>
      <Flex gap={16}>
        <Button type="primary">My Feed</Button>
        <Button type="text">My Posts</Button>
        <Button type="text">Discover</Button>
      </Flex>
      <PostStatus />
      {postData?.data.data.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </PostsSectionWrapper>
  );
};

export default PostsSection;
