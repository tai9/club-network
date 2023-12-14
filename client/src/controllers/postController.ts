import axiosClient from "@/configs/axiosClient";

const postController = {
  getAll() {
    return axiosClient.get(`/posts`);
  },
  create(data: any) {
    return axiosClient.post(`/posts`, data);
  },
  update(id: number, data: any) {
    return axiosClient.put(`/posts/${id}`, data);
  },
  delete(id: number) {
    return axiosClient.delete(`/posts/${id}`);
  },
};

export default postController;
