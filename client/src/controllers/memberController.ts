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
  create(data: any) {
    return axiosClient.post<IMember>(`/${prefix}`, data);
  },
  bulkCreate(data: any) {
    return axiosClient.post(`/${prefix}/bulk-create`, data);
  },
  getExp(memberId: number) {
    return axiosClient.get<{ exp: number }>(`/${prefix}/${memberId}/exp`);
  },
};

export default memberController;
