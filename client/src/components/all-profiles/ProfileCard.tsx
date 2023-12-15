import React, { useMemo } from "react";
import { ProfileCardLayout } from "./styled";
import CustomAvatar from "../common/CustomAvatar";
import { Flex, Tag, Tooltip } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { IMember } from "@/types/Member";
import { useLevels } from "@/hooks/useLevels";
import { ILevel } from "@/types/Level";

type Props = {
  member: IMember;
};

const ProfileCard = ({ member }: Props) => {
  const { data } = useLevels(member.exp);
  const currentLevel = useMemo(() => data as ILevel, [data]);

  return (
    <ProfileCardLayout>
      <CustomAvatar />
      <Flex vertical gap={4}>
        <Flex align="center" gap={4}>
          <div>{member.fullname || member.username}</div>
          <Tooltip title={`${currentLevel?.description}: ${member.exp} XP`}>
            <Tag
              style={{
                fontSize: 9,
              }}
            >
              {currentLevel?.name}
            </Tag>
          </Tooltip>
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
