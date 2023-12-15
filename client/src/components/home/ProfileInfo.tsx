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

const ProfileInfo = () => {
  const { id } = useParams();
  const { data: memberData } = useMemberById(+id);
  return (
    <ProfileInfoWrapper>
      <Flex gap={12} align="center">
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
              <HighlightText>LVL 0</HighlightText>
            </Tag>
          </Flex>
          <div>{memberData?.bio || "---"}</div>
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
