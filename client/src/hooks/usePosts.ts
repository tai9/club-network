import postController from "@/controllers/postController";
import { IGetPostsParams } from "@/types/Post";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";

const usePosts = (params?: IGetPostsParams) => {
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

export default usePosts;
