import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GeneralForm, SimpleForm, ManagementForm } from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function ModulesCommon() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="*" element={<Navigate to={'simple-form'} />} />
        <Route path="simple-form" element={<SimpleForm />} />
        <Route path="general-form" element={<GeneralForm />} />
        <Route path="management-form" element={<ManagementForm />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default ModulesCommon;
