import { Routes, Route } from "react-router-dom";
import {Home} from 'pages';

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" component={Home} />
    </Routes>
  );
}
export {AppRoute as Routes}