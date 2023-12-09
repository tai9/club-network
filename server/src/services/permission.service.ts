import { IPermision } from "@/types/Permission";
import { AppDataSource } from "../configs/db.config";
import { Permission, PermissionCategory } from "../entities";

const permCateRepository = AppDataSource.getRepository(PermissionCategory);
const permissionRepository = AppDataSource.getRepository(Permission);

const getPermCategories = async () => {
  try {
    return await permCateRepository.find();
  } catch (err) {
    throw err;
  }
};

const createPermission = async (perm: Partial<IPermision>) => {
  try {
    return await permissionRepository.save(perm);
  } catch (err) {
    throw err;
  }
};

const getPermissions = async () => {
  try {
    const [data, count] = await permissionRepository.findAndCount();
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const deletePermission = async (id: number) => {
  try {
    return await permissionRepository.delete(id);
  } catch (err) {
    throw err;
  }
};

export default {
  getPermCategories,
  createPermission,
  getPermissions,
  deletePermission,
};
