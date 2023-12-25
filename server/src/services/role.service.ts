import { AppDataSource } from "../configs/db.config";
import { Role } from "../entities";

const roleRepository = AppDataSource.getRepository(Role);

const getRoles = async () => {
  try {
    const [data, count] = await roleRepository.findAndCount({
      order: {
        grade: "DESC",
      },
    });
    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createRole = async (role: Role) => {
  try {
    return await roleRepository.save(role);
  } catch (err) {
    throw err;
  }
};

const updateRole = async (role: Role) => {
  try {
    return await roleRepository.update(role.id, {
      ...role,
    });
  } catch (err) {
    throw err;
  }
};

const getRoleById = async (id: number) => {
  try {
    return await roleRepository.findOneBy({ id });
  } catch (err) {
    throw err;
  }
};

const getRoleByName = async (name: string) => {
  try {
    return await roleRepository.findOneBy({ name });
  } catch (err) {
    throw err;
  }
};

const deleteRole = async (id: number) => {
  try {
    return await roleRepository.delete({
      id,
    });
  } catch (err) {
    throw err;
  }
};

export default {
  createRole,
  getRoles,
  getRoleById,
  deleteRole,
  updateRole,
  getRoleByName,
};
