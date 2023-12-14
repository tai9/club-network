import axiosClient from "@/configs/axiosClient";

const commentController = {
  getAll() {
    return axiosClient.get(`/comments`);
  },
  create(data: any) {
    return axiosClient.post(`/comments`, data);
  },
  getOfPost(postId: number) {
    return axiosClient.get<{ type: string; count: string }[]>(
      `/comments/${postId}/post`
    );
  },
  delete(id: number) {
    return axiosClient.delete(`/comments/${id}`);
  },
};

export default commentController;
