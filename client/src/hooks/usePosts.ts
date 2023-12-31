import postController from "@/controllers/postController";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePosts = () => {
  const router = useRouter();
  const memberId = localStorage.getItem("memberId") || "";
  const isCurrentMember = router.query.id === memberId;
  const isMySelf = router.query.type === "me";

  const queries = {
    memberId: isMySelf
      ? memberId
      : !isCurrentMember
      ? router.query.id
      : undefined,
  };

  return useQuery({
    queryKey: ["posts", queries],
    queryFn: () => {
      return postController.getAll(queries);
    },
  });
};

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: ["posts", { postId }],
    queryFn: async () => {
      const res = await postController.get(postId);
      return res.data;
    },
    enabled: !!postId,
  });
};

export const useNotificationPosts = () => {
  return useQuery({
    queryKey: ["posts", "notification"],
    queryFn: async () => {
      const res = await postController.getAll({
        isNotification: true,
      });
      return res.data;
    },
  });
};

export default usePosts;
