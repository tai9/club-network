import axiosClient from "@/configs/axiosClient";
import { IMember } from "@server/types/Member";
import { DataWithPagination } from "@server/types/common";

const prefix = "members";

const memberController = {
  getAll(params?: any) {
    return axiosClient.get<DataWithPagination<IMember>>(`/${prefix}`, {
      params,
    });
  },
  get(memberId: number) {
    return axiosClient.get<IMember>(`/${prefix}/${memberId}`);
  },
  export() {
    return axiosClient.get(`/${prefix}/export-csv`, {
      responseType: "blob",
    });
  },
  upload(formData: any) {
    return axiosClient.post(`/${prefix}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(id: number, data: any) {
    return axiosClient.put(`/${prefix}/${id}`, data);
  },
  create(data: any) {
    return axiosClient.post<IMember>(`/${prefix}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/${prefix}/${id}`);
  },
  bulkCreate(data: any) {
    return axiosClient.post(`/${prefix}/bulk-create`, data);
  },
  getExp(memberId: number) {
    return axiosClient.get<{ exp: number }>(`/${prefix}/${memberId}/exp`);
  },
};

export default memberController;
