import axiosClient from "@/configs/axiosClient";
import { IPost } from "@/types/Post";
import { DataWithPagination } from "@/types/common";

const prefix = "posts";

const postController = {
  getAll(params?: any) {
    return axiosClient.get<DataWithPagination<IPost>>(`/${prefix}`, { params });
  },
  get(id: number) {
    return axiosClient.get<IPost>(`/${prefix}/${id}`);
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

export default postController;
