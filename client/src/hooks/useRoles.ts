import roleController from "@/controllers/roleController";
import { useQuery } from "@tanstack/react-query";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const res = await roleController.getAll();
      return res.data;
    },
  });
};
