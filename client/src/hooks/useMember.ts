import axiosClient from "@/configs/axiosClient";
import { MEMBER_DATA } from "@/queryKeys";
import { IMember } from "@/types/Member";
import { useQuery } from "react-query";

const useMember = () => {
  return useQuery(MEMBER_DATA, () => {
    return axiosClient.get<IMember>("/me");
  });
};

export default useMember;
