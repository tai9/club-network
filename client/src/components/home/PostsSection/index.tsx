import usePosts from "@/hooks/usePosts";
import { Button, Flex } from "antd";
import Post from "./Post";
import PostStatus from "./PostStatus";
import { PostsSectionWrapper } from "./styled";

const PostsSection = () => {
  const { data: postData } = usePosts();

  return (
    <PostsSectionWrapper>
      <Flex gap={16}>
        <Button type="primary">My Feed</Button>
        <Button type="text">My Posts</Button>
        <Button type="text">Discover</Button>
      </Flex>
      <PostStatus />
      <Flex gap={16} vertical>
        {postData?.data.data.map((post) => (
          <Post key={post.id} data={post} />
        ))}
      </Flex>
    </PostsSectionWrapper>
  );
};

export default PostsSection;
