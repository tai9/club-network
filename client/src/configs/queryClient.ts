import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 0, // 5 minutes
      // staleTime: 300000, // 5 minutes
    },
  },
});

export default queryClient;
