import usePosts from "@/hooks/usePosts";
import { Button, Empty, Flex } from "antd";
import Post from "./Post";
import PostStatus from "./PostStatus";
import { PostsSectionWrapper } from "./styled";
import { useEffect, useState } from "react";
import { IGetPostsParams } from "@/types/Post";
import { useMember } from "@/hooks/useMember";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const PostsSection = () => {
  const router = useRouter();
  const params = useParams();
  const id = router.query?.id as string;
  const { data: memberData } = useMember();
  const isMember = memberData?.id === +id;

  const [postParams, setPostParams] = useState<IGetPostsParams>({
    myself: false,
  });
  const { data: postData } = usePosts(postParams);
  const [feedType, setFeedType] = useState<"new" | "own" | "discover">("own");

  useEffect(() => {
    if (isMember) {
      handleFilterNewFeed();
    }
  }, [isMember]);

  useEffect(() => {
    console.log(router.query);

    if (router.query?.type === "me") {
      setFeedType("own");
    } else {
      setFeedType("new");
    }
  }, [router.query]);
  useEffect(() => {
    console.log(params);
  }, [params]);

  const handleFilterMyPosts = () => {
    router.query.type = "me";
    router.push(router);
  };

  const handleFilterNewFeed = () => {
    delete router.query.type;
    router.push(router);
  };

  const handleFilterDiscover = () => {
    setFeedType("discover");
    setPostParams({ myself: false });
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
