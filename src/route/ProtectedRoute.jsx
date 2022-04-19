import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ? 
    (<main>
      <Outlet />
    </main>)
    : (<Navigate to="/login" replace state={{from : location.pathname}} />);
};

export { ProtectedRoute };