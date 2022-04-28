import './drawer.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

import { Link, NavLink } from 'react-router-dom';
import { useData } from 'context';

const Drawer = () => {
  const {drawer} = useData();
  return (
    <aside className={`side-navbar d-flex flex-col drawer-${drawer ? 'show' : 'hide'}`}>
        <ul className="d-flex flex-col">
          <li>
            <NavLink 
              to='/home' 
              className={ ({isActive}) => isActive ? 'drawer-item drawer-item-active' : 'drawer-item'}
            >
              <HomeOutlinedIcon className="mr-4" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/playlist' 
              className={ ({isActive}) => isActive ? 'drawer-item drawer-item-active' : 'drawer-item'}
            >
              <PlayCircleOutlineOutlinedIcon className="mr-4 " />
              Playlist
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/likedVideos' 
              className={ ({isActive}) => isActive ? 'drawer-item drawer-item-active' : 'drawer-item'}
            >
              <FavoriteBorderOutlinedIcon className="mr-4 " />
              Liked
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/watchlater" 
              className={ ({isActive}) => isActive ? 'drawer-item drawer-item-active' : 'drawer-item'}
            >
              <WatchLaterOutlinedIcon className="mr-4 " />
              Watch Later
            </NavLink>
          </li>
          <li>
            <NavLink 
              to='/history' 
              className={ ({isActive}) => isActive ? 'drawer-item drawer-item-active' : 'drawer-item'}
            >
              <HistoryOutlinedIcon className="mr-4" />
              History
            </NavLink>
          </li>
        </ul>
    </aside>
  )
}
export { Drawer }