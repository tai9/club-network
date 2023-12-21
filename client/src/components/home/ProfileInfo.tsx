import { useMemberById } from "@/hooks/useMember";
import {
  EditOutlined,
  MobileOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Flex, Modal, Tag } from "antd";
import { useParams } from "next/navigation";
import { HighlightText, MoreLink } from "../common/styled";
import { ProfileInfoWrapper, ProfileName } from "./styled";
import { useLevels } from "@/hooks/useLevels";
import { useMemo, useState } from "react";
import { ILevel } from "@/types/Level";
import QRModal from "./QRModal";

const ProfileInfo = () => {
  const params = useParams();
  const id = (params?.id as string) || "";
  const { data: memberData } = useMemberById(+id);
  const { data: myExp } = useLevels(memberData?.exp);
  const currentLevel = useMemo(() => myExp as ILevel, [myExp]);

  const [openQRModal, setOpenQRModal] = useState(false);
  const handleCancelQR = () => {
    setOpenQRModal(false);
  };

  const renderItems = () => {
    const items = [
      {
        key: "QR",
        label: (
          <MoreLink
            align="center"
            gap={8}
            onClick={() => {
              setOpenQRModal(true);
            }}
          >
            <MobileOutlined
              style={{
                fontSize: 16,
              }}
            />
            <span>GET QR CODE FOR THIS PAGE</span>
          </MoreLink>
        ),
      },
    ];
    return items;
  };

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
          {memberData?.bio && <div>{memberData.bio}</div>}
        </Flex>
      </Flex>
      <Flex gap="small" className="profile-actions">
        <Button type="primary" icon={<EditOutlined />}></Button>
        <Dropdown
          placement="bottomLeft"
          trigger={["click"]}
          menu={{
            items: renderItems(),
          }}
        >
          <Button type="primary" icon={<ShareAltOutlined />}></Button>
        </Dropdown>
      </Flex>

      <QRModal open={openQRModal} onCancel={handleCancelQR} />
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
