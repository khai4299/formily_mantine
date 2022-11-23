import styled from 'styled-components';
import { Home } from './pages/Home';
import { QueryClient, QueryClientProvider } from 'react-query';

/* eslint-disable-next-line */
export interface ModulesHomeProps {}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function ModulesHome(props: ModulesHomeProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default ModulesHome;
