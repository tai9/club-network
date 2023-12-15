import axiosClient from "@/configs/axiosClient";
import memberController from "@/controllers/memberController";
import { MEMBER_DATA } from "@/queryKeys";
import { IMember } from "@/types/Member";
import { useQuery } from "react-query";

export const useMember = () => {
  return useQuery(MEMBER_DATA, () => {
    return axiosClient.get<IMember>("/me");
  });
};

export const useMembers = () => {
  return useQuery("members", async () => {
    const res = await memberController.getAll();
    return res.data;
  });
};
