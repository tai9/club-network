import levelController from "@/controllers/levelController";
import { useQuery } from "@tanstack/react-query";

export const useLevels = (exp?: number) => {
  return useQuery({
    queryKey: ["levels", exp],
    queryFn: async () => {
      const res = await levelController.getAll();
      const level =
        typeof exp !== "undefined"
          ? res?.data.data.find((x) => exp <= x.targetPoint)
          : undefined;
      return typeof exp !== "undefined" ? level : res.data;
    },
  });
};
