import CustomAvatar from "@/components/common/CustomAvatar";
import postController from "@/controllers/postController";
import useClubNetwork from "@/hooks/useClubNetwork";
import useMember from "@/hooks/useMember";
import usePosts from "@/hooks/usePosts";
import { IPost } from "@/types/Post";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  HeartOutlined,
  LinkOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Flex, Modal, message } from "antd";
import moment from "moment";
import { Content, MoreLink, PostWrapper } from "./styled";

type Props = {
  data: IPost;
};

const Post = ({ data }: Props) => {
  const { data: memberData } = useMember();
  const isOwner = memberData?.data.id === data.createdBy;
  console.log(memberData?.data, isOwner);
  const { refetch } = usePosts();

  const {
    openPostModal,
    setOpenPostModal,
    postContent,
    setPostContent,
    setPost,
  } = useClubNetwork();

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
            <div className="name">Tailor Nguyen</div>
            <div className="role">CN</div>
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

      <div className="time">
        {moment(data.createdAt).startOf("second").fromNow()}
      </div>

      <Flex gap={24}>
        <Flex gap={4}>
          <HeartOutlined />
          <span>0</span>
        </Flex>
        <Flex gap={4}>
          <MessageOutlined />
          <span>0</span>
        </Flex>
      </Flex>
    </PostWrapper>
  );
};

export default Post;
