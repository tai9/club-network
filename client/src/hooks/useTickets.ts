import ticketController from "@/controllers/ticketController";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useTickets = (params?: any) => {
  return useQuery({
    queryKey: ["tickets", params],
    queryFn: async () => {
      const res = await ticketController.getAll(params);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
