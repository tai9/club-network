import { Request, Response } from "express";
import { constants } from "http2";
import { Badge, Member } from "../entities";
import badgeService from "../services/badge.service";
import activityService from "../services/activity.service";

const createBadge = async (req: Request, res: Response) => {
  const member = (req as any)?.member as Member;
  try {
    const badge = new Badge();
    badge.name = req.body.name;
    badge.description = req.body.description;
    badge.status = req.body.status;
    badge.memberId = member?.id;

    const badgeCreated = await badgeService.createBadge(badge);
    await activityService.createActivity({
      type: "BADGE",
      status: "SUCCESS",
      description: "Create badge",
      data: JSON.stringify(badgeCreated),
      createdBy: member?.id,
    });
    return res.status(constants.HTTP_STATUS_OK).json(badgeCreated);
  } catch (error) {
    console.log(error);
    await activityService.createActivity({
      type: "BADGE",
      status: "FAIL",
      description: "Create badge",
      data: JSON.stringify(error),
      createdBy: member?.id,
    });
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getBadges = async (req: Request, res: Response) => {
  try {
    const badges = await badgeService.getBadges();
    return res.status(constants.HTTP_STATUS_OK).json(badges);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteBadge = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const member = (req as any)?.member as Member;
    try {
      const { affected } = await badgeService.deleteBadge(id);
      if (affected === 0) {
        throw new Error("Badge not found");
      }
      await activityService.createActivity({
        type: "BADGE",
        status: "SUCCESS",
        description: "Delete badge",
        data: JSON.stringify({ badgeId: id }),
        createdBy: member?.id,
      });
      return res.status(constants.HTTP_STATUS_OK).json({ id });
    } catch (error: any) {
      console.log(error);
      await activityService.createActivity({
        type: "BADGE",
        status: "FAIL",
        description: "Delete badge",
        data: JSON.stringify({ badgeId: id, error: error.message }),
        createdBy: member?.id,
      });
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .json({ error: error.message });
    }
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json();
  }
};

const updateBadge = async (req: Request, res: Response) => {
  try {
    // const id = +req.params.id;
    // const badge = new Badge();
    // const badges = await badgeService.deleteBadge(id);
    return res.status(constants.HTTP_STATUS_OK).json({});
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createBadge,
  getBadges,
  deleteBadge,
  updateBadge,
};
