import { UserOutlined } from "@ant-design/icons";
import { Avatar, AvatarProps } from "antd";
import React from "react";
import { AvatarStyled } from "./styled";

type Props = AvatarProps & {
  username?: string;
  isHost?: boolean;
};

const CustomAvatar = ({ isHost, username, ...props }: Props) => {
  const firstCharacter = () => {
    if (!username) return <UserOutlined />;

    return username.charAt(0).toUpperCase();
  };
  return (
    <AvatarStyled>
      {isHost && <img className="vm" src="/vm.png" alt="" />}
      <Avatar size={48} icon={firstCharacter()} {...props}></Avatar>
    </AvatarStyled>
  );
};

export default CustomAvatar;
