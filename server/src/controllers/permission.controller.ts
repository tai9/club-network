import { Request, Response } from "express";
import { constants } from "http2";
import permissionService from "../services/permission.service";
import { Permission } from "../entities";

const getPermCategories = async (req: Request, res: Response) => {
  try {
    const permCategories = await permissionService.getPermCategories();
    return res.status(constants.HTTP_STATUS_OK).json(permCategories);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const createPermission = async (req: Request, res: Response) => {
  try {
    const { name, description, status, categories } = req.body;
    const perm = new Permission();
    perm.name = name;
    perm.description = description;
    perm.status = status;
    perm.categories = categories;
    const permCategories = await permissionService.createPermission(perm);
    return res.status(constants.HTTP_STATUS_OK).json(permCategories);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getPermissions = async (req: Request, res: Response) => {
  try {
    const permCategories = await permissionService.getPermissions();
    return res.status(constants.HTTP_STATUS_OK).json(permCategories);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deletePermission = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const permCategories = await permissionService.deletePermission(+id);
    return res.status(constants.HTTP_STATUS_OK).json(permCategories);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  getPermCategories,
  createPermission,
  getPermissions,
  deletePermission,
};
