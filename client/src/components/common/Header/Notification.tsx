import React from "react";
import { NotificationWrapper } from "./styled";
import { Avatar, Badge, Flex, Popconfirm } from "antd";
import { BellOutlined } from "@ant-design/icons";
import CustomAvatar from "../CustomAvatar";
import NotiItem from "./NotiItem";

const Notification = () => {
  return (
    <Popconfirm
      title={null}
      icon={null}
      description={
        <NotificationWrapper>
          <Flex justify="space-between" align="center">
            <div className="heading">Notifications</div>
            <div className="read">Mark as all read</div>
          </Flex>
          <Flex className="noti-list" vertical>
            <NotiItem />
            <NotiItem />
            <NotiItem />
            <NotiItem />
          </Flex>
        </NotificationWrapper>
      }
      okText={null}
      cancelText=""
      okButtonProps={{
        style: {
          display: "none",
        },
      }}
      showCancel={false}
    >
      <Badge color="#f7c842" count={1000} overflowCount={99}>
        <div className="pointer">
          <Avatar size={48} icon={<BellOutlined />} />
        </div>
      </Badge>
    </Popconfirm>
  );
};

export default Notification;
