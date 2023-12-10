import {
  EditOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Tag } from "antd";
import { ProfileInfoWrapper, ProfileName } from "./styled";

const ProfileInfo = () => {
  return (
    <ProfileInfoWrapper>
      <Flex gap={12} align="center">
        <div>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <Flex vertical gap={10}>
          <Flex align="baseline" gap={8}>
            <div>
              <ProfileName>zgfok.c.wam</ProfileName>
            </div>
            <Tag
              style={{
                borderColor: "#a0fe7f",
                color: "#a0fe7f",
                borderRadius: 8,
                fontWeight: 500,
                fontSize: 12,
              }}
            >
              LVL 0
            </Tag>
          </Flex>
          <div>bio</div>
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
