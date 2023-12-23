import axiosClient from "@/configs/axiosClient";
import { INotification } from "@server/types/Notification";
import { DataWithPagination } from "@server/types/common";

const prefix = "notifications";

const notificationController = {
  getAll() {
    return axiosClient.get<DataWithPagination<INotification>>(`/${prefix}`);
  },
  count(isRead?: boolean) {
    return axiosClient.get<{ count: number }>(`/${prefix}/count`, {
      params: { isRead },
    });
  },
  readAll() {
    return axiosClient.post(`/${prefix}`);
  },
  read(id: number) {
    return axiosClient.put(`/${prefix}/${id}`);
  },
};

export default notificationController;
