import { Badge, Flex } from "antd";
import React from "react";
import CustomAvatar from "../CustomAvatar";
import { INotification } from "@server/types/Notification";
import { formatLastTime } from "@/utils/formatTime";

type Props = {
  notification: INotification;
  onClick?: () => void;
};

const NotiItem = ({ notification, onClick }: Props) => {
  return (
    <Flex className="noti-item" align="center" gap={8} onClick={onClick}>
      <CustomAvatar username={notification.createdBy.username} />
      <Flex
        vertical
        style={{
          flexGrow: 1,
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: notification.title,
          }}
        />
        <i
          style={{
            fontSize: 13,
            color: "#ccc6bd",
          }}
        >
          {notification.description}
        </i>
        <div
          style={{
            fontSize: 13,
            color: "#ccc6bd",
          }}
        >
          {formatLastTime(notification.createdAt)}
        </div>
      </Flex>

      {!notification.isRead && (
        <Badge
          style={{
            paddingLeft: 48,
          }}
          color="#ffffffd9"
          status="default"
        />
      )}
    </Flex>
  );
};

export default NotiItem;
