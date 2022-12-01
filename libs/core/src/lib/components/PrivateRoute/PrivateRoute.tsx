import {
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from 'react-router-dom';

const PrivateRoute = () => {
  const token =
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token');
  const location = useLocation();
  const [searchParams] = useSearchParams();
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{
          from: `${location.pathname}${
            searchParams.toString() ? '?' + searchParams.toString() : ''
          }`,
        }}
        replace
      />
    );
  }
  return <Outlet />;
};

export default PrivateRoute;
