import axiosClient from "@/configs/axiosClient";
import memberController from "@/controllers/memberController";
import { IMember } from "@server/types/Member";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useMember = () => {
  return useQuery({
    queryKey: ["member-me"],
    queryFn: async () => {
      const res = await axiosClient.get<IMember>("/me");
      return res.data;
    },
  });
};

export const useMemberById = (memberId: number) => {
  return useQuery({
    queryKey: ["member", memberId],
    queryFn: async () => {
      const res = await memberController.get(memberId);
      return res.data;
    },
  });
};

export const useMembers = (params?: any) => {
  return useQuery({
    queryKey: ["members", params],
    queryFn: async () => {
      const res = await memberController.getAll(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useMemberExp = (memberId?: number) => {
  const params = useParams();
  const id = params?.id as string;
  const memberExpId = memberId || id;
  return useQuery({
    queryKey: ["member-exp", memberExpId],
    queryFn: async () => {
      const res = await memberController.getExp(+memberExpId);
      return res.data;
    },
  });
};
