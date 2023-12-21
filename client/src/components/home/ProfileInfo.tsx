import { useMemberById } from "@/hooks/useMember";
import {
  EditOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Tag } from "antd";
import { useParams } from "next/navigation";
import { HighlightText } from "../common/styled";
import { ProfileInfoWrapper, ProfileName } from "./styled";
import { useLevels } from "@/hooks/useLevels";
import { useMemo } from "react";
import { ILevel } from "@/types/Level";

const ProfileInfo = () => {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { data: memberData } = useMemberById(+id);
  const { data: myExp } = useLevels(memberData?.exp);
  const currentLevel = useMemo(() => myExp as ILevel, [myExp]);
  return (
    <ProfileInfoWrapper>
      <Flex className="info" gap={12} align="center">
        <div>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <Flex vertical gap={10}>
          <Flex align="baseline" gap={8}>
            <Flex vertical>
              <ProfileName>
                {memberData?.fullname || memberData?.username}
              </ProfileName>
              <div>{memberData?.username}</div>
            </Flex>
            <Tag
              style={{
                borderColor: "#a0fe7f",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 12,
              }}
            >
              <HighlightText>{currentLevel?.name}</HighlightText>
            </Tag>
          </Flex>
          <div>{memberData?.bio || "---"}</div>
        </Flex>
      </Flex>
      <Flex gap="small" className="profile-actions">
        <Button type="primary" icon={<EditOutlined />}></Button>
        <Button type="primary" icon={<ShareAltOutlined />}></Button>
      </Flex>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
