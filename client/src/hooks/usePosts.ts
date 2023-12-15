import axiosClient from "@/configs/axiosClient";
import postController from "@/controllers/postController";
import { POST_DATA } from "@/queryKeys";
import { IGetPostsParams, IPost } from "@/types/Post";
import { DataWithPagination } from "@/types/common";
import { useQuery } from "react-query";

const usePosts = (params?: IGetPostsParams) => {
  return useQuery(["posts", params], () => {
    return postController.getAll(params);
  });
};

export default usePosts;
