import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function ModulesAuth() {
  return (
    <QueryClientProvider client={queryClient}>
      <Login />
    </QueryClientProvider>
  );
}

export default ModulesAuth;
