import {
  EditOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Tag } from "antd";
import { ProfileInfoWrapper, ProfileName } from "./styled";
import { HighlightText } from "../common/styled";
import useMember from "@/hooks/useMember";

const ProfileInfo = () => {
  const { data: memberData } = useMember();
  return (
    <ProfileInfoWrapper>
      <Flex gap={12} align="center">
        <div>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <Flex vertical gap={10}>
          <Flex align="baseline" gap={8}>
            <div>
              <ProfileName>
                {memberData?.data.fullname || memberData?.data.username}
              </ProfileName>
            </div>
            <Tag
              style={{
                borderColor: "#a0fe7f",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 12,
              }}
            >
              <HighlightText>LVL 0</HighlightText>
            </Tag>
          </Flex>
          <div>{memberData?.data.bio || "---"}</div>
        </Flex>
      </Flex>
      <Flex gap="small">
        <Button type="primary" icon={<EditOutlined />}></Button>
        <Button type="primary" icon={<ShareAltOutlined />}></Button>
      </Flex>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
