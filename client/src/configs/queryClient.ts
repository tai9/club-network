import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 300000, // 5 minutes
    },
  },
});

export default queryClient;
