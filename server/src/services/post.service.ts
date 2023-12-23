import { IGetPostsParams } from "@/types/Post";
import { Any, Between, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../configs/db.config";
import { Post } from "../entities";

const postRepository = AppDataSource.getRepository(Post);

const getPosts = async (queries?: IGetPostsParams) => {
  const skip = (queries.page - 1) * queries.limit;

  try {
    let where = {};

    if (!!queries.memberIds?.length) {
      where["createdBy"] = {
        id: Any(queries.memberIds),
      };
    }

    if (queries.search) {
      where["content"] = Like(`%${queries.search}%`);
    }

    if (queries.from && queries.to) {
      where["createdAt"] = Between(queries.from, queries.to);
    } else if (queries.from) {
      where["createdAt"] = MoreThanOrEqual(queries.from);
    } else if (queries.to) {
      where["createdAt"] = LessThanOrEqual(queries.to);
    }

    const [data, count] = await postRepository.findAndCount({
      relations: [
        "createdBy",
        "createdBy.role",
        "comments",
        "comments.createdBy",
        "reactions",
      ],
      where,
      skip,
      take: queries.limit,
    });

    const totalPages = Math.ceil(count / queries.limit) || 1;

    return {
      count,
      totalPages,
      page: queries.page,
      limit: queries.limit,
      data,
    };
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
      relations: [
        "createdBy",
        "createdBy.role",
        "comments",
        "comments.createdBy",
        "reactions",
      ],
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
