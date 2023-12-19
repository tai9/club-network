import notificationController from "@/controllers/notificationController";
import { useQuery } from "react-query";

export const useNotifications = () => {
  return useQuery(["notifications"], async () => {
    const res = await notificationController.getAll();
    return res.data;
  });
};

export const useNotificationCount = (isRead?: boolean) => {
  return useQuery(["notification_count", isRead], async () => {
    const res = await notificationController.count(isRead);
    return res.data;
  });
};
