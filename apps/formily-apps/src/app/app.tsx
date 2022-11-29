import { ModulesAuth } from '@formily-mantine/modules/auth';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModulesAuth />
    </QueryClientProvider>
  );
}

export default App;
