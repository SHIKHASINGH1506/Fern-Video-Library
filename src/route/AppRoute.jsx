import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from 'pages';

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<ProtectedRoute />} />
    </Routes>
  );
}
export {AppRoute as Routes}