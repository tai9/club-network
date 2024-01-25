import { INotification } from "@server/types/Notification";
import { DataWithPagination } from "@server/types/common";
import { AuthController } from "./authController";

const prefix = "notifications";

const notificationController = {
  getAll() {
    return AuthController.axiosClient.get<DataWithPagination<INotification>>(
      `/${prefix}`
    );
  },
  count(isRead?: boolean) {
    return AuthController.axiosClient.get<{ count: number }>(
      `/${prefix}/count`,
      {
        params: { isRead },
      }
    );
  },
  readAll() {
    return AuthController.axiosClient.post(`/${prefix}`);
  },
  read(id: number) {
    return AuthController.axiosClient.put(`/${prefix}/${id}`);
  },
};

export default notificationController;
