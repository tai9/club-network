import levelController from "@/controllers/levelController";
import { useQuery } from "react-query";

export const useLevels = (exp?: number) => {
  return useQuery(["levels", exp], async () => {
    const res = await levelController.getAll();
    const level =
      typeof exp !== "undefined"
        ? res?.data.data.find((x) => exp <= x.targetPoint)
        : undefined;
    return typeof exp !== "undefined" ? level : res.data;
  });
};
