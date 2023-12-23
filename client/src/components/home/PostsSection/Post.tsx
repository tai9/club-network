import CustomAvatar from "@/components/common/CustomAvatar";
import commentController from "@/controllers/commentController";
import postController from "@/controllers/postController";
import reactionsController from "@/controllers/reactionController";
import useClubNetwork from "@/hooks/useClubNetwork";
import { useMember, useMemberExp } from "@/hooks/useMember";
import usePosts, { usePost } from "@/hooks/usePosts";
import { IPost } from "@/types/Post";
import { formatLastTime } from "@/utils/formatTime";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  ExportOutlined,
  HeartFilled,
  HeartOutlined,
  LinkOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Divider, Dropdown, Flex, Input, Modal, App } from "antd";
import { useMemo, useState } from "react";
import { Content, PostWrapper } from "./styled";
import { useRouter } from "next/router";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { MoreLink } from "@/components/common/styled";

type Props = {
  data: IPost;
};

const Post = ({ data }: Props) => {
  const { data: memberData } = useMember();
  const isOwner = memberData?.id === data.createdBy.id;
  const { refetch } = usePosts();
  const { refetch: postRefetch } = usePost(data.id);
  const { refetch: refetchMyLevel } = useMemberExp();
  const router = useRouter();
  const postId = router.query.postId as string;
  const { message } = App.useApp();

  const [commentValue, setCommentValue] = useState("");
  const [toggleComments, setToggleComments] = useState(!!postId);

  const reactionQuery = useQuery({
    queryKey: ["post_detail", data.id],
    queryFn: () => reactionsController.getOfPost(data.id),
  });
  const likeCount = useMemo(
    () => reactionQuery.data?.data.find((x) => x.type === "LIKE")?.count,
    [reactionQuery.data]
  );

  const isLiked = useMemo(
    () => data.reactions.findIndex((x) => x.memberId === memberData?.id) !== -1,
    [data.reactions, memberData?.id]
  );

  const postDetailLink = useMemo(
    () => `${window.location.origin}/member/${memberData?.id}/post/${data.id}`,
    [data.id, memberData?.id]
  );

  const { setOpenPostModal, setPostContent, setPost } = useClubNetwork();

  const handleRefetchData = async () => {
    if (postId) {
      await postRefetch();
    } else {
      await refetch();
    }
    await reactionQuery.refetch();
    await refetchMyLevel();
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await reactionsController.delete(data.id, "LIKE");
      } else {
        await reactionsController.create({
          type: "LIKE",
          postId: data.id,
        });
      }
      await handleRefetchData();
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  const handleEdit = () => {
    setPostContent(data.content);
    setPost(data);
    setOpenPostModal(true);
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete post",
      icon: <ExclamationCircleFilled />,
      content:
        "Are you sure you want to delete this post permanently? All comments will also be deleted.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await postController.delete(data.id);
          await refetch();
        } catch (error) {
          message.error("Something went wrong!");
        }
      },
    });
  };

  const handleComment = async () => {
    try {
      await commentController.create({
        postId: data.id,
        content: commentValue,
      });
      setCommentValue("");
      await handleRefetchData();
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await commentController.delete(commentId);
      await handleRefetchData();
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  const handleCopyLink = async () => {
    message.success(`${postDetailLink} copied to clipboard!`);
    await navigator.clipboard.writeText(postDetailLink);
  };

  const renderItems = () => {
    const items = [
      {
        key: "view-detail",
        label: (
          <MoreLink
            align="center"
            gap={8}
            onClick={() => {
              router.push(`${router.asPath}/post/${data.id}`);
            }}
          >
            <ExportOutlined
              style={{
                fontSize: 16,
              }}
            />
            <span>VIEW DETAIL</span>
          </MoreLink>
        ),
      },
      {
        key: "1",
        label: (
          <MoreLink align="center" gap={8} onClick={handleCopyLink}>
            <LinkOutlined
              style={{
                fontSize: 16,
              }}
            />
            <span>COPPY LINK</span>
          </MoreLink>
        ),
      },
    ];

    if (isOwner) {
      items.push(
        ...[
          {
            key: "2",
            label: (
              <MoreLink align="center" gap={8} onClick={handleEdit}>
                <EditOutlined
                  style={{
                    fontSize: 16,
                  }}
                />
                <span>EDIT</span>
              </MoreLink>
            ),
          },
          {
            key: "3",
            label: (
              <MoreLink align="center" gap={8} onClick={handleDelete}>
                <DeleteOutlined
                  style={{
                    fontSize: 16,
                  }}
                />
                <span>DELETE</span>
              </MoreLink>
            ),
          },
        ]
      );
    }

    return items;
  };

  return (
    <PostWrapper vertical gap={16} className="post">
      <Flex justify="space-between" align="flex-start">
        <Flex gap={16} align="center">
          <CustomAvatar username={data.createdBy.username} />
          <Flex vertical gap={4}>
            <div className="name">
              {data.createdBy.fullname || data.createdBy.username}
            </div>
            <div className="role">{data.createdBy.role?.description}</div>
          </Flex>
        </Flex>
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          menu={{
            items: renderItems(),
          }}
        >
          <MoreOutlined
            style={{
              cursor: "pointer",
              fontSize: 16,
            }}
          />
        </Dropdown>
      </Flex>

      <Content>{data.content}</Content>

      <div className="time">{formatLastTime(data.createdAt)}</div>

      <Flex gap={24} justify="space-between">
        <Flex gap={24}>
          <Flex gap={4} onClick={handleLike}>
            {isLiked ? <HeartFilled /> : <HeartOutlined />}
            <span>{likeCount || 0}</span>
          </Flex>
          <Flex gap={4} onClick={() => setToggleComments((prev) => !prev)}>
            <MessageOutlined />
            <span>{data.comments.length || 0}</span>
          </Flex>
        </Flex>
        <Flex gap={16} align="center">
          <div className="time">SHARE TO</div>
          <TwitterShareButton
            title={`${data.content} @Mr_Tai9`}
            url={postDetailLink}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
            </svg>
          </TwitterShareButton>
        </Flex>
      </Flex>

      {toggleComments ? (
        <>
          <Divider style={{ margin: 0 }} />

          <Flex gap={16} vertical>
            {data.comments.map((c) => (
              <Flex gap={12} key={c.id}>
                <CustomAvatar username={c.createdBy.username} size="default" />
                <Flex gap={4} vertical>
                  <Flex gap={8} align="center">
                    <div className="name">
                      {c.createdBy.fullname || c.createdBy.username}
                    </div>
                    <div className="time">{formatLastTime(c.createdAt)}</div>
                    {c.memberId === memberData?.id && (
                      <DeleteOutlined
                        onClick={() => handleDeleteComment(c.id)}
                      />
                    )}
                  </Flex>
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {c.content}
                  </div>
                </Flex>
              </Flex>
            ))}

            <Flex align="center" gap={12}>
              <CustomAvatar username={memberData?.username} size="default" />
              <Input.TextArea
                placeholder="Leave a comment"
                value={commentValue}
                autoSize
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <Button onClick={handleComment}>Reply</Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <></>
      )}
    </PostWrapper>
  );
};

export default Post;
