import './navbar.css';
import logo from 'asset/logo.png';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useData, useTheme, useAuth } from 'context';


const Navbar = () => {
  const {setDrawer, videoDispatch} = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const {theme, setTheme} = useTheme();
  const themeIcon = theme ==='dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />;
  const {auth:{isAuth}, setAuth} = useAuth();

  console.log(isAuth);

  const themeHandler = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  }

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuth');
    setAuth({
      token: null,
      user: null,
      isAuth: false
    })
    navigate('/login', {state: {from: location.pathname}, replace: true});
  }

  return (
    <header className="navbar-home">
      <nav className="navbar-wrapper d-flex justify-between items-center">
        <div className="left-aligned d-flex items-center">
          <div 
            className="sidebar-toggler" 
            id="sidebar-toggler" 
            onClick={() => setDrawer(prevDrawerState => !prevDrawerState)}
          >
             <MenuIcon />
          </div>
        
         
          <div className="logo-wrapper"><img src={logo} className="responsive-img" /></div>
          <Link className="brand-logo mx-2" to="/">FERN</Link>
        </div>
        <div className="navbar-center-aligned">
          <div className="search-bar d-flex items-center">
            <button type="submit" className="search-btn d-flex items-center">
              <SearchIcon />
            </button>
            <input
              className="search-input"
              type="text"
              id="product"
              placeholder="Search videos here"
            />
          </div>
        </div>
        <ul className="right-aligned d-flex items-center ">
          <li className="nav-item icon" 
            onClick={e => themeHandler()}>
            {themeIcon}
          </li>
          <li className="nav-item icon">
            <AccountCircleOutlinedIcon />
          </li>
          {isAuth && <li className="nav-item icon" onClick={() => logoutHandler()}>
            <LogoutIcon />
          </li>}
        </ul>
      </nav>
    </header>
  )
}
export { Navbar }