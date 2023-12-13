import axiosClient from "@/configs/axiosClient";
import { POST_DATA } from "@/queryKeys";
import { IPost } from "@/types/Post";
import { DataWithPagination } from "@/types/common";
import { useQuery } from "react-query";

const usePosts = () => {
  return useQuery(POST_DATA, () => {
    return axiosClient.get<DataWithPagination<IPost>>("/posts");
  });
};

export default usePosts;
