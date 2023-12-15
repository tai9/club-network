import axiosClient from "@/configs/axiosClient";
import { IMember } from "@/types/Member";
import { DataWithPagination } from "@/types/common";

const prefix = "members";

const memberController = {
  getAll() {
    return axiosClient.get<DataWithPagination<IMember>>(`/${prefix}`);
  },
  create(data: any) {
    return axiosClient.post(`/${prefix}`, data);
  },
};

export default memberController;
