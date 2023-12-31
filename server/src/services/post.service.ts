import { IGetHighlightPostsParams, IGetPostsParams, IPost } from "@/types/Post";
import { Any, Between, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../configs/db.config";
import { Post } from "../entities";
import reactionService from "./reaction.service";
import commentService from "./comment.service";

const postRepository = AppDataSource.getRepository(Post);

const getPosts = async (queries?: IGetPostsParams) => {
  const skip = (queries.page - 1) * queries.limit;

  try {
    let where = {};
    let order = {};

    if (!!queries.memberIds?.length) {
      where["createdBy"] = {
        id: Any(queries.memberIds),
      };
    }

    if (queries.isNotification) {
      where["isNotification"] = queries.isNotification;
    }

    if (!!queries.order?.length) {
      queries.order.forEach((o) => {
        const [key, value] = o.split(",");
        order[key] = value;
      });
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
        // "comments",
        // "comments.createdBy",
        // "reactions",
      ],
      where,
      skip,
      take: queries.limit,
      order: {
        isNotification: "DESC",
        updatedAt: "DESC",
        ...order,
      },
    });

    const posts: IPost[] = [];

    for await (const post of data) {
      const [reactionCount, commentCount, isLiked] = await Promise.all([
        await reactionService.getReactionsOfPost(post.id),
        await commentService.getCommentCountOfPost(post.id),
        await reactionService.checkMemberReaction(
          post.id,
          post.createdBy.id,
          "LIKE"
        ),
      ]);
      posts.push({
        ...post,
        reactionCount,
        commentCount,
        isLiked,
      });
    }

    const totalPages = Math.ceil(count / queries.limit) || 1;

    return {
      count,
      totalPages,
      page: queries.page,
      limit: queries.limit,
      data: posts,
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

const bulkCreatePost = async (posts: Post[]) => {
  try {
    return await postRepository.insert(posts);
  } catch (err) {
    throw err;
  }
};

const updatePost = async (post: Post) => {
  try {
    post.updatedAt = new Date();
    return await postRepository.save(post);
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

const getHighlightPosts = async (
  queries: IGetHighlightPostsParams = {
    page: 1,
    limit: 20,
  }
) => {
  try {
    const skip = (queries.page - 1) * queries.limit;
    const query = `
        SELECT
            p.*,
            COUNT(c."id") AS "commentCount",
            COUNT(*) FILTER (WHERE r."type" = 'LIKE') AS "likeCount"
        FROM "posts" p
        LEFT JOIN "comments" c ON p."id" = c."postId"
        LEFT JOIN "reactions" r ON p."id" = r."postId"
        GROUP BY p."id"
        ORDER BY "commentCount" DESC, "likeCount" DESC
        LIMIT ${queries.limit}
        OFFSET ${skip}
    `;

    const data = await postRepository.manager.query(query);

    const res = await Promise.all(
      data.map(async (item) => {
        const post = await getPostById(item.id);
        return {
          ...post,
          commentCount: item.commentcount,
          likeCount: item.likecount,
        };
      })
    );

    return res;
  } catch (err) {
    throw err;
  }
};

export default {
  bulkCreatePost,
  createPost,
  getPosts,
  getPostById,
  deletePost,
  updatePost,
  getHighlightPosts,
};
