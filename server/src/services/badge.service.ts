import { AppDataSource } from "../configs/db.config";
import { Badge } from "../entities";

const badgeRepository = AppDataSource.getRepository(Badge);

const getBadges = async () => {
  try {
    const [data, count] = await badgeRepository.findAndCount();
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createBadge = async (badge: Badge) => {
  try {
    return await badgeRepository.save(badge);
  } catch (err) {
    throw err;
  }
};

const updateBadge = async (badge: Badge) => {
  try {
    return await badgeRepository.update(badge.id, {
      ...badge,
    });
  } catch (err) {
    throw err;
  }
};

const getBadgeById = async (id: number) => {
  try {
    return await badgeRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

const deleteBadge = async (id: number) => {
  try {
    return await badgeRepository.delete({
      id,
    });
  } catch (err) {
    throw err;
  }
};

export default {
  createBadge,
  getBadges,
  getBadgeById,
  deleteBadge,
  updateBadge,
};
