import notificationController from "@/controllers/notificationController";
import { useQuery } from "@tanstack/react-query";

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await notificationController.getAll();
      return res.data;
    },
  });
};

export const useNotificationCount = (isRead?: boolean) => {
  return useQuery({
    queryKey: ["notification_count", { isRead }],
    queryFn: async () => {
      const res = await notificationController.count(isRead);
      return res.data;
    },
  });
};
