import { Request, Response } from "express";
import { constants } from "http2";
import { Member } from "../entities";
import notificationService from "../services/notification.service";
// import auditService from "../services/audit.service";

const getNotifications = async (req: Request, res: Response) => {
  try {
    const member = (req as any)?.member as Member;
    console.log(member.id, "member.id");

    const notifications = await notificationService.getNotifications(member.id);
    return res.status(constants.HTTP_STATUS_OK).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getNotificationCOunt = async (req: Request, res: Response) => {
  try {
    const member = (req as any)?.member as Member;
    const isRead = (req.query?.isRead as string) === "true";
    const count = await notificationService.getNotificationCount(
      member.id,
      isRead
    );
    return res.status(constants.HTTP_STATUS_OK).json({ count });
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const readNotification = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    // const user = req?.session.user as User;
    try {
      const { affected } = await notificationService.readNotification(id);
      if (affected === 0) {
        throw new Error("Notification not found");
      }
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "SUCCESS",
      //   description: "Delete notification",
      //   data: JSON.stringify({ notificationId: id }),
      //   createdBy: user?.id,
      // });
      return res.status(constants.HTTP_STATUS_OK).json({ id });
    } catch (error: any) {
      console.log(error);
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "FAIL",
      //   description: "Delete notification",
      //   data: JSON.stringify({ notificationId: id, error: error.message }),
      //   createdBy: user?.id,
      // });
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .json({ error: error.message });
    }
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json();
  }
};

const readAllNotifications = async (req: Request, res: Response) => {
  try {
    const member = (req as any)?.member as Member;
    try {
      const { affected } = await notificationService.readAllNotifications(
        member.id
      );

      // if (affected === 0) {
      //   throw new Error("Notification not found");
      // }
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "SUCCESS",
      //   description: "Delete notification",
      //   data: JSON.stringify({ notificationId: id }),
      //   createdBy: user?.id,
      // });
      return res
        .status(constants.HTTP_STATUS_OK)
        .json({ message: `Read ${affected} notifications` });
    } catch (error: any) {
      console.log(error);
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "FAIL",
      //   description: "Delete notification",
      //   data: JSON.stringify({ notificationId: id, error: error.message }),
      //   createdBy: user?.id,
      // });
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .json({ error: error.message });
    }
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json();
  }
};

export default {
  readNotification,
  getNotifications,
  readAllNotifications,
  getNotificationCOunt,
};
