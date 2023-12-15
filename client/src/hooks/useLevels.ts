import levelController from "@/controllers/levelController";
import meController from "@/controllers/meControler";
import { useQuery } from "react-query";

export const useMyLevel = () => {
  return useQuery("my-level", async () => {
    const res = await meController.getMyExp();
    return res.data;
  });
};

export const useLevels = () => {
  return useQuery("levels", async () => {
    const res = await levelController.getAll();
    return res.data;
  });
};
