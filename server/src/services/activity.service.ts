import { IActivity } from "@/types/Activity";
import { AppDataSource } from "../configs/db.config";
import { Activity } from "../entities";

const activityRepository = AppDataSource.getRepository(Activity);

const getActivities = async () => {
  try {
    const [data, count] = await activityRepository.findAndCount();
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createActivity = async (data: Partial<IActivity>) => {
  try {
    const activity = new Activity();
    activity.type = data.type;
    activity.status = data.status;
    activity.description = data.description;
    activity.createdBy = data.createdBy;
    activity.data = data.data;
    return await activityRepository.save(activity);
  } catch (err) {
    throw err;
  }
};

const getActivityById = async (id: number) => {
  try {
    return await activityRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

export default {
  createActivity,
  getActivities,
  getActivityById,
};
