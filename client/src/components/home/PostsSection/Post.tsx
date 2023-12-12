import React from "react";
import { MoreLink, PostWrapper } from "./styled";
import { Dropdown, Flex } from "antd";
import CustomAvatar from "@/components/common/CustomAvatar";
import {
  HeartOutlined,
  LinkOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const Post = () => {
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
            items: [
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
            ],
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

      <div>content</div>

      <div className="time">just now</div>

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
