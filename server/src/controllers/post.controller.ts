import { Request, Response } from "express";
import { constants } from "http2";
import { Post, Member } from "../entities";
import postService from "../services/post.service";
import memberService from "@/services/member.service";
import { IGetPostsParams } from "@/types/Post";
// import auditService from "../services/audit.service";

const createPost = async (req: Request, res: Response) => {
  const member = (req as any)?.member as Member;
  try {
    const post = new Post();
    post.name = req.body.name;
    post.content = req.body.content;
    post.status = req.body.status;
    post.media = req.body.media;
    post.createdBy = member;

    const postCreated = await postService.createPost(post);
    await memberService.updateExp(member.id, "POST");
    // await auditService.createAuditLog({
    //   type: "ROLE",
    //   status: "SUCCESS",
    //   description: "Create post",
    //   data: JSON.stringify(postCreated),
    //   createdBy: user?.id,
    // });
    return res.status(constants.HTTP_STATUS_OK).json(postCreated);
  } catch (error) {
    console.log(error);
    // await auditService.createAuditLog({
    //   type: "ROLE",
    //   status: "FAIL",
    //   description: "Create post",
    //   data: JSON.stringify(error),
    //   createdBy: user?.id,
    // });
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getPosts = async (
  req: Request<any, any, any, IGetPostsParams>,
  res: Response
) => {
  try {
    const posts = await postService.getPosts(req.query);
    return res.status(constants.HTTP_STATUS_OK).json(posts);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    // const user = req?.session.user as User;
    try {
      const { affected } = await postService.deletePost(id);
      if (affected === 0) {
        throw new Error("Post not found");
      }
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "SUCCESS",
      //   description: "Delete post",
      //   data: JSON.stringify({ postId: id }),
      //   createdBy: user?.id,
      // });
      return res.status(constants.HTTP_STATUS_OK).json({ id });
    } catch (error: any) {
      console.log(error);
      // await auditService.createAuditLog({
      //   type: "ROLE",
      //   status: "FAIL",
      //   description: "Delete post",
      //   data: JSON.stringify({ postId: id, error: error.message }),
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

const updatePost = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const post = await postService.getPostById(id);
    post.content = req.body.content;
    await postService.updatePost(post);
    return res.status(constants.HTTP_STATUS_OK).json(post);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

const getPost = async (req: Request, res: Response) => {
  try {
    const id = +req.params.id;
    const post = await postService.getPostById(id);
    return res.status(constants.HTTP_STATUS_OK).json(post);
  } catch (error) {
    console.log(error);
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json(error);
  }
};

export default {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  getPost,
};
