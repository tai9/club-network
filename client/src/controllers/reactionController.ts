import axiosClient from "@/configs/axiosClient";

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
};

export default reactionsController;
