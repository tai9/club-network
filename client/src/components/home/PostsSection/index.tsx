import { useMember } from "@/hooks/useMember";
import { usePost } from "@/hooks/usePosts";
import usePostsInfinity from "@/hooks/usePostsInfinity";
import { Button, Empty, Flex } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";
import PostStatus from "./PostStatus";
import { PostsSectionWrapper } from "./styled";

const PostsSection = () => {
  const router = useRouter();
  const id = router.query?.id as string;
  const postId = router.query?.postId as string;
  const { data: memberData } = useMember();
  const isMember = memberData?.id === +id;
  const isDetail = !!postId;

  const { ref, inView } = useInView();

  const { data: postDetail } = usePost(+postId);

  const {
    data: postData,
    refetch: postsRefetch,
    hasNextPage,
    isFetchingNextPage,
    status,
    fetchNextPage,
  } = usePostsInfinity();
  const [feedType, setFeedType] = useState<"new" | "own" | "discover">("own");

  useEffect(() => {
    (async () => {
      if (inView && hasNextPage) {
        await fetchNextPage();
        console.log("loadmore");
      }
    })();
  }, [fetchNextPage, hasNextPage, inView]);

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

  const renderSkeletons = () => {
    return (
      <Flex gap={16} vertical>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </Flex>
    );
  };

  const renderPostsSection = () => {
    if (isDetail) {
      return postDetail ? (
        <Post data={postDetail} />
      ) : (
        <Empty description="Post not found!" />
      );
    }

    if (status === "pending") {
      return renderSkeletons();
    }

    if (postData && postData.pages[0].count === 0) {
      return <Empty description="No Posts" />;
    }

    return (
      <Flex gap={16} vertical>
        {postData?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((post) => (
              <Post key={post.id} data={post} />
            ))}
          </React.Fragment>
        ))}

        {isFetchingNextPage && renderSkeletons()}
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
      <div ref={ref} />
    </PostsSectionWrapper>
  );
};

export default PostsSection;
