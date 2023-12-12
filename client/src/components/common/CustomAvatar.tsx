import { UserOutlined } from "@ant-design/icons";
import { Avatar, AvatarProps } from "antd";
import React from "react";

type Props = AvatarProps;

const CustomAvatar = (props: Props) => {
  return (
    <div
      style={{
        cursor: "pointer",
      }}
    >
      <Avatar size={48} icon={<UserOutlined />} {...props} />
    </div>
  );
};

export default CustomAvatar;
