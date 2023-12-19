import axiosClient from "@/configs/axiosClient";
import memberController from "@/controllers/memberController";
import { MEMBER_DATA } from "@/queryKeys";
import { IMember } from "@/types/Member";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";

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

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await memberController.getAll();
      return res.data;
    },
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
