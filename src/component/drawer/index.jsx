import './drawer.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import { Link } from 'react-router-dom';
import { useData } from 'context';

const Drawer = () => {
  const {drawer} = useData();
  return (
    <aside className={`side-navbar d-flex flex-col drawer-${drawer ? 'show' : 'hide'}`}>
        <ul className="nav-lists d-flex flex-col">
          <li className="drawer-item d-flex items-center">
            <Link to='/home' className="d-flex items-center active">
              <HomeOutlinedIcon className="mr-4" />
              Home
            </Link>
          </li>
          <li className="drawer-item d-flex flex-col">
            <Link to='/' className="d-flex items-center">
              <PlayCircleOutlineOutlinedIcon className="mr-4 " />
              Playlist
            </Link>
          </li>
          <li className="drawer-item d-flex items-center">
            <Link to='/' className="d-flex items-center">
              <FavoriteBorderOutlinedIcon className="mr-4 " />
              Liked
            </Link>
          </li>
          <li className="drawer-item d-flex items-center">
            <Link to="/trash" className="d-flex items-center">
              <WatchLaterOutlinedIcon className="mr-4 " />
              watch Later
            </Link>
          </li>
          <li className="drawer-item d-flex items-center">
            <Link to='' className="d-flex items-center">
              <HistoryOutlinedIcon className="mr-4" />
              History
            </Link>
          </li>
        </ul>
    </aside>
  )
}
export { Drawer }