import axiosClient from "@/configs/axiosClient";

const prefix = "me";

const meController = {
  getMyExp() {
    return axiosClient.get<{ exp: number }>(`/${prefix}/level`);
  },
};

export default meController;
