import notificationController from "@/controllers/notificationController";
import {
  useNotificationCount,
  useNotifications,
} from "@/hooks/useNotifications";
import { BellOutlined } from "@ant-design/icons";
import { Avatar, Badge, Empty, Flex, Popconfirm } from "antd";
import NotiItem from "./NotiItem";
import { NotificationWrapper } from "./styled";

type Props = {
  size?: number;
};

const Notification = ({ size = 48 }: Props) => {
  const { data: countData, refetch: countRefetch } =
    useNotificationCount(false);
  const { data, refetch } = useNotifications();

  const handleReadNotification = async (id: number) => {
    try {
      await notificationController.read(id);
      await refetch();
      await countRefetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReadAllNoti = async () => {
    try {
      await notificationController.readAll();
      await refetch();
      await countRefetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Popconfirm
      title={null}
      icon={null}
      description={
        <NotificationWrapper>
          <Flex justify="space-between" align="center">
            <div className="heading">Notifications</div>
            <div className="read" onClick={handleReadAllNoti}>
              Mark as all read
            </div>
          </Flex>
          {data?.count === 0 ? (
            <Empty />
          ) : (
            <Flex className="noti-list" vertical>
              {data?.data.map((noti) => (
                <NotiItem
                  key={noti.id}
                  notification={noti}
                  onClick={() =>
                    !noti.isRead && handleReadNotification(noti.id)
                  }
                />
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
          <Avatar size={size} icon={<BellOutlined />} />
        </div>
      </Badge>
    </Popconfirm>
  );
};

export default Notification;
