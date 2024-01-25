import React, { useMemo } from "react";
import { ProfileCardLayout } from "./styled";
import CustomAvatar from "../common/CustomAvatar";
import { Flex, Tag, Tooltip } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { IMember } from "@server/types/Member";
import { useLevels } from "@/hooks/useLevels";
import { ILevel } from "@server/types/Level";

type Props = {
  member: IMember;
};

const ProfileCard = ({ member }: Props) => {
  const { data } = useLevels(member.exp);
  const currentLevel = useMemo(() => data as ILevel, [data]);

  return (
    <ProfileCardLayout>
      <CustomAvatar
        username={member.username}
        isHost={member.role?.grade === 10}
      />
      <Flex vertical gap={4}>
        <Flex align="center" gap={4}>
          <Tooltip title={member.fullname ? member.username : null}>
            <div>{member.fullname || member.username}</div>
          </Tooltip>
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
        <div className="role">{member.role?.description}</div>
        <Flex gap={12}>
          <Tooltip
            title={`${
              member.reactionCount?.find((x) => x.type === "LIKE")?.count || 0
            } member's reactions`}
            placement="bottom"
          >
            <Flex gap={4}>
              <HeartOutlined />
              <span>
                {member.reactionCount?.find((x) => x.type === "LIKE")?.count ||
                  0}
              </span>
            </Flex>
          </Tooltip>
          <Tooltip
            title={`${member.postCount || 0} member's posts`}
            placement="bottom"
          >
            <Flex gap={4}>
              <MessageOutlined />
              <span>{member.postCount || 0}</span>
            </Flex>
          </Tooltip>
        </Flex>
      </Flex>
    </ProfileCardLayout>
  );
};

export default ProfileCard;
