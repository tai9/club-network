import { useMember } from "@/hooks/useMember";
import usePosts, { usePost } from "@/hooks/usePosts";
import { Button, Empty, Flex } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Post from "./Post";
import PostStatus from "./PostStatus";
import { PostsSectionWrapper } from "./styled";

const PostsSection = () => {
  const router = useRouter();
  const id = router.query?.id as string;
  const postId = router.query?.postId as string;
  const { data: memberData } = useMember();
  const isMember = memberData?.id === +id;
  const isDetail = !!postId;

  const { data: postDetail } = usePost(+postId);

  const { data: postData, refetch: postsRefetch } = usePosts();
  const [feedType, setFeedType] = useState<"new" | "own" | "discover">("own");

  useEffect(() => {
    if (isMember) {
      handleFilterNewFeed();
    }
  }, [isMember]);

  useEffect(() => {
    if (router.query?.type === "me") {
      setFeedType("own");
    } else {
      setFeedType("new");
    }
  }, [router.query]);

  useEffect(() => {
    let idleTimer: any;

    const handleIdle = () => {
      // Set a timer to refetch data after 5 seconds of idle time
      idleTimer = setTimeout(() => {
        postsRefetch();
      }, 5000);
    };

    const resetIdleTimer = () => {
      // Reset the idle timer when there is any user activity
      clearTimeout(idleTimer);
      handleIdle();
    };

    // Set up event listeners for user activity
    document.addEventListener("mousemove", resetIdleTimer);
    document.addEventListener("keydown", resetIdleTimer);

    // Initial setup
    handleIdle();

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", resetIdleTimer);
      document.removeEventListener("keydown", resetIdleTimer);
      clearTimeout(idleTimer);
    };
  }, [postsRefetch]);

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
  };

  const getBtnType = (type: "new" | "own" | "discover") => {
    return type === feedType ? "primary" : "text";
  };

  const renderPostsSection = () => {
    if (isDetail) {
      return postDetail ? (
        <Post data={postDetail} />
      ) : (
        <Empty description="Post not found!" />
      );
    }

    return (
      <Flex gap={16} vertical>
        {postData?.data.count !== 0 ? (
          postData?.data.data.map((post) => <Post key={post.id} data={post} />)
        ) : (
          <Empty description="No Posts" />
        )}
      </Flex>
    );
  };

  return (
    <PostsSectionWrapper>
      {isMember && !isDetail && (
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
      {renderPostsSection()}
    </PostsSectionWrapper>
  );
};

export default PostsSection;
