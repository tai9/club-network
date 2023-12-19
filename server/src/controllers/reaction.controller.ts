import memberService from "@/services/member.service";
import { Request, Response } from "express";
import { constants } from "http2";
import { Member, Reaction } from "../entities";
import reactionService from "../services/reaction.service";
import { io } from "..";
import postService from "@/services/post.service";
import notificationService from "@/services/notification.service";
import { ESocketEventName } from "@/types/common";
// import auditService from "../services/audit.service";

const createReaction = async (req: Request, res: Response) => {
  const member = (req as any)?.member as Member;
  try {
    const reaction = new Reaction();
    reaction.postId = req.body.postId;
    reaction.type = req.body.type;
    reaction.memberId = member?.id;

    await memberService.updateExp(member.id, req.body.type);

    const reactionCreated = await reactionService.createReaction(reaction);
    // await auditService.createAuditLog({
    //   type: "ROLE",
    //   status: "SUCCESS",
    //   description: "Create reaction",
    //   data: JSON.stringify(reactionCreated),
    //   createdBy: user?.id,
    // });
    const post = await postService.getPostById(reactionCreated.postId);
    if (post.createdBy.id !== reactionCreated.memberId) {
      await notificationService.createNotification({
        title: `<b>${member.username}</b> like your <b>post</b>`,
        description: post.content,
        createdBy: post.createdBy,
        type: "POST",
      });
      io.to(`user-${post.createdBy.username}`).emit(
        ESocketEventName.NOTIFICATION,
        `user-${post.createdBy.username}`
      );
    }
    return res.status(constants.HTTP_STATUS_OK).json(reactionCreated);
  } catch (error) {
    console.log(error);
    // await auditService.createAuditLog({
    //   type: "ROLE",
    //   status: "FAIL",
    //   description: "Create reaction",
    //   data: JSON.stringify(error),
    //   createdBy: user?.id,
    // });
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getReactions = async (req: Request, res: Response) => {
  try {
    const reactions = await reactionService.getReactions();
    return res.status(constants.HTTP_STATUS_OK).json(reactions);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deleteReaction = async (req: Request, res: Response) => {
  try {
    const postId = +req.params.id;
    const type = req.body.type;
    const member = (req as any)?.member as Member;
    try {
      const { affected } = await reactionService.deleteReaction({
        postId,
        memberId: member.id,
        type,
      });
      if (affected === 0) {
        throw new Error("Reaction not found");
      }
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "SUCCESS",
      //   description: "Delete reaction",
      //   data: JSON.stringify({ reactionId: id }),
      //   createdBy: user?.id,
      // });
      return res.status(constants.HTTP_STATUS_OK).json({ postId });
    } catch (error: any) {
      console.log(error);
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "FAIL",
      //   description: "Delete reaction",
      //   data: JSON.stringify({ reactionId: id, error: error.message }),
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

const updateReaction = async (req: Request, res: Response) => {
  try {
    // const id = +req.params.id;
    // const reaction = new Reaction();
    // const reactions = await reactionService.deleteReaction(id);
    return res.status(constants.HTTP_STATUS_OK).json({});
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getReactionsOfPost = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const reactions = await reactionService.getReactionsOfPost(id);
    return res.status(constants.HTTP_STATUS_OK).json(reactions);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createReaction,
  getReactions,
  deleteReaction,
  updateReaction,
  getReactionsOfPost,
};
