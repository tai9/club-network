import { Request, Response } from "express";
import { constants } from "http2";
import activityService from "../services/activity.service";

const getActivities = async (req: Request, res: Response) => {
  try {
    const activitys = await activityService.getActivities();
    return res.status(constants.HTTP_STATUS_OK).json(activitys);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  getActivities,
};
