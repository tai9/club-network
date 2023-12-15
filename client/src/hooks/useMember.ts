import axiosClient from "@/configs/axiosClient";
import memberController from "@/controllers/memberController";
import { MEMBER_DATA } from "@/queryKeys";
import { IMember } from "@/types/Member";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

export const useMember = () => {
  return useQuery(MEMBER_DATA, () => {
    return axiosClient.get<IMember>("/me");
  });
};

export const useMemberById = (memberId: number) => {
  return useQuery(["member", memberId], async () => {
    const res = await memberController.get(memberId);
    return res.data;
  });
};

export const useMembers = () => {
  return useQuery("members", async () => {
    const res = await memberController.getAll();
    return res.data;
  });
};

export const useMemberExp = (memberId?: number) => {
  const { id } = useParams();
  const memberExpId = memberId || id;
  return useQuery(["member-exp", memberExpId], async () => {
    const res = await memberController.getExp(+memberExpId);
    return res.data;
  });
};
