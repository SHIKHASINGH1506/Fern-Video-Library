import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  //const isAuth = localStorage.getItem("isAuth");
  return (
    <main>
      <Outlet />
    </main>
  );
};

export { ProtectedRoute };