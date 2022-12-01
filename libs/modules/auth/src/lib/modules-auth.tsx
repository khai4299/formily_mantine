import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';

export function ModulesAuth() {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  );
}

export default ModulesAuth;
