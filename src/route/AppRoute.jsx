import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute';
import { Home, Login, Signup, SingleVideo } from 'pages';

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/video/:videoId" element={<SingleVideo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute />} />
    </Routes>
  );
}
export {AppRoute as Routes}