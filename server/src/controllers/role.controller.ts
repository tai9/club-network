import { Request, Response } from "express";
import { constants } from "http2";
import { Role, Member } from "../entities";
import roleService from "../services/role.service";
// import auditService from "../services/audit.service";

const createRole = async (req: Request, res: Response) => {
  const member = (req as any)?.member as Member;
  try {
    const role = new Role();
    role.name = req.body.name;
    role.description = req.body.description;
    role.status = req.body.status;
    role.permissionIds = req.body.permissionIds;
    role.createdBy = member?.id;

    const roleCreated = await roleService.createRole(role);
    // await auditService.createAuditLog({
    //   type: "ROLE",
    //   status: "SUCCESS",
    //   description: "Create role",
    //   data: JSON.stringify(roleCreated),
    //   createdBy: user?.id,
    // });
    return res.status(constants.HTTP_STATUS_OK).json(roleCreated);
  } catch (error) {
    console.log(error);
    // await auditService.createAuditLog({
    //   type: "ROLE",
    //   status: "FAIL",
    //   description: "Create role",
    //   data: JSON.stringify(error),
    //   createdBy: user?.id,
    // });
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getRoles();
    return res.status(constants.HTTP_STATUS_OK).json(roles);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteRole = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    // const user = req?.session.user as User;
    try {
      const { affected } = await roleService.deleteRole(id);
      if (affected === 0) {
        throw new Error("Role not found");
      }
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "SUCCESS",
      //   description: "Delete role",
      //   data: JSON.stringify({ roleId: id }),
      //   createdBy: user?.id,
      // });
      return res.status(constants.HTTP_STATUS_OK).json({ id });
    } catch (error: any) {
      console.log(error);
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "FAIL",
      //   description: "Delete role",
      //   data: JSON.stringify({ roleId: id, error: error.message }),
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

const updateRole = async (req: Request, res: Response) => {
  try {
    // const id = +req.params.id;
    // const role = new Role();
    // const roles = await roleService.deleteRole(id);
    return res.status(constants.HTTP_STATUS_OK).json({});
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createRole,
  getRoles,
  deleteRole,
  updateRole,
};
