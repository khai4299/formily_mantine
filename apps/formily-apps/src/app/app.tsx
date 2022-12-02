import { ModulesAuth } from '@formily-mantine/modules/auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@formily-mantine/core';
import { Layout, ModulesCommon } from '@formily-mantine/modules/common';

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
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<ModulesAuth />} />

          <Route element={<PrivateRoute />}>
            <Route path="/*" element={<Layout />}>
              <Route path="*" element={<ModulesCommon />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
