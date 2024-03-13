import axiosClient from "@/configs/axiosConfig";
import { DataWithPagination } from "@server/types/common";
import { ITicket } from "@server/types/Ticket";
import { AxiosRequestConfig } from "axios";

const prefix = "tickets";

const ticketController = {
  getAll(params?: any) {
    return axiosClient.get<DataWithPagination<ITicket>>(`/${prefix}`, {
      params,
    });
  },
  get(id: number) {
    return axiosClient.get<ITicket>(`/${prefix}/${id}`);
  },
  create(formData: any) {
    return axiosClient.post(`/${prefix}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  configClaimConditions(ticketId: number, payload: any) {
    return axiosClient.post(`/${prefix}/${ticketId}/claim-conditions`, payload);
  },
  createCheckoutLink(ticketId: number, payload: any) {
    return axiosClient.post(`/${prefix}/${ticketId}/checkout-link`, payload);
  },
  update(id: number, data: any, config?: AxiosRequestConfig) {
    return axiosClient.put(`/${prefix}/${id}`, data, config);
  },
  delete(id: number) {
    return axiosClient.delete(`/${prefix}/${id}`);
  },
};

export default ticketController;
