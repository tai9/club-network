import postController from "@/controllers/postController";
import { IGetPostsParams } from "@/types/Post";
import { useInfiniteQuery } from "@tanstack/react-query";

const usePostsInfinity = (params?: IGetPostsParams) => {
  const infinityData = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["posts-infinity"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await postController.getAll({
        ...params,
        page: pageParam,
      });
      return response.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.page > 1 ? firstPage.page - 1 : undefined,
  });

  return infinityData;
};

export default usePostsInfinity;
