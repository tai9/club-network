import useClubNetwork from "@/hooks/useClubNetwork";
import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Empty, Flex, Popconfirm } from "antd";
import NotiItem from "./NotiItem";
import { NotificationWrapper } from "./styled";
import {
  useNotificationCount,
  useNotifications,
} from "@/hooks/useNotifications";

const Notification = () => {
  const { data: countData, refetch: countRefetch } = useNotificationCount();
  const { data } = useNotifications();
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
          {data?.count === 0 ? (
            <Empty />
          ) : (
            <Flex className="noti-list" vertical>
              {data?.data.map((noti) => (
                <NotiItem key={noti.id} />
              ))}
            </Flex>
          )}
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
      onOpenChange={async (open) => {
        open && (await countRefetch());
      }}
    >
      <Badge color="#f7c842" count={countData?.count || 0} overflowCount={99}>
        <div className="pointer">
          <Avatar size={48} icon={<BellOutlined />} />
        </div>
      </Badge>
    </Popconfirm>
  );
};

export default Notification;
