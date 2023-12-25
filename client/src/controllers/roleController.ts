import axiosClient from "@/configs/axiosClient";
import { IRole } from "@server/types/Role";
import { DataWithPagination } from "@server/types/common";

const prefix = "roles";

const roleController = {
  getAll(params?: any) {
    return axiosClient.get<DataWithPagination<IRole>>(`/${prefix}`, { params });
  },
  get(id: number) {
    return axiosClient.get<IRole>(`/${prefix}/${id}`);
  },
  create(data: any) {
    return axiosClient.post(`/${prefix}`, data);
  },
  update(id: number, data: any) {
    return axiosClient.put(`/${prefix}/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/${prefix}/${id}`);
  },
};

export default roleController;
