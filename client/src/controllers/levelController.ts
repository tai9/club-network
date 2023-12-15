import axiosClient from "@/configs/axiosClient";
import { ILevel } from "@/types/Level";
import { DataWithPagination } from "@/types/common";

const prefix = "levels";

const levelController = {
  getAll() {
    return axiosClient.get<DataWithPagination<ILevel>>(`/${prefix}`);
  },
};

export default levelController;
