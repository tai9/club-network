import { Request, Response } from "express";
import { constants } from "http2";
import { Level } from "../entities";
import levelService from "../services/level.service";

const createLevel = async (req: Request, res: Response) => {
  try {
    const level = new Level();
    level.name = req.body.name;
    level.description = req.body.description;
    level.status = req.body.status;
    level.targetPoint = req.body.targetPoint;

    const levelCreated = await levelService.createLevel(level);

    return res.status(constants.HTTP_STATUS_OK).json(levelCreated);
  } catch (error) {
    console.log(error);

    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getLevels = async (req: Request, res: Response) => {
  try {
    const levels = await levelService.getLevels();
    return res.status(constants.HTTP_STATUS_OK).json(levels);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteLevel = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    try {
      const { affected } = await levelService.deleteLevel(id);
      if (affected === 0) {
        throw new Error("Level not found");
      }
      return res.status(constants.HTTP_STATUS_OK).json({ id });
    } catch (error: any) {
      console.log(error);
      res
        .status(constants.HTTP_STATUS_BAD_REQUEST)
        .json({ error: error.message });
    }
  } catch (err) {
    res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).json();
  }
};

const updateLevel = async (req: Request, res: Response) => {
  try {
    // const id = +req.params.id;
    // const level = new Level();
    // const levels = await levelService.deleteLevel(id);
    return res.status(constants.HTTP_STATUS_OK).json({});
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createLevel,
  getLevels,
  deleteLevel,
  updateLevel,
};
