import { AppDataSource } from "../configs/db.config";
import { Level } from "../entities";

const levelRepository = AppDataSource.getRepository(Level);

const getLevels = async () => {
  try {
    const [data, count] = await levelRepository.findAndCount();
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createLevel = async (level: Level) => {
  try {
    return await levelRepository.save(level);
  } catch (err) {
    throw err;
  }
};

const updateLevel = async (level: Level) => {
  try {
    return await levelRepository.update(level.id, {
      ...level,
    });
  } catch (err) {
    throw err;
  }
};

const getLevelById = async (id: number) => {
  try {
    return await levelRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

const deleteLevel = async (id: number) => {
  try {
    return await levelRepository.delete({
      id,
    });
  } catch (err) {
    throw err;
  }
};

export default {
  createLevel,
  getLevels,
  getLevelById,
  deleteLevel,
  updateLevel,
};
