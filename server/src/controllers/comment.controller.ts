import { Request, Response } from "express";
import { constants } from "http2";
import { Comment, Member } from "../entities";
import commentService from "../services/comment.service";
import activityService from "../services/activity.service";

const createComment = async (req: Request, res: Response) => {
  const member = (req as any)?.member as Member;
  try {
    const comment = new Comment();
    comment.postId = req.body.postId;
    comment.content = req.body.content;
    comment.memberId = member?.id;

    const commentCreated = await commentService.createComment(comment);
    await activityService.createActivity({
      type: "COMMENT",
      status: "SUCCESS",
      description: "Create comment",
      data: JSON.stringify(commentCreated),
      createdBy: member?.id,
    });
    return res.status(constants.HTTP_STATUS_OK).json(commentCreated);
  } catch (error) {
    console.log(error);
    await activityService.createActivity({
      type: "COMMENT",
      status: "FAIL",
      description: "Create comment",
      data: JSON.stringify(error),
      createdBy: member?.id,
    });
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getComments();
    return res.status(constants.HTTP_STATUS_OK).json(comments);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    // const user = req?.session.user as User;
    try {
      const { affected } = await commentService.deleteComment(id);
      if (affected === 0) {
        throw new Error("Comment not found");
      }
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "SUCCESS",
      //   description: "Delete comment",
      //   data: JSON.stringify({ commentId: id }),
      //   createdBy: user?.id,
      // });
      return res.status(constants.HTTP_STATUS_OK).json({ id });
    } catch (error: any) {
      console.log(error);
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "FAIL",
      //   description: "Delete comment",
      //   data: JSON.stringify({ commentId: id, error: error.message }),
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

const updateComment = async (req: Request, res: Response) => {
  try {
    // const id = +req.params.id;
    // const comment = new Comment();
    // const comments = await commentService.deleteComment(id);
    return res.status(constants.HTTP_STATUS_OK).json({});
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createComment,
  getComments,
  deleteComment,
  updateComment,
};
