import axiosClient from "@/configs/axiosConfig";

const reactionsController = {
  getAll() {
    return axiosClient.get(`/reactions`);
  },
  create(data: any) {
    return axiosClient.post(`/reactions`, data);
  },
  getOfPost(postId: number) {
    return axiosClient.get<{ type: string; count: string }[]>(
      `/reactions/${postId}/post`
    );
  },
  delete(postId: number, type: string) {
    return axiosClient.post(`/reactions/${postId}/post`, {
      type,
    });
  },
};

export default reactionsController;
