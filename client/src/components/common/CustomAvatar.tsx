import { UserOutlined } from "@ant-design/icons";
import { Avatar, AvatarProps } from "antd";
import React from "react";

type Props = AvatarProps & {
  username?: string;
};

const CustomAvatar = (props: Props) => {
  const firstCharacter = () => {
    if (!props.username) return <UserOutlined />;

    return props.username.charAt(0).toUpperCase();
  };
  return (
    <div
      style={{
        cursor: "pointer",
      }}
    >
      <Avatar size={48} icon={firstCharacter()} {...props}></Avatar>
    </div>
  );
};

export default CustomAvatar;
