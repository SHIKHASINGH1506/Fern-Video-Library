import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute';
import { Home, Login, Signup, SingleVideo, LikedVideos, WatchLater } from 'pages';

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/video/:videoId" element={<SingleVideo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/likedVideos" element={<LikedVideos />} />
        <Route path="/watchlater" element={<WatchLater />} />
      </Route>
    </Routes>
  );
}
export {AppRoute as Routes}