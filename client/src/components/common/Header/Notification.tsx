import useClubNetwork from "@/hooks/useClubNetwork";
import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Flex, Popconfirm } from "antd";
import NotiItem from "./NotiItem";
import { NotificationWrapper } from "./styled";

const Notification = () => {
  const { notificationCount } = useClubNetwork();
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
      <Badge color="#f7c842" count={notificationCount} overflowCount={99}>
        <div className="pointer">
          <Avatar size={48} icon={<BellOutlined />} />
        </div>
      </Badge>
    </Popconfirm>
  );
};

export default Notification;
