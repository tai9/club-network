import CustomAvatar from "@/components/common/CustomAvatar";
import postController from "@/controllers/postController";
import useClubNetwork from "@/hooks/useClubNetwork";
import { useMember } from "@/hooks/useMember";
import usePosts from "@/hooks/usePosts";
import { IPost } from "@/types/Post";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  HeartFilled,
  HeartOutlined,
  LinkOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Divider, Dropdown, Flex, Input, Modal, message } from "antd";
import moment from "moment";
import { Content, MoreLink, PostWrapper } from "./styled";
import { useQuery } from "react-query";
import reactionsController from "@/controllers/reactionController";
import { useMemo, useState } from "react";
import { formatLastTime } from "@/utils/formatTime";
import commentController from "@/controllers/commentController";
import { useMemberExp } from "@/hooks/useMember";
import { useParams } from "next/navigation";

type Props = {
  data: IPost;
};

const Post = ({ data }: Props) => {
  const { data: memberData } = useMember();
  const isOwner = memberData?.data.id === data.createdBy.id;
  const { refetch } = usePosts();
  const { refetch: refetchMyLevel } = useMemberExp();

  const [commentValue, setCommentValue] = useState("");
  const [toggleComments, setToggleComments] = useState(false);

  const reactionQuery = useQuery(["post_detail", data.id], () =>
    reactionsController.getOfPost(data.id)
  );
  const likeCount = useMemo(
    () => reactionQuery.data?.data.find((x) => x.type === "LIKE")?.count,
    [reactionQuery.data]
  );
  const isLiked = useMemo(
    () =>
      data.reactions.findIndex((x) => x.memberId === memberData?.data.id) !==
      -1,
    [data.reactions, memberData?.data.id]
  );

  const { setOpenPostModal, setPostContent, setPost } = useClubNetwork();

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
      await refetch();
      await reactionQuery.refetch();
      await refetchMyLevel();
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
      await refetch();
      await refetchMyLevel();
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await commentController.delete(commentId);
      await refetch();
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  const renderItems = () => {
    const items = [
      {
        key: "1",
        label: (
          <MoreLink align="center" gap={8}>
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
          <CustomAvatar />
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

      {toggleComments ? (
        <>
          <Divider style={{ margin: 0 }} />

          <Flex gap={16} vertical>
            {data.comments.map((c) => (
              <Flex gap={12} key={c.id}>
                <CustomAvatar size="default" />
                <Flex gap={4} vertical>
                  <Flex gap={8} align="center">
                    <div className="name">
                      {c.createdBy.fullname || c.createdBy.username}
                    </div>
                    <div className="time">{formatLastTime(c.createdAt)}</div>
                    {c.memberId === memberData?.data.id && (
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
              <CustomAvatar size="default" />
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
