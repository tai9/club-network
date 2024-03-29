import axiosClient from "@/configs/axiosConfig";
import { ILevel } from "@server/types/Level";
import { DataWithPagination } from "@server/types/common";

const prefix = "levels";

const levelController = {
  getAll() {
    return axiosClient.get<DataWithPagination<ILevel>>(`/${prefix}`);
  },
};

export default levelController;
