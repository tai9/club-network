import { INotification } from "@/types/Notification";
import { AppDataSource } from "../configs/db.config";
import { Notification } from "../entities";

const notificationRepository = AppDataSource.getRepository(Notification);

const getNotifications = async (memberId: number) => {
  try {
    const [data, count] = await notificationRepository.findAndCount({
      where: {
        createdBy: memberId as any,
      },
      relations: ["createdBy"],
    });
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const getNotificationCount = async (memberId: number, isRead?: boolean) => {
  try {
    const count = await notificationRepository.countBy({
      createdBy: memberId as any,
      isRead,
    });
    return count;
  } catch (err) {
    throw err;
  }
};

const createNotification = async (noti?: Partial<INotification>) => {
  try {
    const notification = new Notification();
    notification.title = noti.title;
    notification.description = noti.description;
    notification.type = noti.type;
    notification.isRead = false;
    notification.createdBy = noti.createdBy;

    return await notificationRepository.save(notification);
  } catch (err) {
    throw err;
  }
};

const updateNotification = async (notification: Notification) => {
  try {
    return await notificationRepository.update(notification.id, {
      ...notification,
    });
  } catch (err) {
    throw err;
  }
};

const readNotification = async (notificationId: number) => {
  try {
    return await notificationRepository.update(notificationId, {
      isRead: true,
    });
  } catch (err) {
    throw err;
  }
};

const readAllNotifications = async (memberId: number) => {
  try {
    return await notificationRepository
      .createQueryBuilder()
      .update(Notification)
      .set({
        isRead: true,
      })
      .where("createdBy = :memberId", { memberId })
      .execute();
  } catch (err) {
    throw err;
  }
};

const getNotificationById = async (id: number) => {
  try {
    return await notificationRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

const deleteNotification = async (id: number) => {
  try {
    return await notificationRepository.delete({
      id,
    });
  } catch (err) {
    throw err;
  }
};

export default {
  createNotification,
  getNotifications,
  getNotificationById,
  deleteNotification,
  updateNotification,
  readAllNotifications,
  readNotification,
  getNotificationCount,
};
