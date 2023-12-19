import { IGetPostsParams } from "@/types/Post";
import { AppDataSource } from "../configs/db.config";
import { Post } from "../entities";

const postRepository = AppDataSource.getRepository(Post);

const getPosts = async (params?: IGetPostsParams) => {
  try {
    const [data, count] = await postRepository.findAndCount({
      relations: [
        "createdBy",
        "createdBy.role",
        "comments",
        "comments.createdBy",
        "reactions",
      ],
      where: {
        createdBy: {
          id: params?.memberId,
        },
      },
    });

    return { data, count };
  } catch (err) {
    throw err;
  }
};

const createPost = async (post: Post) => {
  try {
    return await postRepository.save(post);
  } catch (err) {
    throw err;
  }
};

const updatePost = async (post: Post) => {
  try {
    post.updatedAt = new Date();
    return await postRepository.update(post.id, {
      ...post,
    });
  } catch (err) {
    throw err;
  }
};

const getPostById = async (id: number) => {
  try {
    return await postRepository.findOne({
      where: {
        id,
      },
      relations: ["createdBy"],
    });
  } catch (err) {
    throw err;
  }
};

const deletePost = async (id: number) => {
  try {
    return await postRepository.softDelete({ id });
  } catch (err) {
    throw err;
  }
};

export default {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
};
