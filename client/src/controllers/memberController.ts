import axiosClient from "@/configs/axiosClient";
import { IMember } from "@server/types/Member";
import { DataWithPagination } from "@server/types/common";

const prefix = "members";

const memberController = {
  getAll() {
    return axiosClient.get<DataWithPagination<IMember>>(`/${prefix}`);
  },
  get(memberId: number) {
    return axiosClient.get<IMember>(`/${prefix}/${memberId}`);
  },
  create(data: any) {
    return axiosClient.post(`/${prefix}`, data);
  },
  getExp(memberId: number) {
    return axiosClient.get<{ exp: number }>(`/${prefix}/${memberId}/exp`);
  },
};

export default memberController;
