import React from "react";
import { ProfileCardLayout } from "./styled";
import CustomAvatar from "../common/CustomAvatar";
import { Flex, Tag, Tooltip } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";

const ProfileCard = () => {
  return (
    <ProfileCardLayout>
      <CustomAvatar />
      <Flex vertical gap={4}>
        <Flex align="center" gap={4}>
          <div>Kaiser</div>
          <Tag
            style={{
              fontSize: 9,
            }}
          >
            LVL 0
          </Tag>
        </Flex>
        <div className="role">CN</div>
        <Flex gap={12}>
          <Tooltip title="10 member's reactions" placement="bottom">
            <Flex gap={4}>
              <HeartOutlined />
              <span>10</span>
            </Flex>
          </Tooltip>
          <Tooltip title="9 member's posts" placement="bottom">
            <Flex gap={4}>
              <MessageOutlined />
              <span>9</span>
            </Flex>
          </Tooltip>
        </Flex>
      </Flex>
    </ProfileCardLayout>
  );
};

export default ProfileCard;
