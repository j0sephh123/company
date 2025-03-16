import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

const generateGcTime = (minutes: number) => minutes * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: generateGcTime(5),
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
  },
});

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        buttonPosition="bottom-left"
        position="left"
        initialIsOpen
      />

      {children}
    </QueryClientProvider>
  );
}
