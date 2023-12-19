import usePosts from "@/hooks/usePosts";
import { Button, Empty, Flex } from "antd";
import Post from "./Post";
import PostStatus from "./PostStatus";
import { PostsSectionWrapper } from "./styled";
import { useEffect, useState } from "react";
import { IGetPostsParams } from "@/types/Post";
import { useMember } from "@/hooks/useMember";
import { useParams } from "next/navigation";

const PostsSection = () => {
  const params = useParams();
  const id = params?.id as string;
  const { data: memberData } = useMember();
  const isMember = memberData?.id === +id;

  const [postParams, setPostParams] = useState<IGetPostsParams>({
    memberId: +id,
  });
  const { data: postData } = usePosts(postParams);
  const [feedType, setFeedType] = useState<"new" | "own" | "discover">("own");

  useEffect(() => {
    if (isMember) {
      handleFilterNewFeed();
    }
  }, [isMember]);

  const handleFilterMyPosts = () => {
    setFeedType("own");
    setPostParams({
      memberId: memberData?.id,
    });
  };

  const handleFilterNewFeed = () => {
    setFeedType("new");
    setPostParams({ memberId: undefined });
  };

  const handleFilterDiscover = () => {
    setFeedType("discover");
    setPostParams({ memberId: undefined });
  };

  const getBtnType = (type: "new" | "own" | "discover") => {
    return type === feedType ? "primary" : "text";
  };

  return (
    <PostsSectionWrapper>
      {isMember && (
        <>
          <Flex gap={16}>
            <Button type={getBtnType("new")} onClick={handleFilterNewFeed}>
              My Feed
            </Button>
            <Button type={getBtnType("own")} onClick={handleFilterMyPosts}>
              My Posts
            </Button>
            <Button
              type={getBtnType("discover")}
              onClick={handleFilterDiscover}
            >
              Discover
            </Button>
          </Flex>
          <PostStatus />
        </>
      )}
      <Flex gap={16} vertical>
        {postData?.data.count !== 0 ? (
          postData?.data.data.map((post) => <Post key={post.id} data={post} />)
        ) : (
          <Empty description="No Posts" />
        )}
      </Flex>
    </PostsSectionWrapper>
  );
};

export default PostsSection;
